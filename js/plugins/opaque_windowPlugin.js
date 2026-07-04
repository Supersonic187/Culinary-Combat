/*:
 * @target MZ
 * @plugindesc Makes all windows fully opaque
 */
(() => {
  const _Window_Base_initialize = Window_Base.prototype.initialize;
  Window_Base.prototype.initialize = function(rect) {
    _Window_Base_initialize.call(this, rect);
    this.backOpacity = 255;
  };
})();