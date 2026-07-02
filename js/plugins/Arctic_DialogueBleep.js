/*:
 * @target MZ
 * @plugindesc Dialogue Blip Sound — Random SE per character while text appears ✨ RPG Maker MZ Compatible
 * @author Arctic Chief
 *
 * @param Blip Sounds
 * @type file[]
 * @dir audio/se
 * @desc A list of SEs to randomly play per character.
 * @default ["Cursor1", "Cursor2"]
 *
 * @param Pitch Variance
 * @type number
 * @min 0
 * @max 50
 * @desc Random pitch variation range for natural feel.
 * @default 10
 *
 * @param Volume
 * @type number
 * @min 0
 * @max 100
 * @desc Volume of the blip sound (0-100)
 * @default 90
 */

(() => {
  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const params = PluginManager.parameters(pluginName);

  const soundList = JSON.parse(params["Blip Sounds"] || "[]").map(s => String(s));
  const pitchVar = Number(params["Pitch Variance"] || 10);
  const volume = Number(params["Volume"] || 90);

  let _lastCharPlayedTime = 0;

  const _Window_Message_updateMessage = Window_Message.prototype.updateMessage;
  Window_Message.prototype.updateMessage = function() {
    if (!this._textState) return false;

    const textState = this._textState;
    const c = textState.text[textState.index];

    if (c && c.trim()) {
      const now = performance.now();
      if (now - _lastCharPlayedTime > 30 && soundList.length > 0) {
        const soundName = soundList[Math.floor(Math.random() * soundList.length)];
        const pitch = 100 + Math.random() * pitchVar - pitchVar / 2;
        AudioManager.playSe({ name: soundName, pan: 0, pitch: pitch, volume: volume });
        _lastCharPlayedTime = now;
      }
    }

    return _Window_Message_updateMessage.call(this);
  };
})();
