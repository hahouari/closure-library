/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.messaging.LoggerClientTest');
goog.setTestOnly();

const Logger = goog.require('goog.debug.Logger');
const LoggerClient = goog.require('goog.messaging.LoggerClient');
const MockControl = goog.require('goog.testing.MockControl');
const MockMessageChannel = goog.require('goog.testing.messaging.MockMessageChannel');
const debug = goog.require('goog.debug');
const testSuite = goog.require('goog.testing.testSuite');

let mockControl;
let channel;
let client;
let logger;

testSuite({
  setUp() {
    debug.FORCE_SLOPPY_STACKS = false;
    mockControl = new MockControl();
    channel = new MockMessageChannel(mockControl);
    client = new LoggerClient(channel, 'log');
    logger = Logger.getLogger('test.logging.Object');
  },

  tearDown() {
    channel.dispose();
    client.dispose();
  },

  testCommand() {
    channel.send('log', {
      name: 'test.logging.Object',
      level: Logger.Level.WARNING.value,
      message: 'foo bar',
      exception: undefined,
    });
    mockControl.$replayAll();
    logger.warning('foo bar');
    mockControl.$verifyAll();
  },

  testCommandWithException() {
    const ex = Error('oh no');
    ex.stack = ['one', 'two'];
    ex.message0 = 'message 0';
    ex.message1 = 'message 1';
    ex.ignoredProperty = 'ignored';

    channel.send('log', {
      name: 'test.logging.Object',
      level: Logger.Level.WARNING.value,
      message: 'foo bar',
      exception: {
        name: 'Error',
        message: ex.message,
        stack: ex.stack,
        lineNumber: ex.lineNumber || ex.line || 'Not available',
        fileName: ex.fileName || ex.sourceURL || window.location.href,
        message0: ex.message0,
        message1: ex.message1,
      },
    });
    mockControl.$replayAll();
    logger.warning('foo bar', ex);
    mockControl.$verifyAll();
  },
});
