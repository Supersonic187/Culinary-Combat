/*:
 * @target MZ
 * @plugindesc Disables player dashing entirely
 */
(() => {
  Game_Player.prototype.isDashing = function() {
    return false;
  };
})();