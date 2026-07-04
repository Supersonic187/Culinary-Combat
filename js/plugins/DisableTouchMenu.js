/*:
 * @target MZ
 * @plugindesc Completely removes the menu button icon
 */
(() => {
  Scene_Map.prototype.createMenuButton = function() {
    // Do nothing - menu button is never created
  };
})();