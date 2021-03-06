/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.vec.Float32ArrayTest');
goog.setTestOnly();

const VecFloat32Array = goog.require('goog.vec.Float32Array');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testConstructorInitializesElementsToZero() {
    const f = new VecFloat32Array(3);
    assertEquals(3, f.length);
    assertEquals(0, f[0]);
    assertEquals(0, f[1]);
    assertEquals(0, f[2]);
    assertEquals(4, f.BYTES_PER_ELEMENT);
    assertEquals(4, VecFloat32Array.BYTES_PER_ELEMENT);
  },

  testConstructorWithArrayAsArgument() {
    const f0 = new VecFloat32Array([0, 0, 1, 0]);
    const f1 = new VecFloat32Array(4);
    f1[0] = 0;
    f1[1] = 0;
    f1[2] = 1;
    f1[3] = 0;
    assertObjectEquals(f0, f1);
  },

  testSet() {
    const f0 = new VecFloat32Array(4);
    const f1 = new VecFloat32Array(4);
    f0.set([1, 2, 3, 4]);
    f1[0] = 1;
    f1[1] = 2;
    f1[2] = 3;
    f1[3] = 4;
    assertObjectEquals(f0, f1);
  },

  testSetWithOffset() {
    const f0 = new VecFloat32Array(4);
    const f1 = new VecFloat32Array(4);
    f0.set([5], 1);
    f1[0] = 0;
    f1[1] = 5;
    f1[2] = 0;
    f1[3] = 0;
    assertObjectEquals(f0, f1);
  },

  testToString() {
    const f = new VecFloat32Array([4, 3, 2, 1]);
    assertEquals('4,3,2,1', f.toString());
  },
});
