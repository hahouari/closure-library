/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.events.EventTargetTest');
goog.setTestOnly();

const GoogEventTarget = goog.require('goog.events.EventTarget');
const Listenable = goog.require('goog.events.Listenable');
const eventTargetTester = goog.require('goog.events.eventTargetTester');
const testSuite = goog.require('goog.testing.testSuite');

const KeyType = eventTargetTester.KeyType;
const UnlistenReturnType = eventTargetTester.UnlistenReturnType;

testSuite(Object.assign(
    {
      setUp() {
        const newListenableFn = () => new GoogEventTarget();
        const listenFn = (src, type, listener, opt_capt, opt_handler) =>
            src.listen(type, listener, opt_capt, opt_handler);
        const unlistenFn = (src, type, listener, opt_capt, opt_handler) =>
            src.unlisten(type, listener, opt_capt, opt_handler);
        const unlistenByKeyFn = (src, key) => src.unlistenByKey(key);
        const listenOnceFn = (src, type, listener, opt_capt, opt_handler) =>
            src.listenOnce(type, listener, opt_capt, opt_handler);
        const dispatchEventFn = (src, e) => src.dispatchEvent(e);
        const removeAllFn = (src, opt_type, opt_capture) =>
            src.removeAllListeners(opt_type, opt_capture);
        const getListenersFn = (src, type, capture) =>
            src.getListeners(type, capture);
        const getListenerFn = (src, type, listener, capture, opt_handler) =>
            src.getListener(type, listener, capture, opt_handler);
        const hasListenerFn = (src, opt_type, opt_capture) =>
            src.hasListener(opt_type, opt_capture);

        eventTargetTester.setUp(
            newListenableFn, listenFn, unlistenFn, unlistenByKeyFn,
            listenOnceFn, dispatchEventFn, removeAllFn, getListenersFn,
            getListenerFn, hasListenerFn, KeyType.NUMBER,
            UnlistenReturnType.BOOLEAN, false);
      },

      tearDown() {
        eventTargetTester.tearDown();
      },

      testRuntimeTypeIsCorrect() {
        const target = new GoogEventTarget();
        assertTrue(Listenable.isImplementedBy(target));
      },
    },
    eventTargetTester.commonTests));
