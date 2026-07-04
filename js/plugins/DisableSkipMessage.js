/*:
 * @target MZ
 * @plugindesc Prevents instant-completing text and disables message skipping
 */
(() => {
  // Prevent Space/OK from instantly finishing the current message's text
  Window_Message.prototype.updateShowFast = function() {
    // Intentionally empty — disables "hold/press to instantly show full text"
  };
})();