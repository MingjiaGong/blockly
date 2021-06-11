/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview The abstract class for a component that can delete a block or
 * bubble that is dropped on top of it.
 * @author kozbial@google.com (Monica Kozbial)
 */

'use strict';

goog.provide('Blockly.DeleteArea');

goog.require('Blockly.DragTarget');
goog.require('Blockly.IDeleteArea');


/**
 * Abstract class for a component that can delete a block or bubble that is
 * dropped on top of it.
 * @extends {Blockly.DragTarget}
 * @implements {Blockly.IDeleteArea}
 * @constructor
 */
Blockly.DeleteArea = function() {
  Blockly.DeleteArea.superClass_.constructor.call(this);

  /**
   * Whether the current block or bubble dragged over this delete area would be
   * deleted if dropped on this component.
   * @type {boolean}
   * @protected
   */
  this.wouldDelete_ = false;
};
Blockly.utils.object.inherits(Blockly.DeleteArea, Blockly.DragTarget);

/**
 * Returns whether the provided block would be deleted if dropped on this area.
 * This method should check if the block is deletable and is always called
 * before onDragEnter/onDragOver/onDragExit.
 * @param {!Blockly.BlockSvg} block The block.
 * @param {boolean} couldConnect Whether the block could could connect to
 *     another.
 * @return {boolean} Whether the block provided would be deleted if dropped on
 *     this area.
 */
Blockly.DeleteArea.prototype.wouldDeleteBlock = function(block, couldConnect) {
  var couldDeleteBlock = !block.getParent() && block.isDeletable();
  this.wouldDelete_ = couldDeleteBlock && !couldConnect;
  return this.wouldDelete_;
};

/**
 * Returns whether the provided bubble would be deleted if dropped on this area.
 * This method should check if the bubble is deletable and is always called
 * before onDragEnter/onDragOver/onDragExit.
 * @param {!Blockly.IBubble} bubble The bubble.
 * @return {boolean} Whether the bubble provided would be deleted if dropped on
 *     this area.
 */
Blockly.DeleteArea.prototype.wouldDeleteBubble = function(bubble) {
  this.wouldDelete_ = bubble.isDeletable();
  return this.wouldDelete_;
};