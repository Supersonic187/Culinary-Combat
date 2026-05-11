//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.90;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.90] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * ---
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want to use it automatically.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *     - This means you need to go to your own project's rmmz_core.js and
 *       modify Input.keyMapper to have buttons with "cancel" and "menu"
 *       instead of only "escape".
 *     - If there are none found, an error message will appear telling you to
 *       do so, or set the 'Split "Escape"' option to false.
 *     - If you are using Options Core's Rebind Keyboard option, be sure to
 *       have those have "cancel" and "menu" options inside there, too.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 * 
 *   Convert JS To Base?:
 *   - Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *     parameters to prevent infinite loops.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.90: February 16, 2026
 * * Feature Update!
 * ** Battle System settings for "TPB Active" and "TPB Wait" will no longer
 *    conflict with VisuMZ_2_BattleSystemATB and VisuMZ_1_OptionsCore "Active"
 *    or "Wait" mode options set by the player.
 * 
 * Version 1.89: December 15, 2025
 * * Feature Update!
 * ** Added extra failsafes to ensure TPB Charge Time does not become NaN or
 *    an illegal value. Update made by Arisu.
 * 
 * Version 1.88: September 18, 2025
 * * Documentation Update!
 * ** Extra notes for <JS param Plus/Rate/Flat: code> notetags
 * *** Use 'user' to refer to the currently equipping actor.
 * *** If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 * *** Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 * *** Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 * *** Turn this off if you do not want it.
 * *** You are responsible for any infinite loops this may cause.
 * * Feature Update!
 * ** <JS param Plus/Rate/Flat: code> now support 'user' as a variable.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Parameters > Convert JS To Base?
 * **** Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *      parameters to prevent infinite loops.
 * 
 * Version 1.87: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Under Plugin Parameters: Menu Button Assist Window
 * *** Added text segments under Split "Escape"
 * **** This means you need to go to your own project's rmmz_core.js and
 *      modify Input.keyMapper to have buttons with "cancel" and "menu"
 *      instead of only "escape".
 * **** If there are none found, an error message will appear telling you to
 *      do so, or set the 'Split "Escape"' option to false.
 * **** If you are using Options Core's Rebind Keyboard option, be sure to
 *      have those have "cancel" and "menu" options inside there, too.
 * * Feature Update!
 * ** Plugin Parameters > Button Assist > Split "Escape" will now show an error
 *    message if a custom Input.keyMapper is not found with the "cancel" and
 *    "menu" keys implemented. Update made by Irina.
 * ** Updated Plugin Parameters > Button Assist > Split "Escape" description
 *    for Plugin Parameters to add in the following text: Requires custom
 *    Input.keyMapper with "cancel" and "menu".
 * ** Added better compatibility with WASD controls as to prioritize showing
 *    the arrow keys rather than the W, A, S, D keys. Also applies to any other
 *    rebindings.
 * 
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * Requires custom Input.keyMapper with "cancel" and "menu".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param ConvertToBase:eval
 * @text Convert JS To Base?
 * @parent BasicParameters
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc Automatically convert <JS param Plus/Rate/Flat: code>
 * to use base parameters to prevent infinite loops.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x34b3e3=_0x2daf;(function(_0x32c3d9,_0x1e5160){const _0x411fd4=_0x2daf,_0x1b6e43=_0x32c3d9();while(!![]){try{const _0x8e3ed2=-parseInt(_0x411fd4(0x2c0))/0x1+-parseInt(_0x411fd4(0x68f))/0x2*(-parseInt(_0x411fd4(0x531))/0x3)+parseInt(_0x411fd4(0x3de))/0x4*(parseInt(_0x411fd4(0x142))/0x5)+-parseInt(_0x411fd4(0x626))/0x6+-parseInt(_0x411fd4(0x63b))/0x7+parseInt(_0x411fd4(0x39d))/0x8+parseInt(_0x411fd4(0x5d3))/0x9*(-parseInt(_0x411fd4(0x1c4))/0xa);if(_0x8e3ed2===_0x1e5160)break;else _0x1b6e43['push'](_0x1b6e43['shift']());}catch(_0x6ce8c1){_0x1b6e43['push'](_0x1b6e43['shift']());}}}(_0x5a1f,0x6ca6b));var label=_0x34b3e3(0x4d5),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x34b3e3(0x14d)](function(_0xb4e6d9){const _0x459b44=_0x34b3e3;return _0xb4e6d9['status']&&_0xb4e6d9[_0x459b44(0x572)][_0x459b44(0x1da)]('['+label+']');})[0x0];VisuMZ[label][_0x34b3e3(0x2fb)]=VisuMZ[label][_0x34b3e3(0x2fb)]||{},VisuMZ[_0x34b3e3(0x6db)]=function(_0x1ef131,_0x33b227){const _0x2a5477=_0x34b3e3;for(const _0x4835f1 in _0x33b227){if(_0x4835f1[_0x2a5477(0x39c)](/(.*):(.*)/i)){const _0x484759=String(RegExp['$1']),_0x502270=String(RegExp['$2'])['toUpperCase']()[_0x2a5477(0x85f)]();let _0x206891,_0x54fcfe,_0x4b5c2f;switch(_0x502270){case _0x2a5477(0x2ef):_0x206891=_0x33b227[_0x4835f1]!==''?Number(_0x33b227[_0x4835f1]):0x0;break;case _0x2a5477(0x901):_0x54fcfe=_0x33b227[_0x4835f1]!==''?JSON[_0x2a5477(0x7c2)](_0x33b227[_0x4835f1]):[],_0x206891=_0x54fcfe[_0x2a5477(0x8ce)](_0xdb74b2=>Number(_0xdb74b2));break;case _0x2a5477(0x47b):_0x206891=_0x33b227[_0x4835f1]!==''?eval(_0x33b227[_0x4835f1]):null;break;case'ARRAYEVAL':_0x54fcfe=_0x33b227[_0x4835f1]!==''?JSON[_0x2a5477(0x7c2)](_0x33b227[_0x4835f1]):[],_0x206891=_0x54fcfe['map'](_0x5dec43=>eval(_0x5dec43));break;case'JSON':_0x206891=_0x33b227[_0x4835f1]!==''?JSON['parse'](_0x33b227[_0x4835f1]):'';break;case'ARRAYJSON':_0x54fcfe=_0x33b227[_0x4835f1]!==''?JSON[_0x2a5477(0x7c2)](_0x33b227[_0x4835f1]):[],_0x206891=_0x54fcfe['map'](_0x3af097=>JSON[_0x2a5477(0x7c2)](_0x3af097));break;case _0x2a5477(0x738):_0x206891=_0x33b227[_0x4835f1]!==''?new Function(JSON[_0x2a5477(0x7c2)](_0x33b227[_0x4835f1])):new Function(_0x2a5477(0x2b7));break;case'ARRAYFUNC':_0x54fcfe=_0x33b227[_0x4835f1]!==''?JSON[_0x2a5477(0x7c2)](_0x33b227[_0x4835f1]):[],_0x206891=_0x54fcfe[_0x2a5477(0x8ce)](_0x1e22bf=>new Function(JSON[_0x2a5477(0x7c2)](_0x1e22bf)));break;case'STR':_0x206891=_0x33b227[_0x4835f1]!==''?String(_0x33b227[_0x4835f1]):'';break;case _0x2a5477(0x48d):_0x54fcfe=_0x33b227[_0x4835f1]!==''?JSON['parse'](_0x33b227[_0x4835f1]):[],_0x206891=_0x54fcfe[_0x2a5477(0x8ce)](_0x24d6af=>String(_0x24d6af));break;case _0x2a5477(0x8fb):_0x4b5c2f=_0x33b227[_0x4835f1]!==''?JSON[_0x2a5477(0x7c2)](_0x33b227[_0x4835f1]):{},_0x1ef131[_0x484759]={},VisuMZ[_0x2a5477(0x6db)](_0x1ef131[_0x484759],_0x4b5c2f);continue;case _0x2a5477(0x245):_0x54fcfe=_0x33b227[_0x4835f1]!==''?JSON[_0x2a5477(0x7c2)](_0x33b227[_0x4835f1]):[],_0x206891=_0x54fcfe[_0x2a5477(0x8ce)](_0x171312=>VisuMZ[_0x2a5477(0x6db)]({},JSON[_0x2a5477(0x7c2)](_0x171312)));break;default:continue;}_0x1ef131[_0x484759]=_0x206891;}}return _0x1ef131;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x52e)]=SceneManager[_0x34b3e3(0x3ef)],SceneManager[_0x34b3e3(0x3ef)]=function(){const _0x5ebcb3=_0x34b3e3;VisuMZ[_0x5ebcb3(0x4d5)]['SceneManager_exit'][_0x5ebcb3(0x267)](this);if(Utils[_0x5ebcb3(0x575)]>=_0x5ebcb3(0x548)){if(typeof nw===_0x5ebcb3(0x211))nw[_0x5ebcb3(0x417)][_0x5ebcb3(0x26e)]();}if(Utils[_0x5ebcb3(0x575)]>=_0x5ebcb3(0x752)){if(typeof nw==='object')nw['App'][_0x5ebcb3(0x26e)]();}},(_0x2343fc=>{const _0x569428=_0x34b3e3,_0x5b169b=_0x2343fc[_0x569428(0x650)];for(const _0x2015f6 of dependencies){if(!Imported[_0x2015f6]){alert(_0x569428(0x768)[_0x569428(0x577)](_0x5b169b,_0x2015f6)),SceneManager['exit']();break;}}const _0xed94ac=_0x2343fc[_0x569428(0x572)];if(_0xed94ac[_0x569428(0x39c)](/\[Version[ ](.*?)\]/i)){const _0x482732=Number(RegExp['$1']);_0x482732!==VisuMZ[label][_0x569428(0x500)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x569428(0x577)](_0x5b169b,_0x482732)),SceneManager[_0x569428(0x3ef)]());}if(_0xed94ac[_0x569428(0x39c)](/\[Tier[ ](\d+)\]/i)){const _0xad17bb=Number(RegExp['$1']);_0xad17bb<tier?(alert(_0x569428(0x6e0)[_0x569428(0x577)](_0x5b169b,_0xad17bb,tier)),SceneManager[_0x569428(0x3ef)]()):tier=Math[_0x569428(0x7ef)](_0xad17bb,tier);}VisuMZ[_0x569428(0x6db)](VisuMZ[label]['Settings'],_0x2343fc['parameters']);})(pluginData),((()=>{const _0x2c83df=_0x34b3e3;if(VisuMZ[_0x2c83df(0x4d5)][_0x2c83df(0x2fb)]['QoL'][_0x2c83df(0x6c1)]??!![])for(const _0x19b8b1 in $plugins){const _0x3b4841=$plugins[_0x19b8b1];_0x3b4841['name'][_0x2c83df(0x39c)](/(.*)\/(.*)/i)&&(_0x3b4841['name']=String(RegExp['$2']['trim']()));}})()),PluginManager[_0x34b3e3(0x72b)](pluginData['name'],_0x34b3e3(0x30b),_0x306b59=>{const _0x5bb4a3=_0x34b3e3;if(!SceneManager[_0x5bb4a3(0x44b)])return;if(!SceneManager[_0x5bb4a3(0x44b)][_0x5bb4a3(0x5b8)])return;VisuMZ['ConvertParams'](_0x306b59,_0x306b59);const _0x56f063=Math[_0x5bb4a3(0x59e)](_0x306b59['pointX']),_0x92e178=Math[_0x5bb4a3(0x59e)](_0x306b59[_0x5bb4a3(0x116)]);$gameTemp['requestPointAnimation'](_0x56f063,_0x92e178,_0x306b59[_0x5bb4a3(0x438)],_0x306b59[_0x5bb4a3(0x7c0)],_0x306b59[_0x5bb4a3(0x6a1)]);}),PluginManager['registerCommand'](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x4d1),_0x8299da=>{const _0x5ee14e=_0x34b3e3;VisuMZ[_0x5ee14e(0x6db)](_0x8299da,_0x8299da);const _0x207b92=Math['round'](_0x8299da['volume'])[_0x5ee14e(0x62e)](0x0,0x64),_0x49fdc6=AudioManager[_0x5ee14e(0x433)];_0x49fdc6&&(_0x49fdc6['volume']=_0x207b92,_0x49fdc6[_0x5ee14e(0x4c1)]=AudioManager[_0x5ee14e(0x728)][_0x5ee14e(0x842)](),AudioManager[_0x5ee14e(0x8d5)](_0x49fdc6),AudioManager[_0x5ee14e(0x4db)](_0x49fdc6,_0x49fdc6[_0x5ee14e(0x4c1)]),AudioManager[_0x5ee14e(0x728)][_0x5ee14e(0x657)](_0x49fdc6[_0x5ee14e(0x4c1)]));}),PluginManager['registerCommand'](pluginData['name'],_0x34b3e3(0x30a),_0x2ebb74=>{const _0x233f62=_0x34b3e3;VisuMZ[_0x233f62(0x6db)](_0x2ebb74,_0x2ebb74);const _0x5bd167=Math['round'](_0x2ebb74[_0x233f62(0x67f)])[_0x233f62(0x62e)](0x32,0x96),_0xee88e6=AudioManager['_currentBgm'];_0xee88e6&&(_0xee88e6[_0x233f62(0x67f)]=_0x5bd167,_0xee88e6['pos']=AudioManager[_0x233f62(0x728)][_0x233f62(0x842)](),AudioManager['updateBgmParameters'](_0xee88e6),AudioManager['playBgm'](_0xee88e6,_0xee88e6['pos']),AudioManager[_0x233f62(0x728)]['_startPlaying'](_0xee88e6[_0x233f62(0x4c1)]));}),PluginManager[_0x34b3e3(0x72b)](pluginData['name'],_0x34b3e3(0x148),_0x2aa164=>{const _0x399a21=_0x34b3e3;VisuMZ[_0x399a21(0x6db)](_0x2aa164,_0x2aa164);const _0x5af19f=Math[_0x399a21(0x59e)](_0x2aa164[_0x399a21(0x62a)])[_0x399a21(0x62e)](-0x64,0x64),_0x206076=AudioManager[_0x399a21(0x433)];_0x206076&&(_0x206076[_0x399a21(0x62a)]=_0x5af19f,_0x206076[_0x399a21(0x4c1)]=AudioManager['_bgmBuffer'][_0x399a21(0x842)](),AudioManager['updateBgmParameters'](_0x206076),AudioManager[_0x399a21(0x4db)](_0x206076,_0x206076[_0x399a21(0x4c1)]),AudioManager[_0x399a21(0x728)][_0x399a21(0x657)](_0x206076['pos']));}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x1f8),_0x11e6ae=>{const _0x186d86=_0x34b3e3;VisuMZ['ConvertParams'](_0x11e6ae,_0x11e6ae);const _0x3e9bb3=Math['round'](_0x11e6ae[_0x186d86(0x5c6)])['clamp'](0x0,0x64),_0x581961=AudioManager['_currentBgs'];_0x581961&&(_0x581961[_0x186d86(0x5c6)]=_0x3e9bb3,_0x581961[_0x186d86(0x4c1)]=AudioManager[_0x186d86(0x6a8)][_0x186d86(0x842)](),AudioManager[_0x186d86(0x327)](_0x581961),AudioManager[_0x186d86(0x69a)](_0x581961,_0x581961[_0x186d86(0x4c1)]),AudioManager[_0x186d86(0x6a8)][_0x186d86(0x657)](_0x581961[_0x186d86(0x4c1)]));}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x350),_0x45efb6=>{const _0x503ff1=_0x34b3e3;VisuMZ['ConvertParams'](_0x45efb6,_0x45efb6);const _0x4cdf74=Math[_0x503ff1(0x59e)](_0x45efb6[_0x503ff1(0x67f)])[_0x503ff1(0x62e)](0x32,0x96),_0x28f26b=AudioManager[_0x503ff1(0x446)];_0x28f26b&&(_0x28f26b['pitch']=_0x4cdf74,_0x28f26b['pos']=AudioManager[_0x503ff1(0x6a8)]['seek'](),AudioManager['updateBgsParameters'](_0x28f26b),AudioManager[_0x503ff1(0x69a)](_0x28f26b,_0x28f26b[_0x503ff1(0x4c1)]),AudioManager[_0x503ff1(0x6a8)]['_startPlaying'](_0x28f26b[_0x503ff1(0x4c1)]));}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x213),_0x4b2093=>{const _0x3966ab=_0x34b3e3;VisuMZ[_0x3966ab(0x6db)](_0x4b2093,_0x4b2093);const _0x55b60e=Math[_0x3966ab(0x59e)](_0x4b2093[_0x3966ab(0x62a)])[_0x3966ab(0x62e)](-0x64,0x64),_0x497528=AudioManager[_0x3966ab(0x446)];_0x497528&&(_0x497528[_0x3966ab(0x62a)]=_0x55b60e,_0x497528['pos']=AudioManager['_bgsBuffer'][_0x3966ab(0x842)](),AudioManager[_0x3966ab(0x327)](_0x497528),AudioManager[_0x3966ab(0x69a)](_0x497528,_0x497528[_0x3966ab(0x4c1)]),AudioManager[_0x3966ab(0x6a8)][_0x3966ab(0x657)](_0x497528[_0x3966ab(0x4c1)]));}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x543),_0x25dd2a=>{const _0x340f1e=_0x34b3e3;if(!$gameTemp['isPlaytest']())return;const _0x128aee=Input[_0x340f1e(0x4e8)]();console[_0x340f1e(0x79f)](_0x128aee);}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x2f5),_0x587fca=>{const _0x50fd93=_0x34b3e3;if(!$gameTemp[_0x50fd93(0x8f3)]())return;if(!Utils[_0x50fd93(0x8f2)]())return;SceneManager[_0x50fd93(0x44b)]['_active']=![],VisuMZ[_0x50fd93(0x4d5)][_0x50fd93(0x184)]();}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x495),_0x7ed59b=>{const _0x285adc=_0x34b3e3;if(!$gameTemp[_0x285adc(0x8f3)]())return;if(!Utils[_0x285adc(0x8f2)]())return;SceneManager[_0x285adc(0x44b)][_0x285adc(0x2ed)]=![],VisuMZ['CoreEngine'][_0x285adc(0x457)]();}),PluginManager[_0x34b3e3(0x72b)](pluginData['name'],_0x34b3e3(0x63a),_0x3fb7d8=>{const _0x5ebf70=_0x34b3e3;if(!$gameTemp[_0x5ebf70(0x8f3)]())return;if(!Utils[_0x5ebf70(0x8f2)]())return;if(!$gameMap)return;if($gameMap[_0x5ebf70(0x1a7)]()<=0x0)return;VisuMZ['ConvertParams'](_0x3fb7d8,_0x3fb7d8);const _0x165d11='Map%1'[_0x5ebf70(0x577)]($gameMap[_0x5ebf70(0x1a7)]()[_0x5ebf70(0x8e1)](0x3)),_0x32f45c=VisuMZ[_0x5ebf70(0x4d5)][_0x5ebf70(0x282)]($gameMap[_0x5ebf70(0x1a7)]());VisuMZ[_0x5ebf70(0x4d5)][_0x5ebf70(0x3ac)](_0x32f45c,_0x165d11,!![]);}),PluginManager['registerCommand'](pluginData[_0x34b3e3(0x650)],'ExportCurTroopText',_0x3abd96=>{const _0x2def3a=_0x34b3e3;if(!$gameTemp[_0x2def3a(0x8f3)]())return;if(!Utils[_0x2def3a(0x8f2)]())return;if(!$gameParty['inBattle']())return;VisuMZ[_0x2def3a(0x6db)](_0x3abd96,_0x3abd96);const _0x19ca7b=_0x2def3a(0x210)['format']($gameTroop[_0x2def3a(0x174)][_0x2def3a(0x8e1)](0x4)),_0xbc5cc9=VisuMZ[_0x2def3a(0x4d5)]['ExtractStrFromTroop']($gameTroop[_0x2def3a(0x174)]);VisuMZ[_0x2def3a(0x4d5)][_0x2def3a(0x3ac)](_0xbc5cc9,_0x19ca7b,!![]);}),VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x3ac)]=function(_0x4242cf,_0x3ff4b7,_0x74c2a7){const _0x48f0b3=_0x34b3e3,_0x51c993=require('fs');let _0x5d015e=_0x48f0b3(0x805)[_0x48f0b3(0x577)](_0x3ff4b7||'0');_0x51c993[_0x48f0b3(0x55d)](_0x5d015e,_0x4242cf,_0x45b34c=>{const _0x4be782=_0x48f0b3;if(_0x45b34c)throw err;else _0x74c2a7&&alert('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'[_0x4be782(0x577)](_0x5d015e));});},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x184)]=function(){const _0x5a97dd=_0x34b3e3,_0x1ada5f=[];for(const _0x216c6c of $dataMapInfos){if(!_0x216c6c)continue;_0x1ada5f[_0x5a97dd(0x1b7)](_0x216c6c['id']);}const _0x575960=_0x1ada5f['length']*0x64+Math[_0x5a97dd(0x592)](0x64);alert(_0x5a97dd(0x747)[_0x5a97dd(0x577)](_0x575960)),this['_storedMapText']=[],this[_0x5a97dd(0x1cc)]=$dataMap;for(const _0x2383d4 of _0x1ada5f){VisuMZ[_0x5a97dd(0x4d5)][_0x5a97dd(0x4ed)](_0x2383d4);}setTimeout(VisuMZ['CoreEngine'][_0x5a97dd(0x344)][_0x5a97dd(0x2da)](this),_0x575960);},VisuMZ['CoreEngine']['loadMapData']=function(_0x33c98a){const _0x170cc9=_0x34b3e3,_0x53db4a='Map%1.json'[_0x170cc9(0x577)](_0x33c98a[_0x170cc9(0x8e1)](0x3)),_0x16a768=new XMLHttpRequest(),_0xc6ad41=_0x170cc9(0x5e1)+_0x53db4a;_0x16a768[_0x170cc9(0x1a5)](_0x170cc9(0x3a8),_0xc6ad41),_0x16a768[_0x170cc9(0x3ec)]('application/json'),_0x16a768['onload']=()=>this[_0x170cc9(0x266)](_0x16a768,_0x33c98a,_0x53db4a,_0xc6ad41),_0x16a768[_0x170cc9(0x609)]=()=>DataManager[_0x170cc9(0x2bb)](_0x170cc9(0x538),_0x53db4a,_0xc6ad41),_0x16a768['send']();},VisuMZ[_0x34b3e3(0x4d5)]['storeMapData']=function(_0x4f2950,_0x5c914a,_0x3e5f2c,_0xf60c5e){const _0x45728b=_0x34b3e3;$dataMap=JSON[_0x45728b(0x7c2)](_0x4f2950[_0x45728b(0x371)]),DataManager[_0x45728b(0x203)]($dataMap),this[_0x45728b(0x508)][_0x5c914a]=VisuMZ[_0x45728b(0x4d5)][_0x45728b(0x282)](_0x5c914a),$dataMap=this[_0x45728b(0x1cc)];},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x344)]=function(){const _0x4c1f4f=_0x34b3e3,_0x5544f3=_0x4c1f4f(0x31d);this[_0x4c1f4f(0x508)]['remove'](undefined)[_0x4c1f4f(0x2fe)]('')['remove'](null);const _0x4e11c6=this[_0x4c1f4f(0x508)][_0x4c1f4f(0x41f)](_0x4c1f4f(0x628))[_0x4c1f4f(0x85f)]();VisuMZ['CoreEngine'][_0x4c1f4f(0x3ac)](_0x4e11c6,_0x5544f3,!![]),SceneManager['_scene'][_0x4c1f4f(0x2ed)]=!![];},VisuMZ[_0x34b3e3(0x4d5)]['ExtractStrFromMap']=function(_0x4cc9ce){const _0x90ad4e=_0x34b3e3;if(!$dataMap)return'';let _0x57d546='█'[_0x90ad4e(0x461)](0x46)+'\x0a\x0a',_0x2c2317='═'[_0x90ad4e(0x461)](0x46)+'\x0a\x0a',_0x2b195d='';this[_0x90ad4e(0x61b)]=0x0;for(const _0xd9468b of $dataMap[_0x90ad4e(0x16a)]){if(!_0xd9468b)continue;let _0x4f3713=_0xd9468b['id'],_0x4c1543=_0xd9468b[_0x90ad4e(0x650)],_0xa288ce=_0xd9468b[_0x90ad4e(0x19c)];for(const _0x2fcf45 of _0xa288ce){const _0x1fc99d=_0xa288ce[_0x90ad4e(0x5ec)](_0x2fcf45)+0x1;let _0x1cecb3=_0x2c2317+_0x90ad4e(0x204),_0x33647f=VisuMZ['CoreEngine']['ExtractStrFromList'](_0x2fcf45[_0x90ad4e(0x710)]);if(_0x33647f[_0x90ad4e(0x1ee)]>0x0){if(_0x2b195d['length']>0x0)_0x2b195d+=_0x2c2317+_0x90ad4e(0x628);else{const _0x1e82ef=$dataMapInfos[_0x4cc9ce]['name'];_0x2b195d+=_0x57d546+_0x90ad4e(0x59d)[_0x90ad4e(0x577)](_0x4cc9ce,_0x1e82ef||'Unnamed')+_0x57d546;}_0x2b195d+=_0x1cecb3[_0x90ad4e(0x577)](_0x4f3713,_0x4c1543,_0x1fc99d,_0x33647f);}}}return _0x2b195d['length']>0x0&&(_0x2b195d+=_0x2c2317),_0x2b195d;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x457)]=function(){const _0x3c355c=_0x34b3e3,_0x5a9efb=$dataTroops[_0x3c355c(0x1ee)]*0xa+Math[_0x3c355c(0x592)](0xa);alert(_0x3c355c(0x256)[_0x3c355c(0x577)](_0x5a9efb));const _0xc8f7be=[];for(const _0x12c812 of $dataTroops){if(!_0x12c812)continue;const _0x33b8be=_0x12c812['id'];_0xc8f7be[_0x33b8be]=VisuMZ[_0x3c355c(0x4d5)][_0x3c355c(0x847)](_0x33b8be);}setTimeout(VisuMZ[_0x3c355c(0x4d5)]['exportAllTroopStrings'][_0x3c355c(0x2da)](this,_0xc8f7be),_0x5a9efb);},VisuMZ['CoreEngine'][_0x34b3e3(0x847)]=function(_0x1770dd){const _0x38e219=_0x34b3e3;if(!$dataTroops[_0x1770dd])return'';let _0x4a7245='█'[_0x38e219(0x461)](0x46)+'\x0a\x0a',_0x2de78f='═'[_0x38e219(0x461)](0x46)+'\x0a\x0a',_0x57cea1='';this[_0x38e219(0x61b)]=0x0;const _0x1d9a83=$dataTroops[_0x1770dd];let _0x13dcdf=_0x1d9a83[_0x38e219(0x19c)];for(const _0x5013ae of _0x13dcdf){const _0x1b22e4=_0x13dcdf[_0x38e219(0x5ec)](_0x5013ae)+0x1;let _0x17f98c=_0x2de78f+_0x38e219(0x32d),_0x31cfea=VisuMZ[_0x38e219(0x4d5)]['ExtractStrFromList'](_0x5013ae[_0x38e219(0x710)]);_0x31cfea['length']>0x0&&(_0x57cea1['length']>0x0?_0x57cea1+=_0x2de78f+_0x38e219(0x628):_0x57cea1+=_0x4a7245+_0x38e219(0x8ab)[_0x38e219(0x577)](_0x1770dd,_0x1d9a83[_0x38e219(0x650)]||_0x38e219(0x751))+_0x4a7245,_0x57cea1+=_0x17f98c[_0x38e219(0x577)](_0x1b22e4,_0x31cfea));}return _0x57cea1[_0x38e219(0x1ee)]>0x0&&(_0x57cea1+=_0x2de78f),_0x57cea1;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x6cc)]=function(_0x27c3ed){const _0x5ee925=_0x34b3e3,_0x2e3be6='AllTroops';_0x27c3ed[_0x5ee925(0x2fe)](undefined)[_0x5ee925(0x2fe)]('')['remove'](null);const _0x4fdd01=_0x27c3ed[_0x5ee925(0x41f)](_0x5ee925(0x628))[_0x5ee925(0x85f)]();VisuMZ[_0x5ee925(0x4d5)][_0x5ee925(0x3ac)](_0x4fdd01,_0x2e3be6,!![]),SceneManager[_0x5ee925(0x44b)]['_active']=!![];},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x22f)]=function(_0x1c3945){const _0xff9a22=_0x34b3e3;let _0x4aea7e='\x0a'+'─'[_0xff9a22(0x461)](0x46)+'\x0a',_0x38e163='\x0a'+'┄'[_0xff9a22(0x461)](0x46)+'\x0a',_0x16e017='';for(const _0x39b72e of _0x1c3945){if(!_0x39b72e)continue;if(_0x39b72e[_0xff9a22(0x36e)]===0x65)_0x16e017+=_0x4aea7e+'\x0a',_0x16e017+='〘Show\x20Text〙\x0a',_0x39b72e[_0xff9a22(0x7e2)][0x4]!==''&&_0x39b72e[_0xff9a22(0x7e2)][0x4]!==undefined&&(_0x16e017+=_0xff9a22(0x63f)[_0xff9a22(0x577)](_0x39b72e['parameters'][0x4]));else{if(_0x39b72e[_0xff9a22(0x36e)]===0x191)_0x16e017+=_0xff9a22(0x2f4)[_0xff9a22(0x577)](_0x39b72e['parameters'][0x0]);else{if(_0x39b72e[_0xff9a22(0x36e)]===0x192)_0x16e017+=_0x4aea7e,_0x16e017+=_0xff9a22(0x62b)['format'](_0x38e163,_0x39b72e['parameters'][0x0]+0x1,_0x39b72e[_0xff9a22(0x7e2)][0x1]);else{if(_0x39b72e[_0xff9a22(0x36e)]===0x193)_0x16e017+=_0x4aea7e,_0x16e017+=_0xff9a22(0x2ab)[_0xff9a22(0x577)](_0x38e163);else{if(_0x39b72e[_0xff9a22(0x36e)]===0x194)_0x16e017+=_0x4aea7e,_0x16e017+=_0xff9a22(0x5cf)[_0xff9a22(0x577)](_0x38e163);else{if(_0x39b72e[_0xff9a22(0x36e)]===0x69)_0x16e017+=_0x4aea7e+'\x0a',_0x16e017+='〘Scrolling\x20Text〙\x0a';else{if(_0x39b72e[_0xff9a22(0x36e)]===0x6c)_0x16e017+=_0x4aea7e+'\x0a',_0x16e017+='》Comment《\x0a%1\x0a'['format'](_0x39b72e[_0xff9a22(0x7e2)][0x0]);else{if(_0x39b72e[_0xff9a22(0x36e)]===0x198)_0x16e017+=_0xff9a22(0x2f4)['format'](_0x39b72e[_0xff9a22(0x7e2)][0x0]);else{if(_0x39b72e[_0xff9a22(0x36e)]===0x75){const _0x231bc5=$dataCommonEvents[_0x39b72e[_0xff9a22(0x7e2)][0x0]];if(_0x231bc5&&this[_0xff9a22(0x61b)]<=0xa){this[_0xff9a22(0x61b)]++;let _0x74603b=VisuMZ[_0xff9a22(0x4d5)]['ExtractStrFromList'](_0x231bc5[_0xff9a22(0x710)]);_0x74603b['length']>0x0&&(_0x16e017+=_0x4aea7e,_0x16e017+=_0x38e163,_0x16e017+=_0xff9a22(0x26f)['format'](_0x231bc5['id'],_0x231bc5[_0xff9a22(0x650)]),_0x16e017+=_0x38e163,_0x16e017+=_0x74603b,_0x16e017+=_0x38e163,_0x16e017+=_0xff9a22(0x2cc)[_0xff9a22(0x577)](_0x231bc5['id'],_0x231bc5[_0xff9a22(0x650)]),_0x16e017+=_0x38e163),this['_commonEventLayers']--;}}}}}}}}}}}return _0x16e017[_0xff9a22(0x1ee)]>0x0&&(_0x16e017+=_0x4aea7e),_0x16e017;},PluginManager['registerCommand'](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x8cf),_0x4b0810=>{const _0x25254d=_0x34b3e3;VisuMZ[_0x25254d(0x6db)](_0x4b0810,_0x4b0810);const _0x212274=_0x4b0810[_0x25254d(0x393)];VisuMZ[_0x25254d(0x451)](_0x212274);}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x6b7),_0x491469=>{const _0x2c6ad3=_0x34b3e3;VisuMZ[_0x2c6ad3(0x6db)](_0x491469,_0x491469);const _0x4b865f=_0x491469[_0x2c6ad3(0x690)]||0x0;$gameParty[_0x2c6ad3(0x558)](_0x4b865f);}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x21f),_0xe005a5=>{const _0xd66308=_0x34b3e3;if(!SceneManager['isSceneMap']())return;VisuMZ[_0xd66308(0x6db)](_0xe005a5,_0xe005a5);const _0x2f6f1e=_0xe005a5[_0xd66308(0x289)];SceneManager[_0xd66308(0x44b)][_0xd66308(0x69b)](_0x2f6f1e);}),PluginManager['registerCommand'](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x395),_0x34499d=>{const _0x51153b=_0x34b3e3;if(!$gameTemp[_0x51153b(0x8f3)]())return;if(!Utils['isNwjs']())return;VisuMZ[_0x51153b(0x6db)](_0x34499d,_0x34499d);const _0x3f57ca=_0x34499d[_0x51153b(0x8b7)]||0x1;$gameTemp[_0x51153b(0x8bb)]=_0x3f57ca;}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],'PictureEasingType',_0x47bab0=>{const _0x476697=_0x34b3e3;VisuMZ[_0x476697(0x6db)](_0x47bab0,_0x47bab0);const _0x4428f9=_0x47bab0['pictureId']||0x1,_0x3aa258=_0x47bab0['easingType']||_0x476697(0x4ba),_0x3cf0ec=$gameScreen[_0x476697(0x494)](_0x4428f9);_0x3cf0ec&&_0x3cf0ec['setEasingType'](_0x3aa258);}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],'PictureEraseAll',_0x47fc96=>{const _0x29f094=_0x34b3e3;for(let _0x5bcdec=0x1;_0x5bcdec<=$gameScreen['maxPictures']();_0x5bcdec++){$gameScreen[_0x29f094(0x28b)](_0x5bcdec);}}),PluginManager[_0x34b3e3(0x72b)](pluginData['name'],'PictureEraseRange',_0x565cdb=>{const _0x4e1df1=_0x34b3e3;VisuMZ[_0x4e1df1(0x6db)](_0x565cdb,_0x565cdb);const _0x14e6ab=Math[_0x4e1df1(0x2c1)](_0x565cdb['StartID'],_0x565cdb[_0x4e1df1(0x72e)]),_0x549cd8=Math[_0x4e1df1(0x7ef)](_0x565cdb[_0x4e1df1(0x1a6)],_0x565cdb['EndingID']);for(let _0x273a51=_0x14e6ab;_0x273a51<=_0x549cd8;_0x273a51++){$gameScreen[_0x4e1df1(0x28b)](_0x273a51);}}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x43c),_0xb121ef=>{const _0x1abc8d=_0x34b3e3;VisuMZ['ConvertParams'](_0xb121ef,_0xb121ef);const _0x2c5af8=Math[_0x1abc8d(0x59e)](_0xb121ef[_0x1abc8d(0x8b7)])[_0x1abc8d(0x62e)](0x1,0x64),_0x3996db=-Number(_0xb121ef[_0x1abc8d(0x3b9)]||0x0),_0x40fb22=Math[_0x1abc8d(0x7ef)](_0xb121ef[_0x1abc8d(0x1ac)]||0x0,0x0),_0x9fcce3=_0xb121ef['easingType']||_0x1abc8d(0x4ba),_0xe8cac8=_0xb121ef[_0x1abc8d(0x4c0)],_0x1416d9=$gameScreen[_0x1abc8d(0x494)](_0x2c5af8);if(!_0x1416d9)return;_0x1416d9['changeAnglePlusData'](_0x3996db,_0x40fb22,_0x9fcce3);if(_0xe8cac8){const _0x248653=$gameTemp[_0x1abc8d(0x3ff)]();if(_0x248653)_0x248653[_0x1abc8d(0x44d)](_0x40fb22);}}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x789),_0x59b3e8=>{const _0x5c4fbe=_0x34b3e3;VisuMZ[_0x5c4fbe(0x6db)](_0x59b3e8,_0x59b3e8);const _0x16ee90=Math[_0x5c4fbe(0x59e)](_0x59b3e8[_0x5c4fbe(0x8b7)])[_0x5c4fbe(0x62e)](0x1,0x64),_0x3584f9=-Number(_0x59b3e8['TargetAngle']||0x0),_0xe51182=Math['max'](_0x59b3e8[_0x5c4fbe(0x1ac)]||0x0,0x0),_0x315af4=_0x59b3e8[_0x5c4fbe(0x641)]||_0x5c4fbe(0x4ba),_0x1ee7b4=_0x59b3e8[_0x5c4fbe(0x4c0)],_0x11e974=$gameScreen[_0x5c4fbe(0x494)](_0x16ee90);if(!_0x11e974)return;_0x11e974['setAnglePlusData'](_0x3584f9,_0xe51182,_0x315af4);if(_0x1ee7b4){const _0x492735=$gameTemp['getLastPluginCommandInterpreter']();if(_0x492735)_0x492735[_0x5c4fbe(0x44d)](_0xe51182);}}),PluginManager['registerCommand'](pluginData['name'],'PictureShowIcon',_0x301522=>{const _0x487d97=_0x34b3e3;VisuMZ[_0x487d97(0x6db)](_0x301522,_0x301522);const _0x43e80e=Math['round'](_0x301522[_0x487d97(0x8b7)])['clamp'](0x1,0x64),_0x58f3af=_0x301522[_0x487d97(0x2fb)],_0xce849c=_0x58f3af[_0x487d97(0x748)][_0x487d97(0x62e)](0x0,0x1),_0x46dd6e=Math['round'](_0x58f3af[_0x487d97(0x666)]||0x0),_0x339013=Math[_0x487d97(0x59e)](_0x58f3af[_0x487d97(0x555)]||0x0),_0x5a7a84=Math[_0x487d97(0x59e)](_0x58f3af[_0x487d97(0x3ae)]||0x0),_0x5d3c2a=Math[_0x487d97(0x59e)](_0x58f3af['ScaleY']||0x0),_0xddb10a=Math[_0x487d97(0x59e)](_0x58f3af[_0x487d97(0x62f)])['clamp'](0x0,0xff),_0x3a8ec1=_0x58f3af[_0x487d97(0x45c)],_0x927196=_0x487d97(0x5a6),_0x19b4bb=_0x301522[_0x487d97(0x2a0)]?_0x487d97(0x2a0):_0x487d97(0x5dc),_0x55da60=_0x927196[_0x487d97(0x577)](_0x301522[_0x487d97(0x20e)],_0x19b4bb);$gameScreen[_0x487d97(0x661)](_0x43e80e,_0x55da60,_0xce849c,_0x46dd6e,_0x339013,_0x5a7a84,_0x5d3c2a,_0xddb10a,_0x3a8ec1);}),PluginManager['registerCommand'](pluginData[_0x34b3e3(0x650)],'ScreenShake',_0x137263=>{const _0x344d34=_0x34b3e3;VisuMZ['ConvertParams'](_0x137263,_0x137263);const _0x4f2a60=_0x137263[_0x344d34(0x5fe)]||'random',_0x3e4f35=_0x137263[_0x344d34(0x7eb)][_0x344d34(0x62e)](0x1,0x9),_0x5da909=_0x137263['Speed']['clamp'](0x1,0x9),_0x182565=_0x137263['Duration']||0x1,_0x1a766d=_0x137263[_0x344d34(0x4c0)];$gameScreen[_0x344d34(0x44a)](_0x4f2a60),$gameScreen[_0x344d34(0x521)](_0x3e4f35,_0x5da909,_0x182565);if(_0x1a766d){const _0x50090e=$gameTemp['getLastPluginCommandInterpreter']();if(_0x50090e)_0x50090e[_0x344d34(0x44d)](_0x182565);}}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x64a),_0x11a260=>{const _0x588683=_0x34b3e3;if($gameParty['inBattle']())return;VisuMZ[_0x588683(0x6db)](_0x11a260,_0x11a260);const _0x512b78=_0x11a260[_0x588683(0x14e)],_0x5cc3e6=(_0x11a260[_0x588683(0x6bf)]||0x0)/0x64;for(const _0x247dc6 of _0x512b78){const _0x3a0757=Math[_0x588683(0x544)]()<=_0x5cc3e6;$gameSwitches[_0x588683(0x5cc)](_0x247dc6,_0x3a0757);}}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],'SwitchRandomizeRange',_0x11545f=>{const _0x18e5df=_0x34b3e3;if($gameParty['inBattle']())return;VisuMZ[_0x18e5df(0x6db)](_0x11545f,_0x11545f);const _0x195ebe=Math[_0x18e5df(0x2c1)](_0x11545f[_0x18e5df(0x1a6)],_0x11545f[_0x18e5df(0x72e)]),_0x1739cf=Math[_0x18e5df(0x7ef)](_0x11545f[_0x18e5df(0x1a6)],_0x11545f[_0x18e5df(0x72e)]),_0x330e64=(_0x11545f['Chance']||0x0)/0x64;for(let _0xc14251=_0x195ebe;_0xc14251<=_0x1739cf;_0xc14251++){const _0x57d9d3=Math[_0x18e5df(0x544)]()<=_0x330e64;$gameSwitches['setValue'](_0xc14251,_0x57d9d3);}}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x8a7),_0xd4b271=>{const _0x3b540a=_0x34b3e3;if($gameParty['inBattle']())return;VisuMZ[_0x3b540a(0x6db)](_0xd4b271,_0xd4b271);const _0x267cdb=_0xd4b271['IDs'];for(const _0x27b8a7 of _0x267cdb){const _0x329692=$gameSwitches[_0x3b540a(0x690)](_0x27b8a7);$gameSwitches[_0x3b540a(0x5cc)](_0x27b8a7,!_0x329692);}}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],'SwitchToggleRange',_0x48a634=>{const _0x577752=_0x34b3e3;if($gameParty[_0x577752(0x185)]())return;VisuMZ[_0x577752(0x6db)](_0x48a634,_0x48a634);const _0x35f431=Math[_0x577752(0x2c1)](_0x48a634['StartID'],_0x48a634[_0x577752(0x72e)]),_0x220ca5=Math[_0x577752(0x7ef)](_0x48a634[_0x577752(0x1a6)],_0x48a634[_0x577752(0x72e)]);for(let _0x4ca567=_0x35f431;_0x4ca567<=_0x220ca5;_0x4ca567++){const _0x423b91=$gameSwitches[_0x577752(0x690)](_0x4ca567);$gameSwitches['setValue'](_0x4ca567,!_0x423b91);}}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x732),_0x344b96=>{const _0x2e3d6e=_0x34b3e3;VisuMZ[_0x2e3d6e(0x6db)](_0x344b96,_0x344b96);const _0xa6d798=_0x344b96[_0x2e3d6e(0x443)]||0x1;$gameSystem['setMainFontSize'](_0xa6d798);}),PluginManager['registerCommand'](pluginData['name'],_0x34b3e3(0x35d),_0x516761=>{const _0x3fabd1=_0x34b3e3;if($gameParty[_0x3fabd1(0x185)]())return;VisuMZ[_0x3fabd1(0x6db)](_0x516761,_0x516761);const _0x3ac83e=_0x516761[_0x3fabd1(0x443)];if(_0x3ac83e['match'](/Front/i))$gameSystem[_0x3fabd1(0x2ac)](![]);else _0x3ac83e[_0x3fabd1(0x39c)](/Side/i)?$gameSystem[_0x3fabd1(0x2ac)](!![]):$gameSystem[_0x3fabd1(0x2ac)](!$gameSystem[_0x3fabd1(0x1e6)]());}),PluginManager[_0x34b3e3(0x72b)](pluginData['name'],_0x34b3e3(0x52b),_0x2fe2e1=>{const _0x40e925=_0x34b3e3;if($gameParty[_0x40e925(0x185)]())return;VisuMZ['ConvertParams'](_0x2fe2e1,_0x2fe2e1);const _0x5d8773=[_0x40e925(0x39e),_0x40e925(0x47f),'me','se'];for(const _0x3b47eb of _0x5d8773){const _0x3532db=_0x2fe2e1[_0x3b47eb],_0x5a34b0=_0x40e925(0x71e)[_0x40e925(0x577)](_0x3b47eb);for(const _0x2b8484 of _0x3532db){AudioManager[_0x40e925(0x14f)](_0x5a34b0,_0x2b8484);}}}),PluginManager[_0x34b3e3(0x72b)](pluginData['name'],_0x34b3e3(0x431),_0x45a422=>{const _0x25457e=_0x34b3e3;if($gameParty[_0x25457e(0x185)]())return;VisuMZ[_0x25457e(0x6db)](_0x45a422,_0x45a422);const _0x34c60a=[_0x25457e(0x265),'battlebacks1',_0x25457e(0x429),_0x25457e(0x1dd),_0x25457e(0x6fc),_0x25457e(0x532),_0x25457e(0x64f),_0x25457e(0x655),_0x25457e(0x8eb),_0x25457e(0x4c9),'system',_0x25457e(0x860),_0x25457e(0x313),_0x25457e(0x4ac)];for(const _0x1f0424 of _0x34c60a){const _0x267657=_0x45a422[_0x1f0424],_0x305387=_0x25457e(0x899)[_0x25457e(0x577)](_0x1f0424);for(const _0x367255 of _0x267657){ImageManager[_0x25457e(0x463)](_0x305387,_0x367255);}}}),PluginManager['registerCommand'](pluginData[_0x34b3e3(0x650)],'SystemSetBattleSystem',_0x10f14c=>{const _0x32ff73=_0x34b3e3;if($gameParty[_0x32ff73(0x185)]())return;VisuMZ[_0x32ff73(0x6db)](_0x10f14c,_0x10f14c);const _0x2a9197=_0x10f14c[_0x32ff73(0x443)]['toUpperCase']()[_0x32ff73(0x85f)](),_0x1029f0=VisuMZ[_0x32ff73(0x4d5)][_0x32ff73(0x51e)](_0x2a9197);$gameSystem[_0x32ff73(0x6b0)](_0x1029f0);}),VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x51e)]=function(_0x1bb356){const _0x438929=_0x34b3e3;_0x1bb356=_0x1bb356||_0x438929(0x42a),_0x1bb356=String(_0x1bb356)['toUpperCase']()['trim']();switch(_0x1bb356){case'DTB':return 0x0;case _0x438929(0x22a):return 0x1;case _0x438929(0x32f):return 0x2;case _0x438929(0x89a):if(Imported[_0x438929(0x84a)])return _0x438929(0x89a);break;case'STB':if(Imported['VisuMZ_2_BattleSystemSTB'])return _0x438929(0x709);break;case _0x438929(0x19f):if(Imported[_0x438929(0x6c6)])return _0x438929(0x19f);break;case _0x438929(0x613):if(Imported[_0x438929(0x12f)])return _0x438929(0x613);break;case _0x438929(0x779):if(Imported['VisuMZ_2_BattleSystemOTB'])return'OTB';break;case _0x438929(0x232):if(Imported['VisuMZ_2_BattleSystemETB'])return'ETB';break;case _0x438929(0x4d0):if(Imported[_0x438929(0x131)])return _0x438929(0x4d0);break;}return $dataSystem[_0x438929(0x606)];},PluginManager['registerCommand'](pluginData[_0x34b3e3(0x650)],'SystemSetWindowPadding',_0x2e70ae=>{const _0x5b5d75=_0x34b3e3;VisuMZ[_0x5b5d75(0x6db)](_0x2e70ae,_0x2e70ae);const _0x1e0d81=_0x2e70ae['option']||0x1;$gameSystem[_0x5b5d75(0x462)](_0x1e0d81);}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x44c),_0x9ff87b=>{VisuMZ['ConvertParams'](_0x9ff87b,_0x9ff87b);const _0x4fd9cc=_0x9ff87b['text']||'';$textPopup(_0x4fd9cc);}),PluginManager['registerCommand'](pluginData[_0x34b3e3(0x650)],_0x34b3e3(0x7b6),_0x11c31f=>{const _0x4e93f4=_0x34b3e3;VisuMZ[_0x4e93f4(0x6db)](_0x11c31f,_0x11c31f);const _0x4fbd8a=_0x11c31f['id']||0x1,_0x4a2614=_0x11c31f[_0x4e93f4(0x895)],_0x50ed74=_0x11c31f[_0x4e93f4(0x214)]||0x0;let _0x112278=$gameVariables[_0x4e93f4(0x690)](_0x4fbd8a)||0x0;switch(_0x4a2614){case'=':_0x112278=_0x50ed74;break;case'+':_0x112278+=_0x50ed74;break;case'-':_0x112278-=_0x50ed74;break;case'*':_0x112278*=_0x50ed74;break;case'/':_0x112278/=_0x50ed74;break;case'%':_0x112278%=_0x50ed74;break;}_0x112278=_0x112278||0x0,$gameVariables['setValue'](_0x4fbd8a,_0x112278);}),PluginManager[_0x34b3e3(0x72b)](pluginData[_0x34b3e3(0x650)],'VariableJsBlock',_0x489636=>{const _0x5e3825=_0x34b3e3;VisuMZ[_0x5e3825(0x6db)](_0x489636,_0x489636);const _0x290f0a=_0x489636['id']()||0x1,_0x491e78=_0x489636['operation'],_0x139b30=_0x489636[_0x5e3825(0x214)]()||0x0;let _0x1f6835=$gameVariables[_0x5e3825(0x690)](_0x290f0a)||0x0;switch(_0x491e78){case'=':_0x1f6835=_0x139b30;break;case'+':_0x1f6835+=_0x139b30;break;case'-':_0x1f6835-=_0x139b30;break;case'*':_0x1f6835*=_0x139b30;break;case'/':_0x1f6835/=_0x139b30;break;case'%':_0x1f6835%=_0x139b30;break;}_0x1f6835=_0x1f6835||0x0,$gameVariables['setValue'](_0x290f0a,_0x1f6835);}),VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x4cb)]=Scene_Boot[_0x34b3e3(0x237)]['onDatabaseLoaded'],Scene_Boot[_0x34b3e3(0x237)][_0x34b3e3(0x3d2)]=function(){const _0x3734bb=_0x34b3e3;VisuMZ[_0x3734bb(0x4d5)][_0x3734bb(0x4cb)][_0x3734bb(0x267)](this),this[_0x3734bb(0x414)](),this[_0x3734bb(0x5a9)](),this[_0x3734bb(0x5e9)](),this[_0x3734bb(0x5cd)](),this[_0x3734bb(0x541)](),this['process_VisuMZ_CoreEngine_ControllerButtons'](),VisuMZ[_0x3734bb(0x169)]();},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x141)]={},Scene_Boot[_0x34b3e3(0x237)]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x6ee043=_0x34b3e3,_0x1608d9=[_0x6ee043(0x5ae),_0x6ee043(0x4fd),'ATK',_0x6ee043(0x8b5),_0x6ee043(0x6f9),_0x6ee043(0x825),_0x6ee043(0x4ec),'LUK'],_0x29e5e8=[_0x6ee043(0x8d1),_0x6ee043(0x518),'CRI',_0x6ee043(0x879),_0x6ee043(0x850),_0x6ee043(0x534),'CNT','HRG',_0x6ee043(0x189),'TRG'],_0x457b05=[_0x6ee043(0x7b4),_0x6ee043(0x343),_0x6ee043(0x342),_0x6ee043(0x34f),_0x6ee043(0x42c),'TCR','PDR',_0x6ee043(0x7a0),'FDR',_0x6ee043(0x4d9)],_0x20ab9d=[_0x1608d9,_0x29e5e8,_0x457b05],_0x16c1b5=['Plus','Plus1','Plus2','Max',_0x6ee043(0x844),_0x6ee043(0x2f6),_0x6ee043(0x2ce),'Flat',_0x6ee043(0x684),'Flat2'];for(const _0x46c96a of _0x20ab9d){let _0x1106dc='';if(_0x46c96a===_0x1608d9)_0x1106dc='param';if(_0x46c96a===_0x29e5e8)_0x1106dc='xparam';if(_0x46c96a===_0x457b05)_0x1106dc=_0x6ee043(0x6e5);for(const _0x365dbf of _0x16c1b5){let _0x3a0d04='%1%2'[_0x6ee043(0x577)](_0x1106dc,_0x365dbf);VisuMZ[_0x6ee043(0x4d5)][_0x6ee043(0x141)][_0x3a0d04]=[],VisuMZ['CoreEngine'][_0x6ee043(0x141)][_0x3a0d04+'JS']=[];let _0x34b71c=_0x6ee043(0x391);if([_0x6ee043(0x42b),_0x6ee043(0x828)][_0x6ee043(0x1da)](_0x365dbf))_0x34b71c+=_0x6ee043(0x252);else{if([_0x6ee043(0x78e),_0x6ee043(0x684)][_0x6ee043(0x1da)](_0x365dbf))_0x34b71c+=_0x6ee043(0x385);else{if([_0x6ee043(0x59a),_0x6ee043(0x770)]['includes'](_0x365dbf))_0x34b71c+=_0x6ee043(0x2b9);else{if(_0x365dbf===_0x6ee043(0x672))_0x34b71c+=_0x6ee043(0x333);else{if(_0x365dbf===_0x6ee043(0x2f6))_0x34b71c+='(\x5cd+)([%％])>';else _0x365dbf===_0x6ee043(0x2ce)&&(_0x34b71c+=_0x6ee043(0x6c3));}}}}for(const _0x11149a of _0x46c96a){let _0x411066=_0x365dbf[_0x6ee043(0x7f8)](/[\d+]/g,'')[_0x6ee043(0x515)]();const _0x14af11=_0x34b71c[_0x6ee043(0x577)](_0x11149a,_0x411066);VisuMZ['CoreEngine'][_0x6ee043(0x141)][_0x3a0d04]['push'](new RegExp(_0x14af11,'i'));const _0x1c699b=_0x6ee043(0x6ca)[_0x6ee043(0x577)](_0x11149a,_0x411066);VisuMZ['CoreEngine'][_0x6ee043(0x141)][_0x3a0d04+'JS'][_0x6ee043(0x1b7)](new RegExp(_0x1c699b,'i'));}}}},Scene_Boot[_0x34b3e3(0x237)][_0x34b3e3(0x5a9)]=function(){const _0x41562b=_0x34b3e3;if(VisuMZ[_0x41562b(0x169)])return;},Scene_Boot[_0x34b3e3(0x237)][_0x34b3e3(0x5e9)]=function(){const _0x556284=_0x34b3e3,_0x5a3232=VisuMZ[_0x556284(0x4d5)][_0x556284(0x2fb)];_0x5a3232[_0x556284(0x1f5)][_0x556284(0x7c7)]&&VisuMZ[_0x556284(0x82c)](!![]);_0x5a3232['QoL'][_0x556284(0x54c)]&&(Input[_0x556284(0x5ee)][0x23]=_0x556284(0x4cc),Input[_0x556284(0x5ee)][0x24]=_0x556284(0x5b5));if(_0x5a3232['ButtonAssist']){const _0x25963d=_0x5a3232[_0x556284(0x7ee)];_0x25963d['KeySHIFT']=_0x25963d['KeySHIFT']||_0x556284(0x7ae),_0x25963d[_0x556284(0x412)]=_0x25963d[_0x556284(0x412)]||_0x556284(0x197);}_0x5a3232[_0x556284(0x7bc)][_0x556284(0x530)]&&(Input['keyMapper'][0x57]='up',Input['keyMapper'][0x41]='left',Input[_0x556284(0x5ee)][0x53]='down',Input['keyMapper'][0x44]='right',Input[_0x556284(0x5ee)][0x45]=_0x556284(0x891)),_0x5a3232[_0x556284(0x7bc)]['DashToggleR']&&(Input['keyMapper'][0x52]='dashToggle'),_0x5a3232[_0x556284(0x3a9)][_0x556284(0x484)]=_0x5a3232[_0x556284(0x3a9)][_0x556284(0x484)][_0x556284(0x8ce)](_0x5bb6fb=>_0x5bb6fb['toUpperCase']()['trim']()),_0x5a3232[_0x556284(0x3a9)][_0x556284(0x882)]=_0x5a3232[_0x556284(0x3a9)]['ExtDisplayedParams']['map'](_0x2ca244=>_0x2ca244[_0x556284(0x515)]()[_0x556284(0x85f)]()),_0x5a3232[_0x556284(0x1f5)][_0x556284(0x3d8)]=_0x5a3232[_0x556284(0x1f5)][_0x556284(0x3d8)]??!![],_0x5a3232[_0x556284(0x1f5)][_0x556284(0x48a)]=_0x5a3232[_0x556284(0x1f5)][_0x556284(0x48a)]??!![],_0x5a3232[_0x556284(0x7ee)][_0x556284(0x1f2)]&&VisuMZ['CoreEngine'][_0x556284(0x466)]();},VisuMZ['CoreEngine'][_0x34b3e3(0x466)]=function(){const _0x3d3c9f=_0x34b3e3;let _0x38f0ba=![],_0x45b346=![];for(let _0x3b4ad1 in Input['keyMapper']){const _0x1f398f=Input[_0x3d3c9f(0x5ee)][_0x3b4ad1];if(_0x1f398f===_0x3d3c9f(0x49e))_0x38f0ba=!![];if(_0x1f398f===_0x3d3c9f(0x55a))_0x45b346=!![];if(_0x38f0ba&&_0x45b346)return;}let _0x3deab0='ERROR!\x0a\x0aCore\x20Engine\x20>\x20Plugin\x20Parameters\x20>\x20Button\x20Assist\x20>\x20Split\x20Escape\x0a\x0a';_0x3deab0+=_0x3d3c9f(0x880),_0x3deab0+=_0x3d3c9f(0x27d),_0x3deab0+=_0x3d3c9f(0x377),_0x3deab0+=_0x3d3c9f(0x7f2),alert(_0x3deab0),SceneManager[_0x3d3c9f(0x3ef)]();},Scene_Boot['prototype'][_0x34b3e3(0x5cd)]=function(){const _0x4fd10d=_0x34b3e3;this[_0x4fd10d(0x3aa)]();},Scene_Boot[_0x34b3e3(0x237)][_0x34b3e3(0x3aa)]=function(){const _0x445a51=_0x34b3e3,_0x52fe0e=VisuMZ[_0x445a51(0x4d5)][_0x445a51(0x2fb)][_0x445a51(0x405)];for(const _0x25cb86 of _0x52fe0e){const _0x3c75bb=_0x25cb86[_0x445a51(0x785)][_0x445a51(0x7f8)](/[ ]/g,''),_0x549f5e=_0x25cb86[_0x445a51(0x685)];VisuMZ[_0x445a51(0x4d5)][_0x445a51(0x5bf)](_0x3c75bb,_0x549f5e);}},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x5bf)]=function(_0x60fdca,_0x26b692){const _0x3ea4ee=_0x34b3e3;if(!!window[_0x60fdca]){if($gameTemp[_0x3ea4ee(0x8f3)]())console[_0x3ea4ee(0x79f)](_0x3ea4ee(0x7a7)[_0x3ea4ee(0x577)](_0x60fdca));}const _0x44c9e2='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x3ea4ee(0x577)](_0x60fdca,_0x26b692);window[_0x60fdca]=new Function(_0x44c9e2);},Scene_Boot[_0x34b3e3(0x237)][_0x34b3e3(0x541)]=function(){const _0x415667=_0x34b3e3,_0x47ee56=VisuMZ[_0x415667(0x4d5)][_0x415667(0x2fb)][_0x415667(0x143)];if(!_0x47ee56)return;for(const _0xb5b0bb of _0x47ee56){if(!_0xb5b0bb)continue;VisuMZ[_0x415667(0x4d5)][_0x415667(0x11a)](_0xb5b0bb);}},VisuMZ['CoreEngine'][_0x34b3e3(0x2d7)]={},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x296)]={},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x399)]={},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x4f7)]={},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x11a)]=function(_0xaf150c){const _0x30077e=_0x34b3e3,_0x519d03=_0xaf150c['Abbreviation'],_0x3c3e9e=_0xaf150c[_0x30077e(0x434)],_0x54221f=_0xaf150c[_0x30077e(0x17b)],_0x25e55d=_0xaf150c[_0x30077e(0x5fe)],_0xfe41c9=new Function(_0xaf150c['ValueJS']);VisuMZ[_0x30077e(0x4d5)][_0x30077e(0x2d7)][_0x519d03[_0x30077e(0x515)]()[_0x30077e(0x85f)]()]=_0x3c3e9e,VisuMZ[_0x30077e(0x4d5)][_0x30077e(0x296)][_0x519d03[_0x30077e(0x515)]()[_0x30077e(0x85f)]()]=_0x54221f,VisuMZ[_0x30077e(0x4d5)]['CustomParamType'][_0x519d03[_0x30077e(0x515)]()[_0x30077e(0x85f)]()]=_0x25e55d,VisuMZ[_0x30077e(0x4d5)]['CustomParamAbb'][_0x519d03[_0x30077e(0x515)]()['trim']()]=_0x519d03,Object[_0x30077e(0x3d6)](Game_BattlerBase[_0x30077e(0x237)],_0x519d03,{'get'(){const _0xa7debf=_0x30077e,_0x357b30=_0xfe41c9[_0xa7debf(0x267)](this);return _0x25e55d===_0xa7debf(0x33d)?Math[_0xa7debf(0x59e)](_0x357b30):_0x357b30;}});},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x620)]={},VisuMZ['CoreEngine'][_0x34b3e3(0x713)]={},Scene_Boot['prototype'][_0x34b3e3(0x1de)]=function(){const _0x15d08e=_0x34b3e3,_0x1a82bc=VisuMZ['CoreEngine'][_0x15d08e(0x2fb)]['ControllerButtons'];for(const _0x20231c of _0x1a82bc){const _0xb7623=(_0x20231c['Name']||'')['toLowerCase']()[_0x15d08e(0x85f)](),_0x1c4f6c=(_0x20231c[_0x15d08e(0x72c)]||'')[_0x15d08e(0x309)]()[_0x15d08e(0x85f)]();VisuMZ[_0x15d08e(0x4d5)][_0x15d08e(0x620)][_0xb7623]=_0x20231c,VisuMZ[_0x15d08e(0x4d5)][_0x15d08e(0x713)][_0x1c4f6c]=_0xb7623;}},VisuMZ[_0x34b3e3(0x169)]=function(){const _0x388935=_0x34b3e3;for(const _0x143a75 of $dataActors){if(_0x143a75)VisuMZ[_0x388935(0x5eb)](_0x143a75);}for(const _0xdfe4a9 of $dataClasses){if(_0xdfe4a9)VisuMZ['ParseClassNotetags'](_0xdfe4a9);}for(const _0x4205a9 of $dataSkills){if(_0x4205a9)VisuMZ[_0x388935(0x3db)](_0x4205a9);}for(const _0x459aa9 of $dataItems){if(_0x459aa9)VisuMZ[_0x388935(0x861)](_0x459aa9);}for(const _0x5a794a of $dataWeapons){if(_0x5a794a)VisuMZ[_0x388935(0x725)](_0x5a794a);}for(const _0x477c3c of $dataArmors){if(_0x477c3c)VisuMZ[_0x388935(0x4dc)](_0x477c3c);}for(const _0x53d78 of $dataEnemies){if(_0x53d78)VisuMZ['ParseEnemyNotetags'](_0x53d78);}for(const _0x34b880 of $dataStates){if(_0x34b880)VisuMZ[_0x388935(0x1fb)](_0x34b880);}for(const _0x293507 of $dataTilesets){if(_0x293507)VisuMZ[_0x388935(0x178)](_0x293507);}},VisuMZ[_0x34b3e3(0x5eb)]=function(_0x27a694){},VisuMZ[_0x34b3e3(0x359)]=function(_0x32674a){},VisuMZ[_0x34b3e3(0x3db)]=function(_0x21d857){},VisuMZ['ParseItemNotetags']=function(_0x40c043){},VisuMZ[_0x34b3e3(0x725)]=function(_0x8ad289){},VisuMZ['ParseArmorNotetags']=function(_0xd5287e){},VisuMZ[_0x34b3e3(0x38e)]=function(_0xb7098e){},VisuMZ[_0x34b3e3(0x1fb)]=function(_0x1a4a34){},VisuMZ[_0x34b3e3(0x178)]=function(_0x3f1f3a){},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x5eb)]=VisuMZ['ParseActorNotetags'],VisuMZ[_0x34b3e3(0x5eb)]=function(_0x496065){const _0x18b6cf=_0x34b3e3;VisuMZ[_0x18b6cf(0x4d5)][_0x18b6cf(0x5eb)][_0x18b6cf(0x267)](this,_0x496065);const _0x2c5db4=_0x496065[_0x18b6cf(0x39a)];if(_0x2c5db4[_0x18b6cf(0x39c)](/<MAX LEVEL:[ ](\d+)>/i)){_0x496065['maxLevel']=Number(RegExp['$1']);if(_0x496065[_0x18b6cf(0x542)]===0x0)_0x496065[_0x18b6cf(0x542)]=Number[_0x18b6cf(0x5e0)];}_0x2c5db4[_0x18b6cf(0x39c)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x496065[_0x18b6cf(0x7bb)]=Math[_0x18b6cf(0x2c1)](Number(RegExp['$1']),_0x496065[_0x18b6cf(0x542)]));},VisuMZ['CoreEngine'][_0x34b3e3(0x359)]=VisuMZ[_0x34b3e3(0x359)],VisuMZ[_0x34b3e3(0x359)]=function(_0xe22743){const _0x3da882=_0x34b3e3;VisuMZ[_0x3da882(0x4d5)][_0x3da882(0x359)][_0x3da882(0x267)](this,_0xe22743);if(_0xe22743[_0x3da882(0x38f)])for(const _0x303fce of _0xe22743[_0x3da882(0x38f)]){_0x303fce[_0x3da882(0x39a)][_0x3da882(0x39c)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x303fce[_0x3da882(0x619)]=Math[_0x3da882(0x7ef)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x34b3e3(0x4d5)]['ParseEnemyNotetags']=VisuMZ[_0x34b3e3(0x38e)],VisuMZ[_0x34b3e3(0x38e)]=function(_0x7d4692){const _0x5c4e36=_0x34b3e3;VisuMZ[_0x5c4e36(0x4d5)][_0x5c4e36(0x38e)][_0x5c4e36(0x267)](this,_0x7d4692),_0x7d4692[_0x5c4e36(0x619)]=0x1;const _0x42380a=_0x7d4692['note'];if(_0x42380a['match'](/<LEVEL:[ ](\d+)>/i))_0x7d4692[_0x5c4e36(0x619)]=Number(RegExp['$1']);if(_0x42380a['match'](/<MAXHP:[ ](\d+)>/i))_0x7d4692[_0x5c4e36(0x3c6)][0x0]=Number(RegExp['$1']);if(_0x42380a[_0x5c4e36(0x39c)](/<MAXMP:[ ](\d+)>/i))_0x7d4692[_0x5c4e36(0x3c6)][0x1]=Number(RegExp['$1']);if(_0x42380a[_0x5c4e36(0x39c)](/<ATK:[ ](\d+)>/i))_0x7d4692['params'][0x2]=Number(RegExp['$1']);if(_0x42380a['match'](/<DEF:[ ](\d+)>/i))_0x7d4692['params'][0x3]=Number(RegExp['$1']);if(_0x42380a[_0x5c4e36(0x39c)](/<MAT:[ ](\d+)>/i))_0x7d4692[_0x5c4e36(0x3c6)][0x4]=Number(RegExp['$1']);if(_0x42380a[_0x5c4e36(0x39c)](/<MDF:[ ](\d+)>/i))_0x7d4692[_0x5c4e36(0x3c6)][0x5]=Number(RegExp['$1']);if(_0x42380a[_0x5c4e36(0x39c)](/<AGI:[ ](\d+)>/i))_0x7d4692[_0x5c4e36(0x3c6)][0x6]=Number(RegExp['$1']);if(_0x42380a[_0x5c4e36(0x39c)](/<LUK:[ ](\d+)>/i))_0x7d4692['params'][0x7]=Number(RegExp['$1']);if(_0x42380a[_0x5c4e36(0x39c)](/<EXP:[ ](\d+)>/i))_0x7d4692[_0x5c4e36(0x190)]=Number(RegExp['$1']);if(_0x42380a[_0x5c4e36(0x39c)](/<GOLD:[ ](\d+)>/i))_0x7d4692['gold']=Number(RegExp['$1']);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x191)]=Graphics['_defaultStretchMode'],Graphics[_0x34b3e3(0x571)]=function(){const _0x3adca7=_0x34b3e3;switch(VisuMZ['CoreEngine'][_0x3adca7(0x2fb)][_0x3adca7(0x1f5)][_0x3adca7(0x3ad)]){case _0x3adca7(0x6a5):return!![];case _0x3adca7(0x78b):return![];default:return VisuMZ[_0x3adca7(0x4d5)][_0x3adca7(0x191)]['call'](this);}},VisuMZ['CoreEngine']['Graphics_printError']=Graphics['printError'],Graphics[_0x34b3e3(0x5df)]=function(_0x57f876,_0x472fde,_0x3dcafa=null){const _0x5ecc4b=_0x34b3e3;VisuMZ['CoreEngine'][_0x5ecc4b(0x126)][_0x5ecc4b(0x267)](this,_0x57f876,_0x472fde,_0x3dcafa),VisuMZ['ShowDevTools'](![]);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x7aa)]=Graphics['_centerElement'],Graphics[_0x34b3e3(0x7f4)]=function(_0x55bb60){const _0x159119=_0x34b3e3;VisuMZ[_0x159119(0x4d5)][_0x159119(0x7aa)][_0x159119(0x267)](this,_0x55bb60),this['_centerElementCoreEngine'](_0x55bb60);},Graphics['_centerElementCoreEngine']=function(_0x31eb90){const _0x3a1576=_0x34b3e3;VisuMZ[_0x3a1576(0x4d5)]['Settings'][_0x3a1576(0x1f5)][_0x3a1576(0x277)]&&(_0x31eb90[_0x3a1576(0x2f7)][_0x3a1576(0x4a5)]='none');VisuMZ[_0x3a1576(0x4d5)][_0x3a1576(0x2fb)][_0x3a1576(0x1f5)][_0x3a1576(0x740)]&&(_0x31eb90[_0x3a1576(0x2f7)][_0x3a1576(0x671)]=_0x3a1576(0x5f0));const _0x16b0de=Math[_0x3a1576(0x7ef)](0x0,Math['floor'](_0x31eb90[_0x3a1576(0x4c5)]*this['_realScale'])),_0x5dc1cf=Math[_0x3a1576(0x7ef)](0x0,Math['floor'](_0x31eb90[_0x3a1576(0x5f4)]*this[_0x3a1576(0x275)]));_0x31eb90[_0x3a1576(0x2f7)]['width']=_0x16b0de+'px',_0x31eb90[_0x3a1576(0x2f7)][_0x3a1576(0x5f4)]=_0x5dc1cf+'px';},VisuMZ['CoreEngine'][_0x34b3e3(0x4ea)]=Bitmap[_0x34b3e3(0x237)]['initialize'],Bitmap['prototype'][_0x34b3e3(0x7e8)]=function(_0x3d441b,_0x31d16a){const _0x4e7be0=_0x34b3e3;VisuMZ['CoreEngine'][_0x4e7be0(0x4ea)][_0x4e7be0(0x267)](this,_0x3d441b,_0x31d16a),this[_0x4e7be0(0x547)]=!(VisuMZ[_0x4e7be0(0x4d5)][_0x4e7be0(0x2fb)]['QoL'][_0x4e7be0(0x740)]??!![]);},Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x47e)]=function(){const _0x577edc=_0x34b3e3;this[_0x577edc(0x52d)]=!![];},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x122)]=Sprite['prototype'][_0x34b3e3(0x49f)],Sprite[_0x34b3e3(0x237)][_0x34b3e3(0x49f)]=function(){const _0x2d136e=_0x34b3e3;if(this[_0x2d136e(0x781)])VisuMZ[_0x2d136e(0x4d5)][_0x2d136e(0x122)][_0x2d136e(0x267)](this);this[_0x2d136e(0x8bc)]();},Sprite[_0x34b3e3(0x237)][_0x34b3e3(0x8bc)]=function(){const _0x546607=_0x34b3e3;if(!this[_0x546607(0x401)])return;if(!this[_0x546607(0x401)][_0x546607(0x52d)])return;this['bitmap'][_0x546607(0x6fe)]&&!this['_bitmap'][_0x546607(0x6fe)]['destroyed']&&this['bitmap'][_0x546607(0x49f)]();},VisuMZ[_0x34b3e3(0x4d5)]['Bitmap_resize']=Bitmap['prototype'][_0x34b3e3(0x15d)],Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x15d)]=function(_0x5b2b5e,_0x2beceb){const _0x10f355=_0x34b3e3;VisuMZ[_0x10f355(0x4d5)][_0x10f355(0x7e1)][_0x10f355(0x267)](this,_0x5b2b5e,_0x2beceb),this[_0x10f355(0x47e)]();},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x4df)]=Bitmap['prototype'][_0x34b3e3(0x427)],Bitmap[_0x34b3e3(0x237)]['blt']=function(_0x2f3918,_0x1402ce,_0x575345,_0x1b518a,_0x1c85b1,_0x1a8847,_0x4993d8,_0x1db200,_0x410618){const _0x4f88a7=_0x34b3e3;_0x1402ce=Math[_0x4f88a7(0x59e)](_0x1402ce),_0x575345=Math[_0x4f88a7(0x59e)](_0x575345),_0x1b518a=Math['round'](_0x1b518a),_0x1c85b1=Math[_0x4f88a7(0x59e)](_0x1c85b1),_0x1a8847=Math[_0x4f88a7(0x59e)](_0x1a8847),_0x4993d8=Math[_0x4f88a7(0x59e)](_0x4993d8),VisuMZ['CoreEngine'][_0x4f88a7(0x4df)][_0x4f88a7(0x267)](this,_0x2f3918,_0x1402ce,_0x575345,_0x1b518a,_0x1c85b1,_0x1a8847,_0x4993d8,_0x1db200,_0x410618),this[_0x4f88a7(0x47e)]();},VisuMZ[_0x34b3e3(0x4d5)]['Bitmap_clearRect']=Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x6ac)],Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x6ac)]=function(_0x4b6213,_0x57b3d5,_0x58a802,_0x3c1fab){const _0x5c8f69=_0x34b3e3;VisuMZ[_0x5c8f69(0x4d5)][_0x5c8f69(0x46c)][_0x5c8f69(0x267)](this,_0x4b6213,_0x57b3d5,_0x58a802,_0x3c1fab),this[_0x5c8f69(0x47e)]();},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x8d2)]=Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x6b4)],Bitmap['prototype'][_0x34b3e3(0x6b4)]=function(_0x13a2e5,_0x85b5eb,_0x2d8945,_0x329c1b,_0x211a8a){const _0x478f68=_0x34b3e3;VisuMZ[_0x478f68(0x4d5)][_0x478f68(0x8d2)][_0x478f68(0x267)](this,_0x13a2e5,_0x85b5eb,_0x2d8945,_0x329c1b,_0x211a8a),this[_0x478f68(0x47e)]();},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x224)]=Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x4ef)],Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x4ef)]=function(_0x1bfe16,_0xc25b0f,_0x1eeda9,_0xee23f9,_0x127bfa){const _0x14eb30=_0x34b3e3;VisuMZ['CoreEngine'][_0x14eb30(0x224)][_0x14eb30(0x267)](this,_0x1bfe16,_0xc25b0f,_0x1eeda9,_0xee23f9,_0x127bfa),this[_0x14eb30(0x47e)]();},VisuMZ[_0x34b3e3(0x4d5)]['Bitmap_gradientFillRect']=Bitmap['prototype']['gradientFillRect'],Bitmap['prototype'][_0x34b3e3(0x735)]=function(_0x32e4c9,_0x417cc0,_0x562921,_0x4d019e,_0x5001b9,_0x280275,_0x28ffab){const _0x57570c=_0x34b3e3;VisuMZ[_0x57570c(0x4d5)][_0x57570c(0x459)][_0x57570c(0x267)](this,_0x32e4c9,_0x417cc0,_0x562921,_0x4d019e,_0x5001b9,_0x280275,_0x28ffab),this[_0x57570c(0x47e)]();},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x1f6)]=Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x2d6)],Bitmap['prototype'][_0x34b3e3(0x2d6)]=function(_0x2dbc3b,_0x4cddd4,_0x2b764b,_0x3e79ea){const _0x523403=_0x34b3e3;_0x2dbc3b=Math[_0x523403(0x59e)](_0x2dbc3b),_0x4cddd4=Math['round'](_0x4cddd4),_0x2b764b=Math['round'](_0x2b764b),VisuMZ[_0x523403(0x4d5)][_0x523403(0x1f6)][_0x523403(0x267)](this,_0x2dbc3b,_0x4cddd4,_0x2b764b,_0x3e79ea),this[_0x523403(0x47e)]();},VisuMZ['CoreEngine']['Bitmap_measureTextWidth']=Bitmap['prototype'][_0x34b3e3(0x7b9)],Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x7b9)]=function(_0x5b5dba){const _0xfbd678=_0x34b3e3;return Math['ceil'](VisuMZ[_0xfbd678(0x4d5)][_0xfbd678(0x88e)][_0xfbd678(0x267)](this,_0x5b5dba));},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x456)]=Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x7a9)],Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x7a9)]=function(_0x5794d7,_0x54fc7f,_0x4b902e,_0x388fb0,_0x48b206,_0x3628d4){const _0xb96635=_0x34b3e3;_0x54fc7f=Math[_0xb96635(0x59e)](_0x54fc7f),_0x4b902e=Math[_0xb96635(0x59e)](_0x4b902e),_0x388fb0=Math[_0xb96635(0x1ce)](_0x388fb0),_0x48b206=Math[_0xb96635(0x1ce)](_0x48b206),VisuMZ[_0xb96635(0x4d5)][_0xb96635(0x456)][_0xb96635(0x267)](this,_0x5794d7,_0x54fc7f,_0x4b902e,_0x388fb0,_0x48b206,_0x3628d4),this[_0xb96635(0x47e)]();},VisuMZ['CoreEngine'][_0x34b3e3(0x1b0)]=Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x117)],Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x117)]=function(_0x13620b,_0x1cd5d7,_0x54f3fb,_0x25450f){const _0x1802fe=_0x34b3e3;VisuMZ[_0x1802fe(0x4d5)][_0x1802fe(0x2fb)]['QoL']['FontShadows']?this[_0x1802fe(0x7fc)](_0x13620b,_0x1cd5d7,_0x54f3fb,_0x25450f):VisuMZ[_0x1802fe(0x4d5)][_0x1802fe(0x1b0)]['call'](this,_0x13620b,_0x1cd5d7,_0x54f3fb,_0x25450f);},Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x7fc)]=function(_0x331e3f,_0x4e44c0,_0x2e62e8,_0x27afb0){const _0x593d19=_0x34b3e3,_0x3bf468=this[_0x593d19(0x6f1)];_0x3bf468[_0x593d19(0x248)]=this[_0x593d19(0x264)],_0x3bf468[_0x593d19(0x3dd)](_0x331e3f,_0x4e44c0+0x2,_0x2e62e8+0x2,_0x27afb0);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x675)]=Input[_0x34b3e3(0x2a3)],Input[_0x34b3e3(0x2a3)]=function(){const _0x4dd932=_0x34b3e3;VisuMZ[_0x4dd932(0x4d5)][_0x4dd932(0x675)][_0x4dd932(0x267)](this),this[_0x4dd932(0x6fd)]=undefined,this['_inputSpecialKeyCode']=undefined,this[_0x4dd932(0x14a)]=Input[_0x4dd932(0x8df)];},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x3fb)]=Input[_0x34b3e3(0x6d2)],Input[_0x34b3e3(0x6d2)]=function(){const _0x18aeae=_0x34b3e3;VisuMZ['CoreEngine'][_0x18aeae(0x3fb)][_0x18aeae(0x267)](this);if(this[_0x18aeae(0x14a)])this[_0x18aeae(0x14a)]--;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2bd)]=Input[_0x34b3e3(0x8ed)],Input[_0x34b3e3(0x8ed)]=function(){const _0xe4f1fe=_0x34b3e3;if(this[_0xe4f1fe(0x14a)])return;VisuMZ[_0xe4f1fe(0x4d5)][_0xe4f1fe(0x2bd)][_0xe4f1fe(0x267)](this);},VisuMZ[_0x34b3e3(0x4d5)]['Input_setupEventHandlers']=Input['_setupEventHandlers'],Input['_setupEventHandlers']=function(){const _0x471aee=_0x34b3e3;VisuMZ[_0x471aee(0x4d5)]['Input_setupEventHandlers'][_0x471aee(0x267)](this),document[_0x471aee(0x776)]('keypress',this[_0x471aee(0x4a1)][_0x471aee(0x2da)](this));},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x7e5)]=Input[_0x34b3e3(0x18e)],Input[_0x34b3e3(0x18e)]=function(_0x48ad23){const _0x2740c6=_0x34b3e3;this[_0x2740c6(0x71f)]=_0x48ad23[_0x2740c6(0x6a3)],VisuMZ[_0x2740c6(0x4d5)]['Input_onKeyDown'][_0x2740c6(0x267)](this,_0x48ad23),this[_0x2740c6(0x120)](null);},Input[_0x34b3e3(0x4a1)]=function(_0x1bf90b){const _0x4162f7=_0x34b3e3;this[_0x4162f7(0x28e)](_0x1bf90b);},Input[_0x34b3e3(0x28e)]=function(_0x3b546c){const _0x9ec699=_0x34b3e3;this[_0x9ec699(0x71f)]=_0x3b546c[_0x9ec699(0x6a3)];let _0x32f4d5=String['fromCharCode'](_0x3b546c[_0x9ec699(0x848)]);this['_inputString']===undefined?this[_0x9ec699(0x6fd)]=_0x32f4d5:this['_inputString']+=_0x32f4d5;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x63d)]=Input['_shouldPreventDefault'],Input['_shouldPreventDefault']=function(_0xea336b){const _0x104364=_0x34b3e3;if(_0xea336b===0x8)return![];return VisuMZ[_0x104364(0x4d5)]['Input_shouldPreventDefault'][_0x104364(0x267)](this,_0xea336b);},Input[_0x34b3e3(0x6ce)]=function(_0x350975){const _0x2bc799=_0x34b3e3;if(_0x350975[_0x2bc799(0x39c)](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x350975['match'](/enter/i))return this[_0x2bc799(0x71f)]===0xd;if(_0x350975['match'](/escape/i))return this[_0x2bc799(0x71f)]===0x1b;},Input[_0x34b3e3(0x815)]=function(){const _0x4109e8=_0x34b3e3;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x4109e8(0x71f)]);},Input[_0x34b3e3(0x56a)]=function(){const _0x28376a=_0x34b3e3;return[0x25,0x26,0x27,0x28][_0x28376a(0x221)](this[_0x28376a(0x71f)]);},Input[_0x34b3e3(0x15e)]=function(){const _0x517ce9=_0x34b3e3;if(navigator[_0x517ce9(0x70c)]){const _0x4c8a44=navigator[_0x517ce9(0x70c)]();if(_0x4c8a44)for(const _0x3ef271 of _0x4c8a44){if(_0x3ef271&&_0x3ef271[_0x517ce9(0x6c8)])return!![];}}return![];},Input[_0x34b3e3(0x328)]=function(){const _0x1ea292=_0x34b3e3;if(navigator[_0x1ea292(0x70c)]){const _0xfa35ac=navigator[_0x1ea292(0x70c)]();if(_0xfa35ac)for(const _0x481b77 of _0xfa35ac){if(_0x481b77&&_0x481b77[_0x1ea292(0x6c8)]){if(this[_0x1ea292(0x894)](_0x481b77))return!![];if(this[_0x1ea292(0x19b)](_0x481b77))return!![];}}}return![];},Input[_0x34b3e3(0x894)]=function(_0x3798de){const _0x4324bb=_0x34b3e3,_0x18664e=_0x3798de[_0x4324bb(0x8e0)];for(let _0x4989de=0x0;_0x4989de<_0x18664e[_0x4324bb(0x1ee)];_0x4989de++){if(_0x18664e[_0x4989de][_0x4324bb(0x76e)])return!![];}return![];},Input[_0x34b3e3(0x19b)]=function(_0x264ceb){const _0x1aff00=_0x264ceb['axes'],_0x368990=0.5;if(_0x1aff00[0x0]<-_0x368990)return!![];if(_0x1aff00[0x0]>_0x368990)return!![];if(_0x1aff00[0x1]<-_0x368990)return!![];if(_0x1aff00[0x1]>_0x368990)return!![];return![];},Input['getLastGamepadUsed']=function(){const _0x1bc63a=_0x34b3e3;return this[_0x1bc63a(0x3b4)]||null;},Input[_0x34b3e3(0x120)]=function(_0xee0326){const _0x303c7f=_0x34b3e3;this[_0x303c7f(0x3b4)]=_0xee0326;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x127)]=Input['_updateGamepadState'],Input[_0x34b3e3(0x57b)]=function(_0x3972f2){const _0x366b47=_0x34b3e3;VisuMZ['CoreEngine']['Input_updateGamepadState'][_0x366b47(0x267)](this,_0x3972f2),(this[_0x366b47(0x894)](_0x3972f2)||this[_0x366b47(0x19b)](_0x3972f2))&&this[_0x366b47(0x120)](_0x3972f2);},Input[_0x34b3e3(0x4e8)]=function(){const _0x4ff95d=_0x34b3e3;return this[_0x4ff95d(0x3b4)]?this[_0x4ff95d(0x3b4)]['id']:_0x4ff95d(0x8aa);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x74f)]=Tilemap[_0x34b3e3(0x237)][_0x34b3e3(0x78f)],Tilemap[_0x34b3e3(0x237)]['_addShadow']=function(_0x1d9a84,_0x7a8ee7,_0x4ec98d,_0x4b580c){const _0x3d1c4f=_0x34b3e3;if($gameMap&&$gameMap[_0x3d1c4f(0x4d8)]())return;VisuMZ['CoreEngine']['Tilemap_addShadow'][_0x3d1c4f(0x267)](this,_0x1d9a84,_0x7a8ee7,_0x4ec98d,_0x4b580c);},Tilemap[_0x34b3e3(0x1bd)]['prototype'][_0x34b3e3(0x7e9)]=function(){const _0xcbca56=_0x34b3e3;this[_0xcbca56(0x67c)]();for(let _0x2d05b3=0x0;_0x2d05b3<Tilemap[_0xcbca56(0x25b)]['MAX_GL_TEXTURES'];_0x2d05b3++){const _0x4c86b9=new PIXI[(_0xcbca56(0x1e9))]();_0x4c86b9[_0xcbca56(0x2bc)](0x800,0x800),VisuMZ[_0xcbca56(0x4d5)]['Settings'][_0xcbca56(0x1f5)][_0xcbca56(0x740)]&&(_0x4c86b9[_0xcbca56(0x1b6)]=PIXI[_0xcbca56(0x2c3)]['NEAREST']),this[_0xcbca56(0x260)][_0xcbca56(0x1b7)](_0x4c86b9);}},WindowLayer['prototype'][_0x34b3e3(0x4b9)]=function(){const _0x5adedb=_0x34b3e3;return SceneManager&&SceneManager[_0x5adedb(0x44b)]?SceneManager[_0x5adedb(0x44b)][_0x5adedb(0x11c)]():!![];},VisuMZ[_0x34b3e3(0x4d5)]['WindowLayer_render']=WindowLayer['prototype'][_0x34b3e3(0x238)],WindowLayer[_0x34b3e3(0x237)][_0x34b3e3(0x238)]=function render(_0x3e8f56){const _0x47af01=_0x34b3e3;this['isMaskingEnabled']()?VisuMZ[_0x47af01(0x4d5)][_0x47af01(0x6ec)][_0x47af01(0x267)](this,_0x3e8f56):this[_0x47af01(0x168)](_0x3e8f56);},WindowLayer['prototype'][_0x34b3e3(0x168)]=function render(_0x52fafd){const _0x17f8e8=_0x34b3e3;if(!this[_0x17f8e8(0x2d8)])return;const _0x2f4ca7=new PIXI[(_0x17f8e8(0x5a5))](),_0x54d688=_0x52fafd['gl'],_0x2fad69=this['children']['clone']();_0x52fafd[_0x17f8e8(0x7dd)][_0x17f8e8(0x43b)](),_0x2f4ca7['transform']=this[_0x17f8e8(0x750)],_0x52fafd[_0x17f8e8(0x25a)][_0x17f8e8(0x85a)](),_0x54d688[_0x17f8e8(0x8a4)](_0x54d688['STENCIL_TEST']);while(_0x2fad69[_0x17f8e8(0x1ee)]>0x0){const _0x287a52=_0x2fad69[_0x17f8e8(0x778)]();_0x287a52['_isWindow']&&_0x287a52[_0x17f8e8(0x2d8)]&&_0x287a52[_0x17f8e8(0x165)]>0x0&&(_0x54d688['stencilFunc'](_0x54d688['EQUAL'],0x0,~0x0),_0x54d688[_0x17f8e8(0x89d)](_0x54d688[_0x17f8e8(0x38c)],_0x54d688[_0x17f8e8(0x38c)],_0x54d688[_0x17f8e8(0x38c)]),_0x287a52[_0x17f8e8(0x238)](_0x52fafd),_0x52fafd[_0x17f8e8(0x25a)][_0x17f8e8(0x85a)](),_0x2f4ca7[_0x17f8e8(0x2a3)](),_0x54d688[_0x17f8e8(0x2c4)](_0x54d688[_0x17f8e8(0x76c)],0x1,~0x0),_0x54d688[_0x17f8e8(0x89d)](_0x54d688[_0x17f8e8(0x754)],_0x54d688['REPLACE'],_0x54d688['REPLACE']),_0x54d688[_0x17f8e8(0x6d9)](_0x54d688[_0x17f8e8(0x306)],_0x54d688[_0x17f8e8(0x156)]),_0x2f4ca7['render'](_0x52fafd),_0x52fafd[_0x17f8e8(0x25a)][_0x17f8e8(0x85a)](),_0x54d688[_0x17f8e8(0x6d9)](_0x54d688[_0x17f8e8(0x156)],_0x54d688[_0x17f8e8(0x76d)]));}_0x54d688['disable'](_0x54d688['STENCIL_TEST']),_0x54d688['clear'](_0x54d688[_0x17f8e8(0x703)]),_0x54d688['clearStencil'](0x0),_0x52fafd['batch']['flush']();for(const _0x2fd021 of this[_0x17f8e8(0x130)]){!_0x2fd021['_isWindow']&&_0x2fd021[_0x17f8e8(0x2d8)]&&_0x2fd021[_0x17f8e8(0x238)](_0x52fafd);}_0x52fafd[_0x17f8e8(0x25a)][_0x17f8e8(0x85a)]();},DataManager[_0x34b3e3(0x29f)]=function(_0x302569){const _0x378256=_0x34b3e3;return this[_0x378256(0x3f1)](_0x302569)&&_0x302569[_0x378256(0x150)]===0x2;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x4be)]=DataManager[_0x34b3e3(0x643)],DataManager[_0x34b3e3(0x643)]=function(){const _0x4172cf=_0x34b3e3;VisuMZ[_0x4172cf(0x4d5)][_0x4172cf(0x4be)]['call'](this),this[_0x4172cf(0x45f)](),this[_0x4172cf(0x6bd)]();},DataManager[_0x34b3e3(0x45f)]=function(){const _0x1e5476=_0x34b3e3;if($gameTemp[_0x1e5476(0x8f3)]()){const _0x1b64c5=VisuMZ[_0x1e5476(0x4d5)][_0x1e5476(0x2fb)][_0x1e5476(0x1f5)]['NewGameCommonEvent'];if(_0x1b64c5>0x0)$gameTemp[_0x1e5476(0x602)](_0x1b64c5);}},DataManager[_0x34b3e3(0x6bd)]=function(){const _0x40e02a=_0x34b3e3,_0x26aa9a=VisuMZ[_0x40e02a(0x4d5)][_0x40e02a(0x2fb)][_0x40e02a(0x1f5)][_0x40e02a(0x7e6)]||0x0;if(_0x26aa9a>0x0)$gameTemp[_0x40e02a(0x602)](_0x26aa9a);},DataManager[_0x34b3e3(0x3e0)]=function(_0x4acb2f){const _0x48fc91=_0x34b3e3,_0x541699=$dataTroops[_0x4acb2f];if(!_0x541699)return'';let _0x534172='';_0x534172+=_0x541699[_0x48fc91(0x650)];for(const _0x58708f of _0x541699[_0x48fc91(0x19c)]){for(const _0x3642c3 of _0x58708f[_0x48fc91(0x710)]){[0x6c,0x198][_0x48fc91(0x1da)](_0x3642c3[_0x48fc91(0x36e)])&&(_0x534172+='\x0a',_0x534172+=_0x3642c3[_0x48fc91(0x7e2)][0x0]);}}return _0x534172;};(VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)][_0x34b3e3(0x1f5)][_0x34b3e3(0x2ba)]??!![])&&($scene=null,VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x4aa)]=Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x3d7)],Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x3d7)]=function(){const _0x4d2231=_0x34b3e3;VisuMZ['CoreEngine'][_0x4d2231(0x4aa)][_0x4d2231(0x267)](this),$scene=this;},$spriteset=null,VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x6de)]=Scene_Map[_0x34b3e3(0x237)]['createSpriteset'],Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x701)]=function(){const _0x477314=_0x34b3e3;VisuMZ['CoreEngine'][_0x477314(0x6de)][_0x477314(0x267)](this),$spriteset=this['_spriteset'];},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x388)]=Scene_Battle[_0x34b3e3(0x237)][_0x34b3e3(0x701)],Scene_Battle[_0x34b3e3(0x237)][_0x34b3e3(0x701)]=function(){const _0x1c17c8=_0x34b3e3;VisuMZ['CoreEngine'][_0x1c17c8(0x388)][_0x1c17c8(0x267)](this),$spriteset=this[_0x1c17c8(0x5b8)];},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x7bd)]=Scene_Base[_0x34b3e3(0x237)]['terminate'],Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x5f8)]=function(){const _0x45dbcf=_0x34b3e3;VisuMZ[_0x45dbcf(0x4d5)][_0x45dbcf(0x7bd)][_0x45dbcf(0x267)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ['CoreEngine'][_0x34b3e3(0x287)]=BattleManager[_0x34b3e3(0x6d2)],BattleManager[_0x34b3e3(0x6d2)]=function(_0x3cfe05){const _0x67cb8c=_0x34b3e3;VisuMZ[_0x67cb8c(0x4d5)][_0x67cb8c(0x287)][_0x67cb8c(0x267)](this,_0x3cfe05),this[_0x67cb8c(0x74b)]();},BattleManager[_0x34b3e3(0x74b)]=function(){const _0x3d00b0=_0x34b3e3;$subject=this[_0x3d00b0(0x39f)],$targets=this[_0x3d00b0(0x6dc)],$target=this[_0x3d00b0(0x331)]||this[_0x3d00b0(0x6dc)][0x0];},$event=null,VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x70e)]=Game_Event[_0x34b3e3(0x237)][_0x34b3e3(0x24a)],Game_Event[_0x34b3e3(0x237)]['start']=function(){const _0x22de0f=_0x34b3e3;VisuMZ['CoreEngine'][_0x22de0f(0x70e)][_0x22de0f(0x267)](this),$event=this;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2cd)]=Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x6d2)],Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x6d2)]=function(){const _0x233ab6=_0x34b3e3;VisuMZ[_0x233ab6(0x4d5)][_0x233ab6(0x2cd)][_0x233ab6(0x267)](this),$gameMap[_0x233ab6(0x27f)]();},Game_Map[_0x34b3e3(0x237)]['updateCurrentEvent']=function(){const _0x12db9b=_0x34b3e3;!this[_0x12db9b(0x50f)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x2fd37e){const _0x1419c0=_0x34b3e3;if($gameTemp)$gameTemp[_0x1419c0(0x602)](_0x2fd37e);});;$onceParallel=function(_0x1e0c49,_0x24c5e8){const _0x1de14f=_0x34b3e3;if(SceneManager[_0x1de14f(0x5b1)]())SceneManager[_0x1de14f(0x44b)][_0x1de14f(0x69b)](_0x1e0c49,_0x24c5e8);else{if(SceneManager[_0x1de14f(0x686)]()){if(Imported['VisuMZ_1_BattleCore'])SceneManager[_0x1de14f(0x44b)][_0x1de14f(0x69b)](_0x1e0c49);else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x1de14f(0x223));}else $gameTemp&&$gameTemp[_0x1de14f(0x8f3)]()&&alert(_0x1de14f(0x2ae));}},StorageManager[_0x34b3e3(0x41b)]=function(_0x260a23){return new Promise((_0x269cb7,_0x30c154)=>{const _0x4fe5ad=_0x2daf;try{const _0x98ab8=pako[_0x4fe5ad(0x2d9)](_0x260a23,{'to':'string','level':0x1});if(_0x98ab8['length']>=0xc350){}_0x269cb7(_0x98ab8);}catch(_0x4ab739){_0x30c154(_0x4ab739);}});},TextManager[_0x34b3e3(0x5d7)]=['','','',_0x34b3e3(0x43d),'','',_0x34b3e3(0x662),'',_0x34b3e3(0x16e),_0x34b3e3(0x5b4),'','','CLEAR','ENTER',_0x34b3e3(0x652),'',_0x34b3e3(0x1d3),_0x34b3e3(0x6d7),'ALT',_0x34b3e3(0x5a4),_0x34b3e3(0x279),'KANA',_0x34b3e3(0x86e),_0x34b3e3(0x250),'FINAL',_0x34b3e3(0x50e),'','ESC','CONVERT',_0x34b3e3(0x5ed),'ACCEPT',_0x34b3e3(0x7d5),_0x34b3e3(0x5d8),_0x34b3e3(0x297),_0x34b3e3(0x603),'END',_0x34b3e3(0x8d4),_0x34b3e3(0x33c),'UP',_0x34b3e3(0x24e),_0x34b3e3(0x2d4),_0x34b3e3(0x570),_0x34b3e3(0x5b9),_0x34b3e3(0x897),_0x34b3e3(0x226),_0x34b3e3(0x7d2),'DELETE','','0','1','2','3','4','5','6','7','8','9','COLON',_0x34b3e3(0x186),'LESS_THAN',_0x34b3e3(0x125),'GREATER_THAN','QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0x34b3e3(0x167),'',_0x34b3e3(0x283),_0x34b3e3(0x61c),_0x34b3e3(0x537),_0x34b3e3(0x86d),_0x34b3e3(0x455),_0x34b3e3(0x574),'NUMPAD5',_0x34b3e3(0x166),'NUMPAD7','NUMPAD8',_0x34b3e3(0x3e4),_0x34b3e3(0x467),_0x34b3e3(0x795),_0x34b3e3(0x2c7),_0x34b3e3(0x85b),_0x34b3e3(0x81d),_0x34b3e3(0x5ac),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x34b3e3(0x605),_0x34b3e3(0x37f),_0x34b3e3(0x269),'F14',_0x34b3e3(0x29d),'F16','F17',_0x34b3e3(0x18f),_0x34b3e3(0x59c),'F20',_0x34b3e3(0x87d),_0x34b3e3(0x550),_0x34b3e3(0x5b3),_0x34b3e3(0x854),'','','','','','','','',_0x34b3e3(0x8c3),_0x34b3e3(0x796),'WIN_OEM_FJ_JISHO',_0x34b3e3(0x1e8),_0x34b3e3(0x311),_0x34b3e3(0x2d1),_0x34b3e3(0x5b7),'','','','','','','','','',_0x34b3e3(0x656),'EXCLAMATION',_0x34b3e3(0x2a4),_0x34b3e3(0x310),_0x34b3e3(0x607),_0x34b3e3(0x425),'AMPERSAND',_0x34b3e3(0x688),'OPEN_PAREN',_0x34b3e3(0x46a),'ASTERISK',_0x34b3e3(0x32e),'PIPE',_0x34b3e3(0x4b1),'OPEN_CURLY_BRACKET',_0x34b3e3(0x35a),_0x34b3e3(0x4b2),'','','','',_0x34b3e3(0x227),'VOLUME_DOWN',_0x34b3e3(0x390),'','','SEMICOLON',_0x34b3e3(0x125),_0x34b3e3(0x1b2),'MINUS',_0x34b3e3(0x6ae),'SLASH',_0x34b3e3(0x5e3),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x34b3e3(0x281),_0x34b3e3(0x5b2),_0x34b3e3(0x5ce),'QUOTE','',_0x34b3e3(0x124),_0x34b3e3(0x305),'',_0x34b3e3(0x8bf),_0x34b3e3(0x115),'','WIN_ICO_CLEAR','','',_0x34b3e3(0x582),_0x34b3e3(0x6f3),_0x34b3e3(0x7d6),_0x34b3e3(0x533),_0x34b3e3(0x4c4),'WIN_OEM_WSCTRL',_0x34b3e3(0x814),_0x34b3e3(0x437),_0x34b3e3(0x881),_0x34b3e3(0x253),'WIN_OEM_AUTO',_0x34b3e3(0x623),'WIN_OEM_BACKTAB',_0x34b3e3(0x4d3),'CRSEL',_0x34b3e3(0x818),_0x34b3e3(0x1ca),'PLAY','ZOOM','',_0x34b3e3(0x66c),_0x34b3e3(0x13e),''],TextManager[_0x34b3e3(0x2be)]=VisuMZ[_0x34b3e3(0x4d5)]['Settings'][_0x34b3e3(0x7ee)][_0x34b3e3(0x832)],TextManager[_0x34b3e3(0x8fd)]=VisuMZ['CoreEngine'][_0x34b3e3(0x2fb)][_0x34b3e3(0x7ee)][_0x34b3e3(0x247)],TextManager[_0x34b3e3(0x19a)]=VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)]['ButtonAssist'][_0x34b3e3(0x386)],VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x8c4)]=TextManager[_0x34b3e3(0x673)],TextManager[_0x34b3e3(0x673)]=function(_0x29acc8){const _0x10e2d1=_0x34b3e3;return typeof _0x29acc8==='number'?VisuMZ['CoreEngine'][_0x10e2d1(0x8c4)][_0x10e2d1(0x267)](this,_0x29acc8):this[_0x10e2d1(0x1e1)](_0x29acc8);},TextManager['paramName']=function(_0xeae8c5){const _0xca09d3=_0x34b3e3;_0xeae8c5=String(_0xeae8c5||'')[_0xca09d3(0x515)]();const _0x127cd5=VisuMZ[_0xca09d3(0x4d5)][_0xca09d3(0x2fb)]['Param'];if(_0xeae8c5===_0xca09d3(0x5ae))return $dataSystem[_0xca09d3(0x145)][_0xca09d3(0x3c6)][0x0];if(_0xeae8c5===_0xca09d3(0x4fd))return $dataSystem[_0xca09d3(0x145)][_0xca09d3(0x3c6)][0x1];if(_0xeae8c5===_0xca09d3(0x452))return $dataSystem['terms'][_0xca09d3(0x3c6)][0x2];if(_0xeae8c5==='DEF')return $dataSystem[_0xca09d3(0x145)]['params'][0x3];if(_0xeae8c5===_0xca09d3(0x6f9))return $dataSystem[_0xca09d3(0x145)][_0xca09d3(0x3c6)][0x4];if(_0xeae8c5==='MDF')return $dataSystem[_0xca09d3(0x145)]['params'][0x5];if(_0xeae8c5===_0xca09d3(0x4ec))return $dataSystem[_0xca09d3(0x145)]['params'][0x6];if(_0xeae8c5===_0xca09d3(0x2a1))return $dataSystem[_0xca09d3(0x145)]['params'][0x7];if(_0xeae8c5==='HIT')return _0x127cd5['XParamVocab0'];if(_0xeae8c5===_0xca09d3(0x518))return _0x127cd5['XParamVocab1'];if(_0xeae8c5==='CRI')return _0x127cd5[_0xca09d3(0x687)];if(_0xeae8c5===_0xca09d3(0x879))return _0x127cd5[_0xca09d3(0x30c)];if(_0xeae8c5===_0xca09d3(0x850))return _0x127cd5['XParamVocab4'];if(_0xeae8c5===_0xca09d3(0x534))return _0x127cd5[_0xca09d3(0x8cd)];if(_0xeae8c5===_0xca09d3(0x2a9))return _0x127cd5['XParamVocab6'];if(_0xeae8c5==='HRG')return _0x127cd5['XParamVocab7'];if(_0xeae8c5===_0xca09d3(0x189))return _0x127cd5['XParamVocab8'];if(_0xeae8c5==='TRG')return _0x127cd5[_0xca09d3(0x3cf)];if(_0xeae8c5===_0xca09d3(0x7b4))return _0x127cd5['SParamVocab0'];if(_0xeae8c5===_0xca09d3(0x343))return _0x127cd5['SParamVocab1'];if(_0xeae8c5===_0xca09d3(0x342))return _0x127cd5[_0xca09d3(0x73c)];if(_0xeae8c5==='PHA')return _0x127cd5[_0xca09d3(0x67e)];if(_0xeae8c5===_0xca09d3(0x42c))return _0x127cd5[_0xca09d3(0x3a6)];if(_0xeae8c5==='TCR')return _0x127cd5['SParamVocab5'];if(_0xeae8c5===_0xca09d3(0x5d2))return _0x127cd5[_0xca09d3(0x589)];if(_0xeae8c5===_0xca09d3(0x7a0))return _0x127cd5[_0xca09d3(0x468)];if(_0xeae8c5===_0xca09d3(0x1db))return _0x127cd5[_0xca09d3(0x695)];if(_0xeae8c5===_0xca09d3(0x4d9))return _0x127cd5[_0xca09d3(0x7d3)];if(VisuMZ[_0xca09d3(0x4d5)][_0xca09d3(0x2d7)][_0xeae8c5])return VisuMZ[_0xca09d3(0x4d5)][_0xca09d3(0x2d7)][_0xeae8c5];return'';},TextManager[_0x34b3e3(0x525)]=function(_0x3720f2){const _0x32f10e=_0x34b3e3,_0x7929bd=Input[_0x32f10e(0x4e8)]();return _0x7929bd==='Keyboard'?this[_0x32f10e(0x43f)](_0x3720f2):this[_0x32f10e(0x3eb)](_0x7929bd,_0x3720f2);},TextManager[_0x34b3e3(0x43f)]=function(_0x566793){const _0x52a916=_0x34b3e3;let _0x22fdf3=VisuMZ[_0x52a916(0x4d5)][_0x52a916(0x2fb)][_0x52a916(0x7ee)]['SplitEscape'];if(!_0x22fdf3){if(_0x566793===_0x52a916(0x55a))_0x566793=_0x52a916(0x7f1);if(_0x566793===_0x52a916(0x49e))_0x566793=_0x52a916(0x7f1);}let _0x78025a=[];for(let _0x229678 in Input[_0x52a916(0x5ee)]){_0x229678=Number(_0x229678);if(_0x229678>=0x60&&_0x229678<=0x69)continue;if([0x12,0x20]['includes'](_0x229678))continue;_0x566793===Input[_0x52a916(0x5ee)][_0x229678]&&_0x78025a[_0x52a916(0x1b7)](_0x229678);}for(let _0x23283d=0x0;_0x23283d<_0x78025a[_0x52a916(0x1ee)];_0x23283d++){_0x78025a[_0x23283d]=TextManager[_0x52a916(0x5d7)][_0x78025a[_0x23283d]];}return this[_0x52a916(0x75d)](_0x78025a);},TextManager[_0x34b3e3(0x75d)]=function(_0x23e365){const _0x5e9254=_0x34b3e3,_0x1333a9=VisuMZ[_0x5e9254(0x4d5)][_0x5e9254(0x2fb)][_0x5e9254(0x7ee)],_0x303026=_0x1333a9[_0x5e9254(0x3cd)];let _0x330acd='';if(_0x23e365['includes']('UP'))_0x330acd='UP';else{if(_0x23e365['includes'](_0x5e9254(0x2d4)))_0x330acd=_0x5e9254(0x2d4);else{if(_0x23e365[_0x5e9254(0x1da)](_0x5e9254(0x33c)))_0x330acd=_0x5e9254(0x33c);else _0x23e365['includes']('RIGHT')?_0x330acd=_0x5e9254(0x24e):_0x330acd=_0x23e365['pop']();}}const _0x12fea6='Key%1'[_0x5e9254(0x577)](_0x330acd);return _0x1333a9[_0x12fea6]?_0x1333a9[_0x12fea6]:_0x303026['format'](_0x330acd);},TextManager['getInputMultiButtonStrings']=function(_0x6dda7f,_0x5377ee){const _0x1e906c=_0x34b3e3,_0x2aa2a2=VisuMZ[_0x1e906c(0x4d5)][_0x1e906c(0x2fb)]['ButtonAssist'],_0x572bdb=_0x2aa2a2[_0x1e906c(0x4c3)],_0xe260c6=this[_0x1e906c(0x525)](_0x6dda7f),_0x2c5206=this[_0x1e906c(0x525)](_0x5377ee);return _0x572bdb[_0x1e906c(0x577)](_0xe260c6,_0x2c5206);},TextManager[_0x34b3e3(0x3eb)]=function(_0x14b7fb,_0xa805a9){const _0x33ffaf=_0x34b3e3,_0x8a364e=_0x14b7fb['toLowerCase']()[_0x33ffaf(0x85f)](),_0x590bc9=VisuMZ[_0x33ffaf(0x4d5)][_0x33ffaf(0x620)][_0x8a364e];if(!_0x590bc9)return this[_0x33ffaf(0x36a)](_0x14b7fb,_0xa805a9);return _0x590bc9[_0xa805a9]||this[_0x33ffaf(0x43f)](_0x14b7fb,_0xa805a9);},TextManager[_0x34b3e3(0x36a)]=function(_0x488478,_0x51f410){const _0x191eec=_0x34b3e3,_0x9d8e0c=_0x488478[_0x191eec(0x309)]()['trim']();for(const _0xa462b1 in VisuMZ[_0x191eec(0x4d5)][_0x191eec(0x713)]){if(_0x9d8e0c[_0x191eec(0x1da)](_0xa462b1)){const _0x1c3559=VisuMZ[_0x191eec(0x4d5)][_0x191eec(0x713)][_0xa462b1],_0x134d4e=VisuMZ[_0x191eec(0x4d5)][_0x191eec(0x620)][_0x1c3559];return _0x134d4e[_0x51f410]||this[_0x191eec(0x43f)](_0x51f410);}}return this[_0x191eec(0x43f)](_0x51f410);},VisuMZ[_0x34b3e3(0x4d5)]['ColorManager_loadWindowskin']=ColorManager[_0x34b3e3(0x2cb)],ColorManager[_0x34b3e3(0x2cb)]=function(){const _0x510ebd=_0x34b3e3;VisuMZ[_0x510ebd(0x4d5)]['ColorManager_loadWindowskin'][_0x510ebd(0x267)](this),this[_0x510ebd(0x85d)]=this['_colorCache']||{};},ColorManager[_0x34b3e3(0x40d)]=function(_0x27f5eb,_0x4a3cb8){const _0x52ca17=_0x34b3e3;return _0x4a3cb8=String(_0x4a3cb8),this[_0x52ca17(0x85d)]=this[_0x52ca17(0x85d)]||{},_0x4a3cb8[_0x52ca17(0x39c)](/#(.*)/i)?this['_colorCache'][_0x27f5eb]=_0x52ca17(0x209)['format'](String(RegExp['$1'])):this[_0x52ca17(0x85d)][_0x27f5eb]=this[_0x52ca17(0x8e8)](Number(_0x4a3cb8)),this[_0x52ca17(0x85d)][_0x27f5eb];},ColorManager['getColor']=function(_0x10a35d){const _0x1a411f=_0x34b3e3;return _0x10a35d=String(_0x10a35d),_0x10a35d['match'](/#(.*)/i)?_0x1a411f(0x209)[_0x1a411f(0x577)](String(RegExp['$1'])):this[_0x1a411f(0x8e8)](Number(_0x10a35d));},ColorManager['clearCachedKeys']=function(){const _0x359b21=_0x34b3e3;this[_0x359b21(0x85d)]={};},ColorManager['normalColor']=function(){const _0x2d74e4=_0x34b3e3,_0x527e8e=_0x2d74e4(0x33a);this[_0x2d74e4(0x85d)]=this[_0x2d74e4(0x85d)]||{};if(this[_0x2d74e4(0x85d)][_0x527e8e])return this[_0x2d74e4(0x85d)][_0x527e8e];const _0x462299=VisuMZ[_0x2d74e4(0x4d5)]['Settings']['Color'][_0x2d74e4(0x5a8)];return this[_0x2d74e4(0x40d)](_0x527e8e,_0x462299);},ColorManager['systemColor']=function(){const _0x1670e3=_0x34b3e3,_0x5e4c6c='_stored_systemColor';this[_0x1670e3(0x85d)]=this[_0x1670e3(0x85d)]||{};if(this[_0x1670e3(0x85d)][_0x5e4c6c])return this[_0x1670e3(0x85d)][_0x5e4c6c];const _0x3acbc2=VisuMZ['CoreEngine'][_0x1670e3(0x2fb)]['Color']['ColorSystem'];return this[_0x1670e3(0x40d)](_0x5e4c6c,_0x3acbc2);},ColorManager[_0x34b3e3(0x56c)]=function(){const _0x56ccc1=_0x34b3e3,_0x53863d=_0x56ccc1(0x576);this[_0x56ccc1(0x85d)]=this['_colorCache']||{};if(this[_0x56ccc1(0x85d)][_0x53863d])return this[_0x56ccc1(0x85d)][_0x53863d];const _0x2fc9f5=VisuMZ[_0x56ccc1(0x4d5)][_0x56ccc1(0x2fb)]['Color']['ColorCrisis'];return this[_0x56ccc1(0x40d)](_0x53863d,_0x2fc9f5);},ColorManager[_0x34b3e3(0x479)]=function(){const _0x482d20=_0x34b3e3,_0x263a74=_0x482d20(0x23d);this[_0x482d20(0x85d)]=this[_0x482d20(0x85d)]||{};if(this[_0x482d20(0x85d)][_0x263a74])return this[_0x482d20(0x85d)][_0x263a74];const _0x36c4bb=VisuMZ['CoreEngine'][_0x482d20(0x2fb)][_0x482d20(0x48e)][_0x482d20(0x82f)];return this[_0x482d20(0x40d)](_0x263a74,_0x36c4bb);},ColorManager[_0x34b3e3(0x5c7)]=function(){const _0x4a6e6a=_0x34b3e3,_0x1c5193=_0x4a6e6a(0x27c);this[_0x4a6e6a(0x85d)]=this[_0x4a6e6a(0x85d)]||{};if(this[_0x4a6e6a(0x85d)][_0x1c5193])return this['_colorCache'][_0x1c5193];const _0x311c65=VisuMZ[_0x4a6e6a(0x4d5)]['Settings'][_0x4a6e6a(0x48e)][_0x4a6e6a(0x5a7)];return this['getColorDataFromPluginParameters'](_0x1c5193,_0x311c65);},ColorManager[_0x34b3e3(0x362)]=function(){const _0x258704=_0x34b3e3,_0x3f2303=_0x258704(0x137);this[_0x258704(0x85d)]=this['_colorCache']||{};if(this[_0x258704(0x85d)][_0x3f2303])return this[_0x258704(0x85d)][_0x3f2303];const _0x1506b0=VisuMZ[_0x258704(0x4d5)][_0x258704(0x2fb)][_0x258704(0x48e)][_0x258704(0x614)];return this[_0x258704(0x40d)](_0x3f2303,_0x1506b0);},ColorManager[_0x34b3e3(0x8b8)]=function(){const _0x984e9c=_0x34b3e3,_0x35229c=_0x984e9c(0x618);this['_colorCache']=this[_0x984e9c(0x85d)]||{};if(this['_colorCache'][_0x35229c])return this[_0x984e9c(0x85d)][_0x35229c];const _0x47c475=VisuMZ[_0x984e9c(0x4d5)]['Settings'][_0x984e9c(0x48e)]['ColorHPGauge2'];return this['getColorDataFromPluginParameters'](_0x35229c,_0x47c475);},ColorManager[_0x34b3e3(0x201)]=function(){const _0x252209=_0x34b3e3,_0x21cae0='_stored_mpGaugeColor1';this['_colorCache']=this[_0x252209(0x85d)]||{};if(this[_0x252209(0x85d)][_0x21cae0])return this[_0x252209(0x85d)][_0x21cae0];const _0x55bd15=VisuMZ[_0x252209(0x4d5)]['Settings'][_0x252209(0x48e)][_0x252209(0x53a)];return this['getColorDataFromPluginParameters'](_0x21cae0,_0x55bd15);},ColorManager[_0x34b3e3(0x780)]=function(){const _0x123f64=_0x34b3e3,_0x58f05c=_0x123f64(0x149);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x58f05c])return this[_0x123f64(0x85d)][_0x58f05c];const _0x22f25e=VisuMZ[_0x123f64(0x4d5)][_0x123f64(0x2fb)]['Color'][_0x123f64(0x30e)];return this[_0x123f64(0x40d)](_0x58f05c,_0x22f25e);},ColorManager[_0x34b3e3(0x5c2)]=function(){const _0x37f429=_0x34b3e3,_0x2486d0='_stored_mpCostColor';this[_0x37f429(0x85d)]=this[_0x37f429(0x85d)]||{};if(this['_colorCache'][_0x2486d0])return this[_0x37f429(0x85d)][_0x2486d0];const _0x262a8c=VisuMZ[_0x37f429(0x4d5)]['Settings'][_0x37f429(0x48e)][_0x37f429(0x7d9)];return this[_0x37f429(0x40d)](_0x2486d0,_0x262a8c);},ColorManager['powerUpColor']=function(){const _0x74da36=_0x34b3e3,_0x1f01c7=_0x74da36(0x830);this[_0x74da36(0x85d)]=this[_0x74da36(0x85d)]||{};if(this['_colorCache'][_0x1f01c7])return this[_0x74da36(0x85d)][_0x1f01c7];const _0x3b8e22=VisuMZ[_0x74da36(0x4d5)][_0x74da36(0x2fb)][_0x74da36(0x48e)][_0x74da36(0x8a6)];return this[_0x74da36(0x40d)](_0x1f01c7,_0x3b8e22);},ColorManager['powerDownColor']=function(){const _0x4a8f13=_0x34b3e3,_0x4d07c6='_stored_powerDownColor';this[_0x4a8f13(0x85d)]=this[_0x4a8f13(0x85d)]||{};if(this[_0x4a8f13(0x85d)][_0x4d07c6])return this[_0x4a8f13(0x85d)][_0x4d07c6];const _0x471313=VisuMZ[_0x4a8f13(0x4d5)][_0x4a8f13(0x2fb)][_0x4a8f13(0x48e)]['ColorPowerDown'];return this[_0x4a8f13(0x40d)](_0x4d07c6,_0x471313);},ColorManager['ctGaugeColor1']=function(){const _0x557bc0=_0x34b3e3,_0xd7fa0a='_stored_ctGaugeColor1';this[_0x557bc0(0x85d)]=this[_0x557bc0(0x85d)]||{};if(this['_colorCache'][_0xd7fa0a])return this[_0x557bc0(0x85d)][_0xd7fa0a];const _0x345300=VisuMZ[_0x557bc0(0x4d5)]['Settings'][_0x557bc0(0x48e)][_0x557bc0(0x2b0)];return this['getColorDataFromPluginParameters'](_0xd7fa0a,_0x345300);},ColorManager[_0x34b3e3(0x5e2)]=function(){const _0x20dc3b=_0x34b3e3,_0x5bd979=_0x20dc3b(0x7cd);this[_0x20dc3b(0x85d)]=this[_0x20dc3b(0x85d)]||{};if(this[_0x20dc3b(0x85d)][_0x5bd979])return this[_0x20dc3b(0x85d)][_0x5bd979];const _0x5c5ec9=VisuMZ[_0x20dc3b(0x4d5)][_0x20dc3b(0x2fb)][_0x20dc3b(0x48e)][_0x20dc3b(0x3e1)];return this[_0x20dc3b(0x40d)](_0x5bd979,_0x5c5ec9);},ColorManager[_0x34b3e3(0x172)]=function(){const _0x5c2149=_0x34b3e3,_0x5c181f=_0x5c2149(0x54f);this[_0x5c2149(0x85d)]=this[_0x5c2149(0x85d)]||{};if(this[_0x5c2149(0x85d)][_0x5c181f])return this[_0x5c2149(0x85d)][_0x5c181f];const _0x3edb3b=VisuMZ[_0x5c2149(0x4d5)][_0x5c2149(0x2fb)][_0x5c2149(0x48e)]['ColorTPGauge1'];return this[_0x5c2149(0x40d)](_0x5c181f,_0x3edb3b);},ColorManager['tpGaugeColor2']=function(){const _0x170d93=_0x34b3e3,_0x370945=_0x170d93(0x7d8);this[_0x170d93(0x85d)]=this[_0x170d93(0x85d)]||{};if(this[_0x170d93(0x85d)][_0x370945])return this[_0x170d93(0x85d)][_0x370945];const _0x54ff13=VisuMZ['CoreEngine']['Settings']['Color'][_0x170d93(0x8cc)];return this['getColorDataFromPluginParameters'](_0x370945,_0x54ff13);},ColorManager[_0x34b3e3(0x208)]=function(){const _0x149b73=_0x34b3e3,_0x21a252=_0x149b73(0x13d);this[_0x149b73(0x85d)]=this[_0x149b73(0x85d)]||{};if(this[_0x149b73(0x85d)][_0x21a252])return this[_0x149b73(0x85d)][_0x21a252];const _0x2a29ff=VisuMZ['CoreEngine'][_0x149b73(0x2fb)]['Color']['ColorTPCost'];return this['getColorDataFromPluginParameters'](_0x21a252,_0x2a29ff);},ColorManager[_0x34b3e3(0x89c)]=function(){const _0x543fbd=_0x34b3e3,_0x1c0722=_0x543fbd(0x72f);this[_0x543fbd(0x85d)]=this[_0x543fbd(0x85d)]||{};if(this[_0x543fbd(0x85d)][_0x1c0722])return this[_0x543fbd(0x85d)][_0x1c0722];const _0x9565c4=VisuMZ[_0x543fbd(0x4d5)][_0x543fbd(0x2fb)]['Color'][_0x543fbd(0x56e)];return this['getColorDataFromPluginParameters'](_0x1c0722,_0x9565c4);},ColorManager['expGaugeColor1']=function(){const _0x8f0c9b=_0x34b3e3,_0x222c4f=_0x8f0c9b(0x40c);this[_0x8f0c9b(0x85d)]=this[_0x8f0c9b(0x85d)]||{};if(this[_0x8f0c9b(0x85d)][_0x222c4f])return this[_0x8f0c9b(0x85d)][_0x222c4f];const _0x32b15d=VisuMZ['CoreEngine'][_0x8f0c9b(0x2fb)][_0x8f0c9b(0x48e)][_0x8f0c9b(0x18b)];return this[_0x8f0c9b(0x40d)](_0x222c4f,_0x32b15d);},ColorManager[_0x34b3e3(0x37d)]=function(){const _0xf49a09=_0x34b3e3,_0x145bf9=_0xf49a09(0x16f);this[_0xf49a09(0x85d)]=this['_colorCache']||{};if(this[_0xf49a09(0x85d)][_0x145bf9])return this[_0xf49a09(0x85d)][_0x145bf9];const _0x151a20=VisuMZ[_0xf49a09(0x4d5)][_0xf49a09(0x2fb)][_0xf49a09(0x48e)][_0xf49a09(0x4b5)];return this[_0xf49a09(0x40d)](_0x145bf9,_0x151a20);},ColorManager[_0x34b3e3(0x633)]=function(){const _0x49b2c3=_0x34b3e3,_0x11c200='_stored_maxLvGaugeColor1';this['_colorCache']=this[_0x49b2c3(0x85d)]||{};if(this[_0x49b2c3(0x85d)][_0x11c200])return this['_colorCache'][_0x11c200];const _0x7d9b21=VisuMZ[_0x49b2c3(0x4d5)]['Settings'][_0x49b2c3(0x48e)]['ColorMaxLvGauge1'];return this[_0x49b2c3(0x40d)](_0x11c200,_0x7d9b21);},ColorManager[_0x34b3e3(0x564)]=function(){const _0x12472c=_0x34b3e3,_0x3a6a06=_0x12472c(0x2a5);this['_colorCache']=this[_0x12472c(0x85d)]||{};if(this[_0x12472c(0x85d)][_0x3a6a06])return this[_0x12472c(0x85d)][_0x3a6a06];const _0x13d6e2=VisuMZ[_0x12472c(0x4d5)][_0x12472c(0x2fb)][_0x12472c(0x48e)][_0x12472c(0x3f0)];return this[_0x12472c(0x40d)](_0x3a6a06,_0x13d6e2);},ColorManager[_0x34b3e3(0x369)]=function(_0x2f6ebd){const _0x159620=_0x34b3e3;return VisuMZ['CoreEngine'][_0x159620(0x2fb)][_0x159620(0x48e)]['ActorHPColor'][_0x159620(0x267)](this,_0x2f6ebd);},ColorManager[_0x34b3e3(0x2e5)]=function(_0x203098){const _0x12ce9f=_0x34b3e3;return VisuMZ[_0x12ce9f(0x4d5)]['Settings'][_0x12ce9f(0x48e)]['ActorMPColor'][_0x12ce9f(0x267)](this,_0x203098);},ColorManager[_0x34b3e3(0x244)]=function(_0x36c1ac){const _0x48c0be=_0x34b3e3;return VisuMZ[_0x48c0be(0x4d5)][_0x48c0be(0x2fb)][_0x48c0be(0x48e)][_0x48c0be(0x49d)][_0x48c0be(0x267)](this,_0x36c1ac);},ColorManager[_0x34b3e3(0x676)]=function(_0x4a7168){const _0x3ea1eb=_0x34b3e3;return VisuMZ[_0x3ea1eb(0x4d5)]['Settings'][_0x3ea1eb(0x48e)][_0x3ea1eb(0x88b)][_0x3ea1eb(0x267)](this,_0x4a7168);},ColorManager[_0x34b3e3(0x60c)]=function(_0x57a1fa){const _0x586b02=_0x34b3e3;return VisuMZ['CoreEngine'][_0x586b02(0x2fb)][_0x586b02(0x48e)][_0x586b02(0x8b4)][_0x586b02(0x267)](this,_0x57a1fa);},ColorManager['outlineColor']=function(){const _0x3a960c=_0x34b3e3;return VisuMZ[_0x3a960c(0x4d5)][_0x3a960c(0x2fb)][_0x3a960c(0x48e)]['OutlineColor'];},ColorManager[_0x34b3e3(0x158)]=function(){const _0x456925=_0x34b3e3;return VisuMZ[_0x456925(0x4d5)][_0x456925(0x2fb)][_0x456925(0x48e)][_0x456925(0x61e)]||_0x456925(0x136);},ColorManager[_0x34b3e3(0x8d6)]=function(){const _0x2a7bba=_0x34b3e3;return VisuMZ[_0x2a7bba(0x4d5)][_0x2a7bba(0x2fb)]['Color'][_0x2a7bba(0x595)]||_0x2a7bba(0x374);},ColorManager['dimColor1']=function(){const _0x5b0308=_0x34b3e3;return VisuMZ[_0x5b0308(0x4d5)]['Settings'][_0x5b0308(0x48e)][_0x5b0308(0x6ab)];},ColorManager[_0x34b3e3(0x5c5)]=function(){const _0x50713a=_0x34b3e3;return VisuMZ[_0x50713a(0x4d5)][_0x50713a(0x2fb)]['Color'][_0x50713a(0x28d)];},ColorManager['itemBackColor1']=function(){const _0x42b2b0=_0x34b3e3;return VisuMZ['CoreEngine'][_0x42b2b0(0x2fb)][_0x42b2b0(0x48e)][_0x42b2b0(0x810)];},ColorManager[_0x34b3e3(0x3cb)]=function(){const _0x36f027=_0x34b3e3;return VisuMZ[_0x36f027(0x4d5)][_0x36f027(0x2fb)]['Color'][_0x36f027(0x1fa)];},SceneManager[_0x34b3e3(0x408)]=[],SceneManager['isSceneBattle']=function(){const _0x2080a1=_0x34b3e3;return this[_0x2080a1(0x44b)]&&this[_0x2080a1(0x44b)][_0x2080a1(0x698)]===Scene_Battle;},SceneManager[_0x34b3e3(0x5b1)]=function(){const _0x82d04b=_0x34b3e3;return this[_0x82d04b(0x44b)]&&this[_0x82d04b(0x44b)][_0x82d04b(0x698)]===Scene_Map;},SceneManager[_0x34b3e3(0x60b)]=function(){const _0x440a05=_0x34b3e3;return this['_scene']&&this[_0x440a05(0x44b)]instanceof Scene_Map;},VisuMZ['CoreEngine'][_0x34b3e3(0x471)]=SceneManager[_0x34b3e3(0x7e8)],SceneManager['initialize']=function(){const _0x458cfd=_0x34b3e3;VisuMZ[_0x458cfd(0x4d5)][_0x458cfd(0x471)][_0x458cfd(0x267)](this),this[_0x458cfd(0x61f)]();},VisuMZ['CoreEngine']['SceneManager_onKeyDown']=SceneManager[_0x34b3e3(0x4e7)],SceneManager[_0x34b3e3(0x4e7)]=function(_0x6efbb4){const _0x2bd78d=_0x34b3e3;if($gameTemp)this[_0x2bd78d(0x1c3)](_0x6efbb4);VisuMZ[_0x2bd78d(0x4d5)][_0x2bd78d(0x83b)][_0x2bd78d(0x267)](this,_0x6efbb4);},SceneManager['onKeyDownKeysF6F7']=function(_0x161f43){const _0x3281f2=_0x34b3e3;if(!_0x161f43[_0x3281f2(0x516)]&&!_0x161f43['altKey'])switch(_0x161f43['keyCode']){case 0x52:this[_0x3281f2(0x856)]();break;case 0x54:this['playTestShiftT']();break;case 0x75:this[_0x3281f2(0x1ad)]();break;case 0x76:if(Input['isPressed']('shift')||Input[_0x3281f2(0x153)](_0x3281f2(0x1a9)))return;this[_0x3281f2(0x8c6)]();break;}else{if(_0x161f43[_0x3281f2(0x516)]){let _0x381378=_0x161f43[_0x3281f2(0x6a3)];if(_0x381378>=0x31&&_0x381378<=0x39){const _0x116b6a=_0x381378-0x30;return SceneManager[_0x3281f2(0x19d)](_0x116b6a);}else{if(_0x381378>=0x61&&_0x381378<=0x69){const _0x1568e0=_0x381378-0x60;return SceneManager[_0x3281f2(0x19d)](_0x1568e0);}}}}},SceneManager['playTestF6']=function(){const _0x4a2ac0=_0x34b3e3;if($gameTemp[_0x4a2ac0(0x8f3)]()&&VisuMZ['CoreEngine']['Settings'][_0x4a2ac0(0x1f5)][_0x4a2ac0(0x3b7)]){ConfigManager[_0x4a2ac0(0x249)]!==0x0?(ConfigManager[_0x4a2ac0(0x54e)]=0x0,ConfigManager[_0x4a2ac0(0x4e9)]=0x0,ConfigManager[_0x4a2ac0(0x180)]=0x0,ConfigManager[_0x4a2ac0(0x249)]=0x0):(ConfigManager['bgmVolume']=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager[_0x4a2ac0(0x180)]=0x64,ConfigManager[_0x4a2ac0(0x249)]=0x64);ConfigManager[_0x4a2ac0(0x7fd)]();if(this['_scene'][_0x4a2ac0(0x698)]===Scene_Options){if(this[_0x4a2ac0(0x44b)][_0x4a2ac0(0x6c4)])this[_0x4a2ac0(0x44b)]['_optionsWindow'][_0x4a2ac0(0x6ba)]();if(this['_scene'][_0x4a2ac0(0x7a8)])this[_0x4a2ac0(0x44b)][_0x4a2ac0(0x7a8)]['refresh']();}}},SceneManager['playTestF7']=function(){const _0x2ff35f=_0x34b3e3;$gameTemp['isPlaytest']()&&VisuMZ[_0x2ff35f(0x4d5)]['Settings'][_0x2ff35f(0x1f5)][_0x2ff35f(0x819)]&&($gameTemp[_0x2ff35f(0x5bb)]=!$gameTemp[_0x2ff35f(0x5bb)]);},SceneManager[_0x34b3e3(0x856)]=function(){const _0x3cf30e=_0x34b3e3;if(!VisuMZ['CoreEngine'][_0x3cf30e(0x2fb)]['QoL'][_0x3cf30e(0x3d8)])return;if(!$gameTemp[_0x3cf30e(0x8f3)]())return;if(!SceneManager[_0x3cf30e(0x686)]())return;if(!Input[_0x3cf30e(0x153)]('shift'))return;for(const _0x3d46f9 of $gameParty[_0x3cf30e(0x63e)]()){if(!_0x3d46f9)continue;_0x3d46f9[_0x3cf30e(0x5d4)]();}},SceneManager[_0x34b3e3(0x58d)]=function(){const _0x1b7daa=_0x34b3e3;if(!VisuMZ['CoreEngine']['Settings']['QoL'][_0x1b7daa(0x48a)])return;if(!$gameTemp[_0x1b7daa(0x8f3)]())return;if(!SceneManager[_0x1b7daa(0x686)]())return;if(!Input[_0x1b7daa(0x153)](_0x1b7daa(0x778)))return;for(const _0x3a797b of $gameParty[_0x1b7daa(0x63e)]()){if(!_0x3a797b)continue;_0x3a797b['gainSilentTp'](_0x3a797b[_0x1b7daa(0x450)]());}},SceneManager[_0x34b3e3(0x19d)]=function(_0x1c481e){const _0x34d2a1=_0x34b3e3;if(!$gameTemp['isPlaytest']())return;if(!DataManager[_0x34d2a1(0x84c)](_0x1c481e))return;if(!(VisuMZ[_0x34d2a1(0x4d5)][_0x34d2a1(0x2fb)][_0x34d2a1(0x1f5)][_0x34d2a1(0x857)]??!![]))return;this[_0x34d2a1(0x1b7)](Scene_QuickLoad),this['prepareNextScene'](_0x1c481e);},SceneManager['initVisuMZCoreEngine']=function(){const _0x5f5875=_0x34b3e3;this[_0x5f5875(0x1b9)]=![],this['_hideButtons']=!VisuMZ['CoreEngine']['Settings']['UI'][_0x5f5875(0x33f)];},SceneManager[_0x34b3e3(0x7cb)]=function(_0x7ee698){const _0x27264d=_0x34b3e3;VisuMZ[_0x27264d(0x4d5)]['Settings']['UI']['SideButtons']&&(this[_0x27264d(0x1b9)]=_0x7ee698);},SceneManager[_0x34b3e3(0x635)]=function(){const _0x5a0736=_0x34b3e3;return this[_0x5a0736(0x1b9)];},SceneManager[_0x34b3e3(0x520)]=function(){const _0x391f65=_0x34b3e3;return this[_0x391f65(0x18c)];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x60d704=_0x34b3e3;return this[_0x60d704(0x520)]()||this[_0x60d704(0x635)]();},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x12a)]=SceneManager[_0x34b3e3(0x173)],SceneManager[_0x34b3e3(0x173)]=function(){const _0xae2f07=_0x34b3e3;return VisuMZ[_0xae2f07(0x4d5)][_0xae2f07(0x2fb)]['QoL']['RequireFocus']?VisuMZ[_0xae2f07(0x4d5)]['SceneManager_isGameActive'][_0xae2f07(0x267)](this):!![];},SceneManager[_0x34b3e3(0x280)]=function(_0x31b91d){const _0x24fcc7=_0x34b3e3;if(_0x31b91d instanceof Error)this['catchNormalError'](_0x31b91d);else _0x31b91d instanceof Array&&_0x31b91d[0x0]===_0x24fcc7(0x8fe)?this[_0x24fcc7(0x118)](_0x31b91d):this[_0x24fcc7(0x6ad)](_0x31b91d);this[_0x24fcc7(0x1d9)]();},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x7c4)]=BattleManager[_0x34b3e3(0x134)],BattleManager[_0x34b3e3(0x134)]=function(){const _0x5bc823=_0x34b3e3;return VisuMZ[_0x5bc823(0x4d5)][_0x5bc823(0x2fb)]['QoL'][_0x5bc823(0x202)]?this[_0x5bc823(0x3d9)]():VisuMZ[_0x5bc823(0x4d5)][_0x5bc823(0x7c4)][_0x5bc823(0x267)](this);},BattleManager['processAlwaysEscape']=function(){const _0x3aa2fd=_0x34b3e3;return $gameParty[_0x3aa2fd(0x5ca)](),SoundManager[_0x3aa2fd(0x787)](),this[_0x3aa2fd(0x11d)](),!![];},BattleManager[_0x34b3e3(0x8ad)]=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager[_0x34b3e3(0x345)]=function(){return $gameSystem['getBattleSystem']()===0x1;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x660)]=Game_Temp[_0x34b3e3(0x237)]['initialize'],Game_Temp[_0x34b3e3(0x237)]['initialize']=function(){const _0x43c6a4=_0x34b3e3;VisuMZ[_0x43c6a4(0x4d5)][_0x43c6a4(0x660)][_0x43c6a4(0x267)](this),this[_0x43c6a4(0x7ec)](),this[_0x43c6a4(0x792)](),this['createPointAnimationQueue']();},Game_Temp['prototype'][_0x34b3e3(0x7ec)]=function(){const _0x3be8fc=_0x34b3e3;VisuMZ[_0x3be8fc(0x4d5)]['Settings'][_0x3be8fc(0x1f5)][_0x3be8fc(0x1cb)]&&(this[_0x3be8fc(0x6eb)]=![]);},Game_Temp[_0x34b3e3(0x237)][_0x34b3e3(0x68b)]=function(_0x33aeb6){this['_lastPluginCommandInterpreter']=_0x33aeb6;},Game_Temp[_0x34b3e3(0x237)][_0x34b3e3(0x3ff)]=function(){const _0x4e1b1c=_0x34b3e3;return this[_0x4e1b1c(0x584)];},Game_Temp['prototype']['clearForcedGameTroopSettingsCoreEngine']=function(){const _0x3aa776=_0x34b3e3;this[_0x3aa776(0x80e)]=undefined,this[_0x3aa776(0x23f)]=undefined,this[_0x3aa776(0x478)]=undefined;},Game_Temp[_0x34b3e3(0x237)][_0x34b3e3(0x3e8)]=function(_0x3810ca){const _0x56c7df=_0x34b3e3;$gameMap&&$dataMap&&$dataMap[_0x56c7df(0x39a)]&&this['parseForcedGameTroopSettingsCoreEngine']($dataMap['note']);const _0xc876ae=$dataTroops[_0x3810ca];if(_0xc876ae){let _0x582c20=DataManager[_0x56c7df(0x3e0)](_0xc876ae['id']);this[_0x56c7df(0x705)](_0x582c20);}},Game_Temp[_0x34b3e3(0x237)][_0x34b3e3(0x705)]=function(_0x42a6b3){const _0x25ba69=_0x34b3e3;if(!_0x42a6b3)return;if(_0x42a6b3[_0x25ba69(0x39c)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this['_forcedTroopView']='FV';else{if(_0x42a6b3[_0x25ba69(0x39c)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x25ba69(0x80e)]='SV';else{if(_0x42a6b3[_0x25ba69(0x39c)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x3ee3ed=String(RegExp['$1']);if(_0x3ee3ed[_0x25ba69(0x39c)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x25ba69(0x80e)]='FV';else _0x3ee3ed[_0x25ba69(0x39c)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x25ba69(0x80e)]='SV');}}}if(_0x42a6b3['match'](/<(?:DTB)>/i))this['_forcedBattleSys']=0x0;else{if(_0x42a6b3['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i))this['_forcedBattleSys']=0x1;else{if(_0x42a6b3['match'](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x42a6b3['match'](/<(?:TPB|ATB)>/i))this[_0x25ba69(0x23f)]=0x2;else{if(_0x42a6b3['match'](/<(?:CTB)>/i))Imported[_0x25ba69(0x84a)]&&(this[_0x25ba69(0x23f)]='CTB');else{if(_0x42a6b3[_0x25ba69(0x39c)](/<(?:STB)>/i))Imported[_0x25ba69(0x442)]&&(this[_0x25ba69(0x23f)]='STB');else{if(_0x42a6b3[_0x25ba69(0x39c)](/<(?:BTB)>/i))Imported[_0x25ba69(0x6c6)]&&(this[_0x25ba69(0x23f)]=_0x25ba69(0x19f));else{if(_0x42a6b3[_0x25ba69(0x39c)](/<(?:FTB)>/i))Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x25ba69(0x23f)]='FTB');else{if(_0x42a6b3[_0x25ba69(0x39c)](/<(?:OTB)>/i))Imported[_0x25ba69(0x176)]&&(this[_0x25ba69(0x23f)]=_0x25ba69(0x779));else{if(_0x42a6b3['match'](/<(?:ETB)>/i))Imported['VisuMZ_2_BattleSystemETB']&&(this[_0x25ba69(0x23f)]=_0x25ba69(0x232));else{if(_0x42a6b3[_0x25ba69(0x39c)](/<(?:PTB)>/i))Imported[_0x25ba69(0x131)]&&(this[_0x25ba69(0x23f)]='PTB');else{if(_0x42a6b3[_0x25ba69(0x39c)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x4d3f52=String(RegExp['$1']);if(_0x4d3f52[_0x25ba69(0x39c)](/DTB/i))this[_0x25ba69(0x23f)]=0x0;else{if(_0x4d3f52[_0x25ba69(0x39c)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x25ba69(0x23f)]=0x1;else{if(_0x4d3f52[_0x25ba69(0x39c)](/(?:TPB|ATB)[ ]WAIT/i))this['_forcedBattleSys']=0x2;else{if(_0x4d3f52['match'](/CTB/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x25ba69(0x23f)]=_0x25ba69(0x89a));else{if(_0x4d3f52[_0x25ba69(0x39c)](/STB/i))Imported[_0x25ba69(0x442)]&&(this[_0x25ba69(0x23f)]='STB');else{if(_0x4d3f52[_0x25ba69(0x39c)](/BTB/i))Imported[_0x25ba69(0x6c6)]&&(this[_0x25ba69(0x23f)]=_0x25ba69(0x19f));else{if(_0x4d3f52[_0x25ba69(0x39c)](/FTB/i))Imported[_0x25ba69(0x12f)]&&(this[_0x25ba69(0x23f)]=_0x25ba69(0x613));else{if(_0x4d3f52[_0x25ba69(0x39c)](/OTB/i))Imported[_0x25ba69(0x176)]&&(this[_0x25ba69(0x23f)]=_0x25ba69(0x779));else{if(_0x4d3f52[_0x25ba69(0x39c)](/ETB/i))Imported[_0x25ba69(0x8d8)]&&(this[_0x25ba69(0x23f)]=_0x25ba69(0x232));else _0x4d3f52[_0x25ba69(0x39c)](/PTB/i)&&(Imported[_0x25ba69(0x131)]&&(this['_forcedBattleSys']='PTB'));}}}}}}}}}}}}}}}}}}}}if(_0x42a6b3[_0x25ba69(0x39c)](/<(?:|BATTLE )GRID>/i))this[_0x25ba69(0x478)]=!![];else _0x42a6b3[_0x25ba69(0x39c)](/<NO (?:|BATTLE )GRID>/i)&&(this[_0x25ba69(0x478)]=![]);},Game_Temp[_0x34b3e3(0x237)]['createFauxAnimationQueue']=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x34b3e3(0x237)][_0x34b3e3(0x8ec)]=function(_0x637d3e,_0x1656a5,_0xef5c01,_0x5e7815){const _0x4e134f=_0x34b3e3;if(!this['showFauxAnimations']())return;_0xef5c01=_0xef5c01||![],_0x5e7815=_0x5e7815||![];if($dataAnimations[_0x1656a5]){const _0x3a4ff4={'targets':_0x637d3e,'animationId':_0x1656a5,'mirror':_0xef5c01,'mute':_0x5e7815};this[_0x4e134f(0x3bd)][_0x4e134f(0x1b7)](_0x3a4ff4);for(const _0x5ef56d of _0x637d3e){_0x5ef56d[_0x4e134f(0x53e)]&&_0x5ef56d[_0x4e134f(0x53e)]();}}},Game_Temp[_0x34b3e3(0x237)][_0x34b3e3(0x689)]=function(){return!![];},Game_Temp[_0x34b3e3(0x237)][_0x34b3e3(0x50d)]=function(){const _0x46cb16=_0x34b3e3;return this[_0x46cb16(0x3bd)]['shift']();},Game_Temp[_0x34b3e3(0x237)]['createPointAnimationQueue']=function(){const _0x26566e=_0x34b3e3;this[_0x26566e(0x886)]=[];},Game_Temp[_0x34b3e3(0x237)]['requestPointAnimation']=function(_0x4ef5f7,_0x1b3a9a,_0x267f7e,_0x21c1fa,_0xf09f64){const _0x178ff5=_0x34b3e3;if(!this[_0x178ff5(0x3e6)]())return;_0x21c1fa=_0x21c1fa||![],_0xf09f64=_0xf09f64||![];if($dataAnimations[_0x267f7e]){const _0x2deab6={'x':_0x4ef5f7,'y':_0x1b3a9a,'animationId':_0x267f7e,'mirror':_0x21c1fa,'mute':_0xf09f64};this[_0x178ff5(0x886)][_0x178ff5(0x1b7)](_0x2deab6);}},Game_Temp['prototype'][_0x34b3e3(0x3e6)]=function(){return!![];},Game_Temp['prototype'][_0x34b3e3(0x2f9)]=function(){const _0x4cabeb=_0x34b3e3;return this[_0x4cabeb(0x886)]['shift']();},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x7ce)]=Game_System[_0x34b3e3(0x237)][_0x34b3e3(0x7e8)],Game_System['prototype'][_0x34b3e3(0x7e8)]=function(){const _0x1fcf0d=_0x34b3e3;VisuMZ[_0x1fcf0d(0x4d5)][_0x1fcf0d(0x7ce)][_0x1fcf0d(0x267)](this),this[_0x1fcf0d(0x581)]();},Game_System['prototype']['initCoreEngine']=function(){const _0x5f5c0d=_0x34b3e3;this[_0x5f5c0d(0x193)]={'SideView':$dataSystem[_0x5f5c0d(0x1e3)],'BattleSystem':this[_0x5f5c0d(0x83f)](),'FontSize':$dataSystem['advanced'][_0x5f5c0d(0x1c9)],'Padding':0xc};},Game_System[_0x34b3e3(0x237)][_0x34b3e3(0x1e6)]=function(){const _0x430d21=_0x34b3e3;if($gameTemp[_0x430d21(0x80e)]==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this['_CoreEngineSettings']===undefined)this[_0x430d21(0x581)]();if(this[_0x430d21(0x193)][_0x430d21(0x64b)]===undefined)this['initCoreEngine']();return this[_0x430d21(0x193)][_0x430d21(0x64b)];},Game_System['prototype'][_0x34b3e3(0x2ac)]=function(_0x3d1245){const _0x2a8ee5=_0x34b3e3;if(this[_0x2a8ee5(0x193)]===undefined)this[_0x2a8ee5(0x581)]();if(this[_0x2a8ee5(0x193)][_0x2a8ee5(0x64b)]===undefined)this[_0x2a8ee5(0x581)]();this['_CoreEngineSettings'][_0x2a8ee5(0x64b)]=_0x3d1245;},Game_System['prototype']['resetBattleSystem']=function(){const _0x3a73d1=_0x34b3e3;if(this[_0x3a73d1(0x193)]===undefined)this[_0x3a73d1(0x581)]();this[_0x3a73d1(0x193)]['BattleSystem']=this[_0x3a73d1(0x83f)]();},Game_System[_0x34b3e3(0x237)]['initialBattleSystem']=function(){const _0x5897b8=_0x34b3e3,_0x4ad909=(VisuMZ[_0x5897b8(0x4d5)][_0x5897b8(0x2fb)]['BattleSystem']||'DATABASE')[_0x5897b8(0x515)]()[_0x5897b8(0x85f)]();return VisuMZ[_0x5897b8(0x4d5)]['CreateBattleSystemID'](_0x4ad909);},Game_System[_0x34b3e3(0x237)]['getBattleSystem']=function(){const _0xe31657=_0x34b3e3;if($gameTemp[_0xe31657(0x23f)]!==undefined)return $gameTemp[_0xe31657(0x23f)];if(this['_CoreEngineSettings']===undefined)this[_0xe31657(0x581)]();if(this[_0xe31657(0x193)][_0xe31657(0x30f)]===undefined)this['resetBattleSystem']();return this['_CoreEngineSettings'][_0xe31657(0x30f)];},Game_System[_0x34b3e3(0x237)][_0x34b3e3(0x6b0)]=function(_0x17d40c){const _0x1ec941=_0x34b3e3;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x1ec941(0x193)][_0x1ec941(0x30f)]===undefined)this[_0x1ec941(0x782)]();this[_0x1ec941(0x193)][_0x1ec941(0x30f)]=_0x17d40c;},Game_System[_0x34b3e3(0x237)][_0x34b3e3(0x892)]=function(){const _0x1ab82d=_0x34b3e3;if(this[_0x1ab82d(0x193)]===undefined)this[_0x1ab82d(0x581)]();if(this['_CoreEngineSettings']['FontSize']===undefined)this[_0x1ab82d(0x581)]();return this[_0x1ab82d(0x193)][_0x1ab82d(0x3f4)];},Game_System['prototype'][_0x34b3e3(0x78a)]=function(_0x2665dd){const _0x52a608=_0x34b3e3;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x52a608(0x193)]['TimeProgress']===undefined)this[_0x52a608(0x581)]();this[_0x52a608(0x193)][_0x52a608(0x3f4)]=_0x2665dd;},Game_System[_0x34b3e3(0x237)]['windowPadding']=function(){const _0xc959ed=_0x34b3e3;if(this[_0xc959ed(0x193)]===undefined)this[_0xc959ed(0x581)]();if(this[_0xc959ed(0x193)][_0xc959ed(0x7b0)]===undefined)this[_0xc959ed(0x581)]();return this[_0xc959ed(0x193)][_0xc959ed(0x7b0)];},Game_System[_0x34b3e3(0x237)][_0x34b3e3(0x462)]=function(_0x2dd01d){const _0x3d4f6f=_0x34b3e3;if(this[_0x3d4f6f(0x193)]===undefined)this[_0x3d4f6f(0x581)]();if(this[_0x3d4f6f(0x193)][_0x3d4f6f(0x4ae)]===undefined)this[_0x3d4f6f(0x581)]();this[_0x3d4f6f(0x193)][_0x3d4f6f(0x7b0)]=_0x2dd01d;},VisuMZ['CoreEngine'][_0x34b3e3(0x11b)]=Game_Screen[_0x34b3e3(0x237)][_0x34b3e3(0x7e8)],Game_Screen[_0x34b3e3(0x237)][_0x34b3e3(0x7e8)]=function(){const _0x12abd2=_0x34b3e3;VisuMZ['CoreEngine'][_0x12abd2(0x11b)][_0x12abd2(0x267)](this),this[_0x12abd2(0x50c)]();},Game_Screen[_0x34b3e3(0x237)][_0x34b3e3(0x50c)]=function(){const _0x3bb17e=_0x34b3e3,_0xf405b9=VisuMZ[_0x3bb17e(0x4d5)][_0x3bb17e(0x2fb)][_0x3bb17e(0x476)];this[_0x3bb17e(0x80f)]=_0xf405b9?.['DefaultStyle']||_0x3bb17e(0x544);},Game_Screen['prototype'][_0x34b3e3(0x75f)]=function(){const _0x4493a3=_0x34b3e3;if(this[_0x4493a3(0x80f)]===undefined)this[_0x4493a3(0x50c)]();return this['_coreEngineShakeStyle'];},Game_Screen[_0x34b3e3(0x237)]['setCoreEngineScreenShakeStyle']=function(_0x57f9ba){const _0xdca1fc=_0x34b3e3;if(this['_coreEngineShakeStyle']===undefined)this[_0xdca1fc(0x50c)]();this['_coreEngineShakeStyle']=_0x57f9ba[_0xdca1fc(0x309)]()[_0xdca1fc(0x85f)]();},Game_Picture[_0x34b3e3(0x237)]['isMapScrollLinked']=function(){const _0x3336cd=_0x34b3e3;if($gameParty[_0x3336cd(0x185)]())return![];return this[_0x3336cd(0x1bb)]()&&this[_0x3336cd(0x1bb)]()['charAt'](0x0)==='!';},Game_Picture[_0x34b3e3(0x237)]['onlyfilename']=function(){return this['_name']['split']('/')['pop']();},VisuMZ['CoreEngine'][_0x34b3e3(0x3da)]=Game_Picture['prototype']['x'],Game_Picture[_0x34b3e3(0x237)]['x']=function(){const _0x563aa1=_0x34b3e3;return this[_0x563aa1(0x802)]()?this['xScrollLinkedOffset']():VisuMZ['CoreEngine'][_0x563aa1(0x3da)]['call'](this);},Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x1cd)]=function(){const _0x20e9d6=_0x34b3e3,_0x265d44=$gameMap[_0x20e9d6(0x4d7)]()*$gameMap[_0x20e9d6(0x460)]();return(this['_x']-_0x265d44)*$gameScreen[_0x20e9d6(0x394)]();},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x24d)]=Game_Picture[_0x34b3e3(0x237)]['y'],Game_Picture[_0x34b3e3(0x237)]['y']=function(){const _0x2ff5bf=_0x34b3e3;return this[_0x2ff5bf(0x802)]()?this[_0x2ff5bf(0x355)]():VisuMZ[_0x2ff5bf(0x4d5)][_0x2ff5bf(0x24d)][_0x2ff5bf(0x267)](this);},Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x355)]=function(){const _0x1ebe84=_0x34b3e3,_0x3d9b82=$gameMap['displayY']()*$gameMap[_0x1ebe84(0x771)]();return(this['_y']-_0x3d9b82)*$gameScreen[_0x1ebe84(0x394)]();},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x7e0)]=Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x3fe)],Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x3fe)]=function(){const _0x20656f=_0x34b3e3;let _0x2bf4b9=VisuMZ[_0x20656f(0x4d5)]['Game_Picture_scaleX'][_0x20656f(0x267)](this);return this['isMapScrollLinked']()&&(_0x2bf4b9*=$gameScreen[_0x20656f(0x394)]()),_0x2bf4b9;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x83a)]=Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x261)],Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x261)]=function(){const _0x590158=_0x34b3e3;let _0x187846=VisuMZ[_0x590158(0x4d5)][_0x590158(0x83a)][_0x590158(0x267)](this);return this['isMapScrollLinked']()&&(_0x187846*=$gameScreen[_0x590158(0x394)]()),_0x187846;},Game_Picture['prototype']['setEasingType']=function(_0x1d2065){this['_coreEasingType']=_0x1d2065;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x15b)]=Game_Picture['prototype'][_0x34b3e3(0x855)],Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x855)]=function(_0x153dbe){const _0x3953d5=_0x34b3e3;return this[_0x3953d5(0x601)]=this[_0x3953d5(0x601)]||0x0,[0x0,0x1,0x2,0x3][_0x3953d5(0x1da)](this[_0x3953d5(0x601)])?VisuMZ[_0x3953d5(0x4d5)][_0x3953d5(0x15b)][_0x3953d5(0x267)](this,_0x153dbe):VisuMZ[_0x3953d5(0x6e8)](_0x153dbe,this[_0x3953d5(0x601)]);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x3e2)]=Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x338)],Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x338)]=function(){const _0x5a0592=_0x34b3e3;VisuMZ[_0x5a0592(0x4d5)][_0x5a0592(0x3e2)][_0x5a0592(0x267)](this),this['initRotationCoreEngine']();},Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x406)]=function(){const _0x20a361=_0x34b3e3;this[_0x20a361(0x3b5)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':'Linear'};},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x41c)]=Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x86b)],Game_Picture[_0x34b3e3(0x237)]['angle']=function(){const _0xcff085=_0x34b3e3;let _0xe6c214=VisuMZ[_0xcff085(0x4d5)][_0xcff085(0x41c)][_0xcff085(0x267)](this);return _0xe6c214+=this[_0xcff085(0x1dc)](),_0xe6c214;},Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x1dc)]=function(){const _0xc210c=_0x34b3e3;if(this['_anglePlus']===undefined)this[_0xc210c(0x406)]();return this[_0xc210c(0x3b5)]['current']||0x0;},Game_Picture[_0x34b3e3(0x237)]['setAnglePlusData']=function(_0x340c98,_0xa129d4,_0x2b3fc0){const _0x312769=_0x34b3e3;if(this[_0x312769(0x3b5)]===undefined)this[_0x312769(0x406)]();this[_0x312769(0x3b5)]['target']=_0x340c98||0x0,this[_0x312769(0x3b5)][_0x312769(0x3c4)]=_0xa129d4||0x0,this[_0x312769(0x3b5)][_0x312769(0x8dd)]=_0xa129d4||0x0,this[_0x312769(0x3b5)][_0x312769(0x641)]=_0x2b3fc0||_0x312769(0x4ba),_0xa129d4<=0x0&&(this['_anglePlus'][_0x312769(0x1b8)]=this[_0x312769(0x3b5)][_0x312769(0x519)]);},Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x242)]=function(_0x31f79c,_0x5b7834,_0x2efe5e){const _0x28d1c1=_0x34b3e3;if(this['_anglePlus']===undefined)this[_0x28d1c1(0x406)]();this[_0x28d1c1(0x3b5)]['target']+=_0x31f79c||0x0,this[_0x28d1c1(0x3b5)][_0x28d1c1(0x3c4)]=_0x5b7834||0x0,this[_0x28d1c1(0x3b5)]['wholeDuration']=_0x5b7834||0x0,this[_0x28d1c1(0x3b5)][_0x28d1c1(0x641)]=_0x2efe5e||_0x28d1c1(0x4ba),_0x5b7834<=0x0&&(this[_0x28d1c1(0x3b5)]['current']=this['_anglePlus'][_0x28d1c1(0x519)]);},VisuMZ[_0x34b3e3(0x4d5)]['Game_Picture_updateRotation']=Game_Picture['prototype'][_0x34b3e3(0x222)],Game_Picture['prototype'][_0x34b3e3(0x222)]=function(){const _0x445b04=_0x34b3e3;VisuMZ[_0x445b04(0x4d5)]['Game_Picture_updateRotation'][_0x445b04(0x267)](this),this[_0x445b04(0x4ee)]();},Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x4ee)]=function(){const _0x53afcf=_0x34b3e3;if(this['_anglePlus']===undefined)this[_0x53afcf(0x406)]();const _0x290029=this[_0x53afcf(0x3b5)];if(_0x290029['duration']<=0x0)return;_0x290029[_0x53afcf(0x1b8)]=this[_0x53afcf(0x473)](_0x290029['current'],_0x290029['target']),_0x290029['duration']--,_0x290029[_0x53afcf(0x3c4)]<=0x0&&(_0x290029[_0x53afcf(0x1b8)]=_0x290029[_0x53afcf(0x519)]);},Game_Picture[_0x34b3e3(0x237)]['applyEasingAnglePlus']=function(_0x5b1c30,_0x29946b){const _0x40fb8e=_0x34b3e3,_0x907269=this[_0x40fb8e(0x3b5)],_0x57cebe=_0x907269[_0x40fb8e(0x641)],_0x39f07f=_0x907269[_0x40fb8e(0x3c4)],_0x547bce=_0x907269[_0x40fb8e(0x8dd)],_0x42194e=VisuMZ[_0x40fb8e(0x6e8)]((_0x547bce-_0x39f07f)/_0x547bce,_0x57cebe),_0x5c6f02=VisuMZ[_0x40fb8e(0x6e8)]((_0x547bce-_0x39f07f+0x1)/_0x547bce,_0x57cebe),_0x3433b6=(_0x5b1c30-_0x29946b*_0x42194e)/(0x1-_0x42194e);return _0x3433b6+(_0x29946b-_0x3433b6)*_0x5c6f02;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x448)]=Game_Action[_0x34b3e3(0x237)][_0x34b3e3(0x80d)],Game_Action[_0x34b3e3(0x237)]['itemHit']=function(_0xc80dd2){const _0x28c06d=_0x34b3e3;return VisuMZ[_0x28c06d(0x4d5)][_0x28c06d(0x2fb)][_0x28c06d(0x1f5)][_0x28c06d(0x3ea)]?this[_0x28c06d(0x745)](_0xc80dd2):VisuMZ[_0x28c06d(0x4d5)]['Game_Action_itemHit'][_0x28c06d(0x267)](this,_0xc80dd2);},Game_Action[_0x34b3e3(0x237)]['itemHitImprovedAccuracy']=function(_0x3b4f33){const _0x397375=_0x34b3e3,_0x5ec901=this['itemSuccessRate'](_0x3b4f33),_0x3ea5f5=this['subjectHitRate'](_0x3b4f33),_0x307dc4=this[_0x397375(0x3f7)](_0x3b4f33);return _0x5ec901*(_0x3ea5f5-_0x307dc4);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x25c)]=Game_Action[_0x34b3e3(0x237)][_0x34b3e3(0x225)],Game_Action[_0x34b3e3(0x237)][_0x34b3e3(0x225)]=function(_0x3987f9){const _0x56dc68=_0x34b3e3;return VisuMZ[_0x56dc68(0x4d5)][_0x56dc68(0x2fb)][_0x56dc68(0x1f5)]['ImprovedAccuracySystem']?0x0:VisuMZ[_0x56dc68(0x4d5)][_0x56dc68(0x25c)][_0x56dc68(0x267)](this,_0x3987f9);},Game_Action['prototype'][_0x34b3e3(0x824)]=function(_0x427bf4){const _0x1d1833=_0x34b3e3;return this['item']()[_0x1d1833(0x218)]*0.01;},Game_Action[_0x34b3e3(0x237)]['subjectHitRate']=function(_0x3354a9){const _0x45aa1b=_0x34b3e3;if(VisuMZ[_0x45aa1b(0x4d5)][_0x45aa1b(0x2fb)][_0x45aa1b(0x1f5)][_0x45aa1b(0x8cb)]&&this[_0x45aa1b(0x3f1)]())return 0x1;return this['isPhysical']()?VisuMZ['CoreEngine'][_0x45aa1b(0x2fb)][_0x45aa1b(0x1f5)]['AccuracyBoost']&&this[_0x45aa1b(0x4ff)]()[_0x45aa1b(0x7ab)]()?this[_0x45aa1b(0x4ff)]()[_0x45aa1b(0x428)]+0.05:this['subject']()[_0x45aa1b(0x428)]:0x1;},Game_Action[_0x34b3e3(0x237)][_0x34b3e3(0x3f7)]=function(_0x41834f){const _0x4947bd=_0x34b3e3;if(this[_0x4947bd(0x4ff)]()[_0x4947bd(0x7ab)]()===_0x41834f[_0x4947bd(0x7ab)]())return 0x0;if(this['isPhysical']())return VisuMZ[_0x4947bd(0x4d5)]['Settings'][_0x4947bd(0x1f5)][_0x4947bd(0x8cb)]&&_0x41834f['isEnemy']()?_0x41834f[_0x4947bd(0x6a6)]-0.05:_0x41834f[_0x4947bd(0x6a6)];else return this[_0x4947bd(0x587)]()?_0x41834f[_0x4947bd(0x28c)]:0x0;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2ec)]=Game_Action[_0x34b3e3(0x237)]['updateLastTarget'],Game_Action['prototype'][_0x34b3e3(0x68a)]=function(_0x40200e){const _0x525237=_0x34b3e3;VisuMZ[_0x525237(0x4d5)]['Game_Action_updateLastTarget'][_0x525237(0x267)](this,_0x40200e);if(VisuMZ[_0x525237(0x4d5)][_0x525237(0x2fb)][_0x525237(0x1f5)][_0x525237(0x3ea)])return;const _0x403ff8=_0x40200e[_0x525237(0x35c)]();_0x403ff8['missed']&&(0x1-this[_0x525237(0x225)](_0x40200e)>this[_0x525237(0x80d)](_0x40200e)&&(_0x403ff8['missed']=![],_0x403ff8[_0x525237(0x2de)]=!![]));},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x772)]=Game_BattlerBase[_0x34b3e3(0x237)][_0x34b3e3(0x419)],Game_BattlerBase['prototype'][_0x34b3e3(0x419)]=function(){const _0x1fda59=_0x34b3e3;this[_0x1fda59(0x387)]={},VisuMZ[_0x1fda59(0x4d5)][_0x1fda59(0x772)][_0x1fda59(0x267)](this);},VisuMZ[_0x34b3e3(0x4d5)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x34b3e3(0x237)][_0x34b3e3(0x6ba)],Game_BattlerBase[_0x34b3e3(0x237)][_0x34b3e3(0x6ba)]=function(){const _0x51f1c7=_0x34b3e3;this['_cache']={},VisuMZ[_0x51f1c7(0x4d5)]['Game_BattlerBase_refresh']['call'](this);},Game_BattlerBase['prototype'][_0x34b3e3(0x1ed)]=function(_0x2c01dd){const _0x1f3e8a=_0x34b3e3;return this[_0x1f3e8a(0x387)]=this[_0x1f3e8a(0x387)]||{},this[_0x1f3e8a(0x387)][_0x2c01dd]!==undefined;},VisuMZ[_0x34b3e3(0x4d5)]['JsReplaceUserVar']=function(_0x4e375b){const _0x2fddf8=_0x34b3e3;return _0x4e375b=_0x4e375b||'',_0x4e375b='\x20'+_0x4e375b,(VisuMZ['CoreEngine']['Settings']['Param'][_0x2fddf8(0x5d6)]??!![])&&(_0x4e375b=_0x4e375b[_0x2fddf8(0x7f8)](/\s(?:USER|THIS)\.mhp\b/gi,'this.paramBase(0)'),_0x4e375b=_0x4e375b[_0x2fddf8(0x7f8)](/\s(?:USER|THIS)\.mmp\b/gi,'this.paramBase(1)'),_0x4e375b=_0x4e375b[_0x2fddf8(0x7f8)](/\s(?:USER|THIS)\.atk\b/gi,_0x2fddf8(0x87f)),_0x4e375b=_0x4e375b['replace'](/\s(?:USER|THIS)\.def\b/gi,'this.paramBase(3)'),_0x4e375b=_0x4e375b[_0x2fddf8(0x7f8)](/\s(?:USER|THIS)\.mat\b/gi,'this.paramBase(4)'),_0x4e375b=_0x4e375b['replace'](/\s(?:USER|THIS)\.mdf\b/gi,_0x2fddf8(0x5c9)),_0x4e375b=_0x4e375b[_0x2fddf8(0x7f8)](/\s(?:USER|THIS)\.agi\b/gi,_0x2fddf8(0x13a)),_0x4e375b=_0x4e375b['replace'](/\s(?:USER|THIS)\.luk\b/gi,_0x2fddf8(0x833)),_0x4e375b=_0x4e375b['replace'](/\s(?:USER|THIS)\.param\(/gi,_0x2fddf8(0x6d5))),_0x4e375b=_0x4e375b[_0x2fddf8(0x7f8)](/\suser\./gi,_0x2fddf8(0x784)),_0x4e375b;},Game_BattlerBase['prototype']['paramPlus']=function(_0x58a4cc){const _0x4070ea=_0x34b3e3,_0x573a7c=(_0x57a1ef,_0x895d42)=>{const _0x5ce168=_0x2daf;if(!_0x895d42)return _0x57a1ef;if(_0x895d42['note'][_0x5ce168(0x39c)](VisuMZ[_0x5ce168(0x4d5)][_0x5ce168(0x141)][_0x5ce168(0x384)][_0x58a4cc])){var _0x5cdef1=Number(RegExp['$1']);_0x57a1ef+=_0x5cdef1;}if(_0x895d42['note'][_0x5ce168(0x39c)](VisuMZ[_0x5ce168(0x4d5)]['RegExp'][_0x5ce168(0x1bf)][_0x58a4cc])){var _0x5222c3=String(RegExp['$1']);_0x5222c3=VisuMZ['CoreEngine'][_0x5ce168(0x3f2)](_0x5222c3);try{_0x57a1ef+=eval(_0x5222c3);}catch(_0xada625){if($gameTemp[_0x5ce168(0x8f3)]())console['log'](_0xada625);}}return _0x57a1ef;};return this[_0x4070ea(0x53d)]()[_0x4070ea(0x348)](_0x573a7c,this[_0x4070ea(0x791)][_0x58a4cc]);},Game_BattlerBase[_0x34b3e3(0x237)][_0x34b3e3(0x3bb)]=function(_0x31a2a9){const _0x342d00=_0x34b3e3;var _0x6e7ad7=_0x342d00(0x552)+(this[_0x342d00(0x7ab)]()?_0x342d00(0x1e4):'Enemy')+_0x342d00(0x4dd)+_0x31a2a9;if(this[_0x342d00(0x1ed)](_0x6e7ad7))return this['_cache'][_0x6e7ad7];this['_cache'][_0x6e7ad7]=eval(VisuMZ[_0x342d00(0x4d5)][_0x342d00(0x2fb)][_0x342d00(0x3a9)][_0x6e7ad7]);const _0x8e839c=(_0x8ada62,_0x388299)=>{const _0x1337e7=_0x342d00;if(!_0x388299)return _0x8ada62;if(_0x388299[_0x1337e7(0x39a)][_0x1337e7(0x39c)](VisuMZ[_0x1337e7(0x4d5)][_0x1337e7(0x141)][_0x1337e7(0x3bb)][_0x31a2a9])){var _0x209a78=Number(RegExp['$1']);if(_0x209a78===0x0)_0x209a78=Number[_0x1337e7(0x5e0)];_0x8ada62=Math[_0x1337e7(0x7ef)](_0x8ada62,_0x209a78);}if(_0x388299['note'][_0x1337e7(0x39c)](VisuMZ[_0x1337e7(0x4d5)][_0x1337e7(0x141)][_0x1337e7(0x42f)][_0x31a2a9])){var _0x3fc420=String(RegExp['$1']);_0x3fc420=VisuMZ[_0x1337e7(0x4d5)][_0x1337e7(0x3f2)](_0x3fc420);try{_0x8ada62=Math[_0x1337e7(0x7ef)](_0x8ada62,Number(eval(_0x3fc420)));}catch(_0x1467bb){if($gameTemp[_0x1337e7(0x8f3)]())console[_0x1337e7(0x79f)](_0x1467bb);}}return _0x8ada62;};if(this[_0x342d00(0x387)][_0x6e7ad7]===0x0)this[_0x342d00(0x387)][_0x6e7ad7]=Number[_0x342d00(0x5e0)];return this['_cache'][_0x6e7ad7]=this[_0x342d00(0x53d)]()[_0x342d00(0x348)](_0x8e839c,this['_cache'][_0x6e7ad7]),this[_0x342d00(0x387)][_0x6e7ad7];},Game_BattlerBase['prototype'][_0x34b3e3(0x634)]=function(_0x3109cc){const _0x1ab2c9=_0x34b3e3,_0x53f56f=this['traitsPi'](Game_BattlerBase[_0x1ab2c9(0x627)],_0x3109cc),_0x2522a0=(_0x1c3645,_0xa2337a)=>{const _0x5d17f2=_0x1ab2c9;if(!_0xa2337a)return _0x1c3645;if(_0xa2337a[_0x5d17f2(0x39a)][_0x5d17f2(0x39c)](VisuMZ[_0x5d17f2(0x4d5)][_0x5d17f2(0x141)][_0x5d17f2(0x2f0)][_0x3109cc])){var _0x224530=Number(RegExp['$1'])/0x64;_0x1c3645*=_0x224530;}if(_0xa2337a['note'][_0x5d17f2(0x39c)](VisuMZ[_0x5d17f2(0x4d5)]['RegExp']['paramRate2'][_0x3109cc])){var _0x224530=Number(RegExp['$1']);_0x1c3645*=_0x224530;}if(_0xa2337a[_0x5d17f2(0x39a)][_0x5d17f2(0x39c)](VisuMZ[_0x5d17f2(0x4d5)][_0x5d17f2(0x141)][_0x5d17f2(0x2db)][_0x3109cc])){var _0x4ab3b0=String(RegExp['$1']);_0x4ab3b0=VisuMZ['CoreEngine'][_0x5d17f2(0x3f2)](_0x4ab3b0);try{_0x1c3645*=eval(_0x4ab3b0);}catch(_0x16b1c6){if($gameTemp[_0x5d17f2(0x8f3)]())console[_0x5d17f2(0x79f)](_0x16b1c6);}}return _0x1c3645;};return this['traitObjects']()[_0x1ab2c9(0x348)](_0x2522a0,_0x53f56f);},Game_BattlerBase[_0x34b3e3(0x237)][_0x34b3e3(0x549)]=function(_0x1d6a3a){const _0x2f7625=_0x34b3e3,_0x3b5a86=(_0x58eb55,_0x47bcf6)=>{const _0x1448d5=_0x2daf;if(!_0x47bcf6)return _0x58eb55;if(_0x47bcf6[_0x1448d5(0x39a)][_0x1448d5(0x39c)](VisuMZ[_0x1448d5(0x4d5)][_0x1448d5(0x141)]['paramFlat'][_0x1d6a3a])){var _0x368a18=Number(RegExp['$1']);_0x58eb55+=_0x368a18;}if(_0x47bcf6['note'][_0x1448d5(0x39c)](VisuMZ['CoreEngine'][_0x1448d5(0x141)][_0x1448d5(0x88c)][_0x1d6a3a])){var _0x3109d9=String(RegExp['$1']);_0x3109d9=VisuMZ[_0x1448d5(0x4d5)][_0x1448d5(0x3f2)](_0x3109d9);try{_0x58eb55+=eval(_0x3109d9);}catch(_0x32fafb){if($gameTemp[_0x1448d5(0x8f3)]())console[_0x1448d5(0x79f)](_0x32fafb);}}return _0x58eb55;};return this[_0x2f7625(0x53d)]()[_0x2f7625(0x348)](_0x3b5a86,0x0);},Game_BattlerBase['prototype'][_0x34b3e3(0x673)]=function(_0x3372e1){const _0x51b995=_0x34b3e3;let _0x302b62=_0x51b995(0x673)+_0x3372e1+_0x51b995(0x44f);if(this[_0x51b995(0x1ed)](_0x302b62))return this['_cache'][_0x302b62];return this[_0x51b995(0x387)][_0x302b62]=Math[_0x51b995(0x59e)](VisuMZ[_0x51b995(0x4d5)][_0x51b995(0x2fb)]['Param'][_0x51b995(0x7c3)][_0x51b995(0x267)](this,_0x3372e1)),this['_cache'][_0x302b62];},Game_BattlerBase[_0x34b3e3(0x237)][_0x34b3e3(0x511)]=function(_0x158396){const _0x571f33=_0x34b3e3,_0xb80ef2=(_0x14a797,_0x1bf640)=>{const _0x3e599c=_0x2daf;if(!_0x1bf640)return _0x14a797;if(_0x1bf640['note'][_0x3e599c(0x39c)](VisuMZ[_0x3e599c(0x4d5)]['RegExp'][_0x3e599c(0x4cf)][_0x158396])){var _0x182d34=Number(RegExp['$1'])/0x64;_0x14a797+=_0x182d34;}if(_0x1bf640[_0x3e599c(0x39a)][_0x3e599c(0x39c)](VisuMZ[_0x3e599c(0x4d5)][_0x3e599c(0x141)][_0x3e599c(0x561)][_0x158396])){var _0x182d34=Number(RegExp['$1']);_0x14a797+=_0x182d34;}if(_0x1bf640[_0x3e599c(0x39a)][_0x3e599c(0x39c)](VisuMZ['CoreEngine'][_0x3e599c(0x141)][_0x3e599c(0x566)][_0x158396])){var _0x4dcf64=String(RegExp['$1']);_0x4dcf64=VisuMZ[_0x3e599c(0x4d5)]['JsReplaceUserVar'](_0x4dcf64);try{_0x14a797+=eval(_0x4dcf64);}catch(_0x110aa8){if($gameTemp['isPlaytest']())console['log'](_0x110aa8);}}return _0x14a797;};return this['traitObjects']()[_0x571f33(0x348)](_0xb80ef2,0x0);},Game_BattlerBase[_0x34b3e3(0x237)]['xparamRate']=function(_0x22b27e){const _0x3bbafa=_0x34b3e3,_0x33e3f4=(_0x416e47,_0x32d558)=>{const _0x264654=_0x2daf;if(!_0x32d558)return _0x416e47;if(_0x32d558[_0x264654(0x39a)][_0x264654(0x39c)](VisuMZ[_0x264654(0x4d5)][_0x264654(0x141)][_0x264654(0x8ff)][_0x22b27e])){var _0x4e4b55=Number(RegExp['$1'])/0x64;_0x416e47*=_0x4e4b55;}if(_0x32d558[_0x264654(0x39a)][_0x264654(0x39c)](VisuMZ[_0x264654(0x4d5)]['RegExp'][_0x264654(0x8c1)][_0x22b27e])){var _0x4e4b55=Number(RegExp['$1']);_0x416e47*=_0x4e4b55;}if(_0x32d558['note'][_0x264654(0x39c)](VisuMZ['CoreEngine'][_0x264654(0x141)]['xparamRateJS'][_0x22b27e])){var _0x1c041c=String(RegExp['$1']);_0x1c041c=VisuMZ['CoreEngine'][_0x264654(0x3f2)](_0x1c041c);try{_0x416e47*=eval(_0x1c041c);}catch(_0x98b804){if($gameTemp[_0x264654(0x8f3)]())console['log'](_0x98b804);}}return _0x416e47;};return this[_0x3bbafa(0x53d)]()[_0x3bbafa(0x348)](_0x33e3f4,0x1);},Game_BattlerBase[_0x34b3e3(0x237)][_0x34b3e3(0x8e4)]=function(_0x13e79d){const _0x15b6e2=_0x34b3e3,_0x30c1ef=(_0x2b3ef2,_0xf08cc2)=>{const _0xf91bf6=_0x2daf;if(!_0xf08cc2)return _0x2b3ef2;if(_0xf08cc2[_0xf91bf6(0x39a)][_0xf91bf6(0x39c)](VisuMZ['CoreEngine'][_0xf91bf6(0x141)][_0xf91bf6(0x753)][_0x13e79d])){var _0x2cc9cd=Number(RegExp['$1'])/0x64;_0x2b3ef2+=_0x2cc9cd;}if(_0xf08cc2[_0xf91bf6(0x39a)]['match'](VisuMZ[_0xf91bf6(0x4d5)][_0xf91bf6(0x141)][_0xf91bf6(0x454)][_0x13e79d])){var _0x2cc9cd=Number(RegExp['$1']);_0x2b3ef2+=_0x2cc9cd;}if(_0xf08cc2[_0xf91bf6(0x39a)][_0xf91bf6(0x39c)](VisuMZ['CoreEngine'][_0xf91bf6(0x141)]['xparamFlatJS'][_0x13e79d])){var _0x226306=String(RegExp['$1']);_0x226306=VisuMZ[_0xf91bf6(0x4d5)]['JsReplaceUserVar'](_0x226306);try{_0x2b3ef2+=eval(_0x226306);}catch(_0x24f339){if($gameTemp[_0xf91bf6(0x8f3)]())console[_0xf91bf6(0x79f)](_0x24f339);}}return _0x2b3ef2;};return this['traitObjects']()[_0x15b6e2(0x348)](_0x30c1ef,0x0);},Game_BattlerBase[_0x34b3e3(0x237)][_0x34b3e3(0x453)]=function(_0x14293e){const _0xa5efe4=_0x34b3e3;let _0x301aa6=_0xa5efe4(0x453)+_0x14293e+_0xa5efe4(0x44f);if(this[_0xa5efe4(0x1ed)](_0x301aa6))return this[_0xa5efe4(0x387)][_0x301aa6];return this[_0xa5efe4(0x387)][_0x301aa6]=VisuMZ[_0xa5efe4(0x4d5)][_0xa5efe4(0x2fb)][_0xa5efe4(0x3a9)][_0xa5efe4(0x37e)][_0xa5efe4(0x267)](this,_0x14293e),this[_0xa5efe4(0x387)][_0x301aa6];},Game_BattlerBase[_0x34b3e3(0x237)][_0x34b3e3(0x284)]=function(_0x4950bb){const _0x250d61=_0x34b3e3,_0x2f4f93=(_0x44e8cb,_0xe2ea1c)=>{const _0x10add8=_0x2daf;if(!_0xe2ea1c)return _0x44e8cb;if(_0xe2ea1c[_0x10add8(0x39a)]['match'](VisuMZ[_0x10add8(0x4d5)][_0x10add8(0x141)]['sparamPlus1'][_0x4950bb])){var _0x5ee3e8=Number(RegExp['$1'])/0x64;_0x44e8cb+=_0x5ee3e8;}if(_0xe2ea1c[_0x10add8(0x39a)][_0x10add8(0x39c)](VisuMZ[_0x10add8(0x4d5)][_0x10add8(0x141)]['sparamPlus2'][_0x4950bb])){var _0x5ee3e8=Number(RegExp['$1']);_0x44e8cb+=_0x5ee3e8;}if(_0xe2ea1c[_0x10add8(0x39a)][_0x10add8(0x39c)](VisuMZ[_0x10add8(0x4d5)]['RegExp'][_0x10add8(0x231)][_0x4950bb])){var _0x5bd8b3=String(RegExp['$1']);_0x5bd8b3=VisuMZ[_0x10add8(0x4d5)]['JsReplaceUserVar'](_0x5bd8b3);try{_0x44e8cb+=eval(_0x5bd8b3);}catch(_0x223f48){if($gameTemp[_0x10add8(0x8f3)]())console[_0x10add8(0x79f)](_0x223f48);}}return _0x44e8cb;};return this[_0x250d61(0x53d)]()[_0x250d61(0x348)](_0x2f4f93,0x0);},Game_BattlerBase[_0x34b3e3(0x237)]['sparamRate']=function(_0x3266d4){const _0x2e65d8=_0x34b3e3,_0x411338=(_0x50d900,_0xaac43d)=>{const _0x510063=_0x2daf;if(!_0xaac43d)return _0x50d900;if(_0xaac43d[_0x510063(0x39a)][_0x510063(0x39c)](VisuMZ['CoreEngine'][_0x510063(0x141)][_0x510063(0x1ae)][_0x3266d4])){var _0x2ad7db=Number(RegExp['$1'])/0x64;_0x50d900*=_0x2ad7db;}if(_0xaac43d['note'][_0x510063(0x39c)](VisuMZ[_0x510063(0x4d5)][_0x510063(0x141)][_0x510063(0x68d)][_0x3266d4])){var _0x2ad7db=Number(RegExp['$1']);_0x50d900*=_0x2ad7db;}if(_0xaac43d['note'][_0x510063(0x39c)](VisuMZ[_0x510063(0x4d5)][_0x510063(0x141)][_0x510063(0x7cc)][_0x3266d4])){var _0x533455=String(RegExp['$1']);_0x533455=VisuMZ[_0x510063(0x4d5)][_0x510063(0x3f2)](_0x533455);try{_0x50d900*=eval(_0x533455);}catch(_0x475b4a){if($gameTemp[_0x510063(0x8f3)]())console[_0x510063(0x79f)](_0x475b4a);}}return _0x50d900;};return this[_0x2e65d8(0x53d)]()[_0x2e65d8(0x348)](_0x411338,0x1);},Game_BattlerBase[_0x34b3e3(0x237)][_0x34b3e3(0x347)]=function(_0x3f6979){const _0x51ffda=_0x34b3e3,_0x4074fa=(_0x3facd8,_0x35246b)=>{const _0x76ba1c=_0x2daf;if(!_0x35246b)return _0x3facd8;if(_0x35246b['note'][_0x76ba1c(0x39c)](VisuMZ[_0x76ba1c(0x4d5)][_0x76ba1c(0x141)][_0x76ba1c(0x50b)][_0x3f6979])){var _0x14454f=Number(RegExp['$1'])/0x64;_0x3facd8+=_0x14454f;}if(_0x35246b[_0x76ba1c(0x39a)][_0x76ba1c(0x39c)](VisuMZ[_0x76ba1c(0x4d5)]['RegExp'][_0x76ba1c(0x863)][_0x3f6979])){var _0x14454f=Number(RegExp['$1']);_0x3facd8+=_0x14454f;}if(_0x35246b[_0x76ba1c(0x39a)]['match'](VisuMZ['CoreEngine'][_0x76ba1c(0x141)][_0x76ba1c(0x60f)][_0x3f6979])){var _0x3e3341=String(RegExp['$1']);_0x3e3341=VisuMZ['CoreEngine'][_0x76ba1c(0x3f2)](_0x3e3341);try{_0x3facd8+=eval(_0x3e3341);}catch(_0x520c69){if($gameTemp[_0x76ba1c(0x8f3)]())console[_0x76ba1c(0x79f)](_0x520c69);}}return _0x3facd8;};return this['traitObjects']()[_0x51ffda(0x348)](_0x4074fa,0x0);},Game_BattlerBase[_0x34b3e3(0x237)][_0x34b3e3(0x6e5)]=function(_0x2e57fa){const _0x2f54bb=_0x34b3e3;let _0xf68ea=_0x2f54bb(0x6e5)+_0x2e57fa+'Total';if(this[_0x2f54bb(0x1ed)](_0xf68ea))return this['_cache'][_0xf68ea];return this[_0x2f54bb(0x387)][_0xf68ea]=VisuMZ[_0x2f54bb(0x4d5)][_0x2f54bb(0x2fb)][_0x2f54bb(0x3a9)][_0x2f54bb(0x422)][_0x2f54bb(0x267)](this,_0x2e57fa),this['_cache'][_0xf68ea];},Game_BattlerBase['prototype'][_0x34b3e3(0x877)]=function(_0x56f9c8,_0x38a5ff){const _0xab180c=_0x34b3e3;if(typeof paramId==='number')return this[_0xab180c(0x673)](_0x56f9c8);_0x56f9c8=String(_0x56f9c8||'')[_0xab180c(0x515)]();if(_0x56f9c8===_0xab180c(0x5ae))return this[_0xab180c(0x673)](0x0);if(_0x56f9c8==='MAXMP')return this['param'](0x1);if(_0x56f9c8===_0xab180c(0x452))return this[_0xab180c(0x673)](0x2);if(_0x56f9c8===_0xab180c(0x8b5))return this[_0xab180c(0x673)](0x3);if(_0x56f9c8==='MAT')return this[_0xab180c(0x673)](0x4);if(_0x56f9c8===_0xab180c(0x825))return this[_0xab180c(0x673)](0x5);if(_0x56f9c8==='AGI')return this['param'](0x6);if(_0x56f9c8===_0xab180c(0x2a1))return this[_0xab180c(0x673)](0x7);if(_0x56f9c8===_0xab180c(0x8d1))return _0x38a5ff?String(Math[_0xab180c(0x59e)](this[_0xab180c(0x453)](0x0)*0x64))+'%':this[_0xab180c(0x453)](0x0);if(_0x56f9c8==='EVA')return _0x38a5ff?String(Math['round'](this[_0xab180c(0x453)](0x1)*0x64))+'%':this[_0xab180c(0x453)](0x1);if(_0x56f9c8===_0xab180c(0x2e9))return _0x38a5ff?String(Math[_0xab180c(0x59e)](this[_0xab180c(0x453)](0x2)*0x64))+'%':this[_0xab180c(0x453)](0x2);if(_0x56f9c8==='CEV')return _0x38a5ff?String(Math[_0xab180c(0x59e)](this[_0xab180c(0x453)](0x3)*0x64))+'%':this[_0xab180c(0x453)](0x3);if(_0x56f9c8===_0xab180c(0x850))return _0x38a5ff?String(Math['round'](this[_0xab180c(0x453)](0x4)*0x64))+'%':this[_0xab180c(0x453)](0x4);if(_0x56f9c8==='MRF')return _0x38a5ff?String(Math[_0xab180c(0x59e)](this['xparam'](0x5)*0x64))+'%':this[_0xab180c(0x453)](0x5);if(_0x56f9c8===_0xab180c(0x2a9))return _0x38a5ff?String(Math['round'](this['xparam'](0x6)*0x64))+'%':this[_0xab180c(0x453)](0x6);if(_0x56f9c8===_0xab180c(0x84f))return _0x38a5ff?String(Math[_0xab180c(0x59e)](this[_0xab180c(0x453)](0x7)*0x64))+'%':this[_0xab180c(0x453)](0x7);if(_0x56f9c8===_0xab180c(0x189))return _0x38a5ff?String(Math[_0xab180c(0x59e)](this[_0xab180c(0x453)](0x8)*0x64))+'%':this[_0xab180c(0x453)](0x8);if(_0x56f9c8===_0xab180c(0x421))return _0x38a5ff?String(Math[_0xab180c(0x59e)](this['xparam'](0x9)*0x64))+'%':this[_0xab180c(0x453)](0x9);if(_0x56f9c8===_0xab180c(0x7b4))return _0x38a5ff?String(Math[_0xab180c(0x59e)](this[_0xab180c(0x6e5)](0x0)*0x64))+'%':this[_0xab180c(0x6e5)](0x0);if(_0x56f9c8===_0xab180c(0x343))return _0x38a5ff?String(Math[_0xab180c(0x59e)](this['sparam'](0x1)*0x64))+'%':this[_0xab180c(0x6e5)](0x1);if(_0x56f9c8===_0xab180c(0x342))return _0x38a5ff?String(Math['round'](this[_0xab180c(0x6e5)](0x2)*0x64))+'%':this[_0xab180c(0x6e5)](0x2);if(_0x56f9c8===_0xab180c(0x34f))return _0x38a5ff?String(Math[_0xab180c(0x59e)](this[_0xab180c(0x6e5)](0x3)*0x64))+'%':this[_0xab180c(0x6e5)](0x3);if(_0x56f9c8===_0xab180c(0x42c))return _0x38a5ff?String(Math['round'](this[_0xab180c(0x6e5)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x56f9c8===_0xab180c(0x8a2))return _0x38a5ff?String(Math[_0xab180c(0x59e)](this[_0xab180c(0x6e5)](0x5)*0x64))+'%':this[_0xab180c(0x6e5)](0x5);if(_0x56f9c8==='PDR')return _0x38a5ff?String(Math['round'](this[_0xab180c(0x6e5)](0x6)*0x64))+'%':this[_0xab180c(0x6e5)](0x6);if(_0x56f9c8==='MDR')return _0x38a5ff?String(Math[_0xab180c(0x59e)](this[_0xab180c(0x6e5)](0x7)*0x64))+'%':this[_0xab180c(0x6e5)](0x7);if(_0x56f9c8===_0xab180c(0x1db))return _0x38a5ff?String(Math[_0xab180c(0x59e)](this[_0xab180c(0x6e5)](0x8)*0x64))+'%':this[_0xab180c(0x6e5)](0x8);if(_0x56f9c8===_0xab180c(0x4d9))return _0x38a5ff?String(Math[_0xab180c(0x59e)](this[_0xab180c(0x6e5)](0x9)*0x64))+'%':this[_0xab180c(0x6e5)](0x9);if(VisuMZ[_0xab180c(0x4d5)][_0xab180c(0x4f7)][_0x56f9c8]){const _0x58abef=VisuMZ[_0xab180c(0x4d5)]['CustomParamAbb'][_0x56f9c8],_0x328972=this[_0x58abef];return VisuMZ['CoreEngine'][_0xab180c(0x399)][_0x56f9c8]===_0xab180c(0x33d)?_0x328972:_0x38a5ff?String(Math[_0xab180c(0x59e)](_0x328972*0x64))+'%':_0x328972;}return'';},Game_BattlerBase['prototype']['isDying']=function(){const _0x1b86a4=_0x34b3e3;return this[_0x1b86a4(0x5de)]()&&this[_0x1b86a4(0x373)]<this[_0x1b86a4(0x66e)]*VisuMZ['CoreEngine'][_0x1b86a4(0x2fb)]['Param'][_0x1b86a4(0x353)];},Game_Battler[_0x34b3e3(0x237)][_0x34b3e3(0x3d0)]=function(){const _0x59073b=_0x34b3e3;SoundManager[_0x59073b(0x175)](),this['requestMotion']('evade');},VisuMZ['CoreEngine'][_0x34b3e3(0x1ff)]=Game_Actor[_0x34b3e3(0x237)][_0x34b3e3(0x2b5)],Game_Actor['prototype']['paramBase']=function(_0xb79e1a){const _0x205ccb=_0x34b3e3;if(this[_0x205ccb(0x619)]>0x63)return this['paramBaseAboveLevel99'](_0xb79e1a);return VisuMZ[_0x205ccb(0x4d5)][_0x205ccb(0x1ff)][_0x205ccb(0x267)](this,_0xb79e1a);},Game_Actor[_0x34b3e3(0x237)]['paramBaseAboveLevel99']=function(_0x2915e2){const _0x2d373f=_0x34b3e3,_0x51f70a=this[_0x2d373f(0x867)]()['params'][_0x2915e2][0x63],_0x1d5bb4=this['currentClass']()[_0x2d373f(0x3c6)][_0x2915e2][0x62];return _0x51f70a+(_0x51f70a-_0x1d5bb4)*(this['level']-0x63);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x376)]=Game_Actor[_0x34b3e3(0x237)][_0x34b3e3(0x6fb)],Game_Actor[_0x34b3e3(0x237)]['changeClass']=function(_0x5165bf,_0x530354){const _0x31c834=_0x34b3e3;$gameTemp['_changingClass']=!![],VisuMZ['CoreEngine'][_0x31c834(0x376)][_0x31c834(0x267)](this,_0x5165bf,_0x530354),$gameTemp[_0x31c834(0x69f)]=undefined;},VisuMZ[_0x34b3e3(0x4d5)]['Game_Actor_levelUp']=Game_Actor[_0x34b3e3(0x237)]['levelUp'],Game_Actor[_0x34b3e3(0x237)][_0x34b3e3(0x797)]=function(){const _0x4a80bb=_0x34b3e3;VisuMZ['CoreEngine']['Game_Actor_levelUp'][_0x4a80bb(0x267)](this);if(!$gameTemp['_changingClass'])this['levelUpRecovery']();},Game_Actor[_0x34b3e3(0x237)][_0x34b3e3(0x733)]=function(){const _0xaf13e4=_0x34b3e3;this[_0xaf13e4(0x387)]={};if(VisuMZ[_0xaf13e4(0x4d5)][_0xaf13e4(0x2fb)][_0xaf13e4(0x1f5)][_0xaf13e4(0x33b)])this['_hp']=this['mhp'];if(VisuMZ['CoreEngine'][_0xaf13e4(0x2fb)]['QoL']['LevelUpFullMp'])this['_mp']=this[_0xaf13e4(0x654)];},Game_Actor[_0x34b3e3(0x237)][_0x34b3e3(0x6bb)]=function(){const _0x53bdf2=_0x34b3e3;if(this[_0x53bdf2(0x72a)]())return 0x1;const _0x52bf67=this[_0x53bdf2(0x5bd)]()-this[_0x53bdf2(0x7d7)](),_0x30e00e=this[_0x53bdf2(0x5d0)]()-this[_0x53bdf2(0x7d7)]();return(_0x30e00e/_0x52bf67)['clamp'](0x0,0x1);},Game_Actor[_0x34b3e3(0x237)]['traitObjects']=function(){const _0x197aea=_0x34b3e3,_0x323e55=Game_Battler[_0x197aea(0x237)][_0x197aea(0x53d)]['call'](this);for(const _0xbbf01f of this['equips']()){_0xbbf01f&&_0x323e55[_0x197aea(0x1b7)](_0xbbf01f);}return _0x323e55[_0x197aea(0x1b7)](this[_0x197aea(0x867)](),this[_0x197aea(0x535)]()),_0x323e55;},VisuMZ['CoreEngine'][_0x34b3e3(0x811)]=Game_Actor[_0x34b3e3(0x237)][_0x34b3e3(0x326)],Game_Actor[_0x34b3e3(0x237)]['isPreserveTp']=function(){const _0x88e222=_0x34b3e3;if(!$gameParty['inBattle']())return!![];return VisuMZ[_0x88e222(0x4d5)][_0x88e222(0x811)][_0x88e222(0x267)](this);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x499)]=Game_Unit[_0x34b3e3(0x237)][_0x34b3e3(0x6bc)],Game_Unit[_0x34b3e3(0x237)][_0x34b3e3(0x6bc)]=function(_0x39ff86){const _0x2ec2c0=_0x34b3e3;this[_0x2ec2c0(0x73b)]=!![],VisuMZ[_0x2ec2c0(0x4d5)][_0x2ec2c0(0x499)]['call'](this,_0x39ff86);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x27a)]=Game_Unit[_0x34b3e3(0x237)][_0x34b3e3(0x66a)],Game_Unit['prototype']['onBattleEnd']=function(){const _0x46f476=_0x34b3e3;for(const _0x35b4dd of this['members']()){_0x35b4dd&&!_0x35b4dd[_0x46f476(0x326)]()&&_0x35b4dd[_0x46f476(0x33e)]();}VisuMZ[_0x46f476(0x4d5)][_0x46f476(0x27a)][_0x46f476(0x267)](this);},Object[_0x34b3e3(0x3d6)](Game_Enemy['prototype'],_0x34b3e3(0x619),{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy[_0x34b3e3(0x237)][_0x34b3e3(0x65f)]=function(){const _0x4cb8c2=_0x34b3e3;return this[_0x4cb8c2(0x89f)]()[_0x4cb8c2(0x619)];},Game_Enemy[_0x34b3e3(0x237)][_0x34b3e3(0x527)]=function(){const _0xfc1330=_0x34b3e3;!this['_repositioned']&&(this[_0xfc1330(0x590)]+=Math[_0xfc1330(0x59e)]((Graphics[_0xfc1330(0x5f4)]-0x270)/0x2),this[_0xfc1330(0x590)]-=Math[_0xfc1330(0x6ef)]((Graphics[_0xfc1330(0x5f4)]-Graphics[_0xfc1330(0x182)])/0x2),$gameSystem[_0xfc1330(0x1e6)]()?this[_0xfc1330(0x829)]-=Math['floor']((Graphics['width']-Graphics[_0xfc1330(0x79c)])/0x2):this['_screenX']+=Math[_0xfc1330(0x59e)]((Graphics[_0xfc1330(0x79c)]-0x330)/0x2)),this['_repositioned']=!![];},Game_Party['prototype']['maxGold']=function(){const _0x228be3=_0x34b3e3;return VisuMZ[_0x228be3(0x4d5)][_0x228be3(0x2fb)][_0x228be3(0x31c)][_0x228be3(0x6c5)];},VisuMZ['CoreEngine'][_0x34b3e3(0x183)]=Game_Party[_0x34b3e3(0x237)][_0x34b3e3(0x630)],Game_Party[_0x34b3e3(0x237)][_0x34b3e3(0x630)]=function(_0x2f2630){const _0x29ebe5=_0x34b3e3;if(VisuMZ[_0x29ebe5(0x4d5)][_0x29ebe5(0x2fb)][_0x29ebe5(0x1f5)][_0x29ebe5(0x837)]&&DataManager[_0x29ebe5(0x29f)](_0x2f2630))return;VisuMZ[_0x29ebe5(0x4d5)]['Game_Party_consumeItem']['call'](this,_0x2f2630);},Game_Party[_0x34b3e3(0x237)][_0x34b3e3(0x321)]=function(){const _0x3dba0a=_0x34b3e3,_0x19105e=VisuMZ[_0x3dba0a(0x4d5)][_0x3dba0a(0x2fb)][_0x3dba0a(0x1f5)],_0x3b30ef=_0x19105e[_0x3dba0a(0x3b1)]??0x63;let _0x4fcd9d=[];(_0x19105e[_0x3dba0a(0x8b6)]??!![])&&(_0x4fcd9d=_0x4fcd9d[_0x3dba0a(0x8b2)]($dataItems));(_0x19105e[_0x3dba0a(0x2d2)]??!![])&&(_0x4fcd9d=_0x4fcd9d[_0x3dba0a(0x8b2)]($dataWeapons));(_0x19105e[_0x3dba0a(0x4b0)]??!![])&&(_0x4fcd9d=_0x4fcd9d['concat']($dataArmors));for(const _0x3dc454 of _0x4fcd9d){if(!_0x3dc454)continue;if(_0x3dc454['name']['trim']()<=0x0)continue;if(_0x3dc454[_0x3dba0a(0x650)]['match'](/-----/i))continue;this[_0x3dba0a(0x50a)](_0x3dc454,_0x3b30ef);}},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x6ed)]=Game_Troop[_0x34b3e3(0x237)][_0x34b3e3(0x58a)],Game_Troop[_0x34b3e3(0x237)][_0x34b3e3(0x58a)]=function(_0xe9eece){const _0x445d09=_0x34b3e3;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp['applyForcedGameTroopSettingsCoreEngine'](_0xe9eece),VisuMZ[_0x445d09(0x4d5)]['Game_Troop_setup'][_0x445d09(0x267)](this,_0xe9eece);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x551)]=Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x58a)],Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x58a)]=function(_0x41baaf){const _0x2c7b28=_0x34b3e3;VisuMZ[_0x2c7b28(0x4d5)][_0x2c7b28(0x551)]['call'](this,_0x41baaf),this['checkCoreEngineDisplayCenter'](),this[_0x2c7b28(0x529)](_0x41baaf),this[_0x2c7b28(0x161)]();},Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x529)]=function(){const _0x24641f=_0x34b3e3;this['_hideTileShadows']=VisuMZ[_0x24641f(0x4d5)]['Settings']['QoL'][_0x24641f(0x539)]||![];const _0x41dea2=VisuMZ[_0x24641f(0x4d5)][_0x24641f(0x2fb)][_0x24641f(0x838)],_0x52374c=$dataMap?$dataMap[_0x24641f(0x39a)]||'':'';if(_0x52374c['match'](/<SHOW TILE SHADOWS>/i))this['_hideTileShadows']=![];else _0x52374c[_0x24641f(0x39c)](/<HIDE TILE SHADOWS>/i)&&(this[_0x24641f(0x588)]=!![]);if(_0x52374c['match'](/<SCROLL LOCK X>/i))this['centerCameraCheckData']()[_0x24641f(0x29b)]=!![],this[_0x24641f(0x5b0)]()['displayX']=_0x41dea2['DisplayLockX'];else _0x52374c[_0x24641f(0x39c)](/<SCROLL LOCK X: (.*?)>/i)&&(this['centerCameraCheckData']()[_0x24641f(0x29b)]=!![],this[_0x24641f(0x5b0)]()[_0x24641f(0x4d7)]=Number(RegExp['$1']));if(_0x52374c['match'](/<SCROLL LOCK Y>/i))this[_0x24641f(0x5b0)]()[_0x24641f(0x507)]=!![],this[_0x24641f(0x5b0)]()[_0x24641f(0x45e)]=_0x41dea2[_0x24641f(0x716)];else _0x52374c[_0x24641f(0x39c)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x24641f(0x5b0)]()[_0x24641f(0x507)]=!![],this[_0x24641f(0x5b0)]()[_0x24641f(0x45e)]=Number(RegExp['$1']));},Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x4d8)]=function(){const _0x21fbd5=_0x34b3e3;if(this['_hideTileShadows']===undefined)this[_0x21fbd5(0x529)]();return this[_0x21fbd5(0x588)];},Game_Map[_0x34b3e3(0x237)]['checkCoreEngineDisplayCenter']=function(){const _0x3dc54d=_0x34b3e3,_0xee4ca7=VisuMZ[_0x3dc54d(0x4d5)][_0x3dc54d(0x2fb)]['ScreenResolution'];this['_centerCameraCheck']={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0xee4ca7['AutoScrollLockX']){const _0x241931=Graphics[_0x3dc54d(0x4c5)]/this[_0x3dc54d(0x460)]();_0x241931%0x1!==0x0&&Math[_0x3dc54d(0x1ce)](_0x241931)===this[_0x3dc54d(0x4c5)]()&&!this[_0x3dc54d(0x7ca)]()&&(this[_0x3dc54d(0x86f)]['centerX']=!![],this[_0x3dc54d(0x86f)]['displayX']=_0xee4ca7[_0x3dc54d(0x775)]||0x0);}if(_0xee4ca7['AutoScrollLockY']){const _0x3ffec1=Graphics[_0x3dc54d(0x5f4)]/this[_0x3dc54d(0x771)]();_0x3ffec1%0x1!==0x0&&Math['ceil'](_0x3ffec1)===this[_0x3dc54d(0x5f4)]()&&!this[_0x3dc54d(0x636)]()&&(this[_0x3dc54d(0x86f)][_0x3dc54d(0x507)]=!![],this[_0x3dc54d(0x86f)][_0x3dc54d(0x45e)]=_0xee4ca7['DisplayLockY']||0x0);}$gameScreen['zoomScale']()===0x1&&(this[_0x3dc54d(0x5b0)]()[_0x3dc54d(0x29b)]&&(this['_displayX']=this['centerCameraCheckData']()['displayX']),this[_0x3dc54d(0x5b0)]()['centerY']&&(this[_0x3dc54d(0x1d5)]=this[_0x3dc54d(0x5b0)]()['displayY']));},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x604)]=Game_Map['prototype'][_0x34b3e3(0x5aa)],Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x5aa)]=function(_0x7aec28,_0x5a30ac){const _0x2355da=_0x34b3e3;VisuMZ['CoreEngine'][_0x2355da(0x604)]['call'](this,_0x7aec28,_0x5a30ac),$gameScreen[_0x2355da(0x394)]()===0x1&&(!this[_0x2355da(0x7ca)]()&&this['centerCameraCheckData']()['centerX']&&(this[_0x2355da(0x7d1)]=this[_0x2355da(0x5b0)]()[_0x2355da(0x4d7)]),!this['isLoopVertical']()&&this[_0x2355da(0x5b0)]()[_0x2355da(0x507)]&&(this[_0x2355da(0x1d5)]=this[_0x2355da(0x5b0)]()[_0x2355da(0x45e)]));},Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x5b0)]=function(){const _0x8482c9=_0x34b3e3;if(this['_centerCameraCheck']===undefined)this[_0x8482c9(0x32b)]();return this['_centerCameraCheck'];},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x70d)]=Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x5be)],Game_Map[_0x34b3e3(0x237)]['scrollDown']=function(_0x15e089){const _0x341d3c=_0x34b3e3;if(this['centerCameraCheckData']()['centerY']&&$gameScreen[_0x341d3c(0x394)]()===0x1){this[_0x341d3c(0x1d5)]=this[_0x341d3c(0x5b0)]()[_0x341d3c(0x45e)];return;}VisuMZ[_0x341d3c(0x4d5)][_0x341d3c(0x70d)]['call'](this,_0x15e089);},VisuMZ['CoreEngine'][_0x34b3e3(0x759)]=Game_Map['prototype'][_0x34b3e3(0x469)],Game_Map['prototype']['scrollLeft']=function(_0x5d3900){const _0x174677=_0x34b3e3;if(this[_0x174677(0x5b0)]()[_0x174677(0x29b)]&&$gameScreen[_0x174677(0x394)]()===0x1){this[_0x174677(0x7d1)]=this[_0x174677(0x5b0)]()[_0x174677(0x4d7)];return;}VisuMZ[_0x174677(0x4d5)]['Game_Map_scrollLeft'][_0x174677(0x267)](this,_0x5d3900);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x35e)]=Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x497)],Game_Map['prototype'][_0x34b3e3(0x497)]=function(_0x17102e){const _0x214e4d=_0x34b3e3;if(this['centerCameraCheckData']()[_0x214e4d(0x29b)]&&$gameScreen[_0x214e4d(0x394)]()===0x1){this['_displayX']=this[_0x214e4d(0x5b0)]()[_0x214e4d(0x4d7)];return;}VisuMZ[_0x214e4d(0x4d5)][_0x214e4d(0x35e)][_0x214e4d(0x267)](this,_0x17102e);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x4d4)]=Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x198)],Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x198)]=function(_0x166680){const _0x5c4d3a=_0x34b3e3;if(this[_0x5c4d3a(0x5b0)]()[_0x5c4d3a(0x507)]&&$gameScreen[_0x5c4d3a(0x394)]()===0x1){this[_0x5c4d3a(0x1d5)]=this[_0x5c4d3a(0x5b0)]()[_0x5c4d3a(0x45e)];return;}VisuMZ[_0x5c4d3a(0x4d5)][_0x5c4d3a(0x4d4)]['call'](this,_0x166680);},Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x161)]=function(){const _0x538242=_0x34b3e3;this[_0x538242(0x8ee)]={};const _0x11829c=this[_0x538242(0x2a2)]();if(!_0x11829c)return{};const _0x41ca83=_0x11829c[_0x538242(0x39a)]||'',_0x159df4=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0xae519f={};const _0x356b22=_0x41ca83[_0x538242(0x39c)](_0x159df4);if(_0x356b22)for(const _0x27cb07 of _0x356b22){_0x27cb07[_0x538242(0x39c)](_0x159df4);const _0x4267a6=Number(RegExp['$1'])['clamp'](0x1,0x10),_0x1550d5=String(RegExp['$2'])[_0x538242(0x53b)](',')[_0x538242(0x8ce)](_0x54b82e=>Number(_0x54b82e)[_0x538242(0x62e)](0x1,0x7));for(const _0x1d2b82 of _0x1550d5){_0xae519f[_0x1d2b82]=_0x4267a6;}}this[_0x538242(0x8ee)]=_0xae519f;},Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x599)]=function(){const _0xddc80a=_0x34b3e3;if(this[_0xddc80a(0x8ee)]===undefined)this[_0xddc80a(0x161)]();return this[_0xddc80a(0x8ee)];},Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x411)]=function(_0x2e577f){const _0x296207=_0x34b3e3;if(_0x2e577f>=0x400)return![];const _0x5e860d=$gameMap[_0x296207(0x599)]();if(Object[_0x296207(0x1c1)](_0x5e860d)[_0x296207(0x1ee)]<=0x0)return![];const _0x43ecf5=this[_0x296207(0x2dd)](),_0x6dd330=_0x43ecf5[_0x2e577f]>>0xc,_0x492796=_0x5e860d[_0x6dd330]||0x0;return _0x492796>0x0;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x239)]=Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x567)],Game_Map['prototype'][_0x34b3e3(0x567)]=function(_0x98ce09){const _0x32d722=_0x34b3e3;VisuMZ['CoreEngine']['Game_Map_changeTileset'][_0x32d722(0x267)](this,_0x98ce09),this['refreshSpritesetForExtendedTiles'](),SceneManager['_scene']['_spriteset']['update']();},Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x30d)]=function(){const _0x10d249=_0x34b3e3,_0x4b0744=this[_0x10d249(0x599)]();if(Object['keys'](_0x4b0744)['length']<=0x0)return;const _0x2af7e4=SceneManager[_0x10d249(0x44b)][_0x10d249(0x5b8)];_0x2af7e4&&(_0x2af7e4[_0x10d249(0x302)]&&_0x2af7e4[_0x10d249(0x302)](),_0x2af7e4[_0x10d249(0x346)]&&_0x2af7e4[_0x10d249(0x346)]());},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x89e)]=Game_Character[_0x34b3e3(0x237)][_0x34b3e3(0x5d5)],Game_Character[_0x34b3e3(0x237)][_0x34b3e3(0x5d5)]=function(_0x579d47){const _0x4af296=_0x34b3e3;try{VisuMZ[_0x4af296(0x4d5)][_0x4af296(0x89e)]['call'](this,_0x579d47);}catch(_0xb0b600){if($gameTemp[_0x4af296(0x8f3)]())console[_0x4af296(0x79f)](_0xb0b600);}},Game_Player[_0x34b3e3(0x237)][_0x34b3e3(0x8a5)]=function(){const _0xfb0919=_0x34b3e3,_0x372a94=$gameMap[_0xfb0919(0x741)]();this[_0xfb0919(0x52c)]=Math['randomInt'](_0x372a94)+Math[_0xfb0919(0x592)](_0x372a94)+this['encounterStepsMinimum']();},Game_Player[_0x34b3e3(0x237)][_0x34b3e3(0x276)]=function(){const _0x3b5a8e=_0x34b3e3;return $dataMap&&$dataMap['note']&&$dataMap[_0x3b5a8e(0x39a)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x3b5a8e(0x4d5)][_0x3b5a8e(0x2fb)][_0x3b5a8e(0x1f5)][_0x3b5a8e(0x632)];},VisuMZ[_0x34b3e3(0x4d5)]['Game_Event_isCollidedWithEvents']=Game_Event[_0x34b3e3(0x237)][_0x34b3e3(0x7dc)],Game_Event[_0x34b3e3(0x237)][_0x34b3e3(0x7dc)]=function(_0x37478a,_0x3955ea){const _0xe2c0a2=_0x34b3e3;return this['isSmartEventCollisionOn']()?this[_0xe2c0a2(0x1f3)](_0x37478a,_0x3955ea):VisuMZ['CoreEngine'][_0xe2c0a2(0x668)]['call'](this,_0x37478a,_0x3955ea);},Game_Event[_0x34b3e3(0x237)]['isSmartEventCollisionOn']=function(){const _0x353a48=_0x34b3e3;return VisuMZ[_0x353a48(0x4d5)][_0x353a48(0x2fb)][_0x353a48(0x1f5)][_0x353a48(0x1a2)];},Game_Event['prototype'][_0x34b3e3(0x1f3)]=function(_0x45ac9d,_0x38ca39){const _0x2528f0=_0x34b3e3;if(!this[_0x2528f0(0x392)]())return![];else{const _0x29a136=$gameMap[_0x2528f0(0x506)](_0x45ac9d,_0x38ca39)[_0x2528f0(0x14d)](_0x1cd72f=>_0x1cd72f['isNormalPriority']());return _0x29a136[_0x2528f0(0x1ee)]>0x0;}},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x60a)]=Game_Interpreter['prototype'][_0x34b3e3(0x1d7)],Game_Interpreter['prototype'][_0x34b3e3(0x1d7)]=function(_0x1f1645){const _0xe0700d=_0x34b3e3,_0x319a43=this['getCombinedScrollingText']();return _0x319a43[_0xe0700d(0x39c)](/\/\/[ ]SCRIPT[ ]CALL/i)?this['runCombinedScrollingTextAsCode'](_0x319a43):VisuMZ[_0xe0700d(0x4d5)]['Game_Interpreter_command105'][_0xe0700d(0x267)](this,_0x1f1645);},Game_Interpreter['prototype']['getCombinedScrollingText']=function(){const _0x1d2750=_0x34b3e3;let _0x4a2298='',_0x344ac3=this[_0x1d2750(0x3b3)]+0x1;while(this[_0x1d2750(0x61d)][_0x344ac3]&&this['_list'][_0x344ac3][_0x1d2750(0x36e)]===0x195){_0x4a2298+=this[_0x1d2750(0x61d)][_0x344ac3][_0x1d2750(0x7e2)][0x0]+'\x0a',_0x344ac3++;}return _0x4a2298;},Game_Interpreter[_0x34b3e3(0x237)][_0x34b3e3(0x6cf)]=function(_0x4cd680){const _0x2b8e68=_0x34b3e3;try{eval(_0x4cd680);}catch(_0x564c2d){$gameTemp['isPlaytest']()&&(console['log'](_0x2b8e68(0x52a)),console[_0x2b8e68(0x79f)](_0x564c2d));}return!![];},VisuMZ[_0x34b3e3(0x4d5)]['Game_Interpreter_command111']=Game_Interpreter[_0x34b3e3(0x237)][_0x34b3e3(0x1f1)],Game_Interpreter[_0x34b3e3(0x237)][_0x34b3e3(0x1f1)]=function(_0xb6f008){const _0x46b556=_0x34b3e3;try{VisuMZ['CoreEngine']['Game_Interpreter_command111'][_0x46b556(0x267)](this,_0xb6f008);}catch(_0x59d36e){$gameTemp[_0x46b556(0x8f3)]()&&(console[_0x46b556(0x79f)](_0x46b556(0x71c)),console[_0x46b556(0x79f)](_0x59d36e)),this[_0x46b556(0x230)]();}return!![];},VisuMZ['CoreEngine'][_0x34b3e3(0x4b7)]=Game_Interpreter['prototype'][_0x34b3e3(0x864)],Game_Interpreter[_0x34b3e3(0x237)][_0x34b3e3(0x864)]=function(_0x10d0f9){const _0x319efc=_0x34b3e3;try{VisuMZ[_0x319efc(0x4d5)][_0x319efc(0x4b7)][_0x319efc(0x267)](this,_0x10d0f9);}catch(_0x4cb9ca){$gameTemp[_0x319efc(0x8f3)]()&&(console['log'](_0x319efc(0x2f8)),console[_0x319efc(0x79f)](_0x4cb9ca));}return!![];},VisuMZ['CoreEngine'][_0x34b3e3(0x26b)]=Game_Interpreter[_0x34b3e3(0x237)][_0x34b3e3(0x8f1)],Game_Interpreter[_0x34b3e3(0x237)][_0x34b3e3(0x8f1)]=function(){const _0x479f9c=_0x34b3e3;try{VisuMZ[_0x479f9c(0x4d5)][_0x479f9c(0x26b)][_0x479f9c(0x267)](this);}catch(_0x13eefd){$gameTemp['isPlaytest']()&&(console['log']('Script\x20Call\x20Error'),console[_0x479f9c(0x79f)](_0x13eefd));}return!![];},VisuMZ['CoreEngine'][_0x34b3e3(0x477)]=Game_Interpreter['prototype'][_0x34b3e3(0x889)],Game_Interpreter[_0x34b3e3(0x237)]['command357']=function(_0x1fb6c9){const _0x121044=_0x34b3e3;return $gameTemp[_0x121044(0x68b)](this),VisuMZ[_0x121044(0x4d5)][_0x121044(0x477)][_0x121044(0x267)](this,_0x1fb6c9);},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x46d)]=function(){const _0x21e037=_0x34b3e3;return VisuMZ[_0x21e037(0x4d5)][_0x21e037(0x2fb)]['UI'][_0x21e037(0x155)];},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x15a)]=function(){const _0x2ca9fe=_0x34b3e3;return VisuMZ[_0x2ca9fe(0x4d5)]['Settings']['UI']['BottomHelp'];},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x3a5)]=function(){const _0x3dd79d=_0x34b3e3;return VisuMZ['CoreEngine']['Settings']['UI'][_0x3dd79d(0x756)];},Scene_Base[_0x34b3e3(0x237)]['isRightInputMode']=function(){const _0x5ddcf5=_0x34b3e3;return VisuMZ[_0x5ddcf5(0x4d5)][_0x5ddcf5(0x2fb)]['UI'][_0x5ddcf5(0x4bd)];},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x736)]=function(){const _0x49bcc0=_0x34b3e3;return VisuMZ[_0x49bcc0(0x4d5)][_0x49bcc0(0x2fb)]['UI'][_0x49bcc0(0x890)];},Scene_Base[_0x34b3e3(0x237)]['buttonAreaHeight']=function(){const _0xad7a69=_0x34b3e3;return VisuMZ[_0xad7a69(0x4d5)]['Settings']['UI'][_0xad7a69(0x380)];},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x11c)]=function(){const _0x31d29e=_0x34b3e3;return VisuMZ[_0x31d29e(0x4d5)][_0x31d29e(0x2fb)][_0x31d29e(0x1b4)]['EnableMasking'];},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x139)]=Scene_Base[_0x34b3e3(0x237)]['createWindowLayer'],Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x51c)]=function(){const _0x4e262f=_0x34b3e3;VisuMZ[_0x4e262f(0x4d5)]['Scene_Base_createWindowLayer'][_0x4e262f(0x267)](this),this[_0x4e262f(0x2e2)](),this['createTextPopupWindow'](),this[_0x4e262f(0x40f)]['x']=Math[_0x4e262f(0x59e)](this[_0x4e262f(0x40f)]['x']),this[_0x4e262f(0x40f)]['y']=Math[_0x4e262f(0x59e)](this[_0x4e262f(0x40f)]['y']);},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x2e2)]=function(){},Scene_Base['prototype']['createTextPopupWindow']=function(){const _0x1ea6a6=_0x34b3e3;this[_0x1ea6a6(0x3a0)]=new Window_TextPopup(),this['addChild'](this[_0x1ea6a6(0x3a0)]);},$textPopup=function(_0x5dfefe){const _0x1c80c5=_0x34b3e3,_0x7a326d=SceneManager[_0x1c80c5(0x44b)][_0x1c80c5(0x3a0)];_0x7a326d&&_0x7a326d[_0x1c80c5(0x493)](_0x5dfefe);},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x475)]=function(){const _0x55b9e1=_0x34b3e3;return TextManager[_0x55b9e1(0x23e)]('pageup',_0x55b9e1(0x891));},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x17a)]=function(){const _0x17519a=_0x34b3e3;return TextManager[_0x17519a(0x525)](_0x17519a(0x196));},Scene_Base['prototype'][_0x34b3e3(0x505)]=function(){const _0x29a976=_0x34b3e3;return TextManager['getInputButtonString'](_0x29a976(0x778));},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x140)]=function(){const _0x128b60=_0x34b3e3;return TextManager[_0x128b60(0x525)]('ok');},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x171)]=function(){const _0x35e009=_0x34b3e3;return TextManager[_0x35e009(0x525)](_0x35e009(0x55a));},Scene_Base[_0x34b3e3(0x237)]['buttonAssistText1']=function(){const _0x528d0c=_0x34b3e3;return this[_0x528d0c(0x730)]&&this[_0x528d0c(0x730)][_0x528d0c(0x2d8)]?TextManager[_0x528d0c(0x19a)]:'';},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x4f2)]=function(){return'';},Scene_Base[_0x34b3e3(0x237)]['buttonAssistText3']=function(){return'';},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x404)]=function(){return TextManager['buttonAssistOk'];},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x66d)]=function(){const _0x7535f7=_0x34b3e3;return TextManager[_0x7535f7(0x8fd)];},Scene_Base['prototype'][_0x34b3e3(0x36c)]=function(){return 0x0;},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x692)]=function(){return 0x0;},Scene_Base['prototype'][_0x34b3e3(0x415)]=function(){return 0x0;},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x6b9)]=function(){return 0x0;},Scene_Base[_0x34b3e3(0x237)][_0x34b3e3(0x240)]=function(){return 0x0;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x4a0)]=Scene_Boot[_0x34b3e3(0x237)][_0x34b3e3(0x1f0)],Scene_Boot[_0x34b3e3(0x237)][_0x34b3e3(0x1f0)]=function(){const _0x37f897=_0x34b3e3;VisuMZ['CoreEngine'][_0x37f897(0x4a0)][_0x37f897(0x267)](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x34b3e3(0x237)]['loadGameImagesCoreEngine']=function(){const _0x28c074=_0x34b3e3,_0x4556a6=[_0x28c074(0x265),'battlebacks1',_0x28c074(0x429),_0x28c074(0x1dd),_0x28c074(0x6fc),_0x28c074(0x532),_0x28c074(0x64f),_0x28c074(0x655),'sv_actors','sv_enemies','system','tilesets',_0x28c074(0x313),'titles2'];for(const _0x288cb9 of _0x4556a6){const _0xecdefe=VisuMZ['CoreEngine']['Settings']['ImgLoad'][_0x288cb9],_0x523745=_0x28c074(0x899)[_0x28c074(0x577)](_0x288cb9);for(const _0x42e572 of _0xecdefe){ImageManager[_0x28c074(0x463)](_0x523745,_0x42e572);}}},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x1c5)]=Scene_Boot[_0x34b3e3(0x237)][_0x34b3e3(0x2dc)],Scene_Boot[_0x34b3e3(0x237)][_0x34b3e3(0x2dc)]=function(){const _0x12ba6d=_0x34b3e3;Utils[_0x12ba6d(0x88d)](_0x12ba6d(0x3e9))&&VisuMZ[_0x12ba6d(0x4d5)]['Settings'][_0x12ba6d(0x1f5)][_0x12ba6d(0x526)]?this[_0x12ba6d(0x699)]():VisuMZ[_0x12ba6d(0x4d5)][_0x12ba6d(0x1c5)][_0x12ba6d(0x267)](this);},Scene_Boot['prototype'][_0x34b3e3(0x699)]=function(){const _0x3f63b2=_0x34b3e3;this[_0x3f63b2(0x640)](),DataManager['setupNewGame'](),SceneManager[_0x3f63b2(0x5ba)](Scene_Map);},Scene_Boot[_0x34b3e3(0x237)]['adjustBoxSize']=function(){const _0x316a9f=_0x34b3e3,_0x21131e=$dataSystem[_0x316a9f(0x6f8)][_0x316a9f(0x76b)],_0x21cb60=$dataSystem[_0x316a9f(0x6f8)][_0x316a9f(0x65b)],_0x1f0ab7=VisuMZ[_0x316a9f(0x4d5)][_0x316a9f(0x2fb)]['UI'][_0x316a9f(0x268)];Graphics['boxWidth']=_0x21131e-_0x1f0ab7*0x2,Graphics[_0x316a9f(0x182)]=_0x21cb60-_0x1f0ab7*0x2,this[_0x316a9f(0x57a)]();},VisuMZ[_0x34b3e3(0x4d5)]['Scene_Boot_updateDocumentTitle']=Scene_Boot[_0x34b3e3(0x237)][_0x34b3e3(0x29e)],Scene_Boot[_0x34b3e3(0x237)][_0x34b3e3(0x29e)]=function(){const _0x309378=_0x34b3e3;this[_0x309378(0x119)]()?this[_0x309378(0x898)]():VisuMZ['CoreEngine'][_0x309378(0x8c9)][_0x309378(0x267)](this);},Scene_Boot[_0x34b3e3(0x237)][_0x34b3e3(0x119)]=function(){const _0x125f2a=_0x34b3e3;if(Scene_Title[_0x125f2a(0x492)]==='')return![];if(Scene_Title[_0x125f2a(0x492)]===_0x125f2a(0x852))return![];if(Scene_Title[_0x125f2a(0x500)]==='')return![];if(Scene_Title['version']===_0x125f2a(0x720))return![];return!![];},Scene_Boot[_0x34b3e3(0x237)][_0x34b3e3(0x898)]=function(){const _0x50f68e=_0x34b3e3,_0x2b3499=$dataSystem['gameTitle'],_0xcf1ca4=Scene_Title[_0x50f68e(0x492)]||'',_0x7c5f1e=Scene_Title[_0x50f68e(0x500)]||'',_0x515a4a=VisuMZ[_0x50f68e(0x4d5)][_0x50f68e(0x2fb)][_0x50f68e(0x44e)][_0x50f68e(0x504)][_0x50f68e(0x3df)],_0x59a0c9=_0x515a4a[_0x50f68e(0x577)](_0x2b3499,_0xcf1ca4,_0x7c5f1e);document[_0x50f68e(0x4f6)]=_0x59a0c9;},Scene_Boot[_0x34b3e3(0x237)][_0x34b3e3(0x57a)]=function(){const _0x3e6b06=_0x34b3e3;if(VisuMZ[_0x3e6b06(0x4d5)][_0x3e6b06(0x2fb)]['UI'][_0x3e6b06(0x2eb)]){const _0x2bbdaf=Graphics[_0x3e6b06(0x4c5)]-Graphics[_0x3e6b06(0x79c)]-VisuMZ[_0x3e6b06(0x4d5)]['Settings']['UI'][_0x3e6b06(0x268)]*0x2,_0x14e2c3=Sprite_Button['prototype']['blockWidth']['call'](this)*0x4;if(_0x2bbdaf>=_0x14e2c3)SceneManager[_0x3e6b06(0x7cb)](!![]);}},Scene_Title[_0x34b3e3(0x492)]=VisuMZ['CoreEngine'][_0x34b3e3(0x2fb)][_0x34b3e3(0x44e)][_0x34b3e3(0x504)]['Subtitle'],Scene_Title[_0x34b3e3(0x500)]=VisuMZ[_0x34b3e3(0x4d5)]['Settings'][_0x34b3e3(0x44e)][_0x34b3e3(0x504)]['Version'],Scene_Title[_0x34b3e3(0x220)]=VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)][_0x34b3e3(0x382)],VisuMZ['CoreEngine'][_0x34b3e3(0x397)]=Scene_Title[_0x34b3e3(0x237)][_0x34b3e3(0x73e)],Scene_Title['prototype'][_0x34b3e3(0x73e)]=function(){const _0x167f39=_0x34b3e3;VisuMZ[_0x167f39(0x4d5)]['Settings']['MenuLayout'][_0x167f39(0x504)][_0x167f39(0x73e)][_0x167f39(0x267)](this);if(Scene_Title[_0x167f39(0x492)]!==''&&Scene_Title[_0x167f39(0x492)]!==_0x167f39(0x852))this[_0x167f39(0x47c)]();if(Scene_Title['version']!==''&&Scene_Title[_0x167f39(0x500)]!==_0x167f39(0x720))this[_0x167f39(0x317)]();},Scene_Title[_0x34b3e3(0x237)][_0x34b3e3(0x47c)]=function(){const _0x2215e5=_0x34b3e3;VisuMZ[_0x2215e5(0x4d5)][_0x2215e5(0x2fb)][_0x2215e5(0x44e)][_0x2215e5(0x504)][_0x2215e5(0x47c)][_0x2215e5(0x267)](this);},Scene_Title[_0x34b3e3(0x237)][_0x34b3e3(0x317)]=function(){const _0x3a0e60=_0x34b3e3;VisuMZ[_0x3a0e60(0x4d5)][_0x3a0e60(0x2fb)][_0x3a0e60(0x44e)]['Title']['drawGameVersion'][_0x3a0e60(0x267)](this);},Scene_Title[_0x34b3e3(0x237)]['createCommandWindow']=function(){const _0xbbddf3=_0x34b3e3;this[_0xbbddf3(0x464)]();const _0x27da18=$dataSystem[_0xbbddf3(0x766)][_0xbbddf3(0x6a2)],_0x4694de=this[_0xbbddf3(0x2c9)]();this[_0xbbddf3(0x81e)]=new Window_TitleCommand(_0x4694de),this[_0xbbddf3(0x81e)]['setBackgroundType'](_0x27da18);const _0x5c9fe2=this[_0xbbddf3(0x2c9)]();this['_commandWindow'][_0xbbddf3(0x285)](_0x5c9fe2['x'],_0x5c9fe2['y'],_0x5c9fe2[_0xbbddf3(0x4c5)],_0x5c9fe2['height']),this[_0xbbddf3(0x81e)][_0xbbddf3(0x5bc)](),this[_0xbbddf3(0x81e)][_0xbbddf3(0x6ba)](),this[_0xbbddf3(0x81e)][_0xbbddf3(0x363)](),this['addWindow'](this[_0xbbddf3(0x81e)]);},Scene_Title[_0x34b3e3(0x237)]['commandWindowRows']=function(){const _0x1e0f7c=_0x34b3e3;return this[_0x1e0f7c(0x81e)]?this[_0x1e0f7c(0x81e)][_0x1e0f7c(0x6d3)]():VisuMZ['CoreEngine'][_0x1e0f7c(0x2fb)][_0x1e0f7c(0x2f1)][_0x1e0f7c(0x1ee)];},Scene_Title[_0x34b3e3(0x237)][_0x34b3e3(0x2c9)]=function(){const _0x5d6467=_0x34b3e3;return VisuMZ['CoreEngine'][_0x5d6467(0x2fb)][_0x5d6467(0x44e)][_0x5d6467(0x504)]['CommandRect'][_0x5d6467(0x267)](this);},Scene_Title['prototype'][_0x34b3e3(0x464)]=function(){const _0x388ecb=_0x34b3e3;for(const _0x476968 of Scene_Title[_0x388ecb(0x220)]){const _0x334c27=new Sprite_TitlePictureButton(_0x476968);this['addChild'](_0x334c27);}},VisuMZ['CoreEngine'][_0x34b3e3(0x866)]=Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x7e8)],Scene_Map[_0x34b3e3(0x237)]['initialize']=function(){const _0x1a772f=_0x34b3e3;VisuMZ['CoreEngine'][_0x1a772f(0x866)][_0x1a772f(0x267)](this),$gameTemp[_0x1a772f(0x1fe)](),this[_0x1a772f(0x3ba)]();},VisuMZ[_0x34b3e3(0x4d5)]['Scene_Map_updateMainMultiply']=Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x4d2)],Scene_Map[_0x34b3e3(0x237)]['updateMainMultiply']=function(){const _0x431dda=_0x34b3e3;VisuMZ[_0x431dda(0x4d5)][_0x431dda(0x216)][_0x431dda(0x267)](this),$gameTemp[_0x431dda(0x5bb)]&&!$gameMessage[_0x431dda(0x2a7)]()&&(this['updateMain'](),SceneManager[_0x431dda(0x7af)]());},Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x5f8)]=function(){const _0x200e15=_0x34b3e3;Scene_Message[_0x200e15(0x237)][_0x200e15(0x5f8)][_0x200e15(0x267)](this),!SceneManager[_0x200e15(0x14c)](Scene_Battle)&&(this[_0x200e15(0x5b8)][_0x200e15(0x6d2)](),this['_mapNameWindow']['hide'](),this[_0x200e15(0x40f)][_0x200e15(0x2d8)]=![],SceneManager[_0x200e15(0x66b)]()),$gameScreen[_0x200e15(0x5ef)](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x6d6)]=Scene_Map['prototype'][_0x34b3e3(0x8a1)],Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x8a1)]=function(){const _0x4802e6=_0x34b3e3;VisuMZ[_0x4802e6(0x4d5)][_0x4802e6(0x6d6)][_0x4802e6(0x267)](this),SceneManager['isSideButtonLayout']()&&this[_0x4802e6(0x4bb)]();},Scene_Map['prototype'][_0x34b3e3(0x4bb)]=function(){this['_menuButton']['x']=Graphics['boxWidth']+0x4;},VisuMZ['CoreEngine'][_0x34b3e3(0x4b6)]=Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x663)],Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x663)]=function(){const _0x14fe1d=_0x34b3e3;VisuMZ[_0x14fe1d(0x4d5)][_0x14fe1d(0x4b6)][_0x14fe1d(0x267)](this),this[_0x14fe1d(0x3bf)]();},Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x3bf)]=function(){const _0x56c709=_0x34b3e3;Input[_0x56c709(0x69e)](_0x56c709(0x6e4))&&(ConfigManager[_0x56c709(0x799)]=!ConfigManager[_0x56c709(0x799)],ConfigManager[_0x56c709(0x7fd)]());},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x299)]=Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x512)],Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x512)]=function(){const _0x4435a3=_0x34b3e3;VisuMZ[_0x4435a3(0x4d5)][_0x4435a3(0x299)][_0x4435a3(0x267)](this),this[_0x4435a3(0x6ff)]();},Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x3ba)]=function(){this['_onceParallelInterpreters']=[];},Scene_Map[_0x34b3e3(0x237)]['updateOnceParallelInterpreters']=function(){const _0x18ba77=_0x34b3e3;if(!this[_0x18ba77(0x72d)])return;for(const _0x4da393 of this['_onceParallelInterpreters']){_0x4da393&&_0x4da393[_0x18ba77(0x6d2)]();}},Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x69b)]=function(_0x21d4dd,_0x59a029){const _0x4b0bcf=_0x34b3e3,_0x5c1e1b=$dataCommonEvents[_0x21d4dd];if(!_0x5c1e1b)return;const _0x2095b3=new Game_OnceParallelInterpreter();this[_0x4b0bcf(0x40e)](_0x2095b3),_0x2095b3[_0x4b0bcf(0x160)](_0x21d4dd),_0x2095b3[_0x4b0bcf(0x67d)](_0x59a029);},Scene_Map[_0x34b3e3(0x237)]['addOnceParallelInterpreter']=function(_0x3661f3){const _0xd547ba=_0x34b3e3;this[_0xd547ba(0x72d)]=this['_onceParallelInterpreters']||[],this[_0xd547ba(0x72d)][_0xd547ba(0x1b7)](_0x3661f3);},Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x15c)]=function(_0x59a729){const _0x1ef8e2=_0x34b3e3;this['_onceParallelInterpreters']=this[_0x1ef8e2(0x72d)]||[],this[_0x1ef8e2(0x72d)][_0x1ef8e2(0x2fe)](_0x59a729);};function Game_OnceParallelInterpreter(){const _0x1a44fc=_0x34b3e3;this[_0x1a44fc(0x7e8)](...arguments);}Game_OnceParallelInterpreter[_0x34b3e3(0x237)]=Object[_0x34b3e3(0x3d7)](Game_Interpreter[_0x34b3e3(0x237)]),Game_OnceParallelInterpreter[_0x34b3e3(0x237)][_0x34b3e3(0x698)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x34b3e3(0x237)][_0x34b3e3(0x160)]=function(_0x458a1c){const _0x10b7bc=_0x34b3e3,_0x56967e=$dataCommonEvents[_0x458a1c];_0x56967e?this[_0x10b7bc(0x58a)](_0x56967e['list'],0x0):this[_0x10b7bc(0x5f8)]();},Game_OnceParallelInterpreter['prototype']['setEvent']=function(_0x33dcc5){const _0x2be7c5=_0x34b3e3;this[_0x2be7c5(0x329)]=_0x33dcc5||0x0;},Game_OnceParallelInterpreter[_0x34b3e3(0x237)][_0x34b3e3(0x5f8)]=function(){const _0x1ebc76=_0x34b3e3;if(!SceneManager[_0x1ebc76(0x5b1)]())return;SceneManager['_scene'][_0x1ebc76(0x15c)](this),Game_Interpreter['prototype']['terminate'][_0x1ebc76(0x267)](this);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2e1)]=Scene_MenuBase['prototype'][_0x34b3e3(0x163)],Scene_MenuBase[_0x34b3e3(0x237)][_0x34b3e3(0x163)]=function(){const _0x3ad51c=_0x34b3e3;let _0x3672b0=0x0;return SceneManager[_0x3ad51c(0x86c)]()?_0x3672b0=this[_0x3ad51c(0x598)]():_0x3672b0=VisuMZ[_0x3ad51c(0x4d5)]['Scene_MenuBase_helpAreaTop'][_0x3ad51c(0x267)](this),_0x3672b0;},Scene_MenuBase['prototype']['helpAreaTopSideButtonLayout']=function(){return this['isBottomHelpMode']()?this['mainAreaBottom']():0x0;},VisuMZ['CoreEngine'][_0x34b3e3(0x154)]=Scene_MenuBase[_0x34b3e3(0x237)][_0x34b3e3(0x12b)],Scene_MenuBase[_0x34b3e3(0x237)][_0x34b3e3(0x12b)]=function(){const _0x3ed3ee=_0x34b3e3;return SceneManager[_0x3ed3ee(0x86c)]()?this['mainAreaTopSideButtonLayout']():VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaTop'][_0x3ed3ee(0x267)](this);},Scene_MenuBase[_0x34b3e3(0x237)][_0x34b3e3(0x8c8)]=function(){const _0x3ea40e=_0x34b3e3;if(!this[_0x3ea40e(0x15a)]())return this[_0x3ea40e(0x135)]();else return this[_0x3ea40e(0x61a)]()&&this['getButtonAssistLocation']()===_0x3ea40e(0x794)?Window_ButtonAssist[_0x3ea40e(0x237)][_0x3ea40e(0x2fa)]():0x0;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x162)]=Scene_MenuBase[_0x34b3e3(0x237)][_0x34b3e3(0x631)],Scene_MenuBase[_0x34b3e3(0x237)][_0x34b3e3(0x631)]=function(){const _0x37a95f=_0x34b3e3;let _0x428049=0x0;return SceneManager[_0x37a95f(0x86c)]()?_0x428049=this[_0x37a95f(0x6f4)]():_0x428049=VisuMZ[_0x37a95f(0x4d5)][_0x37a95f(0x162)][_0x37a95f(0x267)](this),this['isMenuButtonAssistEnabled']()&&this[_0x37a95f(0x3d3)]()!==_0x37a95f(0x87b)&&(_0x428049-=Window_ButtonAssist['prototype'][_0x37a95f(0x2fa)]()),_0x428049;},Scene_MenuBase[_0x34b3e3(0x237)][_0x34b3e3(0x6f4)]=function(){const _0x23aaf2=_0x34b3e3;return Graphics[_0x23aaf2(0x182)]-this['helpAreaHeight']();},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x6b2)]=Scene_MenuBase['prototype']['createBackground'],Scene_MenuBase['prototype'][_0x34b3e3(0x610)]=function(){const _0x272b47=_0x34b3e3,_0x53bf86=VisuMZ['CoreEngine'][_0x272b47(0x2fb)][_0x272b47(0x3be)][_0x272b47(0x746)]??0x8;this['_backgroundFilter']=new PIXI[(_0x272b47(0x271))]['BlurFilter'](_0x53bf86),this[_0x272b47(0x708)]=new Sprite(),this[_0x272b47(0x708)][_0x272b47(0x401)]=SceneManager[_0x272b47(0x14b)](),this[_0x272b47(0x708)][_0x272b47(0x271)]=[this[_0x272b47(0x298)]],this[_0x272b47(0x341)](this[_0x272b47(0x708)]),this['setBackgroundOpacity'](0xc0),this[_0x272b47(0x6a9)](this[_0x272b47(0x621)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x34b3e3(0x237)]['getBackgroundOpacity']=function(){const _0x36c3cf=_0x34b3e3,_0xc147d6=String(this[_0x36c3cf(0x698)][_0x36c3cf(0x650)]),_0x4997f7=this[_0x36c3cf(0x372)](_0xc147d6);return _0x4997f7?_0x4997f7['SnapshotOpacity']:0xc0;},Scene_MenuBase['prototype'][_0x34b3e3(0x659)]=function(){const _0x408a44=_0x34b3e3,_0x54c33e=String(this[_0x408a44(0x698)][_0x408a44(0x650)]),_0x4a3ab6=this[_0x408a44(0x372)](_0x54c33e);_0x4a3ab6&&(_0x4a3ab6[_0x408a44(0x474)]!==''||_0x4a3ab6['BgFilename2']!=='')&&(this[_0x408a44(0x3b8)]=new Sprite(ImageManager[_0x408a44(0x32a)](_0x4a3ab6[_0x408a44(0x474)])),this[_0x408a44(0x608)]=new Sprite(ImageManager['loadTitle2'](_0x4a3ab6['BgFilename2'])),this[_0x408a44(0x341)](this[_0x408a44(0x3b8)]),this[_0x408a44(0x341)](this['_backSprite2']),this['_backSprite1'][_0x408a44(0x401)]['addLoadListener'](this[_0x408a44(0x192)][_0x408a44(0x2da)](this,this[_0x408a44(0x3b8)])),this[_0x408a44(0x608)][_0x408a44(0x401)][_0x408a44(0x55e)](this['adjustSprite']['bind'](this,this[_0x408a44(0x608)])));},Scene_MenuBase[_0x34b3e3(0x237)]['getCustomBackgroundSettings']=function(_0x5b80ce){const _0x3f19a7=_0x34b3e3;return VisuMZ[_0x3f19a7(0x4d5)][_0x3f19a7(0x2fb)][_0x3f19a7(0x3be)][_0x5b80ce]||VisuMZ[_0x3f19a7(0x4d5)][_0x3f19a7(0x2fb)][_0x3f19a7(0x3be)][_0x3f19a7(0x78c)];},Scene_MenuBase['prototype'][_0x34b3e3(0x192)]=function(_0x4320c5){const _0x33615e=_0x34b3e3;this[_0x33615e(0x318)](_0x4320c5),this[_0x33615e(0x21b)](_0x4320c5);},VisuMZ['CoreEngine'][_0x34b3e3(0x7ac)]=Scene_MenuBase[_0x34b3e3(0x237)][_0x34b3e3(0x5f1)],Scene_MenuBase[_0x34b3e3(0x237)][_0x34b3e3(0x5f1)]=function(){const _0x18ae09=_0x34b3e3;VisuMZ[_0x18ae09(0x4d5)]['Scene_MenuBase_createCancelButton'][_0x18ae09(0x267)](this),SceneManager[_0x18ae09(0x635)]()&&this[_0x18ae09(0x6d0)]();},Scene_MenuBase[_0x34b3e3(0x237)][_0x34b3e3(0x6d0)]=function(){const _0x259687=_0x34b3e3;this['_cancelButton']['x']=Graphics[_0x259687(0x79c)]+0x4;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x514)]=Scene_MenuBase[_0x34b3e3(0x237)][_0x34b3e3(0x170)],Scene_MenuBase[_0x34b3e3(0x237)]['createPageButtons']=function(){const _0x52cfdc=_0x34b3e3;VisuMZ[_0x52cfdc(0x4d5)][_0x52cfdc(0x514)][_0x52cfdc(0x267)](this),SceneManager[_0x52cfdc(0x635)]()&&this[_0x52cfdc(0x5ab)]();},Scene_MenuBase[_0x34b3e3(0x237)]['movePageButtonSideButtonLayout']=function(){const _0x2a4b4e=_0x34b3e3;this[_0x2a4b4e(0x730)]['x']=-0x1*(this[_0x2a4b4e(0x730)][_0x2a4b4e(0x4c5)]+this['_pagedownButton']['width']+0x8),this['_pagedownButton']['x']=-0x1*(this[_0x2a4b4e(0x53f)][_0x2a4b4e(0x4c5)]+0x4);},Scene_MenuBase[_0x34b3e3(0x237)][_0x34b3e3(0x61a)]=function(){const _0x3271d2=_0x34b3e3;return VisuMZ[_0x3271d2(0x4d5)][_0x3271d2(0x2fb)][_0x3271d2(0x7ee)][_0x3271d2(0x3fd)];},Scene_MenuBase[_0x34b3e3(0x237)][_0x34b3e3(0x3d3)]=function(){const _0x4b6811=_0x34b3e3;return SceneManager[_0x4b6811(0x635)]()||SceneManager[_0x4b6811(0x520)]()?VisuMZ[_0x4b6811(0x4d5)][_0x4b6811(0x2fb)][_0x4b6811(0x7ee)][_0x4b6811(0x3e7)]:_0x4b6811(0x87b);},Scene_MenuBase['prototype'][_0x34b3e3(0x2e2)]=function(){const _0x50731=_0x34b3e3;if(!this['isMenuButtonAssistEnabled']())return;const _0x5dac10=this[_0x50731(0x65d)]();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x5dac10),this[_0x50731(0x24f)](this[_0x50731(0x25e)]);},Scene_MenuBase['prototype'][_0x34b3e3(0x65d)]=function(){const _0x2f9e7c=_0x34b3e3;return this['getButtonAssistLocation']()===_0x2f9e7c(0x87b)?this[_0x2f9e7c(0x138)]():this[_0x2f9e7c(0x649)]();},Scene_MenuBase[_0x34b3e3(0x237)][_0x34b3e3(0x138)]=function(){const _0x26229e=_0x34b3e3,_0x596ae0=ConfigManager['touchUI']?(Sprite_Button['prototype'][_0x26229e(0x307)]()+0x6)*0x2:0x0,_0x4cb8d5=this[_0x26229e(0x3a1)](),_0x26aaed=Graphics['boxWidth']-_0x596ae0*0x2,_0x2357aa=this[_0x26229e(0x2c2)]();return new Rectangle(_0x596ae0,_0x4cb8d5,_0x26aaed,_0x2357aa);},Scene_MenuBase[_0x34b3e3(0x237)][_0x34b3e3(0x649)]=function(){const _0x5f1214=_0x34b3e3,_0xa556ab=Graphics[_0x5f1214(0x79c)],_0x50637d=Window_ButtonAssist[_0x5f1214(0x237)][_0x5f1214(0x2fa)](),_0x12f4a9=0x0;let _0x5ad8cb=0x0;return this[_0x5f1214(0x3d3)]()==='top'?_0x5ad8cb=0x0:_0x5ad8cb=Graphics[_0x5f1214(0x182)]-_0x50637d,new Rectangle(_0x12f4a9,_0x5ad8cb,_0xa556ab,_0x50637d);},Scene_Menu[_0x34b3e3(0x503)]=VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)]['MenuLayout'][_0x34b3e3(0x8c7)],VisuMZ['CoreEngine'][_0x34b3e3(0x77f)]=Scene_Menu[_0x34b3e3(0x237)][_0x34b3e3(0x3d7)],Scene_Menu[_0x34b3e3(0x237)][_0x34b3e3(0x3d7)]=function(){const _0x34c35b=_0x34b3e3;VisuMZ['CoreEngine']['Scene_Menu_create'][_0x34c35b(0x267)](this),this[_0x34c35b(0x334)]();},Scene_Menu[_0x34b3e3(0x237)][_0x34b3e3(0x334)]=function(){const _0xc763af=_0x34b3e3;this[_0xc763af(0x81e)]&&this['_commandWindow'][_0xc763af(0x81b)](Scene_Menu['layoutSettings'][_0xc763af(0x22d)]),this[_0xc763af(0x1d6)]&&this['_goldWindow']['setBackgroundType'](Scene_Menu[_0xc763af(0x503)][_0xc763af(0x418)]),this[_0xc763af(0x2c6)]&&this[_0xc763af(0x2c6)][_0xc763af(0x81b)](Scene_Menu['layoutSettings'][_0xc763af(0x85c)]);},Scene_Menu[_0x34b3e3(0x237)]['commandWindowRect']=function(){const _0x559146=_0x34b3e3;return Scene_Menu[_0x559146(0x503)][_0x559146(0x152)][_0x559146(0x267)](this);},Scene_Menu[_0x34b3e3(0x237)][_0x34b3e3(0x702)]=function(){const _0x298fd9=_0x34b3e3;return Scene_Menu[_0x298fd9(0x503)][_0x298fd9(0x144)]['call'](this);},Scene_Menu[_0x34b3e3(0x237)]['statusWindowRect']=function(){const _0x17a5a1=_0x34b3e3;return Scene_Menu['layoutSettings'][_0x17a5a1(0x7c8)][_0x17a5a1(0x267)](this);},Scene_Item[_0x34b3e3(0x503)]=VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)][_0x34b3e3(0x44e)][_0x34b3e3(0x5dd)],VisuMZ[_0x34b3e3(0x4d5)]['Scene_Item_create']=Scene_Item[_0x34b3e3(0x237)][_0x34b3e3(0x3d7)],Scene_Item[_0x34b3e3(0x237)][_0x34b3e3(0x3d7)]=function(){const _0x1212c7=_0x34b3e3;VisuMZ[_0x1212c7(0x4d5)][_0x1212c7(0x424)][_0x1212c7(0x267)](this),this[_0x1212c7(0x334)]();},Scene_Item[_0x34b3e3(0x237)]['setCoreEngineUpdateWindowBg']=function(){const _0x1fefe1=_0x34b3e3;this[_0x1fefe1(0x697)]&&this['_helpWindow'][_0x1fefe1(0x81b)](Scene_Item[_0x1fefe1(0x503)]['HelpBgType']),this[_0x1fefe1(0x31f)]&&this[_0x1fefe1(0x31f)][_0x1fefe1(0x81b)](Scene_Item[_0x1fefe1(0x503)]['CategoryBgType']),this[_0x1fefe1(0x364)]&&this[_0x1fefe1(0x364)][_0x1fefe1(0x81b)](Scene_Item[_0x1fefe1(0x503)][_0x1fefe1(0x2aa)]),this[_0x1fefe1(0x12d)]&&this[_0x1fefe1(0x12d)]['setBackgroundType'](Scene_Item['layoutSettings'][_0x1fefe1(0x31a)]);},Scene_Item[_0x34b3e3(0x237)]['helpWindowRect']=function(){const _0x4a1be2=_0x34b3e3;return Scene_Item['layoutSettings'][_0x4a1be2(0x38b)]['call'](this);},Scene_Item[_0x34b3e3(0x237)][_0x34b3e3(0x56f)]=function(){const _0x3e3279=_0x34b3e3;return Scene_Item['layoutSettings']['CategoryRect'][_0x3e3279(0x267)](this);},Scene_Item[_0x34b3e3(0x237)][_0x34b3e3(0x682)]=function(){const _0x215acc=_0x34b3e3;return Scene_Item[_0x215acc(0x503)][_0x215acc(0x6b5)][_0x215acc(0x267)](this);},Scene_Item[_0x34b3e3(0x237)][_0x34b3e3(0x4e2)]=function(){const _0x54e80f=_0x34b3e3;return Scene_Item[_0x54e80f(0x503)][_0x54e80f(0x7df)][_0x54e80f(0x267)](this);},Scene_Skill[_0x34b3e3(0x503)]=VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)]['MenuLayout'][_0x34b3e3(0x41a)],VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x286)]=Scene_Skill['prototype'][_0x34b3e3(0x3d7)],Scene_Skill[_0x34b3e3(0x237)][_0x34b3e3(0x3d7)]=function(){const _0x338cc1=_0x34b3e3;VisuMZ[_0x338cc1(0x4d5)][_0x338cc1(0x286)][_0x338cc1(0x267)](this),this[_0x338cc1(0x334)]();},Scene_Skill[_0x34b3e3(0x237)][_0x34b3e3(0x334)]=function(){const _0x4e680e=_0x34b3e3;this[_0x4e680e(0x697)]&&this[_0x4e680e(0x697)][_0x4e680e(0x81b)](Scene_Skill['layoutSettings'][_0x4e680e(0x820)]),this['_skillTypeWindow']&&this[_0x4e680e(0x440)][_0x4e680e(0x81b)](Scene_Skill['layoutSettings'][_0x4e680e(0x2e7)]),this[_0x4e680e(0x2c6)]&&this[_0x4e680e(0x2c6)][_0x4e680e(0x81b)](Scene_Skill[_0x4e680e(0x503)][_0x4e680e(0x85c)]),this[_0x4e680e(0x364)]&&this[_0x4e680e(0x364)]['setBackgroundType'](Scene_Skill[_0x4e680e(0x503)][_0x4e680e(0x2aa)]),this[_0x4e680e(0x12d)]&&this[_0x4e680e(0x12d)][_0x4e680e(0x81b)](Scene_Skill[_0x4e680e(0x503)][_0x4e680e(0x31a)]);},Scene_Skill[_0x34b3e3(0x237)][_0x34b3e3(0x272)]=function(){const _0x2ad6e=_0x34b3e3;return Scene_Skill[_0x2ad6e(0x503)]['HelpRect']['call'](this);},Scene_Skill[_0x34b3e3(0x237)][_0x34b3e3(0x351)]=function(){const _0x3210ed=_0x34b3e3;return Scene_Skill[_0x3210ed(0x503)][_0x3210ed(0x45a)][_0x3210ed(0x267)](this);},Scene_Skill[_0x34b3e3(0x237)][_0x34b3e3(0x8a9)]=function(){const _0x5365a5=_0x34b3e3;return Scene_Skill[_0x5365a5(0x503)][_0x5365a5(0x7c8)][_0x5365a5(0x267)](this);},Scene_Skill[_0x34b3e3(0x237)][_0x34b3e3(0x682)]=function(){const _0x236525=_0x34b3e3;return Scene_Skill[_0x236525(0x503)]['ItemRect'][_0x236525(0x267)](this);},Scene_Skill[_0x34b3e3(0x237)][_0x34b3e3(0x4e2)]=function(){const _0x45fbcd=_0x34b3e3;return Scene_Skill[_0x45fbcd(0x503)][_0x45fbcd(0x7df)][_0x45fbcd(0x267)](this);},Scene_Equip[_0x34b3e3(0x503)]=VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)][_0x34b3e3(0x44e)]['EquipMenu'],VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x6f5)]=Scene_Equip[_0x34b3e3(0x237)][_0x34b3e3(0x3d7)],Scene_Equip[_0x34b3e3(0x237)]['create']=function(){const _0x1a357e=_0x34b3e3;VisuMZ[_0x1a357e(0x4d5)][_0x1a357e(0x6f5)]['call'](this),this[_0x1a357e(0x334)]();},Scene_Equip['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x3250dd=_0x34b3e3;this['_helpWindow']&&this[_0x3250dd(0x697)][_0x3250dd(0x81b)](Scene_Equip['layoutSettings'][_0x3250dd(0x820)]),this[_0x3250dd(0x2c6)]&&this[_0x3250dd(0x2c6)][_0x3250dd(0x81b)](Scene_Equip[_0x3250dd(0x503)][_0x3250dd(0x85c)]),this[_0x3250dd(0x81e)]&&this[_0x3250dd(0x81e)]['setBackgroundType'](Scene_Equip[_0x3250dd(0x503)][_0x3250dd(0x22d)]),this[_0x3250dd(0x75b)]&&this[_0x3250dd(0x75b)]['setBackgroundType'](Scene_Equip[_0x3250dd(0x503)][_0x3250dd(0x228)]),this[_0x3250dd(0x364)]&&this[_0x3250dd(0x364)][_0x3250dd(0x81b)](Scene_Equip[_0x3250dd(0x503)][_0x3250dd(0x2aa)]);},Scene_Equip[_0x34b3e3(0x237)][_0x34b3e3(0x272)]=function(){const _0xc637a4=_0x34b3e3;return Scene_Equip[_0xc637a4(0x503)][_0xc637a4(0x38b)]['call'](this);},Scene_Equip[_0x34b3e3(0x237)]['statusWindowRect']=function(){const _0x4173d1=_0x34b3e3;return Scene_Equip[_0x4173d1(0x503)][_0x4173d1(0x7c8)]['call'](this);},Scene_Equip['prototype'][_0x34b3e3(0x2c9)]=function(){const _0x1f3dce=_0x34b3e3;return Scene_Equip[_0x1f3dce(0x503)][_0x1f3dce(0x152)][_0x1f3dce(0x267)](this);},Scene_Equip[_0x34b3e3(0x237)]['slotWindowRect']=function(){const _0x13967b=_0x34b3e3;return Scene_Equip[_0x13967b(0x503)][_0x13967b(0x4de)][_0x13967b(0x267)](this);},Scene_Equip[_0x34b3e3(0x237)][_0x34b3e3(0x682)]=function(){const _0xee78e1=_0x34b3e3;return Scene_Equip[_0xee78e1(0x503)]['ItemRect'][_0xee78e1(0x267)](this);},Scene_Status['layoutSettings']=VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)][_0x34b3e3(0x44e)][_0x34b3e3(0x841)],VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x7b5)]=Scene_Status['prototype'][_0x34b3e3(0x3d7)],Scene_Status[_0x34b3e3(0x237)][_0x34b3e3(0x3d7)]=function(){const _0x41ba0f=_0x34b3e3;VisuMZ['CoreEngine'][_0x41ba0f(0x7b5)][_0x41ba0f(0x267)](this),this[_0x41ba0f(0x334)]();},Scene_Status[_0x34b3e3(0x237)][_0x34b3e3(0x334)]=function(){const _0x287baf=_0x34b3e3;this[_0x287baf(0x669)]&&this['_profileWindow'][_0x287baf(0x81b)](Scene_Status['layoutSettings'][_0x287baf(0x836)]),this[_0x287baf(0x2c6)]&&this[_0x287baf(0x2c6)][_0x287baf(0x81b)](Scene_Status[_0x287baf(0x503)][_0x287baf(0x85c)]),this[_0x287baf(0x638)]&&this[_0x287baf(0x638)]['setBackgroundType'](Scene_Status[_0x287baf(0x503)][_0x287baf(0x84b)]),this[_0x287baf(0x8ca)]&&this[_0x287baf(0x8ca)][_0x287baf(0x81b)](Scene_Status[_0x287baf(0x503)][_0x287baf(0x6e3)]);},Scene_Status[_0x34b3e3(0x237)][_0x34b3e3(0x7d0)]=function(){const _0x45da8c=_0x34b3e3;return Scene_Status[_0x45da8c(0x503)]['ProfileRect']['call'](this);},Scene_Status[_0x34b3e3(0x237)][_0x34b3e3(0x8a9)]=function(){const _0x2738e7=_0x34b3e3;return Scene_Status[_0x2738e7(0x503)][_0x2738e7(0x7c8)][_0x2738e7(0x267)](this);},Scene_Status[_0x34b3e3(0x237)][_0x34b3e3(0x77c)]=function(){const _0x3ca5fa=_0x34b3e3;return Scene_Status[_0x3ca5fa(0x503)][_0x3ca5fa(0x737)]['call'](this);},Scene_Status['prototype'][_0x34b3e3(0x4fc)]=function(){const _0x16f057=_0x34b3e3;return Scene_Status[_0x16f057(0x503)][_0x16f057(0x2b1)][_0x16f057(0x267)](this);},Scene_Options[_0x34b3e3(0x503)]=VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)][_0x34b3e3(0x44e)][_0x34b3e3(0x262)],VisuMZ['CoreEngine'][_0x34b3e3(0x20a)]=Scene_Options[_0x34b3e3(0x237)]['create'],Scene_Options[_0x34b3e3(0x237)][_0x34b3e3(0x3d7)]=function(){const _0x34ab00=_0x34b3e3;VisuMZ[_0x34ab00(0x4d5)][_0x34ab00(0x20a)][_0x34ab00(0x267)](this),this[_0x34ab00(0x334)]();},Scene_Options[_0x34b3e3(0x237)][_0x34b3e3(0x334)]=function(){const _0x5a7755=_0x34b3e3;this[_0x5a7755(0x6c4)]&&this[_0x5a7755(0x6c4)][_0x5a7755(0x81b)](Scene_Options[_0x5a7755(0x503)][_0x5a7755(0x4ab)]);},Scene_Options[_0x34b3e3(0x237)]['optionsWindowRect']=function(){const _0x2dd682=_0x34b3e3;return Scene_Options[_0x2dd682(0x503)]['OptionsRect'][_0x2dd682(0x267)](this);},Scene_Save['layoutSettings']=VisuMZ[_0x34b3e3(0x4d5)]['Settings'][_0x34b3e3(0x44e)][_0x34b3e3(0x540)],Scene_Save[_0x34b3e3(0x237)][_0x34b3e3(0x3d7)]=function(){const _0x546759=_0x34b3e3;Scene_File['prototype'][_0x546759(0x3d7)][_0x546759(0x267)](this),this[_0x546759(0x334)]();},Scene_Save['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x44460b=_0x34b3e3;this[_0x44460b(0x697)]&&this[_0x44460b(0x697)][_0x44460b(0x81b)](Scene_Save[_0x44460b(0x503)][_0x44460b(0x820)]),this[_0x44460b(0x7a8)]&&this[_0x44460b(0x7a8)][_0x44460b(0x81b)](Scene_Save['layoutSettings']['ListBgType']);},Scene_Save[_0x34b3e3(0x237)][_0x34b3e3(0x272)]=function(){const _0x2da9fe=_0x34b3e3;return Scene_Save[_0x2da9fe(0x503)][_0x2da9fe(0x38b)][_0x2da9fe(0x267)](this);},Scene_Save[_0x34b3e3(0x237)][_0x34b3e3(0x76a)]=function(){const _0x5601c0=_0x34b3e3;return Scene_Save[_0x5601c0(0x503)][_0x5601c0(0x235)]['call'](this);},Scene_Load[_0x34b3e3(0x503)]=VisuMZ['CoreEngine'][_0x34b3e3(0x2fb)][_0x34b3e3(0x44e)][_0x34b3e3(0x7da)],Scene_Load[_0x34b3e3(0x237)][_0x34b3e3(0x3d7)]=function(){const _0x44e3ca=_0x34b3e3;Scene_File['prototype'][_0x44e3ca(0x3d7)][_0x44e3ca(0x267)](this),this[_0x44e3ca(0x334)]();},Scene_Load[_0x34b3e3(0x237)][_0x34b3e3(0x334)]=function(){const _0x2f4247=_0x34b3e3;this[_0x2f4247(0x697)]&&this[_0x2f4247(0x697)][_0x2f4247(0x81b)](Scene_Load[_0x2f4247(0x503)][_0x2f4247(0x820)]),this[_0x2f4247(0x7a8)]&&this['_listWindow'][_0x2f4247(0x81b)](Scene_Load['layoutSettings'][_0x2f4247(0x2e0)]);},Scene_Load[_0x34b3e3(0x237)][_0x34b3e3(0x272)]=function(){const _0x1d4109=_0x34b3e3;return Scene_Load['layoutSettings'][_0x1d4109(0x38b)]['call'](this);},Scene_Load['prototype'][_0x34b3e3(0x76a)]=function(){const _0xfe817c=_0x34b3e3;return Scene_Load[_0xfe817c(0x503)][_0xfe817c(0x235)][_0xfe817c(0x267)](this);};function Scene_QuickLoad(){const _0x406122=_0x34b3e3;this[_0x406122(0x7e8)](...arguments);}Scene_QuickLoad[_0x34b3e3(0x237)]=Object['create'](Scene_Load[_0x34b3e3(0x237)]),Scene_QuickLoad['prototype'][_0x34b3e3(0x698)]=Scene_QuickLoad,Scene_QuickLoad[_0x34b3e3(0x237)][_0x34b3e3(0x7e8)]=function(){const _0x4c4f69=_0x34b3e3;Scene_Load['prototype'][_0x4c4f69(0x7e8)][_0x4c4f69(0x267)](this);},Scene_QuickLoad[_0x34b3e3(0x237)][_0x34b3e3(0x3d7)]=function(){const _0x452060=_0x34b3e3;this[_0x452060(0x83e)](this[_0x452060(0x5fa)]);},Scene_QuickLoad[_0x34b3e3(0x237)]['prepare']=function(_0x3fee34){const _0x44e0e8=_0x34b3e3;this[_0x44e0e8(0x5fa)]=_0x3fee34;},Scene_QuickLoad[_0x34b3e3(0x237)][_0x34b3e3(0x24a)]=function(){const _0x46c53a=_0x34b3e3;Scene_MenuBase[_0x46c53a(0x237)][_0x46c53a(0x24a)]['call'](this);},Scene_GameEnd[_0x34b3e3(0x503)]=VisuMZ['CoreEngine']['Settings']['MenuLayout']['GameEnd'],VisuMZ['CoreEngine'][_0x34b3e3(0x8ea)]=Scene_GameEnd[_0x34b3e3(0x237)]['createBackground'],Scene_GameEnd['prototype'][_0x34b3e3(0x610)]=function(){const _0x1fffff=_0x34b3e3;Scene_MenuBase['prototype'][_0x1fffff(0x610)][_0x1fffff(0x267)](this);},Scene_GameEnd['prototype']['createCommandWindow']=function(){const _0x4c9f66=_0x34b3e3,_0x58b7a9=this[_0x4c9f66(0x2c9)]();this[_0x4c9f66(0x81e)]=new Window_GameEnd(_0x58b7a9),this[_0x4c9f66(0x81e)][_0x4c9f66(0x339)]('cancel',this[_0x4c9f66(0x177)]['bind'](this)),this[_0x4c9f66(0x24f)](this[_0x4c9f66(0x81e)]),this[_0x4c9f66(0x81e)][_0x4c9f66(0x81b)](Scene_GameEnd['layoutSettings'][_0x4c9f66(0x22d)]);},Scene_GameEnd[_0x34b3e3(0x237)][_0x34b3e3(0x2c9)]=function(){const _0x2c028f=_0x34b3e3;return Scene_GameEnd[_0x2c028f(0x503)][_0x2c028f(0x152)][_0x2c028f(0x267)](this);},Scene_Shop[_0x34b3e3(0x503)]=VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)]['MenuLayout'][_0x34b3e3(0x723)],VisuMZ['CoreEngine'][_0x34b3e3(0x3f6)]=Scene_Shop[_0x34b3e3(0x237)]['create'],Scene_Shop[_0x34b3e3(0x237)]['create']=function(){const _0x5ecdf1=_0x34b3e3;VisuMZ['CoreEngine']['Scene_Shop_create'][_0x5ecdf1(0x267)](this),this[_0x5ecdf1(0x334)]();},Scene_Shop[_0x34b3e3(0x237)][_0x34b3e3(0x334)]=function(){const _0x361c3d=_0x34b3e3;this[_0x361c3d(0x697)]&&this[_0x361c3d(0x697)][_0x361c3d(0x81b)](Scene_Shop[_0x361c3d(0x503)]['HelpBgType']),this[_0x361c3d(0x1d6)]&&this[_0x361c3d(0x1d6)][_0x361c3d(0x81b)](Scene_Shop[_0x361c3d(0x503)][_0x361c3d(0x418)]),this[_0x361c3d(0x81e)]&&this['_commandWindow'][_0x361c3d(0x81b)](Scene_Shop[_0x361c3d(0x503)]['CommandBgType']),this[_0x361c3d(0x1ec)]&&this[_0x361c3d(0x1ec)][_0x361c3d(0x81b)](Scene_Shop[_0x361c3d(0x503)][_0x361c3d(0x300)]),this[_0x361c3d(0x34b)]&&this[_0x361c3d(0x34b)][_0x361c3d(0x81b)](Scene_Shop[_0x361c3d(0x503)][_0x361c3d(0x258)]),this['_statusWindow']&&this[_0x361c3d(0x2c6)][_0x361c3d(0x81b)](Scene_Shop[_0x361c3d(0x503)][_0x361c3d(0x85c)]),this[_0x361c3d(0x416)]&&this[_0x361c3d(0x416)]['setBackgroundType'](Scene_Shop[_0x361c3d(0x503)][_0x361c3d(0x8b0)]),this[_0x361c3d(0x31f)]&&this[_0x361c3d(0x31f)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x361c3d(0x304)]),this['_sellWindow']&&this['_sellWindow'][_0x361c3d(0x81b)](Scene_Shop[_0x361c3d(0x503)][_0x361c3d(0x8ac)]);},Scene_Shop[_0x34b3e3(0x237)][_0x34b3e3(0x272)]=function(){const _0x454a6b=_0x34b3e3;return Scene_Shop[_0x454a6b(0x503)][_0x454a6b(0x38b)][_0x454a6b(0x267)](this);},Scene_Shop[_0x34b3e3(0x237)][_0x34b3e3(0x702)]=function(){const _0x33b5cc=_0x34b3e3;return Scene_Shop[_0x33b5cc(0x503)][_0x33b5cc(0x144)][_0x33b5cc(0x267)](this);},Scene_Shop[_0x34b3e3(0x237)][_0x34b3e3(0x2c9)]=function(){const _0x217a8d=_0x34b3e3;return Scene_Shop['layoutSettings'][_0x217a8d(0x152)]['call'](this);},Scene_Shop[_0x34b3e3(0x237)]['dummyWindowRect']=function(){const _0x179da9=_0x34b3e3;return Scene_Shop['layoutSettings'][_0x179da9(0x64d)][_0x179da9(0x267)](this);},Scene_Shop[_0x34b3e3(0x237)][_0x34b3e3(0x8e3)]=function(){const _0x31ffda=_0x34b3e3;return Scene_Shop[_0x31ffda(0x503)][_0x31ffda(0x17f)][_0x31ffda(0x267)](this);},Scene_Shop['prototype']['statusWindowRect']=function(){const _0x5452a6=_0x34b3e3;return Scene_Shop[_0x5452a6(0x503)][_0x5452a6(0x7c8)][_0x5452a6(0x267)](this);},Scene_Shop['prototype']['buyWindowRect']=function(){const _0xc9fb6b=_0x34b3e3;return Scene_Shop[_0xc9fb6b(0x503)][_0xc9fb6b(0x4ad)][_0xc9fb6b(0x267)](this);},Scene_Shop['prototype'][_0x34b3e3(0x56f)]=function(){const _0x5a01cb=_0x34b3e3;return Scene_Shop[_0x5a01cb(0x503)][_0x5a01cb(0x6f2)]['call'](this);},Scene_Shop[_0x34b3e3(0x237)][_0x34b3e3(0x8c0)]=function(){const _0x49fbbb=_0x34b3e3;return Scene_Shop[_0x49fbbb(0x503)][_0x49fbbb(0x4ce)][_0x49fbbb(0x267)](this);},Scene_Name[_0x34b3e3(0x503)]=VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)]['MenuLayout']['NameMenu'],VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x56d)]=Scene_Name['prototype'][_0x34b3e3(0x3d7)],Scene_Name[_0x34b3e3(0x237)][_0x34b3e3(0x3d7)]=function(){const _0x4804fb=_0x34b3e3;VisuMZ['CoreEngine']['Scene_Name_create'][_0x4804fb(0x267)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name[_0x34b3e3(0x237)][_0x34b3e3(0x334)]=function(){const _0x3c6bf3=_0x34b3e3;this[_0x3c6bf3(0x179)]&&this[_0x3c6bf3(0x179)][_0x3c6bf3(0x81b)](Scene_Name['layoutSettings'][_0x3c6bf3(0x6dd)]),this[_0x3c6bf3(0x407)]&&this[_0x3c6bf3(0x407)][_0x3c6bf3(0x81b)](Scene_Name['layoutSettings'][_0x3c6bf3(0x6b8)]);},Scene_Name['prototype']['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x34b3e3(0x237)][_0x34b3e3(0x2fc)]=function(){const _0x156bb6=_0x34b3e3;return Scene_Name['layoutSettings'][_0x156bb6(0x4f3)]['call'](this);},Scene_Name[_0x34b3e3(0x237)][_0x34b3e3(0x707)]=function(){const _0x214bb5=_0x34b3e3;return Scene_Name[_0x214bb5(0x503)][_0x214bb5(0x4f1)][_0x214bb5(0x267)](this);},Scene_Name[_0x34b3e3(0x237)]['EnableNameInput']=function(){const _0x12649c=_0x34b3e3;if(!this[_0x12649c(0x407)])return![];return VisuMZ[_0x12649c(0x4d5)][_0x12649c(0x2fb)][_0x12649c(0x7bc)]['EnableNameInput'];},Scene_Name[_0x34b3e3(0x237)]['buttonAssistKey1']=function(){const _0x27010c=_0x34b3e3;if(this[_0x27010c(0x3ca)]()&&this[_0x27010c(0x407)][_0x27010c(0x34d)]!==_0x27010c(0x804))return TextManager[_0x27010c(0x23e)](_0x27010c(0x7e4),_0x27010c(0x891));return Scene_MenuBase['prototype'][_0x27010c(0x475)][_0x27010c(0x267)](this);},Scene_Name[_0x34b3e3(0x237)]['buttonAssistKey3']=function(){const _0x5cb8c9=_0x34b3e3;return this[_0x5cb8c9(0x3ca)]()?TextManager['getInputButtonString'](_0x5cb8c9(0x196)):Scene_MenuBase[_0x5cb8c9(0x237)][_0x5cb8c9(0x505)][_0x5cb8c9(0x267)](this);},Scene_Name[_0x34b3e3(0x237)][_0x34b3e3(0x140)]=function(){const _0x534580=_0x34b3e3;if(this[_0x534580(0x3ca)]()&&this[_0x534580(0x407)][_0x534580(0x34d)]===_0x534580(0x804))return TextManager[_0x534580(0x75d)]([_0x534580(0x121)]);return Scene_MenuBase[_0x534580(0x237)][_0x534580(0x140)][_0x534580(0x267)](this);},Scene_Name[_0x34b3e3(0x237)][_0x34b3e3(0x171)]=function(){const _0x36ccd5=_0x34b3e3;if(this[_0x36ccd5(0x3ca)]()&&this[_0x36ccd5(0x407)][_0x36ccd5(0x34d)]===_0x36ccd5(0x804))return TextManager[_0x36ccd5(0x75d)]([_0x36ccd5(0x87c)]);return Scene_MenuBase[_0x36ccd5(0x237)]['buttonAssistKey5'][_0x36ccd5(0x267)](this);},Scene_Name[_0x34b3e3(0x237)][_0x34b3e3(0x332)]=function(){const _0x4ae921=_0x34b3e3;if(this[_0x4ae921(0x3ca)]()&&this[_0x4ae921(0x407)]['_mode']!=='keyboard'){const _0x25ebfb=VisuMZ[_0x4ae921(0x4d5)][_0x4ae921(0x2fb)][_0x4ae921(0x7bc)];return _0x25ebfb[_0x4ae921(0x200)]||_0x4ae921(0x7a6);}return Scene_MenuBase[_0x4ae921(0x237)][_0x4ae921(0x332)][_0x4ae921(0x267)](this);},Scene_Name[_0x34b3e3(0x237)][_0x34b3e3(0x36b)]=function(){const _0x1319e6=_0x34b3e3;if(this[_0x1319e6(0x3ca)]()){const _0x25f45c=VisuMZ['CoreEngine'][_0x1319e6(0x2fb)][_0x1319e6(0x7bc)];return this[_0x1319e6(0x407)][_0x1319e6(0x34d)]===_0x1319e6(0x804)?_0x25f45c[_0x1319e6(0x8aa)]||_0x1319e6(0x8aa):_0x25f45c[_0x1319e6(0x834)]||_0x1319e6(0x834);}else return Scene_MenuBase['prototype'][_0x1319e6(0x36b)]['call'](this);},Scene_Name['prototype'][_0x34b3e3(0x404)]=function(){const _0x4da12a=_0x34b3e3;if(this[_0x4da12a(0x3ca)]()){const _0x29eb1e=VisuMZ['CoreEngine']['Settings'][_0x4da12a(0x7bc)];if(this['_inputWindow'][_0x4da12a(0x34d)]===_0x4da12a(0x804))return _0x29eb1e[_0x4da12a(0x52f)]||'Finish';}return Scene_MenuBase[_0x4da12a(0x237)][_0x4da12a(0x404)][_0x4da12a(0x267)](this);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x7b8)]=Scene_Name[_0x34b3e3(0x237)][_0x34b3e3(0x762)],Scene_Name[_0x34b3e3(0x237)]['onInputOk']=function(){const _0x59f6ec=_0x34b3e3;this['doesNameContainBannedWords']()?this[_0x59f6ec(0x523)]():VisuMZ[_0x59f6ec(0x4d5)][_0x59f6ec(0x7b8)][_0x59f6ec(0x267)](this);},Scene_Name[_0x34b3e3(0x237)][_0x34b3e3(0x2ee)]=function(){const _0x206bb2=_0x34b3e3,_0x48fbbb=VisuMZ['CoreEngine'][_0x206bb2(0x2fb)][_0x206bb2(0x7bc)];if(!_0x48fbbb)return![];const _0x3604e1=_0x48fbbb[_0x206bb2(0x77d)];if(!_0x3604e1)return![];const _0x12f2be=this[_0x206bb2(0x179)][_0x206bb2(0x650)]()[_0x206bb2(0x309)]();for(const _0x4f7750 of _0x3604e1){if(_0x12f2be[_0x206bb2(0x1da)](_0x4f7750['toLowerCase']()))return!![];}return![];},Scene_Name[_0x34b3e3(0x237)]['onInputBannedWords']=function(){const _0x3737b0=_0x34b3e3;SoundManager[_0x3737b0(0x2e8)]();},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x17e)]=Scene_Battle[_0x34b3e3(0x237)][_0x34b3e3(0x6d2)],Scene_Battle['prototype'][_0x34b3e3(0x6d2)]=function(){const _0x3d67e1=_0x34b3e3;VisuMZ[_0x3d67e1(0x4d5)][_0x3d67e1(0x17e)]['call'](this);if($gameTemp['_playTestFastMode'])this[_0x3d67e1(0x40a)]();},Scene_Battle['prototype'][_0x34b3e3(0x40a)]=function(){const _0x2e9380=_0x34b3e3;!BattleManager['isInputting']()&&!this[_0x2e9380(0x3a3)]&&!$gameMessage['isBusy']()&&(this['_playtestF7Looping']=!![],this[_0x2e9380(0x6d2)](),SceneManager[_0x2e9380(0x7af)](),this[_0x2e9380(0x3a3)]=![]);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x375)]=Scene_Battle[_0x34b3e3(0x237)][_0x34b3e3(0x5f1)],Scene_Battle[_0x34b3e3(0x237)][_0x34b3e3(0x5f1)]=function(){const _0x5f2e4a=_0x34b3e3;VisuMZ['CoreEngine'][_0x5f2e4a(0x375)]['call'](this),SceneManager[_0x5f2e4a(0x635)]()&&this[_0x5f2e4a(0x4c8)]();},Scene_Battle[_0x34b3e3(0x237)][_0x34b3e3(0x4c8)]=function(){const _0x515c47=_0x34b3e3;this[_0x515c47(0x734)]['x']=Graphics[_0x515c47(0x79c)]+0x4,this[_0x515c47(0x3a5)]()?this[_0x515c47(0x734)]['y']=Graphics[_0x515c47(0x182)]-this[_0x515c47(0x2c2)]():this[_0x515c47(0x734)]['y']=0x0;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x1d2)]=Sprite_Button[_0x34b3e3(0x237)][_0x34b3e3(0x7e8)],Sprite_Button[_0x34b3e3(0x237)][_0x34b3e3(0x7e8)]=function(_0x21e62d){const _0x1c2de6=_0x34b3e3;VisuMZ['CoreEngine'][_0x1c2de6(0x1d2)][_0x1c2de6(0x267)](this,_0x21e62d),this[_0x1c2de6(0x3c8)]();},Sprite_Button[_0x34b3e3(0x237)][_0x34b3e3(0x3c8)]=function(){const _0x17412f=_0x34b3e3,_0x4210ae=VisuMZ[_0x17412f(0x4d5)]['Settings']['UI'];this[_0x17412f(0x4e6)]=![];switch(this[_0x17412f(0x679)]){case _0x17412f(0x55a):this['_isButtonHidden']=!_0x4210ae['cancelShowButton'];break;case _0x17412f(0x7e4):case _0x17412f(0x891):this[_0x17412f(0x4e6)]=!_0x4210ae[_0x17412f(0x436)];break;case _0x17412f(0x381):case'up':case _0x17412f(0x67b):case'up2':case'ok':this[_0x17412f(0x4e6)]=!_0x4210ae[_0x17412f(0x255)];break;case'menu':this['_isButtonHidden']=!_0x4210ae['menuShowButton'];break;}},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x557)]=Sprite_Button['prototype'][_0x34b3e3(0x835)],Sprite_Button['prototype'][_0x34b3e3(0x835)]=function(){const _0x1edf9f=_0x34b3e3;SceneManager[_0x1edf9f(0x520)]()||this[_0x1edf9f(0x4e6)]?this[_0x1edf9f(0x616)]():VisuMZ[_0x1edf9f(0x4d5)][_0x1edf9f(0x557)]['call'](this);},Sprite_Button[_0x34b3e3(0x237)][_0x34b3e3(0x616)]=function(){const _0x55e21a=_0x34b3e3;this['visible']=![],this[_0x55e21a(0x653)]=0x0,this['x']=Graphics[_0x55e21a(0x4c5)]*0xa,this['y']=Graphics['height']*0xa;},VisuMZ['CoreEngine']['Sprite_Battler_startMove']=Sprite_Battler[_0x34b3e3(0x237)]['startMove'],Sprite_Battler[_0x34b3e3(0x237)][_0x34b3e3(0x246)]=function(_0x277ae0,_0xda40b7,_0xc2f8e2){const _0x1d6d25=_0x34b3e3;(this['_targetOffsetX']!==_0x277ae0||this[_0x1d6d25(0x827)]!==_0xda40b7)&&(this[_0x1d6d25(0x420)](_0x1d6d25(0x4ba)),this['_movementWholeDuration']=_0xc2f8e2),VisuMZ[_0x1d6d25(0x4d5)][_0x1d6d25(0x3f5)][_0x1d6d25(0x267)](this,_0x277ae0,_0xda40b7,_0xc2f8e2);},Sprite_Battler[_0x34b3e3(0x237)][_0x34b3e3(0x420)]=function(_0x3592f1){this['_moveEasingType']=_0x3592f1;},Sprite_Battler['prototype'][_0x34b3e3(0x34a)]=function(){const _0x25913c=_0x34b3e3;if(this[_0x25913c(0x29c)]<=0x0)return;const _0x1d59e5=this[_0x25913c(0x29c)],_0x1967ff=this[_0x25913c(0x3b0)],_0x4ffed6=this['_moveEasingType'];this[_0x25913c(0x5a2)]=this['applyEasing'](this[_0x25913c(0x5a2)],this[_0x25913c(0x38d)],_0x1d59e5,_0x1967ff,_0x4ffed6),this[_0x25913c(0x257)]=this['applyEasing'](this['_offsetY'],this[_0x25913c(0x827)],_0x1d59e5,_0x1967ff,_0x4ffed6),this[_0x25913c(0x29c)]--;if(this[_0x25913c(0x29c)]<=0x0)this[_0x25913c(0x60e)]();},Sprite_Battler[_0x34b3e3(0x237)][_0x34b3e3(0x57f)]=function(_0x22193e,_0x1f72a5,_0xd0ffff,_0x30859f,_0x4fff8d){const _0x25b331=_0x34b3e3,_0x3f0f63=VisuMZ[_0x25b331(0x6e8)]((_0x30859f-_0xd0ffff)/_0x30859f,_0x4fff8d||_0x25b331(0x4ba)),_0x55cdfa=VisuMZ['ApplyEasing']((_0x30859f-_0xd0ffff+0x1)/_0x30859f,_0x4fff8d||_0x25b331(0x4ba)),_0x5ea70e=(_0x22193e-_0x1f72a5*_0x3f0f63)/(0x1-_0x3f0f63);return _0x5ea70e+(_0x1f72a5-_0x5ea70e)*_0x55cdfa;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x491)]=Sprite_Actor[_0x34b3e3(0x237)]['setActorHome'],Sprite_Actor[_0x34b3e3(0x237)][_0x34b3e3(0x742)]=function(_0x96b986){const _0x844d75=_0x34b3e3;VisuMZ[_0x844d75(0x4d5)]['Settings']['UI']['RepositionActors']?this[_0x844d75(0x600)](_0x96b986):VisuMZ[_0x844d75(0x4d5)][_0x844d75(0x491)][_0x844d75(0x267)](this,_0x96b986);},Sprite_Actor[_0x34b3e3(0x237)][_0x34b3e3(0x600)]=function(_0x3d1252){const _0x186396=_0x34b3e3;let _0xd911fe=Math['round'](Graphics[_0x186396(0x4c5)]/0x2+0xc0);_0xd911fe-=Math[_0x186396(0x6ef)]((Graphics[_0x186396(0x4c5)]-Graphics[_0x186396(0x79c)])/0x2),_0xd911fe+=_0x3d1252*0x20;let _0x38d2a7=Graphics[_0x186396(0x5f4)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x38d2a7-=Math['floor']((Graphics[_0x186396(0x5f4)]-Graphics[_0x186396(0x182)])/0x2),_0x38d2a7+=_0x3d1252*0x30,this[_0x186396(0x133)](_0xd911fe,_0x38d2a7);},Sprite_Actor['prototype'][_0x34b3e3(0x817)]=function(){const _0x704e0b=_0x34b3e3;this[_0x704e0b(0x246)](0x4b0,0x0,0x78);},Sprite_Animation[_0x34b3e3(0x237)]['setMute']=function(_0x5bf4bc){const _0x553c8d=_0x34b3e3;this[_0x553c8d(0x26d)]=_0x5bf4bc;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x465)]=Sprite_Animation[_0x34b3e3(0x237)][_0x34b3e3(0x4af)],Sprite_Animation[_0x34b3e3(0x237)][_0x34b3e3(0x4af)]=function(){const _0x574b60=_0x34b3e3;if(this['_muteSound'])return;VisuMZ['CoreEngine'][_0x574b60(0x465)]['call'](this);},VisuMZ['CoreEngine'][_0x34b3e3(0x20c)]=Sprite_Animation[_0x34b3e3(0x237)][_0x34b3e3(0x3bc)],Sprite_Animation[_0x34b3e3(0x237)][_0x34b3e3(0x3bc)]=function(_0x1d3278){const _0x14b852=_0x34b3e3;this[_0x14b852(0x84e)]()?this['setViewportCoreEngineFix'](_0x1d3278):VisuMZ[_0x14b852(0x4d5)][_0x14b852(0x20c)][_0x14b852(0x267)](this,_0x1d3278);},Sprite_Animation[_0x34b3e3(0x237)]['isAnimationOffsetXMirrored']=function(){const _0x5ca0e8=_0x34b3e3;if(!this[_0x5ca0e8(0x13f)])return![];const _0x5149be=this[_0x5ca0e8(0x13f)][_0x5ca0e8(0x650)]||'';if(_0x5149be[_0x5ca0e8(0x39c)](/<MIRROR OFFSET X>/i))return!![];if(_0x5149be[_0x5ca0e8(0x39c)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ['CoreEngine'][_0x5ca0e8(0x2fb)]['QoL']['AnimationMirrorOffset'];},Sprite_Animation[_0x34b3e3(0x237)][_0x34b3e3(0x4f0)]=function(_0x516042){const _0x272583=_0x34b3e3,_0x1561b6=this[_0x272583(0x3e3)],_0x2281ee=this[_0x272583(0x3e3)],_0x162ed7=this[_0x272583(0x13f)][_0x272583(0x7ff)]*(this['_mirror']?-0x1:0x1)-_0x1561b6/0x2,_0x5feb14=this[_0x272583(0x13f)][_0x272583(0x164)]-_0x2281ee/0x2,_0x372570=this['targetPosition'](_0x516042);_0x516042['gl'][_0x272583(0x7b7)](_0x162ed7+_0x372570['x'],_0x5feb14+_0x372570['y'],_0x1561b6,_0x2281ee);},Sprite_Animation['prototype'][_0x34b3e3(0x7e7)]=function(_0x5bef2c){const _0x268896=_0x34b3e3;if(_0x5bef2c[_0x268896(0x826)]){}const _0x45a800=this[_0x268896(0x13f)]['name'];let _0x2b0a78=_0x5bef2c[_0x268896(0x5f4)]*_0x5bef2c[_0x268896(0x83c)]['y'],_0x28c103=0x0,_0x55885a=-_0x2b0a78/0x2;if(_0x45a800[_0x268896(0x39c)](/<(?:HEAD|HEADER|TOP)>/i))_0x55885a=-_0x2b0a78;if(_0x45a800[_0x268896(0x39c)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x55885a=0x0;if(this['_animation'][_0x268896(0x4b4)])_0x55885a=0x0;if(_0x45a800[_0x268896(0x39c)](/<(?:LEFT)>/i))_0x28c103=-_0x5bef2c[_0x268896(0x4c5)]/0x2;if(_0x45a800[_0x268896(0x39c)](/<(?:RIGHT)>/i))_0x28c103=_0x5bef2c['width']/0x2;_0x45a800[_0x268896(0x39c)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x28c103=Number(RegExp['$1'])*_0x5bef2c[_0x268896(0x4c5)]);_0x45a800['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x55885a=(0x1-Number(RegExp['$1']))*-_0x2b0a78);_0x45a800[_0x268896(0x39c)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x28c103=Number(RegExp['$1'])*_0x5bef2c['width'],_0x55885a=(0x1-Number(RegExp['$2']))*-_0x2b0a78);if(_0x45a800[_0x268896(0x39c)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x28c103+=Number(RegExp['$1']);if(_0x45a800['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x55885a+=Number(RegExp['$1']);_0x45a800['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x28c103+=Number(RegExp['$1']),_0x55885a+=Number(RegExp['$2']));const _0x1761a4=new Point(_0x28c103,_0x55885a);return _0x5bef2c['updateTransform'](),_0x5bef2c[_0x268896(0x64e)][_0x268896(0x8ae)](_0x1761a4);},Sprite_AnimationMV[_0x34b3e3(0x237)]['setupRate']=function(){const _0x1c30d4=_0x34b3e3;this['_rate']=VisuMZ[_0x1c30d4(0x4d5)][_0x1c30d4(0x2fb)][_0x1c30d4(0x1f5)][_0x1c30d4(0x583)]??0x4,this[_0x1c30d4(0x800)](),this['_rate']=this[_0x1c30d4(0x6d1)][_0x1c30d4(0x62e)](0x1,0xa);},Sprite_AnimationMV[_0x34b3e3(0x237)][_0x34b3e3(0x800)]=function(){const _0x246e80=_0x34b3e3;if(!this[_0x246e80(0x13f)]);const _0x2c395d=this[_0x246e80(0x13f)]['name']||'';_0x2c395d[_0x246e80(0x39c)](/<RATE:[ ](\d+)>/i)&&(this[_0x246e80(0x6d1)]=(Number(RegExp['$1'])||0x1)[_0x246e80(0x62e)](0x1,0xa));},Sprite_AnimationMV[_0x34b3e3(0x237)][_0x34b3e3(0x568)]=function(_0xa20ea5){this['_muteSound']=_0xa20ea5;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x4e0)]=Sprite_AnimationMV[_0x34b3e3(0x237)][_0x34b3e3(0x3c2)],Sprite_AnimationMV['prototype'][_0x34b3e3(0x3c2)]=function(_0x48e4f0){const _0x3d8449=_0x34b3e3;this[_0x3d8449(0x26d)]&&(_0x48e4f0=JsonEx['makeDeepCopy'](_0x48e4f0),_0x48e4f0['se']&&(_0x48e4f0['se']['volume']=0x0)),VisuMZ['CoreEngine'][_0x3d8449(0x4e0)][_0x3d8449(0x267)](this,_0x48e4f0);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x4c6)]=Sprite_AnimationMV[_0x34b3e3(0x237)]['updatePosition'],Sprite_AnimationMV[_0x34b3e3(0x237)][_0x34b3e3(0x509)]=function(){const _0x421e78=_0x34b3e3;VisuMZ[_0x421e78(0x4d5)][_0x421e78(0x4c6)][_0x421e78(0x267)](this);if(this[_0x421e78(0x13f)][_0x421e78(0x862)]===0x3){if(this['x']===0x0)this['x']=Math[_0x421e78(0x59e)](Graphics[_0x421e78(0x4c5)]/0x2);if(this['y']===0x0)this['y']=Math[_0x421e78(0x59e)](Graphics[_0x421e78(0x5f4)]/0x2);}},Sprite_Damage[_0x34b3e3(0x237)][_0x34b3e3(0x3ee)]=function(_0x580756){const _0x106035=_0x34b3e3;let _0x139e55=Math['abs'](_0x580756)[_0x106035(0x597)]();this[_0x106035(0x670)]()&&(_0x139e55=VisuMZ[_0x106035(0x1c2)](_0x139e55));const _0x3c31b5=this['fontSize'](),_0x5dd6d2=Math[_0x106035(0x6ef)](_0x3c31b5*0.75);for(let _0x5c747c=0x0;_0x5c747c<_0x139e55['length'];_0x5c747c++){const _0x543a2d=this[_0x106035(0x5e8)](_0x5dd6d2,_0x3c31b5);_0x543a2d['bitmap'][_0x106035(0x7a9)](_0x139e55[_0x5c747c],0x0,0x0,_0x5dd6d2,_0x3c31b5,_0x106035(0x366)),_0x543a2d['x']=(_0x5c747c-(_0x139e55[_0x106035(0x1ee)]-0x1)/0x2)*_0x5dd6d2,_0x543a2d['dy']=-_0x5c747c;}},Sprite_Damage[_0x34b3e3(0x237)]['useDigitGrouping']=function(){const _0x31dddf=_0x34b3e3;return VisuMZ['CoreEngine'][_0x31dddf(0x2fb)][_0x31dddf(0x1f5)]['DigitGroupingDamageSprites'];},Sprite_Damage[_0x34b3e3(0x237)][_0x34b3e3(0x325)]=function(){const _0x8af29a=_0x34b3e3;return ColorManager[_0x8af29a(0x158)]();},VisuMZ['CoreEngine'][_0x34b3e3(0x694)]=Sprite_Gauge['prototype']['gaugeRate'],Sprite_Gauge[_0x34b3e3(0x237)][_0x34b3e3(0x20d)]=function(){const _0x5901d3=_0x34b3e3;return VisuMZ[_0x5901d3(0x4d5)][_0x5901d3(0x694)][_0x5901d3(0x267)](this)[_0x5901d3(0x62e)](0x0,0x1);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x5f5)]=Sprite_Gauge['prototype'][_0x34b3e3(0x888)],Sprite_Gauge[_0x34b3e3(0x237)][_0x34b3e3(0x888)]=function(){const _0x53e021=_0x34b3e3;let _0x4e5b19=VisuMZ[_0x53e021(0x4d5)][_0x53e021(0x5f5)][_0x53e021(0x267)](this);return _0x4e5b19;},Sprite_Gauge[_0x34b3e3(0x237)]['drawValue']=function(){const _0xab2bc9=_0x34b3e3;let _0x1aa6ec=this[_0xab2bc9(0x888)]();this['useDigitGrouping']()&&(_0x1aa6ec=VisuMZ['GroupDigits'](_0x1aa6ec));const _0x1f8cec=this['bitmapWidth']()-0x1,_0x3a3cd9=this[_0xab2bc9(0x7b2)]?this[_0xab2bc9(0x7b2)]():this[_0xab2bc9(0x7c1)]();this[_0xab2bc9(0x1eb)](),this[_0xab2bc9(0x401)]['drawText'](_0x1aa6ec,0x0,0x0,_0x1f8cec,_0x3a3cd9,_0xab2bc9(0x57c));},Sprite_Gauge[_0x34b3e3(0x237)][_0x34b3e3(0x2af)]=function(){return 0x3;},Sprite_Gauge[_0x34b3e3(0x237)]['useDigitGrouping']=function(){const _0x3dd405=_0x34b3e3;return VisuMZ['CoreEngine'][_0x3dd405(0x2fb)][_0x3dd405(0x1f5)]['DigitGroupingGaugeSprites'];},Sprite_Gauge[_0x34b3e3(0x237)]['valueOutlineColor']=function(){return ColorManager['outlineColorGauge']();},Sprite_StateIcon['NON_FRAME']=VisuMZ['CoreEngine'][_0x34b3e3(0x2fb)]['UI']['StateIconsNonFrame']??!![],VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x578)]=Sprite_StateIcon[_0x34b3e3(0x237)][_0x34b3e3(0x463)],Sprite_StateIcon[_0x34b3e3(0x237)][_0x34b3e3(0x463)]=function(){const _0xfc8d1=_0x34b3e3;Sprite_StateIcon[_0xfc8d1(0x18a)]?this['loadBitmapCoreEngine']():VisuMZ[_0xfc8d1(0x4d5)][_0xfc8d1(0x578)][_0xfc8d1(0x267)](this);},Sprite_StateIcon[_0x34b3e3(0x237)][_0x34b3e3(0x79d)]=function(){const _0x1bc32a=_0x34b3e3;this[_0x1bc32a(0x401)]=new Bitmap(ImageManager[_0x1bc32a(0x42d)],ImageManager[_0x1bc32a(0x349)]),this[_0x1bc32a(0x23b)]=ImageManager[_0x1bc32a(0x132)](_0x1bc32a(0x485));},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x301)]=Sprite_StateIcon['prototype'][_0x34b3e3(0x8f8)],Sprite_StateIcon[_0x34b3e3(0x237)][_0x34b3e3(0x8f8)]=function(){const _0x36bb04=_0x34b3e3;Sprite_StateIcon[_0x36bb04(0x18a)]?this[_0x36bb04(0x3c0)]():VisuMZ[_0x36bb04(0x4d5)]['Sprite_StateIcon_updateFrame'][_0x36bb04(0x267)](this);},Sprite_StateIcon[_0x34b3e3(0x237)]['updateFrameCoreEngine']=function(){const _0x5a6db1=_0x34b3e3;if(this[_0x5a6db1(0x31e)]===this[_0x5a6db1(0x80b)])return;this['_lastIconIndex']=this[_0x5a6db1(0x80b)];const _0x5c2f7c=ImageManager['iconWidth'],_0x3bb680=ImageManager[_0x5a6db1(0x349)],_0x5e7704=this[_0x5a6db1(0x80b)]%0x10*_0x5c2f7c,_0x114abe=Math['floor'](this[_0x5a6db1(0x80b)]/0x10)*_0x3bb680,_0x56f478=this[_0x5a6db1(0x23b)],_0x121d23=this[_0x5a6db1(0x401)];_0x121d23['clear'](),_0x121d23[_0x5a6db1(0x427)](_0x56f478,_0x5e7704,_0x114abe,_0x5c2f7c,_0x3bb680,0x0,0x0,_0x121d23['width'],_0x121d23[_0x5a6db1(0x5f4)]);},VisuMZ['CoreEngine'][_0x34b3e3(0x667)]=Sprite_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x463)],Sprite_Picture[_0x34b3e3(0x237)]['loadBitmap']=function(){const _0x40263c=_0x34b3e3;this['_pictureName']&&this[_0x40263c(0x2b8)]['match'](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x40263c(0x41e)](Number(RegExp['$1'])):VisuMZ[_0x40263c(0x4d5)]['Sprite_Picture_loadBitmap'][_0x40263c(0x267)](this);},Sprite_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x41e)]=function(_0x205e1d){const _0x3c6e15=_0x34b3e3,_0x390077=ImageManager[_0x3c6e15(0x42d)],_0x4d7977=ImageManager['iconHeight'],_0x1e256f=this[_0x3c6e15(0x2b8)]['match'](/SMOOTH/i);this[_0x3c6e15(0x401)]=new Bitmap(_0x390077,_0x4d7977);const _0x480c2b=ImageManager[_0x3c6e15(0x132)]('IconSet'),_0x38aeaf=_0x205e1d%0x10*_0x390077,_0x2d07b1=Math[_0x3c6e15(0x6ef)](_0x205e1d/0x10)*_0x4d7977;this['bitmap'][_0x3c6e15(0x524)]=_0x1e256f,this[_0x3c6e15(0x401)][_0x3c6e15(0x427)](_0x480c2b,_0x38aeaf,_0x2d07b1,_0x390077,_0x4d7977,0x0,0x0,_0x390077,_0x4d7977);};function Sprite_TitlePictureButton(){const _0x99483a=_0x34b3e3;this[_0x99483a(0x7e8)](...arguments);}Sprite_TitlePictureButton[_0x34b3e3(0x237)]=Object[_0x34b3e3(0x3d7)](Sprite_Clickable[_0x34b3e3(0x237)]),Sprite_TitlePictureButton['prototype'][_0x34b3e3(0x698)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x34b3e3(0x237)][_0x34b3e3(0x7e8)]=function(_0x2437bd){const _0x2468b5=_0x34b3e3;Sprite_Clickable[_0x2468b5(0x237)][_0x2468b5(0x7e8)][_0x2468b5(0x267)](this),this['_data']=_0x2437bd,this[_0x2468b5(0x6ee)]=null,this[_0x2468b5(0x58a)]();},Sprite_TitlePictureButton[_0x34b3e3(0x237)][_0x34b3e3(0x58a)]=function(){const _0x9031ec=_0x34b3e3;this['x']=Graphics[_0x9031ec(0x4c5)],this['y']=Graphics['height'],this[_0x9031ec(0x2d8)]=![],this[_0x9031ec(0x435)]();},Sprite_TitlePictureButton[_0x34b3e3(0x237)][_0x34b3e3(0x435)]=function(){const _0x61266c=_0x34b3e3;this['bitmap']=ImageManager[_0x61266c(0x49c)](this['_data']['PictureFilename']),this[_0x61266c(0x401)][_0x61266c(0x55e)](this['onButtonImageLoad'][_0x61266c(0x2da)](this));},Sprite_TitlePictureButton[_0x34b3e3(0x237)][_0x34b3e3(0x8af)]=function(){const _0x583fbe=_0x34b3e3;this['_data']['OnLoadJS'][_0x583fbe(0x267)](this),this[_0x583fbe(0x559)][_0x583fbe(0x423)][_0x583fbe(0x267)](this),this[_0x583fbe(0x7be)](this[_0x583fbe(0x559)]['CallHandlerJS']['bind'](this));},Sprite_TitlePictureButton[_0x34b3e3(0x237)][_0x34b3e3(0x6d2)]=function(){const _0x5888f0=_0x34b3e3;Sprite_Clickable['prototype'][_0x5888f0(0x6d2)]['call'](this),this[_0x5888f0(0x835)](),this[_0x5888f0(0x5e4)]();},Sprite_TitlePictureButton[_0x34b3e3(0x237)]['fadeSpeed']=function(){const _0x4b9680=_0x34b3e3;return VisuMZ[_0x4b9680(0x4d5)][_0x4b9680(0x2fb)][_0x4b9680(0x44e)][_0x4b9680(0x504)][_0x4b9680(0x360)];},Sprite_TitlePictureButton['prototype'][_0x34b3e3(0x835)]=function(){const _0x482f93=_0x34b3e3;this[_0x482f93(0x727)]||this[_0x482f93(0x8e6)]?this[_0x482f93(0x653)]=0xff:(this['opacity']+=this['visible']?this['fadeSpeed']():-0x1*this[_0x482f93(0x46d)](),this['opacity']=Math[_0x482f93(0x2c1)](0xc0,this[_0x482f93(0x653)]));},Sprite_TitlePictureButton['prototype'][_0x34b3e3(0x7be)]=function(_0x2f5a54){const _0x3ed786=_0x34b3e3;this[_0x3ed786(0x6ee)]=_0x2f5a54;},Sprite_TitlePictureButton[_0x34b3e3(0x237)][_0x34b3e3(0x5a0)]=function(){const _0x475845=_0x34b3e3;this['_clickHandler']&&this[_0x475845(0x6ee)]();};function Sprite_ExtendedTile(){const _0xaca521=_0x34b3e3;this[_0xaca521(0x7e8)](...arguments);}Sprite_ExtendedTile[_0x34b3e3(0x237)]=Object['create'](Sprite[_0x34b3e3(0x237)]),Sprite_ExtendedTile[_0x34b3e3(0x237)][_0x34b3e3(0x698)]=Sprite_ExtendedTile,Sprite_ExtendedTile['prototype']['initialize']=function(_0x2a0a27,_0x4b339d,_0x2c7df1,_0x353d86){const _0x5d2baa=_0x34b3e3;this[_0x5d2baa(0x229)]=Game_CharacterBase['DEFAULT_SHIFT_Y']||-0x6,this['_mapX']=_0x2a0a27,this['_mapY']=_0x4b339d,this[_0x5d2baa(0x7fb)]=_0x2c7df1,this[_0x5d2baa(0x777)]=_0x353d86,Sprite['prototype']['initialize'][_0x5d2baa(0x267)](this),this[_0x5d2baa(0x17c)](),this[_0x5d2baa(0x2b6)](),this['setTileFrame'](),this[_0x5d2baa(0x6d2)]();},Sprite_ExtendedTile[_0x34b3e3(0x237)][_0x34b3e3(0x17c)]=function(){const _0x564c42=_0x34b3e3;this['_tileSprite']=new Sprite(),this[_0x564c42(0x4e5)][_0x564c42(0x513)]['x']=0.5,this[_0x564c42(0x4e5)]['anchor']['y']=0x1,this[_0x564c42(0x4e5)]['y']=-this[_0x564c42(0x229)]+0x1,this[_0x564c42(0x341)](this[_0x564c42(0x4e5)]);},Sprite_ExtendedTile[_0x34b3e3(0x237)][_0x34b3e3(0x2b6)]=function(){const _0xf8ce29=_0x34b3e3,_0x3100c1=$gameMap[_0xf8ce29(0x2a2)](),_0x586e50=0x5+Math[_0xf8ce29(0x6ef)](this[_0xf8ce29(0x7fb)]/0x100);this[_0xf8ce29(0x4e5)]['bitmap']=ImageManager[_0xf8ce29(0x3b6)](_0x3100c1[_0xf8ce29(0x761)][_0x586e50]);},Sprite_ExtendedTile[_0x34b3e3(0x237)]['setTileFrame']=function(){const _0x1d7d6c=_0x34b3e3,_0x20d068=this[_0x1d7d6c(0x7fb)],_0x43c226=$gameMap[_0x1d7d6c(0x460)](),_0x4c5082=$gameMap['tileHeight'](),_0x14d76c=(Math[_0x1d7d6c(0x6ef)](_0x20d068/0x80)%0x2*0x8+_0x20d068%0x8)*_0x43c226,_0x215459=Math['floor'](_0x20d068%0x100/0x8)%0x10*_0x4c5082,_0xe9ee06=this[_0x1d7d6c(0x777)]*_0x4c5082;this[_0x1d7d6c(0x4e5)][_0x1d7d6c(0x147)](_0x14d76c,_0x215459-_0xe9ee06,_0x43c226,_0x4c5082+_0xe9ee06);},Sprite_ExtendedTile[_0x34b3e3(0x237)]['update']=function(){const _0x2c4236=_0x34b3e3;Sprite['prototype'][_0x2c4236(0x6d2)][_0x2c4236(0x267)](this),this[_0x2c4236(0x509)]();},Sprite_ExtendedTile[_0x34b3e3(0x237)][_0x34b3e3(0x509)]=function(){const _0xf1019f=_0x34b3e3,_0x1d28eb=$gameMap[_0xf1019f(0x460)](),_0x2218f2=$gameMap[_0xf1019f(0x771)](),_0x548712=this['_mapX'],_0x524faa=this[_0xf1019f(0x39b)];this['x']=Math['floor'](($gameMap['adjustX'](_0x548712)+0.5)*_0x1d28eb),this['y']=Math[_0xf1019f(0x6ef)](($gameMap[_0xf1019f(0x29a)](_0x524faa)+0x1)*_0x2218f2)+this[_0xf1019f(0x229)]-0x1;},VisuMZ['CoreEngine']['Spriteset_Base_initialize']=Spriteset_Base['prototype']['initialize'],Spriteset_Base[_0x34b3e3(0x237)]['initialize']=function(){const _0x412991=_0x34b3e3;VisuMZ['CoreEngine'][_0x412991(0x8e2)]['call'](this),this[_0x412991(0x4ca)]();},Spriteset_Base['prototype'][_0x34b3e3(0x4ca)]=function(){const _0xcfa646=_0x34b3e3;this[_0xcfa646(0x615)]=[],this[_0xcfa646(0x79a)]=[],this[_0xcfa646(0x4fa)]=this[_0xcfa646(0x83c)]['x'],this[_0xcfa646(0x731)]=this[_0xcfa646(0x83c)]['y'];},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x361)]=Spriteset_Base['prototype'][_0x34b3e3(0x49f)],Spriteset_Base[_0x34b3e3(0x237)]['destroy']=function(_0x250f0c){const _0x2b60f7=_0x34b3e3;this[_0x2b60f7(0x26c)](),this[_0x2b60f7(0x1a1)](),VisuMZ[_0x2b60f7(0x4d5)]['Spriteset_Base_destroy'][_0x2b60f7(0x267)](this,_0x250f0c);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x8b9)]=Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x6d2)],Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x6d2)]=function(){const _0x504eb4=_0x34b3e3;VisuMZ[_0x504eb4(0x4d5)]['Spriteset_Base_update'][_0x504eb4(0x267)](this),this['updatePictureSettings'](),this['updatePictureAntiZoom'](),this[_0x504eb4(0x612)](),this[_0x504eb4(0x774)]();},Spriteset_Base[_0x34b3e3(0x237)]['updatePictureSettings']=function(){},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x4a2)]=function(){const _0x4f07e9=_0x34b3e3;if(!VisuMZ[_0x4f07e9(0x4d5)][_0x4f07e9(0x2fb)][_0x4f07e9(0x1f5)][_0x4f07e9(0x263)])return;if(this['_cacheScaleX']===this[_0x4f07e9(0x83c)]['x']&&this[_0x4f07e9(0x731)]===this[_0x4f07e9(0x83c)]['y'])return;this[_0x4f07e9(0x55b)](),this['_cacheScaleX']=this[_0x4f07e9(0x83c)]['x'],this['_cacheScaleY']=this[_0x4f07e9(0x83c)]['y'];},Spriteset_Base[_0x34b3e3(0x237)]['adjustPictureAntiZoom']=function(){const _0x4ac4aa=_0x34b3e3;if(SceneManager[_0x4ac4aa(0x5b1)]()&&Spriteset_Map['DETACH_PICTURE_CONTAINER'])return;else{if(SceneManager[_0x4ac4aa(0x686)]()&&Spriteset_Battle[_0x4ac4aa(0x1ba)])return;}this[_0x4ac4aa(0x83c)]['x']!==0x0&&(this[_0x4ac4aa(0x3c1)][_0x4ac4aa(0x83c)]['x']=0x1/this[_0x4ac4aa(0x83c)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x4ac4aa(0x83c)]['x'])),this['scale']['y']!==0x0&&(this[_0x4ac4aa(0x3c1)][_0x4ac4aa(0x83c)]['y']=0x1/this[_0x4ac4aa(0x83c)]['y'],this[_0x4ac4aa(0x3c1)]['y']=-(this['y']/this[_0x4ac4aa(0x83c)]['y']));},VisuMZ[_0x34b3e3(0x4d5)]['Spriteset_Base_updatePosition']=Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x509)],Spriteset_Base['prototype'][_0x34b3e3(0x509)]=function(){const _0x2284a1=_0x34b3e3;VisuMZ[_0x2284a1(0x4d5)][_0x2284a1(0x573)][_0x2284a1(0x267)](this),this[_0x2284a1(0x3a7)]();},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x3a7)]=function(){const _0x3d4c1c=_0x34b3e3;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0x3d4c1c(0x59e)]($gameScreen['shake']());const _0x41f8d0=$gameScreen[_0x3d4c1c(0x75f)]();switch($gameScreen[_0x3d4c1c(0x75f)]()){case _0x3d4c1c(0x839):this[_0x3d4c1c(0x4c7)]();break;case _0x3d4c1c(0x233):this[_0x3d4c1c(0x858)]();break;case _0x3d4c1c(0x2e4):this[_0x3d4c1c(0x55f)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x4c7)]=function(){const _0x11eee8=_0x34b3e3,_0x5352b8=VisuMZ[_0x11eee8(0x4d5)][_0x11eee8(0x2fb)][_0x11eee8(0x476)];if(_0x5352b8&&_0x5352b8['originalJS'])return _0x5352b8[_0x11eee8(0x773)]['call'](this);this['x']+=Math[_0x11eee8(0x59e)]($gameScreen[_0x11eee8(0x674)]());},Spriteset_Base[_0x34b3e3(0x237)]['updatePositionCoreEngineShakeRand']=function(){const _0x34377d=_0x34b3e3,_0x26cfa4=VisuMZ[_0x34377d(0x4d5)][_0x34377d(0x2fb)]['ScreenShake'];if(_0x26cfa4&&_0x26cfa4[_0x34377d(0x644)])return _0x26cfa4[_0x34377d(0x644)]['call'](this);const _0x4229f4=$gameScreen[_0x34377d(0x259)]*0.75,_0x3767c0=$gameScreen[_0x34377d(0x236)]*0.6,_0x4e2d07=$gameScreen['_shakeDuration'];this['x']+=Math[_0x34377d(0x59e)](Math['randomInt'](_0x4229f4)-Math[_0x34377d(0x592)](_0x3767c0))*(Math[_0x34377d(0x2c1)](_0x4e2d07,0x1e)*0.5),this['y']+=Math[_0x34377d(0x59e)](Math[_0x34377d(0x592)](_0x4229f4)-Math['randomInt'](_0x3767c0))*(Math['min'](_0x4e2d07,0x1e)*0.5);},Spriteset_Base['prototype'][_0x34b3e3(0x858)]=function(){const _0x51d9f5=_0x34b3e3,_0x4de0ab=VisuMZ[_0x51d9f5(0x4d5)]['Settings'][_0x51d9f5(0x476)];if(_0x4de0ab&&_0x4de0ab[_0x51d9f5(0x74a)])return _0x4de0ab['horzJS']['call'](this);const _0x35513b=$gameScreen[_0x51d9f5(0x259)]*0.75,_0x961c91=$gameScreen[_0x51d9f5(0x236)]*0.6,_0x4d3dde=$gameScreen[_0x51d9f5(0x23c)];this['x']+=Math[_0x51d9f5(0x59e)](Math[_0x51d9f5(0x592)](_0x35513b)-Math[_0x51d9f5(0x592)](_0x961c91))*(Math[_0x51d9f5(0x2c1)](_0x4d3dde,0x1e)*0.5);},Spriteset_Base[_0x34b3e3(0x237)]['updatePositionCoreEngineShakeVert']=function(){const _0x32de22=_0x34b3e3,_0x4c8f02=VisuMZ['CoreEngine'][_0x32de22(0x2fb)][_0x32de22(0x476)];if(_0x4c8f02&&_0x4c8f02['vertJS'])return _0x4c8f02['vertJS'][_0x32de22(0x267)](this);const _0x2f2145=$gameScreen[_0x32de22(0x259)]*0.75,_0x3f5520=$gameScreen[_0x32de22(0x236)]*0.6,_0x30b1e4=$gameScreen['_shakeDuration'];this['y']+=Math['round'](Math[_0x32de22(0x592)](_0x2f2145)-Math[_0x32de22(0x592)](_0x3f5520))*(Math[_0x32de22(0x2c1)](_0x30b1e4,0x1e)*0.5);},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x612)]=function(){const _0x1abb7c=_0x34b3e3;for(const _0x338cbd of this[_0x1abb7c(0x615)]){!_0x338cbd[_0x1abb7c(0x624)]()&&this[_0x1abb7c(0x873)](_0x338cbd);}this[_0x1abb7c(0x1e7)]();},Spriteset_Base['prototype'][_0x34b3e3(0x1e7)]=function(){for(;;){const _0x3a48d3=$gameTemp['retrieveFauxAnimation']();if(_0x3a48d3)this['createFauxAnimation'](_0x3a48d3);else break;}},Spriteset_Base['prototype'][_0x34b3e3(0x83d)]=function(_0x5acf7a){const _0x24fa98=_0x34b3e3,_0x42c74f=$dataAnimations[_0x5acf7a[_0x24fa98(0x2b2)]],_0x2d87f=_0x5acf7a[_0x24fa98(0x8d9)],_0x49b19d=_0x5acf7a['mirror'],_0x3e4305=_0x5acf7a[_0x24fa98(0x48c)];let _0x203267=this['animationBaseDelay']();const _0x53914a=this[_0x24fa98(0x4d6)]();if(this[_0x24fa98(0x21a)](_0x42c74f))for(const _0x249b54 of _0x2d87f){this[_0x24fa98(0x8dc)]([_0x249b54],_0x42c74f,_0x49b19d,_0x203267,_0x3e4305),_0x203267+=_0x53914a;}else this[_0x24fa98(0x8dc)](_0x2d87f,_0x42c74f,_0x49b19d,_0x203267,_0x3e4305);},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x254)]=function(_0x3e1d50,_0x332910,_0x3abdcc,_0x221c7b){const _0x1afa9b=_0x34b3e3,_0x65ac4f=this['isMVAnimation'](_0x332910),_0x35a22b=new(_0x65ac4f?Sprite_AnimationMV:Sprite_Animation)(),_0x2ea84f=this['makeTargetSprites'](_0x3e1d50),_0x552334=this['animationBaseDelay'](),_0x2b37e9=_0x221c7b>_0x552334?this[_0x1afa9b(0x700)]():null;this[_0x1afa9b(0x128)](_0x3e1d50[0x0])&&(_0x3abdcc=!_0x3abdcc),_0x35a22b[_0x1afa9b(0x195)]=_0x3e1d50,_0x35a22b[_0x1afa9b(0x58a)](_0x2ea84f,_0x332910,_0x3abdcc,_0x221c7b,_0x2b37e9),this[_0x1afa9b(0x54b)](_0x35a22b),this[_0x1afa9b(0x3ed)][_0x1afa9b(0x1b7)](_0x35a22b);},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x8dc)]=function(_0x1c7f7a,_0x301217,_0x13518c,_0x1fad00,_0xe6c157){const _0x53f810=_0x34b3e3,_0x540b60=this[_0x53f810(0x319)](_0x301217),_0x875f3e=new(_0x540b60?Sprite_AnimationMV:Sprite_Animation)(),_0x6dc2e3=this[_0x53f810(0x5a3)](_0x1c7f7a);this[_0x53f810(0x128)](_0x1c7f7a[0x0])&&(_0x13518c=!_0x13518c);_0x875f3e['targetObjects']=_0x1c7f7a,_0x875f3e[_0x53f810(0x58a)](_0x6dc2e3,_0x301217,_0x13518c,_0x1fad00),_0x875f3e[_0x53f810(0x568)](_0xe6c157),this[_0x53f810(0x54b)](_0x875f3e);if(this[_0x53f810(0x3ed)])this[_0x53f810(0x3ed)][_0x53f810(0x2fe)](_0x875f3e);this['_fauxAnimationSprites'][_0x53f810(0x1b7)](_0x875f3e);},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x54b)]=function(_0xdbfab3){const _0x51e90e=_0x34b3e3;this[_0x51e90e(0x217)]['addChild'](_0xdbfab3);},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x637)]=function(_0x1543c2){const _0x3ea466=_0x34b3e3;this[_0x3ea466(0x3ed)][_0x3ea466(0x2fe)](_0x1543c2),this[_0x3ea466(0x486)](_0x1543c2);for(const _0x51d30d of _0x1543c2[_0x3ea466(0x195)]){_0x51d30d[_0x3ea466(0x5cb)]&&_0x51d30d[_0x3ea466(0x5cb)]();}_0x1543c2[_0x3ea466(0x49f)]();},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x873)]=function(_0x3c79c7){const _0x300e41=_0x34b3e3;this[_0x300e41(0x615)][_0x300e41(0x2fe)](_0x3c79c7),this[_0x300e41(0x486)](_0x3c79c7);for(const _0x45e0c3 of _0x3c79c7[_0x300e41(0x195)]){_0x45e0c3['endAnimation']&&_0x45e0c3[_0x300e41(0x5cb)]();}_0x3c79c7[_0x300e41(0x49f)]();},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x486)]=function(_0xe181e1){const _0x5b6f51=_0x34b3e3;this[_0x5b6f51(0x217)][_0x5b6f51(0x868)](_0xe181e1);},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x26c)]=function(){const _0x197b6f=_0x34b3e3;for(const _0x63f3c of this[_0x197b6f(0x615)]){this[_0x197b6f(0x873)](_0x63f3c);}},Spriteset_Base[_0x34b3e3(0x237)]['isFauxAnimationPlaying']=function(){const _0x3ec3f5=_0x34b3e3;return this[_0x3ec3f5(0x615)][_0x3ec3f5(0x1ee)]>0x0;},Spriteset_Base['prototype'][_0x34b3e3(0x774)]=function(){const _0xb46135=_0x34b3e3;for(const _0x63a66d of this[_0xb46135(0x79a)]){!_0x63a66d['isPlaying']()&&this[_0xb46135(0x43a)](_0x63a66d);}this[_0xb46135(0x51b)]();},Spriteset_Base['prototype']['processPointAnimationRequests']=function(){const _0x3d17c9=_0x34b3e3;for(;;){const _0x4e2cbe=$gameTemp[_0x3d17c9(0x2f9)]();if(_0x4e2cbe)this['createPointAnimation'](_0x4e2cbe);else break;}},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x316)]=function(_0x3c0ecc){const _0x1c77c3=_0x34b3e3,_0x31fbbf=$dataAnimations[_0x3c0ecc[_0x1c77c3(0x2b2)]],_0xcf7991=this['createPointAnimationTargets'](_0x3c0ecc),_0x22ee1f=_0x3c0ecc[_0x1c77c3(0x8b1)],_0x1237bd=_0x3c0ecc[_0x1c77c3(0x48c)];let _0x21b273=this[_0x1c77c3(0x594)]();const _0x525bc8=this[_0x1c77c3(0x4d6)]();if(this[_0x1c77c3(0x21a)](_0x31fbbf))for(const _0x555978 of _0xcf7991){this[_0x1c77c3(0x73f)]([_0x555978],_0x31fbbf,_0x22ee1f,_0x21b273,_0x1237bd),_0x21b273+=_0x525bc8;}else this[_0x1c77c3(0x73f)](_0xcf7991,_0x31fbbf,_0x22ee1f,_0x21b273,_0x1237bd);},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x2c8)]=function(_0x31bd5e){const _0x54fc3e=_0x34b3e3,_0x4ea615=new Sprite_Clickable(),_0x450063=this[_0x54fc3e(0x4a9)]();_0x4ea615['x']=_0x31bd5e['x']-_0x450063['x'],_0x4ea615['y']=_0x31bd5e['y']-_0x450063['y'],_0x4ea615['z']=0x64;const _0x64ba40=this['getPointAnimationLayer']();return _0x64ba40[_0x54fc3e(0x341)](_0x4ea615),[_0x4ea615];},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x4a9)]=function(){return this;},Spriteset_Map[_0x34b3e3(0x237)][_0x34b3e3(0x4a9)]=function(){return this['_tilemap']||this;},Spriteset_Battle[_0x34b3e3(0x237)][_0x34b3e3(0x4a9)]=function(){const _0x3cfd1c=_0x34b3e3;return this[_0x3cfd1c(0x1cf)]||this;},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x73f)]=function(_0x9e738f,_0x536fd5,_0x18af41,_0x72f524,_0x25b577){const _0x799090=_0x34b3e3,_0x219835=this[_0x799090(0x319)](_0x536fd5),_0x1222d7=new(_0x219835?Sprite_AnimationMV:Sprite_Animation)();_0x1222d7[_0x799090(0x195)]=_0x9e738f,_0x1222d7[_0x799090(0x58a)](_0x9e738f,_0x536fd5,_0x18af41,_0x72f524),_0x1222d7[_0x799090(0x568)](_0x25b577),this['addAnimationSpriteToContainer'](_0x1222d7),this['_pointAnimationSprites']['push'](_0x1222d7);},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x43a)]=function(_0x108f26){const _0x599550=_0x34b3e3;this[_0x599550(0x79a)][_0x599550(0x2fe)](_0x108f26),this[_0x599550(0x217)][_0x599550(0x868)](_0x108f26);for(const _0x162805 of _0x108f26[_0x599550(0x195)]){_0x162805[_0x599550(0x5cb)]&&_0x162805[_0x599550(0x5cb)]();const _0x4f490e=this['getPointAnimationLayer']();if(_0x4f490e)_0x4f490e['removeChild'](_0x162805);}_0x108f26['destroy']();},Spriteset_Base[_0x34b3e3(0x237)]['removeAllPointAnimations']=function(){const _0x106f45=_0x34b3e3;for(const _0x3a90ae of this[_0x106f45(0x79a)]){this[_0x106f45(0x43a)](_0x3a90ae);}},Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x7cf)]=function(){const _0x1cef2a=_0x34b3e3;return this[_0x1cef2a(0x79a)][_0x1cef2a(0x1ee)]>0x0;},VisuMZ['CoreEngine'][_0x34b3e3(0x21c)]=Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x7c5)],Spriteset_Base[_0x34b3e3(0x237)][_0x34b3e3(0x7c5)]=function(){const _0x376bb1=_0x34b3e3;return VisuMZ[_0x376bb1(0x4d5)][_0x376bb1(0x21c)][_0x376bb1(0x267)](this)||this[_0x376bb1(0x7cf)]();},Spriteset_Map[_0x34b3e3(0x1ba)]=VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)]['QoL'][_0x34b3e3(0x80c)]||![],VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x696)]=Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x701)],Scene_Map['prototype']['createSpriteset']=function(){const _0x23de32=_0x34b3e3;VisuMZ[_0x23de32(0x4d5)][_0x23de32(0x696)][_0x23de32(0x267)](this);if(!Spriteset_Map[_0x23de32(0x1ba)])return;const _0x12f630=this[_0x23de32(0x5b8)];if(!_0x12f630)return;this['_pictureContainer']=_0x12f630[_0x23de32(0x3c1)];if(!this[_0x23de32(0x3c1)])return;this[_0x23de32(0x341)](this[_0x23de32(0x3c1)]);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x77e)]=Spriteset_Map[_0x34b3e3(0x237)][_0x34b3e3(0x8db)],Spriteset_Map[_0x34b3e3(0x237)][_0x34b3e3(0x8db)]=function(){const _0x3faad0=_0x34b3e3;VisuMZ[_0x3faad0(0x4d5)][_0x3faad0(0x77e)][_0x3faad0(0x267)](this),this[_0x3faad0(0x346)]();},Spriteset_Map[_0x34b3e3(0x237)][_0x34b3e3(0x346)]=function(){const _0x2b411f=_0x34b3e3,_0x35f63c=$gameMap['tileset']();if(!_0x35f63c)return;const _0x1bf6b4=$gameMap['getTileExtendTerrainTags']();if(Object[_0x2b411f(0x1c1)](_0x1bf6b4)[_0x2b411f(0x1ee)]<=0x0)return;const _0x491e3e=$gameMap['tilesetFlags']();this['_tileExtendSprites']=this[_0x2b411f(0x8c2)]||[];for(let _0x3693fd=0x0;_0x3693fd<$gameMap[_0x2b411f(0x5f4)]();_0x3693fd++){for(let _0xf9b9d7=0x0;_0xf9b9d7<$gameMap[_0x2b411f(0x4c5)]();_0xf9b9d7++){for(const _0x3952fd of $gameMap[_0x2b411f(0x1e5)](_0xf9b9d7,_0x3693fd)){const _0x199256=_0x491e3e[_0x3952fd]>>0xc,_0x1c4ec6=_0x1bf6b4[_0x199256]||0x0;if(_0x1c4ec6<=0x0)continue;this[_0x2b411f(0x2a8)](_0xf9b9d7,_0x3693fd,_0x3952fd,_0x1c4ec6);}}}},Spriteset_Map[_0x34b3e3(0x237)][_0x34b3e3(0x302)]=function(){const _0x3fd678=_0x34b3e3;this[_0x3fd678(0x8c2)]=this['_tileExtendSprites']||[];for(const _0x1b059a of this[_0x3fd678(0x8c2)]){this[_0x3fd678(0x58b)][_0x3fd678(0x868)](_0x1b059a);}this['_tileExtendSprites']=[];},Spriteset_Map[_0x34b3e3(0x237)][_0x34b3e3(0x2a8)]=function(_0x4b59a3,_0xb4d04c,_0x3d6093,_0x1292e1){const _0x34dd51=_0x34b3e3,_0x3c8429=new Sprite_ExtendedTile(_0x4b59a3,_0xb4d04c,_0x3d6093,_0x1292e1),_0x50ccd0=$gameMap['tilesetFlags']();_0x50ccd0[_0x3d6093]&0x10?_0x3c8429['z']=0x4:_0x3c8429['z']=0x3,this['_tilemap'][_0x34dd51(0x341)](_0x3c8429),this[_0x34dd51(0x8c2)][_0x34dd51(0x1b7)](_0x3c8429);},VisuMZ['CoreEngine'][_0x34b3e3(0x8de)]=Tilemap[_0x34b3e3(0x237)]['_addSpotTile'],Tilemap[_0x34b3e3(0x237)]['_addSpotTile']=function(_0x282c14,_0x132088,_0x334ca5){const _0x43fdef=_0x34b3e3;if($gameMap['isTileExtended'](_0x282c14))return;VisuMZ[_0x43fdef(0x4d5)]['Tilemap_addSpotTile'][_0x43fdef(0x267)](this,_0x282c14,_0x132088,_0x334ca5);},Spriteset_Battle['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x34b3e3(0x4d5)]['Settings']['QoL'][_0x34b3e3(0x51f)]||![],VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x8b3)]=Scene_Battle[_0x34b3e3(0x237)][_0x34b3e3(0x701)],Scene_Battle[_0x34b3e3(0x237)]['createSpriteset']=function(){const _0x4a4c0a=_0x34b3e3;VisuMZ[_0x4a4c0a(0x4d5)][_0x4a4c0a(0x8b3)][_0x4a4c0a(0x267)](this);if(!Spriteset_Battle[_0x4a4c0a(0x1ba)])return;const _0x5c1488=this[_0x4a4c0a(0x5b8)];if(!_0x5c1488)return;this[_0x4a4c0a(0x3c1)]=_0x5c1488[_0x4a4c0a(0x3c1)];if(!this[_0x4a4c0a(0x3c1)])return;this[_0x4a4c0a(0x341)](this['_pictureContainer']);},Spriteset_Battle[_0x34b3e3(0x237)][_0x34b3e3(0x610)]=function(){const _0x53fdc4=_0x34b3e3;this['_backgroundFilter']=new PIXI[(_0x53fdc4(0x271))][(_0x53fdc4(0x27e))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0x53fdc4(0x708)]['bitmap']=SceneManager['backgroundBitmap'](),this[_0x53fdc4(0x708)][_0x53fdc4(0x271)]=[this[_0x53fdc4(0x298)]],this['_baseSprite'][_0x53fdc4(0x341)](this[_0x53fdc4(0x708)]);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x5f7)]=Spriteset_Battle['prototype'][_0x34b3e3(0x651)],Spriteset_Battle[_0x34b3e3(0x237)][_0x34b3e3(0x651)]=function(){const _0x59e3e7=_0x34b3e3;this[_0x59e3e7(0x68e)]()&&this[_0x59e3e7(0x517)](),VisuMZ[_0x59e3e7(0x4d5)]['Spriteset_Battle_createEnemies'][_0x59e3e7(0x267)](this);},VisuMZ['CoreEngine'][_0x34b3e3(0x59b)]=Spriteset_Battle[_0x34b3e3(0x237)][_0x34b3e3(0x743)],Spriteset_Battle[_0x34b3e3(0x237)][_0x34b3e3(0x743)]=function(){const _0x136ec0=_0x34b3e3;VisuMZ[_0x136ec0(0x4d5)][_0x136ec0(0x59b)][_0x136ec0(0x267)](this),this[_0x136ec0(0x1cf)]&&this['_battleField'][_0x136ec0(0x6d2)]();},Spriteset_Battle[_0x34b3e3(0x237)][_0x34b3e3(0x68e)]=function(){const _0x4d2499=_0x34b3e3,_0x59665a=VisuMZ[_0x4d2499(0x4d5)][_0x4d2499(0x2fb)][_0x4d2499(0x838)];if(!_0x59665a)return![];if(Utils[_0x4d2499(0x575)]>=_0x4d2499(0x1e0)&&!_0x59665a[_0x4d2499(0x718)])return![];if(Utils[_0x4d2499(0x575)]>='1.10.0'&&!_0x59665a['RepositionEnemies130'])return![];return _0x59665a[_0x4d2499(0x3a4)];},Spriteset_Battle['prototype'][_0x34b3e3(0x517)]=function(){const _0x41ca78=_0x34b3e3;for(member of $gameTroop[_0x41ca78(0x63e)]()){member[_0x41ca78(0x527)]();}},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x8d0)]=Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x7e8)],Window_Base[_0x34b3e3(0x237)]['initialize']=function(_0x124924){const _0x165980=_0x34b3e3;_0x124924['x']=Math['round'](_0x124924['x']),_0x124924['y']=Math[_0x165980(0x59e)](_0x124924['y']),_0x124924[_0x165980(0x4c5)]=Math[_0x165980(0x59e)](_0x124924['width']),_0x124924[_0x165980(0x5f4)]=Math[_0x165980(0x59e)](_0x124924['height']),this[_0x165980(0x78d)](),VisuMZ[_0x165980(0x4d5)][_0x165980(0x8d0)][_0x165980(0x267)](this,_0x124924),this[_0x165980(0x4a8)]();},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x78d)]=function(){const _0x499622=_0x34b3e3;this['_digitGrouping']=VisuMZ[_0x499622(0x4d5)][_0x499622(0x2fb)]['QoL'][_0x499622(0x2a6)],this[_0x499622(0x5f9)]=VisuMZ[_0x499622(0x4d5)][_0x499622(0x2fb)]['QoL'][_0x499622(0x7de)];},Window_Base[_0x34b3e3(0x237)]['lineHeight']=function(){const _0x48be72=_0x34b3e3;return VisuMZ[_0x48be72(0x4d5)][_0x48be72(0x2fb)][_0x48be72(0x1b4)][_0x48be72(0x2d5)];},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x367)]=function(){const _0x54f9aa=_0x34b3e3;return VisuMZ[_0x54f9aa(0x4d5)]['Settings'][_0x54f9aa(0x1b4)][_0x54f9aa(0x6b1)];},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x86a)]=function(){const _0x55ebe4=_0x34b3e3;$gameSystem['windowOpacity']?this[_0x55ebe4(0x54a)]=$gameSystem[_0x55ebe4(0x60d)]():this['backOpacity']=VisuMZ[_0x55ebe4(0x4d5)][_0x55ebe4(0x2fb)][_0x55ebe4(0x1b4)][_0x55ebe4(0x54d)];},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x45d)]=function(){const _0x426f09=_0x34b3e3;return VisuMZ[_0x426f09(0x4d5)][_0x426f09(0x2fb)][_0x426f09(0x1b4)]['TranslucentOpacity'];},Window_Base['prototype'][_0x34b3e3(0x426)]=function(){const _0xc89222=_0x34b3e3;return VisuMZ[_0xc89222(0x4d5)][_0xc89222(0x2fb)][_0xc89222(0x1b4)][_0xc89222(0x712)];},VisuMZ['CoreEngine'][_0x34b3e3(0x807)]=Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x6d2)],Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x6d2)]=function(){const _0x436c7a=_0x34b3e3;VisuMZ['CoreEngine'][_0x436c7a(0x807)][_0x436c7a(0x267)](this),this['updateCoreEasing']();},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x3cc)]=function(){const _0x5ab143=_0x34b3e3;this[_0x5ab143(0x596)]&&(this[_0x5ab143(0x165)]+=this['openingSpeed'](),this[_0x5ab143(0x439)]()&&(this[_0x5ab143(0x596)]=![]));},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x4a3)]=function(){const _0x29ce4e=_0x34b3e3;this[_0x29ce4e(0x7f3)]&&(this[_0x29ce4e(0x165)]-=this[_0x29ce4e(0x426)](),this[_0x29ce4e(0x3f8)]()&&(this[_0x29ce4e(0x7f3)]=![]));},VisuMZ['CoreEngine']['Window_Base_drawText']=Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x7a9)],Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x7a9)]=function(_0x5d54cf,_0x8a3c01,_0x5b3361,_0x35789a,_0x59fa92){const _0x488046=_0x34b3e3;if(this[_0x488046(0x670)]())_0x5d54cf=VisuMZ[_0x488046(0x1c2)](_0x5d54cf);VisuMZ[_0x488046(0x4d5)][_0x488046(0x490)]['call'](this,_0x5d54cf,_0x8a3c01,_0x5b3361,_0x35789a,_0x59fa92);},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x670)]=function(){return this['_digitGrouping'];},VisuMZ[_0x34b3e3(0x4d5)]['Window_Base_createTextState']=Window_Base[_0x34b3e3(0x237)]['createTextState'],Window_Base['prototype'][_0x34b3e3(0x441)]=function(_0x43fbd1,_0x36141a,_0x3e4c6d,_0x96003e){const _0x2a5227=_0x34b3e3;var _0x464e24=VisuMZ[_0x2a5227(0x4d5)]['Window_Base_createTextState']['call'](this,_0x43fbd1,_0x36141a,_0x3e4c6d,_0x96003e);if(this['useDigitGroupingEx']())_0x464e24[_0x2a5227(0x760)]=String(VisuMZ['GroupDigits'](_0x464e24[_0x2a5227(0x760)]))||'';return _0x464e24;},Window_Base['prototype'][_0x34b3e3(0x823)]=function(){const _0x132d37=_0x34b3e3;return this[_0x132d37(0x5f9)];},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x88a)]=function(_0x2a07d1){this['_digitGrouping']=_0x2a07d1;},Window_Base['prototype'][_0x34b3e3(0x5c1)]=function(_0x1b3a75){const _0x3227cf=_0x34b3e3;this[_0x3227cf(0x5f9)]=_0x1b3a75;},VisuMZ[_0x34b3e3(0x4d5)]['Window_Base_drawIcon']=Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x3ce)],Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x3ce)]=function(_0x2945fa,_0xf929c8,_0x17f153){const _0x5e3d25=_0x34b3e3;_0xf929c8=Math['round'](_0xf929c8),_0x17f153=Math['round'](_0x17f153),VisuMZ[_0x5e3d25(0x4d5)]['Window_Base_drawIcon'][_0x5e3d25(0x267)](this,_0x2945fa,_0xf929c8,_0x17f153);},VisuMZ['CoreEngine'][_0x34b3e3(0x767)]=Window_Base[_0x34b3e3(0x237)]['drawFace'],Window_Base['prototype'][_0x34b3e3(0x85e)]=function(_0x369caf,_0x4e456f,_0x489c34,_0x35e61b,_0x4e9685,_0x935ba4){const _0x19efbb=_0x34b3e3;_0x4e9685=_0x4e9685||ImageManager[_0x19efbb(0x1d1)],_0x935ba4=_0x935ba4||ImageManager[_0x19efbb(0x69d)],_0x489c34=Math[_0x19efbb(0x59e)](_0x489c34),_0x35e61b=Math[_0x19efbb(0x59e)](_0x35e61b),_0x4e9685=Math[_0x19efbb(0x59e)](_0x4e9685),_0x935ba4=Math[_0x19efbb(0x59e)](_0x935ba4),VisuMZ['CoreEngine'][_0x19efbb(0x767)]['call'](this,_0x369caf,_0x4e456f,_0x489c34,_0x35e61b,_0x4e9685,_0x935ba4);},VisuMZ['CoreEngine'][_0x34b3e3(0x790)]=Window_Base['prototype'][_0x34b3e3(0x234)],Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x234)]=function(_0x2cc9e8,_0xd4d809,_0x2ba441,_0x596e7a){const _0x4eca93=_0x34b3e3;_0x2ba441=Math[_0x4eca93(0x59e)](_0x2ba441),_0x596e7a=Math[_0x4eca93(0x59e)](_0x596e7a),VisuMZ[_0x4eca93(0x4d5)][_0x4eca93(0x790)][_0x4eca93(0x267)](this,_0x2cc9e8,_0xd4d809,_0x2ba441,_0x596e7a);},VisuMZ[_0x34b3e3(0x4d5)]['Window_Selectable_itemRect']=Window_Selectable['prototype'][_0x34b3e3(0x57d)],Window_Selectable[_0x34b3e3(0x237)][_0x34b3e3(0x57d)]=function(_0x4b11fd){const _0x42e45c=_0x34b3e3;let _0x1fc984=VisuMZ[_0x42e45c(0x4d5)]['Window_Selectable_itemRect']['call'](this,_0x4b11fd);return _0x1fc984['x']=Math[_0x42e45c(0x59e)](_0x1fc984['x']),_0x1fc984['y']=Math[_0x42e45c(0x59e)](_0x1fc984['y']),_0x1fc984[_0x42e45c(0x4c5)]=Math['round'](_0x1fc984['width']),_0x1fc984[_0x42e45c(0x5f4)]=Math[_0x42e45c(0x59e)](_0x1fc984[_0x42e45c(0x5f4)]),_0x1fc984;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x488)]=Window_StatusBase['prototype']['drawActorSimpleStatus'],Window_StatusBase[_0x34b3e3(0x237)]['drawActorSimpleStatus']=function(_0x573650,_0x4735ba,_0x11c8b3){const _0x316a39=_0x34b3e3;_0x4735ba=Math[_0x316a39(0x59e)](_0x4735ba),_0x11c8b3=Math[_0x316a39(0x59e)](_0x11c8b3),VisuMZ[_0x316a39(0x4d5)][_0x316a39(0x488)][_0x316a39(0x267)](this,_0x573650,_0x4735ba,_0x11c8b3);},Window_Base[_0x34b3e3(0x237)]['initCoreEasing']=function(){const _0x26d380=_0x34b3e3;this[_0x26d380(0x41d)]={'duration':0x0,'wholeDuration':0x0,'type':_0x26d380(0x722),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x26d380(0x83c)]['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this[_0x26d380(0x54a)],'targetContentsOpacity':this[_0x26d380(0x88f)]};},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x560)]=function(){const _0x387aa4=_0x34b3e3;if(!this[_0x387aa4(0x41d)])return;if(this[_0x387aa4(0x41d)]['duration']<=0x0)return;this['x']=this[_0x387aa4(0x123)](this['x'],this['_coreEasing'][_0x387aa4(0x13b)]),this['y']=this['applyCoreEasing'](this['y'],this[_0x387aa4(0x41d)][_0x387aa4(0x6aa)]),this[_0x387aa4(0x83c)]['x']=this[_0x387aa4(0x123)](this['scale']['x'],this[_0x387aa4(0x41d)]['targetScaleX']),this[_0x387aa4(0x83c)]['y']=this['applyCoreEasing'](this[_0x387aa4(0x83c)]['y'],this[_0x387aa4(0x41d)]['targetScaleY']),this['opacity']=this[_0x387aa4(0x123)](this[_0x387aa4(0x653)],this[_0x387aa4(0x41d)][_0x387aa4(0x646)]),this[_0x387aa4(0x54a)]=this['applyCoreEasing'](this['backOpacity'],this[_0x387aa4(0x41d)]['targetBackOpacity']),this[_0x387aa4(0x88f)]=this['applyCoreEasing'](this['contentsOpacity'],this[_0x387aa4(0x41d)][_0x387aa4(0x3fc)]),this['_coreEasing']['duration']--;},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x123)]=function(_0xeade6b,_0x505076){const _0x1d49d8=_0x34b3e3;if(!this['_coreEasing'])return _0x505076;const _0x2d958c=this[_0x1d49d8(0x41d)][_0x1d49d8(0x3c4)],_0x182f9d=this[_0x1d49d8(0x41d)][_0x1d49d8(0x8dd)],_0x4cfb23=this[_0x1d49d8(0x340)]((_0x182f9d-_0x2d958c)/_0x182f9d),_0x2faf1b=this[_0x1d49d8(0x340)]((_0x182f9d-_0x2d958c+0x1)/_0x182f9d),_0x43eec4=(_0xeade6b-_0x505076*_0x4cfb23)/(0x1-_0x4cfb23);return _0x43eec4+(_0x505076-_0x43eec4)*_0x2faf1b;},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x340)]=function(_0x3550cc){const _0x38202d=_0x34b3e3;if(!this[_0x38202d(0x41d)])return _0x3550cc;return VisuMZ['ApplyEasing'](_0x3550cc,this[_0x38202d(0x41d)][_0x38202d(0x1e2)]||'LINEAR');},Window_Base['prototype'][_0x34b3e3(0x212)]=function(_0x5654ef,_0x3a2b57){const _0x2f94b5=_0x34b3e3;if(!this[_0x2f94b5(0x41d)])return;this['x']=this['_coreEasing'][_0x2f94b5(0x13b)],this['y']=this[_0x2f94b5(0x41d)][_0x2f94b5(0x6aa)],this[_0x2f94b5(0x83c)]['x']=this[_0x2f94b5(0x41d)][_0x2f94b5(0x293)],this[_0x2f94b5(0x83c)]['y']=this[_0x2f94b5(0x41d)][_0x2f94b5(0x6e6)],this[_0x2f94b5(0x653)]=this[_0x2f94b5(0x41d)][_0x2f94b5(0x646)],this[_0x2f94b5(0x54a)]=this['_coreEasing']['targetBackOpacity'],this[_0x2f94b5(0x88f)]=this[_0x2f94b5(0x41d)][_0x2f94b5(0x3fc)],this[_0x2f94b5(0x563)](_0x5654ef,_0x3a2b57,this['x'],this['y'],this[_0x2f94b5(0x83c)]['x'],this[_0x2f94b5(0x83c)]['y'],this[_0x2f94b5(0x653)],this[_0x2f94b5(0x54a)],this[_0x2f94b5(0x88f)]);},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x563)]=function(_0x2773d3,_0x32f80d,_0x44123f,_0x30dd23,_0x4d38a9,_0x4aea26,_0x5e7d2d,_0xcaa194,_0x3c3272){const _0xf645d2=_0x34b3e3;this[_0xf645d2(0x41d)]={'duration':_0x2773d3,'wholeDuration':_0x2773d3,'type':_0x32f80d,'targetX':_0x44123f,'targetY':_0x30dd23,'targetScaleX':_0x4d38a9,'targetScaleY':_0x4aea26,'targetOpacity':_0x5e7d2d,'targetBackOpacity':_0xcaa194,'targetContentsOpacity':_0x3c3272};},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x8e7)]=function(_0x37c6a4,_0x349fa6,_0x4a39a8,_0x1fa335,_0x4385f9){const _0x59d84a=_0x34b3e3;this[_0x59d84a(0x31b)](),this['contents'][_0x59d84a(0x1c9)]=VisuMZ[_0x59d84a(0x4d5)]['Settings'][_0x59d84a(0x31c)][_0x59d84a(0x67a)];const _0x42f598=VisuMZ[_0x59d84a(0x4d5)][_0x59d84a(0x2fb)][_0x59d84a(0x31c)][_0x59d84a(0x806)];if(_0x42f598>0x0&&_0x349fa6===TextManager[_0x59d84a(0x569)]){const _0x1f6248=_0x1fa335+(this[_0x59d84a(0x2fa)]()-ImageManager[_0x59d84a(0x349)])/0x2;this[_0x59d84a(0x3ce)](_0x42f598,_0x4a39a8+(_0x4385f9-ImageManager['iconWidth']),_0x1f6248),_0x4385f9-=ImageManager[_0x59d84a(0x42d)]+0x4;}else this[_0x59d84a(0x337)](ColorManager[_0x59d84a(0x34c)]()),this[_0x59d84a(0x7a9)](_0x349fa6,_0x4a39a8,_0x1fa335,_0x4385f9,_0x59d84a(0x57c)),_0x4385f9-=this['textWidth'](_0x349fa6)+0x6;this[_0x59d84a(0x4f5)]();const _0x25f6e2=this[_0x59d84a(0x7ea)](this[_0x59d84a(0x37c)]?VisuMZ[_0x59d84a(0x1c2)](_0x37c6a4):_0x37c6a4);_0x25f6e2>_0x4385f9?this[_0x59d84a(0x7a9)](VisuMZ[_0x59d84a(0x4d5)][_0x59d84a(0x2fb)][_0x59d84a(0x31c)]['GoldOverlap'],_0x4a39a8,_0x1fa335,_0x4385f9,_0x59d84a(0x57c)):this[_0x59d84a(0x7a9)](_0x37c6a4,_0x4a39a8,_0x1fa335,_0x4385f9,'right'),this[_0x59d84a(0x31b)]();},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x75e)]=function(_0x45ccd0,_0x1509ec,_0x1cb235,_0x4af96f,_0x42748d){const _0x34308d=_0x34b3e3,_0x26d671=ImageManager[_0x34308d(0x132)](_0x34308d(0x485)),_0x52782f=ImageManager['iconWidth'],_0x468ff5=ImageManager['iconHeight'],_0x22a71e=_0x45ccd0%0x10*_0x52782f,_0x212161=Math[_0x34308d(0x6ef)](_0x45ccd0/0x10)*_0x468ff5,_0x175c1d=_0x4af96f,_0x1dde9c=_0x4af96f;this[_0x34308d(0x63c)][_0x34308d(0x5da)][_0x34308d(0x48f)]=_0x42748d,this[_0x34308d(0x63c)][_0x34308d(0x427)](_0x26d671,_0x22a71e,_0x212161,_0x52782f,_0x468ff5,_0x1509ec,_0x1cb235,_0x175c1d,_0x1dde9c),this[_0x34308d(0x63c)][_0x34308d(0x5da)][_0x34308d(0x48f)]=!![];},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x4bf)]=function(_0x1ac0ac,_0x5a57ec,_0x5ac5ad,_0x3d3db8,_0x232693,_0x10632f){const _0x25dc7a=_0x34b3e3,_0x45b11e=Math[_0x25dc7a(0x6ef)]((_0x5ac5ad-0x2)*_0x3d3db8),_0x1dc93e=Sprite_Gauge[_0x25dc7a(0x237)][_0x25dc7a(0x758)][_0x25dc7a(0x267)](this),_0x297a63=_0x5a57ec+this[_0x25dc7a(0x2fa)]()-_0x1dc93e-0x2;this[_0x25dc7a(0x63c)][_0x25dc7a(0x6b4)](_0x1ac0ac,_0x297a63,_0x5ac5ad,_0x1dc93e,ColorManager[_0x25dc7a(0x5c7)]()),this[_0x25dc7a(0x63c)][_0x25dc7a(0x735)](_0x1ac0ac+0x1,_0x297a63+0x1,_0x45b11e,_0x1dc93e-0x2,_0x232693,_0x10632f);},Window_Scrollable[_0x34b3e3(0x6f0)]={'enabled':VisuMZ['CoreEngine'][_0x34b3e3(0x2fb)][_0x34b3e3(0x1b4)][_0x34b3e3(0x7ba)]??!![],'thickness':VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)][_0x34b3e3(0x1b4)]['BarThickness']??0x2,'offset':VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)][_0x34b3e3(0x1b4)][_0x34b3e3(0x46b)]??0x2,'bodyColor':VisuMZ['CoreEngine'][_0x34b3e3(0x2fb)][_0x34b3e3(0x1b4)][_0x34b3e3(0x483)]??0x0,'offColor':VisuMZ[_0x34b3e3(0x4d5)]['Settings'][_0x34b3e3(0x1b4)][_0x34b3e3(0x502)]??0x7,'offOpacity':VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)][_0x34b3e3(0x1b4)][_0x34b3e3(0x64c)]??0x80},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x763)]=function(){const _0x22eb6a=_0x34b3e3;return Window_Scrollable['SCROLLBAR']['enabled']&&Window_Scrollable[_0x22eb6a(0x6f0)][_0x22eb6a(0x24b)]>0x0;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x8f6)]=Window_Base['prototype']['createContents'],Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x5bc)]=function(){const _0x26522f=_0x34b3e3;VisuMZ[_0x26522f(0x4d5)][_0x26522f(0x8f6)][_0x26522f(0x267)](this),this['createScrollBarSprites'](),this['setupScrollBarBitmap'](!![]),this[_0x26522f(0x21e)](![]);},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x6e9)]=function(){const _0x35fcf4=_0x34b3e3;if(!this[_0x35fcf4(0x763)]())return;if(this[_0x35fcf4(0x851)]||this['_scrollBarVert'])return;this[_0x35fcf4(0x3d5)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this['_scrollBarHorz']=new Sprite(),this[_0x35fcf4(0x5d9)]=new Sprite(),this[_0x35fcf4(0x341)](this[_0x35fcf4(0x851)]),this[_0x35fcf4(0x341)](this[_0x35fcf4(0x5d9)]);},Window_Base['prototype']['setupScrollBarBitmap']=function(_0x305b85){const _0x494cd9=_0x34b3e3,_0x3ec252=_0x305b85?this[_0x494cd9(0x851)]:this[_0x494cd9(0x5d9)];if(!_0x3ec252)return;const _0x253838=Window_Scrollable[_0x494cd9(0x6f0)],_0x1b01f6=_0x253838['thickness'],_0x25a47c=_0x305b85?this[_0x494cd9(0x586)]-_0x1b01f6*0x2:_0x1b01f6,_0x5664f4=_0x305b85?_0x1b01f6:this[_0x494cd9(0x370)]-_0x1b01f6*0x2;_0x3ec252['bitmap']=new Bitmap(_0x25a47c,_0x5664f4),_0x3ec252['setFrame'](0x0,0x0,_0x25a47c,_0x5664f4),this[_0x494cd9(0x18d)](_0x305b85);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x647)]=Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x5ff)],Window_Base['prototype']['destroyContents']=function(){const _0x46be2e=_0x34b3e3;VisuMZ['CoreEngine'][_0x46be2e(0x647)][_0x46be2e(0x267)](this),this[_0x46be2e(0x81c)]();},Window_Base['prototype'][_0x34b3e3(0x81c)]=function(){const _0x386e25=_0x34b3e3,_0x33fb41=[this[_0x386e25(0x851)],this[_0x386e25(0x5d9)]];for(const _0x3ea429 of _0x33fb41){if(_0x3ea429&&_0x3ea429['bitmap'])_0x3ea429['bitmap'][_0x386e25(0x49f)]();}},VisuMZ[_0x34b3e3(0x4d5)]['Window_Scrollable_update']=Window_Scrollable[_0x34b3e3(0x237)][_0x34b3e3(0x6d2)],Window_Scrollable['prototype'][_0x34b3e3(0x6d2)]=function(){const _0x537408=_0x34b3e3;VisuMZ[_0x537408(0x4d5)][_0x537408(0x36d)][_0x537408(0x267)](this),this[_0x537408(0x6e1)]();},Window_Scrollable[_0x34b3e3(0x237)][_0x34b3e3(0x6e1)]=function(){const _0x5ec3ee=_0x34b3e3;this[_0x5ec3ee(0x430)](),this['checkScrollBarBitmap'](!![]),this[_0x5ec3ee(0x7a4)](![]),this[_0x5ec3ee(0x18d)](!![]),this[_0x5ec3ee(0x18d)](![]);},Window_Scrollable['prototype'][_0x34b3e3(0x430)]=function(){const _0x8d3bdd=_0x34b3e3,_0x20ebe4=[this[_0x8d3bdd(0x851)],this[_0x8d3bdd(0x5d9)]];for(const _0x1a0727 of _0x20ebe4){_0x1a0727&&(_0x1a0727['visible']=this[_0x8d3bdd(0x763)]()&&this['isOpen']());}},Window_Scrollable[_0x34b3e3(0x237)]['checkScrollBarBitmap']=function(_0x1cf486){const _0x5ce76b=_0x34b3e3;if(!this[_0x5ce76b(0x3d5)])return;const _0x3d4560=this[_0x5ce76b(0x1a4)](_0x1cf486),_0x2a98ef=this[_0x5ce76b(0x37a)](_0x1cf486),_0x16a2e5=_0x1cf486?_0x5ce76b(0x812):'vert',_0x3ac2ed=_0x1cf486?'maxHorz':_0x5ce76b(0x28a);(this[_0x5ce76b(0x3d5)][_0x16a2e5]!==_0x3d4560||this[_0x5ce76b(0x3d5)][_0x3ac2ed]!==_0x2a98ef)&&(this[_0x5ce76b(0x3d5)][_0x16a2e5]=_0x3d4560,this['_lastScrollBarValues'][_0x3ac2ed]=_0x2a98ef,this['refreshScrollBarBitmap'](_0x1cf486,_0x3d4560,_0x2a98ef));},Window_Scrollable[_0x34b3e3(0x237)][_0x34b3e3(0x1a4)]=function(_0xba1a46){const _0x12b454=_0x34b3e3;if(this[_0x12b454(0x70a)]!==undefined)return _0xba1a46?this[_0x12b454(0x26a)]():this['origin']['y'];return _0xba1a46?this['scrollX']():this[_0x12b454(0x4f9)]();},Window_Scrollable[_0x34b3e3(0x237)][_0x34b3e3(0x37a)]=function(_0x5db375){const _0x3ba198=_0x34b3e3;if(this['_allTextHeight']!==undefined)return _0x5db375?this[_0x3ba198(0x883)]():Math[_0x3ba198(0x7ef)](0x0,this[_0x3ba198(0x70a)]-this['innerHeight']);return _0x5db375?this['maxScrollX']():this[_0x3ba198(0x6ea)]();},Window_Scrollable[_0x34b3e3(0x237)]['scrollbarHeight']=function(){const _0x1cfba1=_0x34b3e3;if(this[_0x1cfba1(0x70a)]!==undefined)return Math[_0x1cfba1(0x7ef)](0x0,this['_allTextHeight']);return this[_0x1cfba1(0x368)]();},Window_Scrollable['prototype'][_0x34b3e3(0x35f)]=function(_0x25ee86,_0x406e66,_0x3659ab){const _0x2c6cc4=_0x34b3e3,_0x3157de=_0x25ee86?this['_scrollBarHorz']:this[_0x2c6cc4(0x5d9)];if(!_0x3157de)return;if(!_0x3157de[_0x2c6cc4(0x401)])return;const _0x41722b=_0x3157de['bitmap'];_0x41722b[_0x2c6cc4(0x2a3)]();if(_0x3659ab<=0x0)return;const _0x431a44=_0x25ee86?this[_0x2c6cc4(0x586)]/this[_0x2c6cc4(0x324)]():this[_0x2c6cc4(0x370)]/this['scrollbarHeight'](),_0x4f1563=_0x25ee86?Math[_0x2c6cc4(0x59e)](_0x406e66*_0x431a44):0x0,_0x2476a7=_0x25ee86?0x0:Math['round'](_0x406e66*_0x431a44),_0x35a56e=_0x25ee86?Math[_0x2c6cc4(0x59e)](_0x41722b['width']*_0x431a44):_0x41722b[_0x2c6cc4(0x4c5)],_0x5277d8=_0x25ee86?_0x41722b[_0x2c6cc4(0x5f4)]:Math['round'](_0x41722b[_0x2c6cc4(0x5f4)]*_0x431a44),_0xdcb5d3=Window_Scrollable[_0x2c6cc4(0x6f0)],_0x14349e=ColorManager[_0x2c6cc4(0x4f4)](_0xdcb5d3[_0x2c6cc4(0x8e9)]),_0x5258ec=ColorManager['getColor'](_0xdcb5d3[_0x2c6cc4(0x4e4)]),_0x3adaf8=_0xdcb5d3[_0x2c6cc4(0x215)];_0x41722b[_0x2c6cc4(0x75a)]=_0x3adaf8,_0x41722b[_0x2c6cc4(0x658)](_0x14349e),_0x41722b[_0x2c6cc4(0x75a)]=0xff,_0x41722b['fillRect'](_0x4f1563,_0x2476a7,_0x35a56e,_0x5277d8,_0x5258ec);},Window_Base['prototype'][_0x34b3e3(0x18d)]=function(_0x10574b){const _0x535686=_0x34b3e3,_0x9de17b=_0x10574b?this[_0x535686(0x851)]:this[_0x535686(0x5d9)];if(!_0x9de17b)return;const _0x37c176=Window_Scrollable[_0x535686(0x6f0)],_0x2d7338=_0x37c176[_0x535686(0x24b)],_0xe01ffd=_0x37c176[_0x535686(0x55c)];if(!_0x9de17b['transform'])return;_0x9de17b['x']=this[_0x535686(0x278)]+(_0x10574b?_0x2d7338:this[_0x535686(0x586)]+_0xe01ffd),_0x9de17b['y']=this['padding']+(_0x10574b?this[_0x535686(0x370)]+_0xe01ffd:_0x2d7338);},Window_Selectable[_0x34b3e3(0x237)][_0x34b3e3(0x5db)]=function(_0x300f20){const _0x34e6dd=_0x34b3e3;let _0x4b71cb=this['index']();const _0x2a4ff4=this['maxItems'](),_0x5c98fa=this[_0x34e6dd(0x1a8)]();if(this['isUseModernControls']()&&(_0x4b71cb<_0x2a4ff4||_0x300f20&&_0x5c98fa===0x1)){_0x4b71cb+=_0x5c98fa;if(_0x4b71cb>=_0x2a4ff4)_0x4b71cb=_0x2a4ff4-0x1;this[_0x34e6dd(0x5fd)](_0x4b71cb);}else!this[_0x34e6dd(0x2d0)]()&&((_0x4b71cb<_0x2a4ff4-_0x5c98fa||_0x300f20&&_0x5c98fa===0x1)&&this['smoothSelect']((_0x4b71cb+_0x5c98fa)%_0x2a4ff4));},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x1aa)]=Window_Selectable[_0x34b3e3(0x237)][_0x34b3e3(0x5db)],Window_Selectable[_0x34b3e3(0x237)][_0x34b3e3(0x5db)]=function(_0x3feb47){const _0x1b61fc=_0x34b3e3;this[_0x1b61fc(0x2d0)]()&&_0x3feb47&&this[_0x1b61fc(0x1a8)]()===0x1&&this[_0x1b61fc(0x8ef)]()===this[_0x1b61fc(0x6d3)]()-0x1?this[_0x1b61fc(0x5fd)](0x0):VisuMZ[_0x1b61fc(0x4d5)][_0x1b61fc(0x1aa)][_0x1b61fc(0x267)](this,_0x3feb47);},Window_Selectable[_0x34b3e3(0x237)][_0x34b3e3(0x665)]=function(_0x543566){const _0x38944c=_0x34b3e3;let _0x23397d=Math[_0x38944c(0x7ef)](0x0,this[_0x38944c(0x8ef)]());const _0x32bb7d=this[_0x38944c(0x6d3)](),_0x32de9e=this[_0x38944c(0x1a8)]();if(this[_0x38944c(0x2d0)]()&&_0x23397d>0x0||_0x543566&&_0x32de9e===0x1){_0x23397d-=_0x32de9e;if(_0x23397d<=0x0)_0x23397d=0x0;this[_0x38944c(0x5fd)](_0x23397d);}else!this[_0x38944c(0x2d0)]()&&((_0x23397d>=_0x32de9e||_0x543566&&_0x32de9e===0x1)&&this[_0x38944c(0x5fd)]((_0x23397d-_0x32de9e+_0x32bb7d)%_0x32bb7d));},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x821)]=Window_Selectable[_0x34b3e3(0x237)]['cursorUp'],Window_Selectable[_0x34b3e3(0x237)][_0x34b3e3(0x665)]=function(_0x1453cb){const _0x21ad61=_0x34b3e3;this[_0x21ad61(0x2d0)]()&&_0x1453cb&&this['maxCols']()===0x1&&this[_0x21ad61(0x8ef)]()===0x0?this[_0x21ad61(0x5fd)](this['maxItems']()-0x1):VisuMZ[_0x21ad61(0x4d5)]['Window_Selectable_cursorUp'][_0x21ad61(0x267)](this,_0x1453cb);},Window_Selectable[_0x34b3e3(0x237)][_0x34b3e3(0x2d0)]=function(){const _0x4a203f=_0x34b3e3;return VisuMZ[_0x4a203f(0x4d5)]['Settings'][_0x4a203f(0x1f5)][_0x4a203f(0x54c)];},VisuMZ[_0x34b3e3(0x4d5)]['Window_Selectable_processCursorMove']=Window_Selectable[_0x34b3e3(0x237)]['processCursorMove'],Window_Selectable['prototype'][_0x34b3e3(0x3d1)]=function(){const _0x5ebadc=_0x34b3e3;this[_0x5ebadc(0x2d0)]()?(this[_0x5ebadc(0x678)](),this[_0x5ebadc(0x6c9)]()):VisuMZ['CoreEngine'][_0x5ebadc(0x6c2)][_0x5ebadc(0x267)](this);},Window_Selectable[_0x34b3e3(0x237)][_0x34b3e3(0x6f7)]=function(){return!![];},Window_Selectable[_0x34b3e3(0x237)]['processCursorMoveModernControls']=function(){const _0x592a59=_0x34b3e3;if(this[_0x592a59(0x205)]()){const _0x1d6356=this[_0x592a59(0x8ef)]();Input[_0x592a59(0x2ca)](_0x592a59(0x381))&&(Input['isPressed'](_0x592a59(0x778))&&this[_0x592a59(0x6f7)]()?this[_0x592a59(0x398)]():this[_0x592a59(0x5db)](Input['isTriggered'](_0x592a59(0x381)))),Input[_0x592a59(0x2ca)]('up')&&(Input[_0x592a59(0x153)]('shift')&&this[_0x592a59(0x6f7)]()?this['cursorPageup']():this[_0x592a59(0x665)](Input[_0x592a59(0x69e)]('up'))),Input['isRepeated'](_0x592a59(0x57c))&&this[_0x592a59(0x4eb)](Input[_0x592a59(0x69e)](_0x592a59(0x57c))),Input['isRepeated'](_0x592a59(0x793))&&this[_0x592a59(0x71d)](Input[_0x592a59(0x69e)](_0x592a59(0x793))),!this[_0x592a59(0x719)](_0x592a59(0x891))&&Input[_0x592a59(0x2ca)]('pagedown')&&this[_0x592a59(0x398)](),!this[_0x592a59(0x719)](_0x592a59(0x7e4))&&Input['isRepeated']('pageup')&&this[_0x592a59(0x8d3)](),this['index']()!==_0x1d6356&&this[_0x592a59(0x870)]();}},Window_Selectable['prototype'][_0x34b3e3(0x6c9)]=function(){const _0x5b310d=_0x34b3e3;if(this['isCursorMovable']()){const _0x32c7c4=this[_0x5b310d(0x8ef)]();Input[_0x5b310d(0x69e)](_0x5b310d(0x5b5))&&this['smoothSelect'](Math['min'](this[_0x5b310d(0x8ef)](),0x0)),Input[_0x5b310d(0x69e)](_0x5b310d(0x4cc))&&this[_0x5b310d(0x5fd)](Math[_0x5b310d(0x7ef)](this[_0x5b310d(0x8ef)](),this['maxItems']()-0x1)),this[_0x5b310d(0x8ef)]()!==_0x32c7c4&&this[_0x5b310d(0x870)]();}},VisuMZ['CoreEngine'][_0x34b3e3(0x629)]=Window_Selectable[_0x34b3e3(0x237)][_0x34b3e3(0x5e4)],Window_Selectable[_0x34b3e3(0x237)][_0x34b3e3(0x5e4)]=function(){const _0x44f08d=_0x34b3e3;this['isUseModernControls']()?this[_0x44f08d(0x34e)]():VisuMZ[_0x44f08d(0x4d5)][_0x44f08d(0x629)][_0x44f08d(0x267)](this);},Window_Selectable[_0x34b3e3(0x237)][_0x34b3e3(0x34e)]=function(){const _0xf013e1=_0x34b3e3;VisuMZ['CoreEngine'][_0xf013e1(0x629)][_0xf013e1(0x267)](this);},Window_Selectable[_0x34b3e3(0x237)]['colSpacing']=function(){const _0x2b8ba9=_0x34b3e3;return VisuMZ[_0x2b8ba9(0x4d5)][_0x2b8ba9(0x2fb)][_0x2b8ba9(0x1b4)]['ColSpacing'];},Window_Selectable[_0x34b3e3(0x237)][_0x34b3e3(0x3a2)]=function(){const _0x10ab69=_0x34b3e3;return VisuMZ[_0x10ab69(0x4d5)][_0x10ab69(0x2fb)][_0x10ab69(0x1b4)][_0x10ab69(0x8f7)];},Window_Selectable['prototype'][_0x34b3e3(0x2c5)]=function(){const _0x3218da=_0x34b3e3;return Window_Scrollable[_0x3218da(0x237)]['itemHeight'][_0x3218da(0x267)](this)+VisuMZ[_0x3218da(0x4d5)][_0x3218da(0x2fb)]['Window'][_0x3218da(0x8f4)];;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x6fa)]=Window_Selectable[_0x34b3e3(0x237)]['drawBackgroundRect'],Window_Selectable['prototype'][_0x34b3e3(0x5fb)]=function(_0x28d3f7){const _0x56ec2f=_0x34b3e3,_0xc2e5f=VisuMZ[_0x56ec2f(0x4d5)][_0x56ec2f(0x2fb)][_0x56ec2f(0x1b4)];if(_0xc2e5f[_0x56ec2f(0x803)]===![])return;_0xc2e5f[_0x56ec2f(0x11e)]?_0xc2e5f['DrawItemBackgroundJS'][_0x56ec2f(0x267)](this,_0x28d3f7):VisuMZ[_0x56ec2f(0x4d5)][_0x56ec2f(0x6fa)][_0x56ec2f(0x267)](this,_0x28d3f7);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x5c3)]=Window_Gold[_0x34b3e3(0x237)][_0x34b3e3(0x6ba)],Window_Gold[_0x34b3e3(0x237)][_0x34b3e3(0x6ba)]=function(){const _0x3497b8=_0x34b3e3;this['isItemStyle']()?this[_0x3497b8(0x28f)]():VisuMZ[_0x3497b8(0x4d5)][_0x3497b8(0x5c3)][_0x3497b8(0x267)](this);},Window_Gold['prototype'][_0x34b3e3(0x593)]=function(){const _0xfd4cd=_0x34b3e3;if(TextManager[_0xfd4cd(0x569)]!==this[_0xfd4cd(0x569)]())return![];return VisuMZ['CoreEngine'][_0xfd4cd(0x2fb)][_0xfd4cd(0x31c)][_0xfd4cd(0x129)];},Window_Gold[_0x34b3e3(0x237)][_0x34b3e3(0x28f)]=function(){const _0x208922=_0x34b3e3;this[_0x208922(0x31b)](),this[_0x208922(0x63c)][_0x208922(0x2a3)](),this['contents'][_0x208922(0x1c9)]=VisuMZ['CoreEngine'][_0x208922(0x2fb)][_0x208922(0x31c)]['GoldFontSize'];const _0x593ec6=VisuMZ[_0x208922(0x4d5)][_0x208922(0x2fb)][_0x208922(0x31c)][_0x208922(0x806)],_0x5e26b9=this[_0x208922(0x77a)](0x0);if(_0x593ec6>0x0){const _0x41afc7=ImageManager[_0x208922(0x1b5)]||0x20,_0x47e5ca=_0x41afc7-ImageManager[_0x208922(0x42d)],_0x487268=_0x5e26b9['y']+(this[_0x208922(0x2fa)]()-ImageManager[_0x208922(0x349)])/0x2;this['drawIcon'](_0x593ec6,_0x5e26b9['x']+Math[_0x208922(0x1ce)](_0x47e5ca/0x2),_0x487268);const _0x4db5ba=_0x41afc7+0x4;_0x5e26b9['x']+=_0x4db5ba,_0x5e26b9['width']-=_0x4db5ba;}this[_0x208922(0x337)](ColorManager[_0x208922(0x34c)]()),this['drawText'](this[_0x208922(0x569)](),_0x5e26b9['x'],_0x5e26b9['y'],_0x5e26b9[_0x208922(0x4c5)],_0x208922(0x793));const _0x6afedd=this[_0x208922(0x7ea)](this[_0x208922(0x569)]())+0x6;;_0x5e26b9['x']+=_0x6afedd,_0x5e26b9['width']-=_0x6afedd,this[_0x208922(0x4f5)]();const _0x3d7a73=this[_0x208922(0x690)](),_0x298b4f=this[_0x208922(0x7ea)](this['_digitGrouping']?VisuMZ[_0x208922(0x1c2)](this[_0x208922(0x690)]()):this[_0x208922(0x690)]());_0x298b4f>_0x5e26b9['width']?this['drawText'](VisuMZ[_0x208922(0x4d5)]['Settings'][_0x208922(0x31c)][_0x208922(0x1f4)],_0x5e26b9['x'],_0x5e26b9['y'],_0x5e26b9[_0x208922(0x4c5)],'right'):this['drawText'](this[_0x208922(0x690)](),_0x5e26b9['x'],_0x5e26b9['y'],_0x5e26b9[_0x208922(0x4c5)],'right'),this[_0x208922(0x31b)]();},Window_StatusBase['prototype'][_0x34b3e3(0x71b)]=function(_0xe3a5a0,_0x122ce6,_0x3487d3,_0x12213d,_0x54e8e1){const _0x55c60e=_0x34b3e3;_0x12213d=String(_0x12213d||'')[_0x55c60e(0x515)]();if(VisuMZ[_0x55c60e(0x4d5)]['Settings'][_0x55c60e(0x3a9)][_0x55c60e(0x2d3)]){const _0x91eab6=VisuMZ[_0x55c60e(0x706)](_0x12213d);if(_0x54e8e1)this[_0x55c60e(0x75e)](_0x91eab6,_0xe3a5a0,_0x122ce6,this[_0x55c60e(0x831)]()),_0x3487d3-=this[_0x55c60e(0x831)]()+0x2,_0xe3a5a0+=this[_0x55c60e(0x831)]()+0x2;else{const _0xb5fd7c=ImageManager[_0x55c60e(0x1b5)]||0x20,_0x1fba79=ImageManager['standardIconHeight']||0x20,_0x3fd0e5=_0xb5fd7c-ImageManager['iconWidth'],_0x12ccd9=_0x1fba79-ImageManager[_0x55c60e(0x349)];let _0x599788=0x2,_0x318eb7=0x2;this['lineHeight']()!==0x24&&(_0x318eb7=Math[_0x55c60e(0x6ef)]((this[_0x55c60e(0x2fa)]()-_0x1fba79)/0x2));const _0x3b3589=_0xe3a5a0+Math[_0x55c60e(0x6ef)](_0x3fd0e5/0x2)+_0x599788,_0x17c3f7=_0x122ce6+Math[_0x55c60e(0x6ef)](_0x12ccd9/0x2)+_0x318eb7;this[_0x55c60e(0x3ce)](_0x91eab6,_0x3b3589,_0x17c3f7),_0x3487d3-=_0xb5fd7c+0x4,_0xe3a5a0+=_0xb5fd7c+0x4;}}const _0x5dceb1=TextManager[_0x55c60e(0x673)](_0x12213d);this[_0x55c60e(0x31b)](),this[_0x55c60e(0x337)](ColorManager['systemColor']()),_0x54e8e1?(this[_0x55c60e(0x63c)][_0x55c60e(0x1c9)]=this['smallParamFontSize'](),this['contents'][_0x55c60e(0x7a9)](_0x5dceb1,_0xe3a5a0,_0x122ce6,_0x3487d3,this[_0x55c60e(0x831)](),_0x55c60e(0x793))):this[_0x55c60e(0x7a9)](_0x5dceb1,_0xe3a5a0,_0x122ce6,_0x3487d3),this[_0x55c60e(0x31b)]();},Window_StatusBase[_0x34b3e3(0x237)]['smallParamFontSize']=function(){const _0x3fb6c2=_0x34b3e3;return $gameSystem[_0x3fb6c2(0x892)]()-0x8;},Window_StatusBase[_0x34b3e3(0x237)]['drawActorClass']=function(_0x38e76e,_0x33b14b,_0x3f74d0,_0x302b67){const _0x140feb=_0x34b3e3;_0x302b67=_0x302b67||0xa8,this[_0x140feb(0x4f5)]();if(VisuMZ[_0x140feb(0x4d5)][_0x140feb(0x2fb)]['UI'][_0x140feb(0x8fa)])this[_0x140feb(0x1d4)](_0x38e76e['currentClass']()[_0x140feb(0x650)],_0x33b14b,_0x3f74d0,_0x302b67);else{const _0x4ceeb9=_0x38e76e['currentClass']()[_0x140feb(0x650)][_0x140feb(0x7f8)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x4ceeb9,_0x33b14b,_0x3f74d0,_0x302b67);}},Window_StatusBase[_0x34b3e3(0x237)][_0x34b3e3(0x11f)]=function(_0x374d1f,_0x37c5ee,_0x4799c4,_0x22ca41){const _0x8e36e5=_0x34b3e3;_0x22ca41=_0x22ca41||0x10e,this[_0x8e36e5(0x4f5)]();if(VisuMZ[_0x8e36e5(0x4d5)][_0x8e36e5(0x2fb)]['UI'][_0x8e36e5(0x7f6)])this[_0x8e36e5(0x1d4)](_0x374d1f[_0x8e36e5(0x65a)](),_0x37c5ee,_0x4799c4,_0x22ca41);else{const _0x36dbf1=_0x374d1f[_0x8e36e5(0x65a)]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x8e36e5(0x7a9)](_0x374d1f[_0x8e36e5(0x65a)](),_0x37c5ee,_0x4799c4,_0x22ca41);}},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x845)]=Window_StatusBase[_0x34b3e3(0x237)]['drawActorLevel'],Window_StatusBase[_0x34b3e3(0x237)]['drawActorLevel']=function(_0x292154,_0x2601ba,_0x5de5b4){const _0x15cea6=_0x34b3e3;if(VisuMZ[_0x15cea6(0x4d5)]['Settings']['Param'][_0x15cea6(0x611)]===![])return;if(this[_0x15cea6(0x876)]())this[_0x15cea6(0x7f5)](_0x292154,_0x2601ba,_0x5de5b4);VisuMZ[_0x15cea6(0x4d5)][_0x15cea6(0x845)][_0x15cea6(0x267)](this,_0x292154,_0x2601ba,_0x5de5b4);},Window_StatusBase[_0x34b3e3(0x237)][_0x34b3e3(0x876)]=function(){const _0x1c4bff=_0x34b3e3;return VisuMZ[_0x1c4bff(0x4d5)]['Settings']['UI'][_0x1c4bff(0x312)];},Window_StatusBase['prototype'][_0x34b3e3(0x7f5)]=function(_0x596533,_0x58464a,_0xce6253){const _0x45465f=_0x34b3e3;if(!_0x596533)return;if(!_0x596533[_0x45465f(0x7ab)]())return;const _0x10b304=0x80,_0x5aae8b=_0x596533[_0x45465f(0x6bb)]();let _0x1dbed8=ColorManager[_0x45465f(0x8e5)](),_0x1da872=ColorManager[_0x45465f(0x37d)]();_0x5aae8b>=0x1&&(_0x1dbed8=ColorManager[_0x45465f(0x633)](),_0x1da872=ColorManager[_0x45465f(0x564)]()),this['drawGauge'](_0x58464a,_0xce6253,_0x10b304,_0x5aae8b,_0x1dbed8,_0x1da872);},Window_EquipStatus[_0x34b3e3(0x237)][_0x34b3e3(0x188)]=function(){const _0x58fc6f=_0x34b3e3;let _0x2d6da3=0x0;for(const _0x2b6ba5 of VisuMZ['CoreEngine'][_0x58fc6f(0x2fb)][_0x58fc6f(0x3a9)][_0x58fc6f(0x484)]){const _0x5208c2=this[_0x58fc6f(0x367)](),_0x18d057=this[_0x58fc6f(0x715)](_0x2d6da3);this[_0x58fc6f(0x89b)](_0x5208c2,_0x18d057,_0x2b6ba5),_0x2d6da3++;}},Window_EquipStatus[_0x34b3e3(0x237)][_0x34b3e3(0x704)]=function(_0x425600,_0x5bd4bc,_0x1aa398){const _0x4a64ce=_0x34b3e3,_0x19d8b0=this[_0x4a64ce(0x6e2)]()-this[_0x4a64ce(0x367)]()*0x2;this[_0x4a64ce(0x71b)](_0x425600,_0x5bd4bc,_0x19d8b0,_0x1aa398,![]);},Window_EquipStatus[_0x34b3e3(0x237)][_0x34b3e3(0x20b)]=function(_0x19ad63,_0x378957,_0x37ba2f){const _0x207ea2=_0x34b3e3,_0x109d8a=this[_0x207ea2(0x5b6)]();this['resetTextColor'](),this[_0x207ea2(0x7a9)](this[_0x207ea2(0x1ef)][_0x207ea2(0x877)](_0x37ba2f,!![]),_0x19ad63,_0x378957,_0x109d8a,_0x207ea2(0x57c));},Window_EquipStatus[_0x34b3e3(0x237)][_0x34b3e3(0x274)]=function(_0xc86845,_0xcba8e8){const _0x523dfe=_0x34b3e3,_0x1762a4=this[_0x523dfe(0x4e3)]();this[_0x523dfe(0x337)](ColorManager[_0x523dfe(0x34c)]());const _0x4a3ceb=VisuMZ[_0x523dfe(0x4d5)][_0x523dfe(0x2fb)]['UI'][_0x523dfe(0x336)];this[_0x523dfe(0x7a9)](_0x4a3ceb,_0xc86845,_0xcba8e8,_0x1762a4,_0x523dfe(0x366));},Window_EquipStatus['prototype'][_0x34b3e3(0x146)]=function(_0xd58716,_0x491ed2,_0x15e0c7){const _0x3b1d1d=_0x34b3e3,_0x5be9b0=this['paramWidth'](),_0x52f97c=this[_0x3b1d1d(0x1df)][_0x3b1d1d(0x877)](_0x15e0c7),_0x460070=_0x52f97c-this[_0x3b1d1d(0x1ef)][_0x3b1d1d(0x877)](_0x15e0c7);this['changeTextColor'](ColorManager[_0x3b1d1d(0x676)](_0x460070)),this[_0x3b1d1d(0x7a9)](this[_0x3b1d1d(0x1df)]['paramValueByName'](_0x15e0c7,!![]),_0xd58716,_0x491ed2,_0x5be9b0,_0x3b1d1d(0x57c));},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x7d4)]=Window_EquipItem[_0x34b3e3(0x237)][_0x34b3e3(0x47a)],Window_EquipItem[_0x34b3e3(0x237)][_0x34b3e3(0x47a)]=function(_0x32e16e){const _0x267270=_0x34b3e3;return _0x32e16e&&this[_0x267270(0x1ef)]?this[_0x267270(0x1ef)][_0x267270(0x4b8)](_0x32e16e):VisuMZ[_0x267270(0x4d5)][_0x267270(0x7d4)][_0x267270(0x267)](this,_0x32e16e);},Window_StatusParams[_0x34b3e3(0x237)][_0x34b3e3(0x6d3)]=function(){const _0x4305b4=_0x34b3e3;return VisuMZ['CoreEngine']['Settings'][_0x4305b4(0x3a9)]['DisplayedParams'][_0x4305b4(0x1ee)];},Window_StatusParams[_0x34b3e3(0x237)][_0x34b3e3(0x89b)]=function(_0x3f921f){const _0x117a53=_0x34b3e3,_0x4f64ed=this['itemLineRect'](_0x3f921f),_0x5f109b=VisuMZ[_0x117a53(0x4d5)][_0x117a53(0x2fb)]['Param'][_0x117a53(0x484)][_0x3f921f],_0x520f60=TextManager[_0x117a53(0x673)](_0x5f109b),_0x1ac875=this[_0x117a53(0x1ef)][_0x117a53(0x877)](_0x5f109b,!![]);this[_0x117a53(0x71b)](_0x4f64ed['x'],_0x4f64ed['y'],0xa0,_0x5f109b,![]),this['resetTextColor'](),this[_0x117a53(0x7a9)](_0x1ac875,_0x4f64ed['x']+0xa0,_0x4f64ed['y'],0x3c,'right');};if(VisuMZ['CoreEngine']['Settings']['KeyboardInput'][_0x34b3e3(0x3ca)]){VisuMZ['CoreEngine']['Settings']['KeyboardInput'][_0x34b3e3(0x4bc)]&&(Window_NameInput[_0x34b3e3(0x3f9)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x34b3e3(0x7a6),'OK']);;VisuMZ['CoreEngine'][_0x34b3e3(0x49a)]=Window_NameInput['prototype'][_0x34b3e3(0x7e8)],Window_NameInput[_0x34b3e3(0x237)]['initialize']=function(_0x1b0441){const _0xf34c7e=_0x34b3e3;this[_0xf34c7e(0x34d)]=this[_0xf34c7e(0x356)](),VisuMZ[_0xf34c7e(0x4d5)][_0xf34c7e(0x49a)][_0xf34c7e(0x267)](this,_0x1b0441),this[_0xf34c7e(0x34d)]===_0xf34c7e(0x7f9)?this['select'](0x0):(Input[_0xf34c7e(0x2a3)](),this['deselect']());},Window_NameInput[_0x34b3e3(0x237)][_0x34b3e3(0x356)]=function(){const _0x5c6bd4=_0x34b3e3;if(Input['isGamepadConnected']())return _0x5c6bd4(0x7f9);return VisuMZ['CoreEngine'][_0x5c6bd4(0x2fb)]['KeyboardInput'][_0x5c6bd4(0x3af)]||_0x5c6bd4(0x804);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x6c0)]=Window_NameInput[_0x34b3e3(0x237)][_0x34b3e3(0x617)],Window_NameInput[_0x34b3e3(0x237)][_0x34b3e3(0x617)]=function(){const _0x36f1c9=_0x34b3e3;if(!this[_0x36f1c9(0x439)]())return;if(!this[_0x36f1c9(0x354)])return;if(this[_0x36f1c9(0x34d)]===_0x36f1c9(0x804)&&Input[_0x36f1c9(0x328)]())this['switchModes'](_0x36f1c9(0x7f9));else{if(Input['isSpecialCode'](_0x36f1c9(0x2e6)))Input[_0x36f1c9(0x2a3)](),this[_0x36f1c9(0x2cf)]();else{if(Input[_0x36f1c9(0x69e)]('tab'))Input[_0x36f1c9(0x2a3)](),this[_0x36f1c9(0x34d)]===_0x36f1c9(0x804)?this[_0x36f1c9(0x5c4)]('default'):this[_0x36f1c9(0x5c4)]('keyboard');else{if(this[_0x36f1c9(0x34d)]==='keyboard')this[_0x36f1c9(0x6d4)]();else Input[_0x36f1c9(0x6ce)]('escape')?(Input[_0x36f1c9(0x2a3)](),this['switchModes'](_0x36f1c9(0x804))):VisuMZ[_0x36f1c9(0x4d5)][_0x36f1c9(0x6c0)]['call'](this);}}}},VisuMZ['CoreEngine'][_0x34b3e3(0x74c)]=Window_NameInput[_0x34b3e3(0x237)]['processTouch'],Window_NameInput[_0x34b3e3(0x237)][_0x34b3e3(0x5e4)]=function(){const _0x34db3f=_0x34b3e3;if(!this[_0x34db3f(0x757)]())return;if(this['_mode']===_0x34db3f(0x804)){if(TouchInput[_0x34db3f(0x69e)]()&&this[_0x34db3f(0x1ab)]())this[_0x34db3f(0x5c4)](_0x34db3f(0x7f9));else TouchInput[_0x34db3f(0x562)]()&&this[_0x34db3f(0x5c4)](_0x34db3f(0x7f9));}else VisuMZ['CoreEngine'][_0x34db3f(0x74c)][_0x34db3f(0x267)](this);},Window_NameInput['prototype'][_0x34b3e3(0x6d4)]=function(){const _0x4b8b93=_0x34b3e3;if(Input[_0x4b8b93(0x6ce)](_0x4b8b93(0x6a7)))Input[_0x4b8b93(0x2a3)](),this['onNameOk']();else{if(Input[_0x4b8b93(0x6fd)]!==undefined){let _0x5e5bd5=Input['_inputString'],_0x4e5a69=_0x5e5bd5[_0x4b8b93(0x1ee)];for(let _0x48f4b4=0x0;_0x48f4b4<_0x4e5a69;++_0x48f4b4){this[_0x4b8b93(0x179)][_0x4b8b93(0x38a)](_0x5e5bd5[_0x48f4b4])?SoundManager[_0x4b8b93(0x79e)]():SoundManager['playBuzzer']();}Input['clear']();}}},Window_NameInput[_0x34b3e3(0x237)][_0x34b3e3(0x5c4)]=function(_0x51fb8a){const _0x559ca3=_0x34b3e3;let _0x1b974b=this[_0x559ca3(0x34d)];this[_0x559ca3(0x34d)]=_0x51fb8a,_0x1b974b!==this[_0x559ca3(0x34d)]&&(this['refresh'](),SoundManager['playOk'](),this['_mode']===_0x559ca3(0x7f9)?this['select'](0x0):this['select'](-0x1));},VisuMZ['CoreEngine'][_0x34b3e3(0x70b)]=Window_NameInput[_0x34b3e3(0x237)][_0x34b3e3(0x5db)],Window_NameInput[_0x34b3e3(0x237)][_0x34b3e3(0x5db)]=function(_0x35c756){const _0x168b6e=_0x34b3e3;if(this[_0x168b6e(0x34d)]===_0x168b6e(0x804)&&!Input[_0x168b6e(0x56a)]())return;if(Input[_0x168b6e(0x815)]())return;VisuMZ[_0x168b6e(0x4d5)][_0x168b6e(0x70b)][_0x168b6e(0x267)](this,_0x35c756),this[_0x168b6e(0x5c4)]('default');},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x46f)]=Window_NameInput[_0x34b3e3(0x237)][_0x34b3e3(0x665)],Window_NameInput['prototype'][_0x34b3e3(0x665)]=function(_0x473785){const _0x4afa78=_0x34b3e3;if(this[_0x4afa78(0x34d)]===_0x4afa78(0x804)&&!Input[_0x4afa78(0x56a)]())return;if(Input[_0x4afa78(0x815)]())return;VisuMZ['CoreEngine'][_0x4afa78(0x46f)]['call'](this,_0x473785),this['switchModes'](_0x4afa78(0x7f9));},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x37b)]=Window_NameInput['prototype']['cursorRight'],Window_NameInput[_0x34b3e3(0x237)][_0x34b3e3(0x4eb)]=function(_0x5edd7d){const _0xdb20c2=_0x34b3e3;if(this[_0xdb20c2(0x34d)]===_0xdb20c2(0x804)&&!Input['isArrowPressed']())return;if(Input[_0xdb20c2(0x815)]())return;VisuMZ['CoreEngine'][_0xdb20c2(0x37b)][_0xdb20c2(0x267)](this,_0x5edd7d),this[_0xdb20c2(0x5c4)](_0xdb20c2(0x7f9));},VisuMZ[_0x34b3e3(0x4d5)]['Window_NameInput_cursorLeft']=Window_NameInput['prototype'][_0x34b3e3(0x71d)],Window_NameInput[_0x34b3e3(0x237)][_0x34b3e3(0x71d)]=function(_0x5b8508){const _0x57f1db=_0x34b3e3;if(this[_0x57f1db(0x34d)]===_0x57f1db(0x804)&&!Input[_0x57f1db(0x56a)]())return;if(Input[_0x57f1db(0x815)]())return;VisuMZ[_0x57f1db(0x4d5)][_0x57f1db(0x58c)]['call'](this,_0x5b8508),this[_0x57f1db(0x5c4)]('default');},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x58f)]=Window_NameInput['prototype'][_0x34b3e3(0x398)],Window_NameInput[_0x34b3e3(0x237)][_0x34b3e3(0x398)]=function(){const _0x1a7fad=_0x34b3e3;if(this[_0x1a7fad(0x34d)]===_0x1a7fad(0x804))return;if(Input[_0x1a7fad(0x815)]())return;VisuMZ[_0x1a7fad(0x4d5)][_0x1a7fad(0x58f)][_0x1a7fad(0x267)](this),this[_0x1a7fad(0x5c4)](_0x1a7fad(0x7f9));},VisuMZ[_0x34b3e3(0x4d5)]['Window_NameInput_cursorPageup']=Window_NameInput[_0x34b3e3(0x237)][_0x34b3e3(0x8d3)],Window_NameInput[_0x34b3e3(0x237)][_0x34b3e3(0x8d3)]=function(){const _0x116882=_0x34b3e3;if(this[_0x116882(0x34d)]===_0x116882(0x804))return;if(Input[_0x116882(0x815)]())return;VisuMZ[_0x116882(0x4d5)][_0x116882(0x7c9)][_0x116882(0x267)](this),this[_0x116882(0x5c4)](_0x116882(0x7f9));},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x545)]=Window_NameInput['prototype'][_0x34b3e3(0x6ba)],Window_NameInput[_0x34b3e3(0x237)][_0x34b3e3(0x6ba)]=function(){const _0x222d4b=_0x34b3e3;if(this[_0x222d4b(0x34d)]===_0x222d4b(0x804)){this[_0x222d4b(0x63c)][_0x222d4b(0x2a3)](),this['contentsBack'][_0x222d4b(0x2a3)](),this['resetTextColor']();let _0x11eb50=VisuMZ[_0x222d4b(0x4d5)]['Settings'][_0x222d4b(0x7bc)][_0x222d4b(0x4da)][_0x222d4b(0x53b)]('\x0a'),_0x57f0d6=_0x11eb50[_0x222d4b(0x1ee)],_0x5e97d2=(this['innerHeight']-_0x57f0d6*this[_0x222d4b(0x2fa)]())/0x2;for(let _0x2cb7c1=0x0;_0x2cb7c1<_0x57f0d6;++_0x2cb7c1){let _0x5c5325=_0x11eb50[_0x2cb7c1],_0x3fb99f=this[_0x222d4b(0x481)](_0x5c5325)[_0x222d4b(0x4c5)],_0x107e26=Math['floor']((this['contents']['width']-_0x3fb99f)/0x2);this[_0x222d4b(0x1d4)](_0x5c5325,_0x107e26,_0x5e97d2),_0x5e97d2+=this[_0x222d4b(0x2fa)]();}}else VisuMZ[_0x222d4b(0x4d5)]['Window_NameInput_refresh'][_0x222d4b(0x267)](this);};};VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x724)]=Window_ShopSell[_0x34b3e3(0x237)]['isEnabled'],Window_ShopSell['prototype'][_0x34b3e3(0x47a)]=function(_0x4aadbc){const _0x2d5378=_0x34b3e3;return VisuMZ['CoreEngine']['Settings']['QoL']['KeyItemProtect']&&DataManager['isKeyItem'](_0x4aadbc)?![]:VisuMZ[_0x2d5378(0x4d5)][_0x2d5378(0x724)][_0x2d5378(0x267)](this,_0x4aadbc);},Window_NumberInput['prototype'][_0x34b3e3(0x2d0)]=function(){return![];};VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)][_0x34b3e3(0x7bc)][_0x34b3e3(0x151)]&&(VisuMZ['CoreEngine'][_0x34b3e3(0x900)]=Window_NumberInput[_0x34b3e3(0x237)][_0x34b3e3(0x24a)],Window_NumberInput[_0x34b3e3(0x237)][_0x34b3e3(0x24a)]=function(){const _0x370f19=_0x34b3e3;VisuMZ[_0x370f19(0x4d5)][_0x370f19(0x900)]['call'](this),this[_0x370f19(0x4fb)](this[_0x370f19(0x62d)]-0x1),Input['clear']();},VisuMZ['CoreEngine'][_0x34b3e3(0x7f0)]=Window_NumberInput[_0x34b3e3(0x237)][_0x34b3e3(0x565)],Window_NumberInput['prototype'][_0x34b3e3(0x565)]=function(){const _0x229d99=_0x34b3e3;if(!this['isOpenAndActive']())return;if(Input[_0x229d99(0x815)]())this['processKeyboardDigitChange']();else{if(Input['isSpecialCode'](_0x229d99(0x2e6)))this['processKeyboardBackspace']();else{if(Input[_0x229d99(0x71f)]===0x2e)this[_0x229d99(0x48b)]();else{if(Input[_0x229d99(0x71f)]===0x24)this['processKeyboardHome']();else Input[_0x229d99(0x71f)]===0x23?this[_0x229d99(0x528)]():VisuMZ['CoreEngine'][_0x229d99(0x7f0)]['call'](this);}}}},Window_NumberInput['prototype'][_0x34b3e3(0x3d1)]=function(){const _0x30ebb1=_0x34b3e3;if(!this[_0x30ebb1(0x205)]())return;Input[_0x30ebb1(0x815)]()?this['processKeyboardDigitChange']():Window_Selectable[_0x30ebb1(0x237)][_0x30ebb1(0x3d1)][_0x30ebb1(0x267)](this);},Window_NumberInput[_0x34b3e3(0x237)][_0x34b3e3(0x6c9)]=function(){},Window_NumberInput['prototype']['processKeyboardDigitChange']=function(){const _0x1f9023=_0x34b3e3;if(String(this[_0x1f9023(0x69c)])[_0x1f9023(0x1ee)]>=this[_0x1f9023(0x62d)])return;const _0x42b149=Number(String(this[_0x1f9023(0x69c)])+Input[_0x1f9023(0x6fd)]);if(isNaN(_0x42b149))return;this['_number']=_0x42b149;const _0x1fdf31='9'[_0x1f9023(0x461)](this[_0x1f9023(0x62d)]);this['_number']=this[_0x1f9023(0x69c)][_0x1f9023(0x62e)](0x0,_0x1fdf31),Input[_0x1f9023(0x2a3)](),this[_0x1f9023(0x6ba)](),SoundManager[_0x1f9023(0x714)](),this[_0x1f9023(0x4fb)](this['_maxDigits']-0x1);},Window_NumberInput[_0x34b3e3(0x237)]['processKeyboardBackspace']=function(){const _0x2e0495=_0x34b3e3;this[_0x2e0495(0x69c)]=Number(String(this[_0x2e0495(0x69c)])['slice'](0x0,-0x1)),this['_number']=Math[_0x2e0495(0x7ef)](0x0,this[_0x2e0495(0x69c)]),Input[_0x2e0495(0x2a3)](),this['refresh'](),SoundManager['playCursor'](),this['select'](this['_maxDigits']-0x1);},Window_NumberInput[_0x34b3e3(0x237)]['processKeyboardDelete']=function(){const _0x1923df=_0x34b3e3;this[_0x1923df(0x69c)]=Number(String(this[_0x1923df(0x69c)])[_0x1923df(0x1ea)](0x1)),this['_number']=Math[_0x1923df(0x7ef)](0x0,this[_0x1923df(0x69c)]),Input[_0x1923df(0x2a3)](),this['refresh'](),SoundManager[_0x1923df(0x714)](),this[_0x1923df(0x4fb)](this[_0x1923df(0x62d)]-0x1);},Window_NumberInput[_0x34b3e3(0x237)][_0x34b3e3(0x6df)]=function(){const _0x49a5d9=_0x34b3e3;if(this[_0x49a5d9(0x8ef)]()===0x0)return;Input[_0x49a5d9(0x2a3)](),this['refresh'](),SoundManager[_0x49a5d9(0x714)](),this[_0x49a5d9(0x4fb)](0x0);},Window_NumberInput[_0x34b3e3(0x237)][_0x34b3e3(0x528)]=function(){const _0x377733=_0x34b3e3;if(this[_0x377733(0x8ef)]()===this[_0x377733(0x62d)]-0x1)return;Input[_0x377733(0x2a3)](),this[_0x377733(0x6ba)](),SoundManager[_0x377733(0x714)](),this[_0x377733(0x4fb)](this[_0x377733(0x62d)]-0x1);});;VisuMZ[_0x34b3e3(0x4d5)]['Window_MapName_refresh']=Window_MapName[_0x34b3e3(0x237)][_0x34b3e3(0x6ba)],Window_MapName[_0x34b3e3(0x237)][_0x34b3e3(0x6ba)]=function(){const _0x5a7e37=_0x34b3e3;VisuMZ[_0x5a7e37(0x4d5)][_0x5a7e37(0x2fb)]['QoL'][_0x5a7e37(0x501)]?this[_0x5a7e37(0x295)]():VisuMZ[_0x5a7e37(0x4d5)]['Window_MapName_refresh']['call'](this);},Window_MapName['prototype'][_0x34b3e3(0x295)]=function(){const _0xa5fda1=_0x34b3e3;this[_0xa5fda1(0x63c)][_0xa5fda1(0x2a3)]();if($gameMap[_0xa5fda1(0x65e)]()){const _0x3c2678=this[_0xa5fda1(0x586)];this[_0xa5fda1(0x8be)](0x0,0x0,_0x3c2678,this['lineHeight']());const _0x370653=this[_0xa5fda1(0x481)]($gameMap[_0xa5fda1(0x65e)]())['width'];this['drawTextEx']($gameMap[_0xa5fda1(0x65e)](),Math[_0xa5fda1(0x6ef)]((_0x3c2678-_0x370653)/0x2),0x0);}},Window_TitleCommand[_0x34b3e3(0x8d7)]=VisuMZ[_0x34b3e3(0x4d5)]['Settings'][_0x34b3e3(0x2f1)],Window_TitleCommand[_0x34b3e3(0x237)]['makeCommandList']=function(){const _0xcc1b99=_0x34b3e3;this[_0xcc1b99(0x1c6)]();},Window_TitleCommand[_0x34b3e3(0x237)][_0x34b3e3(0x1c6)]=function(){const _0x1b4942=_0x34b3e3;for(const _0x3a078d of Window_TitleCommand['_commandList']){if(_0x3a078d[_0x1b4942(0x648)][_0x1b4942(0x267)](this)){const _0x211c02=_0x3a078d[_0x1b4942(0x553)];let _0x4cf04a=_0x3a078d[_0x1b4942(0x3c9)];if(['',_0x1b4942(0x6c7)][_0x1b4942(0x1da)](_0x4cf04a))_0x4cf04a=_0x3a078d[_0x1b4942(0x357)][_0x1b4942(0x267)](this);const _0x4ebe64=_0x3a078d[_0x1b4942(0x4a6)][_0x1b4942(0x267)](this),_0x9af77=_0x3a078d[_0x1b4942(0x786)][_0x1b4942(0x267)](this);this[_0x1b4942(0x8f5)](_0x4cf04a,_0x211c02,_0x4ebe64,_0x9af77),this['setHandler'](_0x211c02,_0x3a078d[_0x1b4942(0x840)][_0x1b4942(0x2da)](this,_0x9af77));}}},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x12e)]=Window_TitleCommand[_0x34b3e3(0x237)][_0x34b3e3(0x363)],Window_TitleCommand[_0x34b3e3(0x237)][_0x34b3e3(0x363)]=function(){const _0x21e505=_0x34b3e3;VisuMZ[_0x21e505(0x4d5)][_0x21e505(0x12e)][_0x21e505(0x267)](this);if(!Window_TitleCommand[_0x21e505(0x801)])return;const _0x43fbf9=this[_0x21e505(0x2ea)](Window_TitleCommand[_0x21e505(0x801)]),_0x48846f=Math[_0x21e505(0x6ef)](this['maxVisibleItems']()/0x2)-0x1;this[_0x21e505(0x5fd)](_0x43fbf9),this[_0x21e505(0x74d)]>0x1&&(this[_0x21e505(0x74d)]=0x1,this[_0x21e505(0x1d8)]()),this[_0x21e505(0x413)](_0x43fbf9-_0x48846f);},Window_GameEnd[_0x34b3e3(0x8d7)]=VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)]['MenuLayout']['GameEnd']['CommandList'],Window_GameEnd[_0x34b3e3(0x237)][_0x34b3e3(0x4cd)]=function(){const _0x15fd5a=_0x34b3e3;this[_0x15fd5a(0x1c6)]();},Window_GameEnd['prototype'][_0x34b3e3(0x1c6)]=function(){const _0x7e82ed=_0x34b3e3;for(const _0xe7ba63 of Window_GameEnd[_0x7e82ed(0x8d7)]){if(_0xe7ba63[_0x7e82ed(0x648)][_0x7e82ed(0x267)](this)){const _0x1d7e5a=_0xe7ba63['Symbol'];let _0xfc51d5=_0xe7ba63[_0x7e82ed(0x3c9)];if(['',_0x7e82ed(0x6c7)][_0x7e82ed(0x1da)](_0xfc51d5))_0xfc51d5=_0xe7ba63['TextJS'][_0x7e82ed(0x267)](this);const _0x176f06=_0xe7ba63['EnableJS'][_0x7e82ed(0x267)](this),_0x5485c4=_0xe7ba63[_0x7e82ed(0x786)][_0x7e82ed(0x267)](this);this['addCommand'](_0xfc51d5,_0x1d7e5a,_0x176f06,_0x5485c4),this[_0x7e82ed(0x339)](_0x1d7e5a,_0xe7ba63['CallHandlerJS'][_0x7e82ed(0x2da)](this,_0x5485c4));}}};function _0x5a1f(){const _0x31bd05=['addEventListener','_patternHeight','shift','OTB','itemLineRect','updateKeyText','statusParamsWindowRect','BannedWords','Spriteset_Map_createTilemap','Scene_Menu_create','mpGaugeColor2','_texture','resetBattleSystem','drawActorIcons','\x20this.','FunctionName','ExtJS','playEscape','OUTCUBIC','PictureRotate','setMainFontSize','normal','Scene_Unlisted','initDigitGrouping','Plus1','_addShadow','Window_Base_drawCharacter','_paramPlus','createFauxAnimationQueue','left','top','ADD','SCROLL_LOCK','levelUp','_pictureCoordinatesWindow','alwaysDash','_pointAnimationSprites','itemBackColor1','boxWidth','loadBitmapCoreEngine','playOk','log','MDR','DurationPerChat','updateText','IconParam7','checkScrollBarBitmap','playLoad','Page','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','_listWindow','drawText','Graphics_centerElement','isActor','Scene_MenuBase_createCancelButton','alphabetic','\x5c}❪SHIFT❫\x5c{','updateEffekseer','Padding','exec','textHeight','IconXParam7','TGR','Scene_Status_create','VariableEvalReference','viewport','Scene_Name_onInputOk','measureTextWidth','ShowScrollBar','initialLevel','KeyboardInput','Scene_Base_terminate','setClickHandler','Game_Battler_initTpbChargeTime','Mirror','bitmapHeight','parse','BasicParameterFormula','BattleManager_processEscape','isAnimationPlaying','Game_Picture_updateMove','OpenConsole','StatusRect','Window_NameInput_cursorPageup','isLoopHorizontal','setSideButtonLayout','sparamRateJS','_stored_ctGaugeColor2','Game_System_initialize','isPointAnimationPlaying','profileWindowRect','_displayX','INSERT','SParamVocab9','Window_EquipItem_isEnabled','MODECHANGE','WIN_OEM_PA1','currentLevelExp','_stored_tpGaugeColor2','ColorMPCost','LoadMenu','getParameter','isCollidedWithEvents','framebuffer','DigitGroupingExText','ActorRect','Game_Picture_scaleX','Bitmap_resize','parameters','_targetX','pageup','Input_onKeyDown','NewGameCommonEventAll','targetSpritePosition','initialize','_createInternalTextures','textWidth','Power','forceOutOfPlaytest','_url','ButtonAssist','max','Window_NumberInput_processDigitChange','escape','If\x20you\x20don\x27t\x20want\x20this\x20option,\x20set\x20Split\x20Escape\x20option\x20back\x20to\x20false.','_closing','_centerElement','drawActorExpGauge','TextCodeNicknames','endAction','replace','default','arePageButtonsEnabled','_tile','_drawTextShadow','save','toFixed','offsetX','setupCustomRateCoreEngine','_lastCommandSymbol','isMapScrollLinked','ShowItemBackground','keyboard','Exported_Script_%1.txt','GoldIcon','Window_Base_update','dimColor1','and\x20add\x20it\x20onto\x20this\x20one.','Window_SkillList_includes','_iconIndex','DetachMapPictureContainer','itemHit','_forcedTroopView','_coreEngineShakeStyle','ItemBackColor1','Game_Actor_isPreserveTp','horz','_targetY','WIN_OEM_CUSEL','isNumpadPressed','measureText','retreat','EXSEL','F7key','guardSkillId','setBackgroundType','destroyScrollBarBitmaps','DECIMAL','_commandWindow','_anchor','HelpBgType','Window_Selectable_cursorUp','cos','useDigitGroupingEx','itemSuccessRate','MDF','_mainSprite','_targetOffsetY','Flat','_screenX','INELASTIC','_timerSprite','ShowDevTools','Y:\x20%1','OUTCIRC','ColorDeath','_stored_powerUpColor','gaugeLineHeight','OkText','this.paramBase(7)','Manual','updateOpacity','ProfileBgType','KeyItemProtect','ScreenResolution','original','Game_Picture_scaleY','SceneManager_onKeyDown','scale','createFauxAnimation','executeLoad','initialBattleSystem','CallHandlerJS','StatusMenu','seek','_targetOpacity','Rate','Window_StatusBase_drawActorLevel','_windowskin','ExtractStrFromTroop','charCode','createKeyJS','VisuMZ_2_BattleSystemCTB','StatusParamsBgType','savefileInfo','setActionState','isAnimationOffsetXMirrored','HRG','MEV','_scrollBarHorz','Subtitle','measureTextWidthNoRounding','F24','calcEasing','playTestShiftR','CtrlQuickLoad','updatePositionCoreEngineShakeHorz','framesMin','flush','SUBTRACT','StatusBgType','_colorCache','drawFace','trim','tilesets','ParseItemNotetags','position','sparamFlat2','command122','_targetAnchor','Scene_Map_initialize','currentClass','removeChild','Game_Picture_initBasic','updateBackOpacity','angle','areButtonsOutsideMainUI','NUMPAD2','EISU','_centerCameraCheck','playCursorSound','OUTQUAD','setSkill','removeFauxAnimation','makeFontBigger','IconXParam5','isExpGaugeDrawn','paramValueByName','skillTypes','CEV','_logWindow','button','BKSP','F21','updatePadding','this.paramBase(2)','You\x20do\x20not\x20have\x20a\x20custom\x20Input.keyMapper\x20with\x20\x22cancel\x22\x20and\x20\x22menu\x22\x20','WIN_OEM_FINISH','ExtDisplayedParams','maxScrollX','TextFmt','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','_pointAnimationQueue','slice','currentValue','command357','enableDigitGrouping','ParamChange','paramFlatJS','isOptionValid','Bitmap_measureTextWidth','contentsOpacity','CommandWidth','pagedown','mainFontSize','initBasic','isGamepadButtonPressed','operation','_drawTextBody','EXECUTE','makeDocumentTitle','img/%1/','CTB','drawItem','pendingColor','stencilOp','Game_Character_processMoveCommand','enemy','_downArrowSprite','createMenuButton','TCR','IconXParam0','enable','makeEncounterCount','ColorPowerUp','SwitchToggleOne','IconParam3','statusWindowRect','Keyboard','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','SellBgType','isTpb','apply','onButtonImageLoad','BuyBgType','mirror','concat','Scene_Battle_createSpriteset_detach','DamageColor','DEF','BTestItems','PictureID','hpGaugeColor2','Spriteset_Base_update','_bypassCanCounterCheck','_pictureCoordinatesMode','destroyCoreEngineMarkedBitmaps','X:\x20%1','drawBackground','WIN_ICO_HELP','sellWindowRect','xparamRate2','_tileExtendSprites','NUM_LOCK','TextManager_param','evaluate','playTestF7','MainMenu','mainAreaTopSideButtonLayout','Scene_Boot_updateDocumentTitle','_statusEquipWindow','AccuracyBoost','ColorTPGauge2','XParamVocab5','map','OpenURL','Window_Base_initialize','HIT','Bitmap_fillRect','cursorPageup','HOME','updateBgmParameters','outlineColorGauge','_commandList','VisuMZ_2_BattleSystemETB','targets','_scaleY','createTilemap','createFauxAnimationSprite','wholeDuration','Tilemap_addSpotTile','keyRepeatWait','buttons','padZero','Spriteset_Base_initialize','numberWindowRect','xparamFlatBonus','expGaugeColor1','_hovered','drawCurrencyValue','textColor','offColor','Scene_GameEnd_createBackground','sv_actors','requestFauxAnimation','_pollGamepads','_tileExtendTerrainTags','index','key%1','command355','isNwjs','isPlaytest','ItemHeight','addCommand','Window_Base_createContents','RowSpacing','updateFrame','_loadingState','TextCodeClassNames','STRUCT','en-US','buttonAssistCancel','LoadError','xparamRate1','Window_NumberInput_start','ARRAYNUM','Weapon-%1-%2','WIN_ICO_00','pointY','_drawTextOutline','catchLoadError','isFullDocumentTitle','createCustomParameter','Game_Screen_initialize','isWindowMaskingEnabled','onEscapeSuccess','DrawItemBackgroundJS','drawActorNickname','setLastGamepadUsed','ENTER','Sprite_destroy','applyCoreEasing','META','EQUALS','Graphics_printError','Input_updateGamepadState','animationShouldMirror','ItemStyle','SceneManager_isGameActive','mainAreaTop','numRepeats','_actorWindow','Window_TitleCommand_selectLast','VisuMZ_2_BattleSystemFTB','children','VisuMZ_2_BattleSystemPTB','loadSystem','setHome','processEscape','helpAreaBottom','rgba(0,\x200,\x200,\x200.7)','_stored_hpGaugeColor1','buttonAssistWindowButtonRect','Scene_Base_createWindowLayer','this.paramBase(6)','targetX','_opacity','_stored_tpCostColor','WIN_OEM_CLEAR','_animation','buttonAssistKey4','RegExp','3807605zlLkxa','CustomParam','GoldRect','terms','drawNewParam','setFrame','AudioChangeBgmPan','_stored_mpGaugeColor2','_gamepadWait','backgroundBitmap','isNextScene','filter','IDs','createBuffer','itypeId','EnableNumberInput','CommandRect','isPressed','Scene_MenuBase_mainAreaTop','FadeSpeed','ONE','onActorChange','outlineColorDmg','IconParam6','isBottomHelpMode','Game_Picture_calcEasing','removeOnceParallelInterpreter','resize','isGamepadConnected','INBOUNCE','setCommonEvent','setupTileExtendTerrainTags','Scene_MenuBase_mainAreaHeight','helpAreaTop','offsetY','openness','NUMPAD6','CONTEXT_MENU','renderNoMask','ParseAllNotetags','events','Scene_Battle_createSpritesetFix','globalAlpha','sqrt','BACKSPACE','_stored_expGaugeColor2','createPageButtons','buttonAssistKey5','tpGaugeColor1','isGameActive','_troopId','playMiss','VisuMZ_2_BattleSystemOTB','popScene','ParseTilesetNotetags','_editWindow','buttonAssistKey2','Icon','createSubSprite','drawing','Scene_Battle_update','NumberRect','meVolume','onTpbCharged','boxHeight','Game_Party_consumeItem','ExportStrFromAllMaps','inBattle','SEMICOLON','INOUTELASTIC','drawAllParams','MRG','NON_FRAME','ColorExpGauge1','_hideButtons','updateScrollBarPosition','_onKeyDown','F18','exp','Graphics_defaultStretchMode','adjustSprite','_CoreEngineSettings','alpha','targetObjects','tab','\x5c}❪TAB❫\x5c{','scrollUp','buttonAssistKey%1','buttonAssistSwitch','isGamepadAxisMoved','pages','playtestQuickLoad','_height','BTB','activate','removeAllPointAnimations','SmartEventCollisionPriority','font','scrollbar','open','StartID','mapId','maxCols','ctrl','Window_Selectable_cursorDown','isTouchedInsideFrame','Duration','playTestF6','sparamRate1','turn','Bitmap_drawTextOutline','_duration','COMMA','saveViewport','Window','standardIconWidth','scaleMode','push','current','_sideButtonLayout','DETACH_PICTURE_CONTAINER','onlyfilename','Item-%1-%2','Renderer','INQUINT','paramPlusJS','_makeFontNameText','keys','GroupDigits','onKeyDownKeysF6F7','230lloQzy','Scene_Boot_startNormalGame','makeCoreEngineCommandList','buttonAssistText%1','updatePictureCoordinates','fontSize','EREOF','ForceNoPlayTest','_currentMap','xScrollLinkedOffset','ceil','_battleField','PreserveNumbers','faceWidth','Sprite_Button_initialize','SHIFT','drawTextEx','_displayY','_goldWindow','command105','updateSmoothScroll','stop','includes','FDR','anglePlus','characters','process_VisuMZ_CoreEngine_ControllerButtons','_tempActor','1.3.0','paramName','type','optSideView','Actor','layeredTiles','isSideView','processFauxAnimationRequests','WIN_OEM_FJ_MASSHOU','BaseTexture','substring','setupValueFont','_dummyWindow','checkCacheKey','length','_actor','loadSystemImages','command111','SplitEscape','checkSmartEventCollision','GoldOverlap','QoL','Bitmap_drawCircle','refreshDimmerBitmap','AudioChangeBgsVolume','checkSubstitute','ItemBackColor2','ParseStateNotetags','playCancel','consumable','clearForcedGameTroopSettingsCoreEngine','Game_Actor_paramBase','PageChange','mpGaugeColor1','EscapeAlways','onLoad','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','isCursorMovable','IconXParam8','numActions','tpCostColor','#%1','Scene_Options_create','drawCurrentParam','Sprite_Animation_setViewport','gaugeRate','IconIndex','restore','Troop%1','object','anchorCoreEasing','AudioChangeBgsPan','operand','offOpacity','Scene_Map_updateMainMultiply','_effectsContainer','successRate','origin','isAnimationForEach','centerSprite','Spriteset_Base_isAnimationPlaying','BattleManager_invokeCounterAttack','setupScrollBarBitmap','MapOnceParallel','pictureButtons','contains','updateRotation','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','Bitmap_strokeRect','itemEva','PRINTSCREEN','VOLUME_MUTE','SlotBgType','_shiftY','TPB\x20ACTIVE','pow','%2%1%3','CommandBgType','Actor-%1-%2','ExtractStrFromList','skipBranch','sparamPlusJS','ETB','horizontal','drawCharacter','ListRect','_shakeSpeed','prototype','render','Game_Map_changeTileset','OUTSINE','_srcBitmap','_shakeDuration','_stored_deathColor','getInputMultiButtonStrings','_forcedBattleSys','buttonAssistOffset5','_lastY','changeAnglePlusData','Center','tpColor','ARRAYSTRUCT','startMove','CancelText','fillStyle','seVolume','start','thickness','Scene_Map_shouldAutosave','Game_Picture_y','RIGHT','addWindow','JUNJA','INOUTQUINT','([\x5c+\x5c-]\x5cd+)>','WIN_OEM_COPY','createAnimationSprite','numberShowButton','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','_offsetY','NumberBgType','_shakePower','batch','Layer','Game_Action_itemEva','INCIRC','_buttonAssistWindow','_width','_internalTextures','scaleY','OptionsMenu','AntiZoomPictures','outlineColor','animations','storeMapData','call','BoxMargin','F13','scrollX','Game_Interpreter_command355','removeAllFauxAnimations','_muteSound','quit','〘Common\x20Event\x20%1:\x20%2〙\x20Start','IconXParam3','filters','helpWindowRect','usableSkills','drawRightArrow','_realScale','encounterStepsMinimum','FontSmoothing','padding','CAPSLOCK','Game_Unit_onBattleEnd','setEnemyAction','_stored_gaugeBackColor','buttons!\x20Go\x20to\x20project\x27s\x20rmmz_core.js\x20and\x20modify\x20Input.keyMapper\x20','BlurFilter','updateCurrentEvent','catchException','OPEN_BRACKET','ExtractStrFromMap','SLEEP','sparamPlus','move','Scene_Skill_create','BattleManager_update','Class-%1-%2','CommonEventID','maxVert','erasePicture','mev','DimColor2','_registerKeyInput','drawGoldItemStyle','checkPassage','IconSParam7','deselect','targetScaleX','tpbAcceleration','refreshWithTextCodeSupport','CustomParamIcons','PGUP','_backgroundFilter','Scene_Map_updateMain','adjustY','centerX','_movementDuration','F15','updateDocumentTitle','isKeyItem','Smooth','LUK','tileset','clear','DOUBLE_QUOTE','_stored_maxLvGaugeColor2','DigitGroupingStandardText','isBusy','createExtendedTileSprite','CNT','ItemBgType','%1〘Choice\x20Cancel〙%1','setSideView','Skill-%1-%2','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','valueOutlineWidth','ColorCTGauge1','StatusEquipRect','animationId','State-%1-%2','Game_Interpreter_updateWaitMode','paramBase','loadTileBitmap','return\x200','_pictureName','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','ShortcutScripts','onXhrError','setSize','Input_pollGamepads','buttonAssistOk','IconParam4','3738SLgKok','min','buttonAreaHeight','SCALE_MODES','stencilFunc','itemHeight','_statusWindow','SEPARATOR','createPointAnimationTargets','commandWindowRect','isRepeated','loadWindowskin','〘Common\x20Event\x20%1:\x20%2〙\x20End','Scene_Map_update','Rate2','processBack','isUseModernControls','WIN_OEM_FJ_LOYA','BTestWeapons','DrawIcons','DOWN','LineHeight','drawCircle','CustomParamNames','visible','deflate','bind','paramRateJS','startNormalGame','tilesetFlags','evaded','expParams','ListBgType','Scene_MenuBase_helpAreaTop','createButtonAssistWindow','_phase','vertical','mpColor','backspace','SkillTypeBgType','playBuzzer','CRI','findSymbol','SideButtons','Game_Action_updateLastTarget','_active','doesNameContainBannedWords','NUM','paramRate1','TitleCommandList','setupFont','Scene_Title','%1\x0a','ExportAllMapText','Rate1','style','Control\x20Variables\x20Script\x20Error','retrievePointAnimation','lineHeight','Settings','editWindowRect','RevertPreserveNumbers','remove','OUTQUINT','DummyBgType','Sprite_StateIcon_updateFrame','removeTileExtendSprites','string','CategoryBgType','ALTGR','ZERO','blockWidth','buttonAssistOffset%1','toLowerCase','AudioChangeBgmPitch','AnimationPoint','XParamVocab3','refreshSpritesetForExtendedTiles','ColorMPGauge2','BattleSystem','HASH','WIN_OEM_FJ_TOUROKU','LvExpGauge','titles1','_origin','inbounce','createPointAnimation','drawGameVersion','scaleSprite','isMVAnimation','ActorBgType','resetFontSettings','Gold','AllMaps','_lastIconIndex','_categoryWindow','OUTBACK','setupBattleTestItems','item','MinDuration','overallWidth','valueOutlineColor','isPreserveTp','updateBgsParameters','isGamepadTriggered','_eventId','loadTitle1','checkCoreEngineDisplayCenter','Armor-%1-%2','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','PLUS','TPB\x20WAIT','INQUART','_target','buttonAssistText1','(\x5cd+)>','setCoreEngineUpdateWindowBg','dropItems','ParamArrow','changeTextColor','initRotation','setHandler','_stored_normalColor','LevelUpFullHp','LEFT','integer','clearTp','ShowButtons','calcCoreEasing','addChild','REC','GRD','exportAllMapStrings','isActiveTpb','createTileExtendSprites','sparamFlatBonus','reduce','iconHeight','updateMove','_numberWindow','systemColor','_mode','processTouchModernControls','PHA','AudioChangeBgsPitch','skillTypeWindowRect','standardIconHeight','CrisisRate','active','yScrollLinkedOffset','defaultInputMode','TextJS','IconParam2','ParseClassNotetags','CLOSE_CURLY_BRACKET','updateOrigin','result','SystemSetSideView','Game_Map_scrollRight','refreshScrollBarBitmap','ButtonFadeSpeed','Spriteset_Base_destroy','hpGaugeColor1','selectLast','_itemWindow','_refreshBack','center','itemPadding','overallHeight','hpColor','getControllerInputButtonMatch','buttonAssistText3','buttonAssistOffset1','Window_Scrollable_update','code','VIEWPORT','innerHeight','responseText','getCustomBackgroundSettings','_hp','rgba(0,\x200,\x200,\x201.0)','Scene_Battle_createCancelButton','Game_Actor_changeClass','keys\x20for\x20both\x20\x22cancel\x22\x20and\x20\x22menu\x22!\x0a\x0a','updateData','OUTEXPO','maxScrollbar','Window_NameInput_cursorRight','_digitGrouping','expGaugeColor2','XParameterFormula','F12','ButtonHeight','down','TitlePicButtons','etypeId','paramPlus','([\x5c+\x5c-]\x5cd+)([%％])>','SwitchActorText','_cache','Scene_Battle_createSpriteset','setColorTone','add','HelpRect','KEEP','_targetOffsetX','ParseEnemyNotetags','learnings','VOLUME_UP','<%1\x20%2:[\x20]','isNormalPriority','URL','zoomScale','PictureCoordinatesMode','IconXParam9','Scene_Title_drawGameTitle','cursorPagedown','CustomParamType','note','_mapY','match','1166312NNBhnE','bgm','_subject','_textPopupWindow','buttonY','rowSpacing','_playtestF7Looping','RepositionEnemies','isBottomButtonMode','SParamVocab4','updatePositionCoreEngine','GET','Param','process_VisuMZ_CoreEngine_jsQuickFunctions','IconXParam4','ExportString','AutoStretch','ScaleX','DefaultMode','_movementWholeDuration','BTestAddedQuantity','_targetScaleX','_index','_lastGamepad','_anglePlus','loadTileset','F6key','_backSprite1','AdjustAngle','clearOnceParallelInterpreters','paramMax','setViewport','_fauxAnimationQueue','MenuBg','updateDashToggle','updateFrameCoreEngine','_pictureContainer','processTimingData','src','duration','_balloonQueue','params','windowPadding','initButtonHidden','TextStr','EnableNameInput','itemBackColor2','updateOpen','KeyUnlisted','drawIcon','XParamVocab9','performMiss','processCursorMove','onDatabaseLoaded','getButtonAssistLocation','makeDeepCopy','_lastScrollBarValues','defineProperty','create','ShiftR_Toggle','processAlwaysEscape','Game_Picture_x','ParseSkillNotetags','_colorTone','fillText','4KSPjeB','DocumentTitleFmt','createTroopNote','ColorCTGauge2','Game_Picture_initRotation','_viewportSize','NUMPAD9','setAction','showPointAnimations','Location','applyForcedGameTroopSettingsCoreEngine','test','ImprovedAccuracySystem','getControllerInputButtonString','overrideMimeType','_animationSprites','createDigits','exit','ColorMaxLvGauge2','isItem','JsReplaceUserVar','skills','FontSize','Sprite_Battler_startMove','Scene_Shop_create','targetEvaRate','isClosed','LATIN1','asin','Input_update','targetContentsOpacity','Enable','scaleX','getLastPluginCommandInterpreter','IconXParam6','bitmap','_refreshPauseSign','initTpbChargeTime','buttonAssistText4','jsQuickFunc','initRotationCoreEngine','_inputWindow','_storedStack','_refreshArrows','updatePlayTestF7','allTiles','_stored_expGaugeColor1','getColorDataFromPluginParameters','addOnceParallelInterpreter','_windowLayer','_lastOrigin','isTileExtended','KeyTAB','setTopRow','process_VisuMZ_CoreEngine_RegExp','buttonAssistOffset3','_buyWindow','App','GoldBgType','initMembers','SkillMenu','jsonToZip','Game_Picture_angle','_coreEasing','loadIconBitmap','join','setMoveEasingType','TRG','SParameterFormula','PositionJS','Scene_Item_create','PERCENT','openingSpeed','blt','hit','battlebacks2','DATABASE','Plus','MCR','iconWidth','_text','paramMaxJS','updateScrollBarVisibility','SystemLoadImages','Game_Picture_show','_currentBgm','ParamName','setupButtonImage','pagedownShowButton','WIN_OEM_ATTN','AnimationID','isOpen','removePointAnimation','forceStencil','PictureRotateBy','CANCEL','Upper\x20Left','getKeyboardInputButtonString','_skillTypeWindow','createTextState','VisuMZ_2_BattleSystemSTB','option','showDevTools','_tpbState','_currentBgs','OUTQUART','Game_Action_itemHit','setAttack','setCoreEngineScreenShakeStyle','_scene','TextPopupShow','wait','MenuLayout','Total','maxTp','openURL','ATK','xparam','xparamFlat2','NUMPAD3','Bitmap_drawText','ExportStrFromAllTroops','_stypeId','Bitmap_gradientFillRect','SkillTypeRect','IconSParam0','BlendMode','translucentOpacity','displayY','reservePlayTestNewGameCommonEvent','tileWidth','repeat','setWindowPadding','loadBitmap','createTitleButtons','Sprite_Animation_processSoundTimings','CheckSplitEscape','MULTIPLY','SParamVocab7','scrollLeft','CLOSE_PAREN','BarOffset','Bitmap_clearRect','fadeSpeed','maxTurns','Window_NameInput_cursorUp','INCUBIC','SceneManager_initialize','INOUTCUBIC','applyEasingAnglePlus','BgFilename1','buttonAssistKey1','ScreenShake','Game_Interpreter_PluginCommand','_forcedBattleGridSystem','deathColor','isEnabled','EVAL','drawGameSubtitle','updateWaitMode','markCoreEngineModified','bgs','toLocaleString','textSizeEx','_previousClass','BarBodyColor','DisplayedParams','IconSet','removeAnimationFromContainer','nw.gui','Window_StatusBase_drawActorSimpleStatus','createDimmerSprite','ShiftT_Toggle','processKeyboardDelete','mute','ARRAYSTR','Color','imageSmoothingEnabled','Window_Base_drawText','Sprite_Actor_setActorHome','subtitle','addQueue','picture','ExportAllTroopText','Scene_Load','scrollRight','makeAutoBattleActions','Game_Unit_onBattleStart','Window_NameInput_initialize','MIN_SAFE_INTEGER','loadPicture','ActorTPColor','menu','destroy','Scene_Boot_loadSystemImages','_onKeyPress','updatePictureAntiZoom','updateClose','sceneTerminationClearEffects','font-smooth','EnableJS','shouldAutosave','initCoreEasing','getPointAnimationLayer','Scene_Base_create','OptionsBgType','titles2','BuyRect','TimeProgress','processSoundTimings','BTestArmors','HYPHEN_MINUS','TILDE','Game_Picture_move','alignBottom','ColorExpGauge2','Scene_Map_updateScene','Game_Interpreter_command122','canEquip','isMaskingEnabled','Linear','moveMenuButtonSideButtonLayout','QwertyLayout','RightMenus','DataManager_setupNewGame','drawGauge','Wait','pos','Enemy-%1-%2','MultiKeyFmt','WIN_OEM_PA3','width','Sprite_AnimationMV_updatePosition','updatePositionCoreEngineShakeOriginal','repositionCancelButtonSideButtonLayout','sv_enemies','initMembersCoreEngine','Scene_Boot_onDatabaseLoaded','end','makeCommandList','SellRect','xparamPlus1','PTB','AudioChangeBgmVolume','updateMainMultiply','ATTN','Game_Map_scrollUp','CoreEngine','animationNextDelay','displayX','areTileShadowsHidden','EXR','NameInputMessage','playBgm','ParseArmorNotetags','ParamMax','SlotRect','Bitmap_blt','Sprite_AnimationMV_processTimingData','FontWidthFix','actorWindowRect','rightArrowWidth','bodyColor','_tileSprite','_isButtonHidden','onKeyDown','getLastUsedGamepadType','bgsVolume','Bitmap_initialize','cursorRight','AGI','loadMapData','updateAnglePlus','strokeRect','setViewportCoreEngineFix','InputRect','buttonAssistText2','EditRect','getColor','resetTextColor','title','CustomParamAbb','Game_Action_numRepeats','scrollY','_cacheScaleX','select','statusEquipWindowRect','MAXMP','Scene_Map_createSpritesetFix','subject','version','MapNameTextCode','OffBarColor','layoutSettings','Title','buttonAssistKey3','eventsXyNt','centerY','_storedMapText','updatePosition','gainItem','sparamFlat1','initCoreEngineScreenShake','retrieveFauxAnimation','HANJA','isEventRunning','_tpbChargeTime','xparamPlus','updateMain','anchor','Scene_MenuBase_createPageButtons','toUpperCase','ctrlKey','repositionEnemiesByResolution','EVA','target','textAlign','processPointAnimationRequests','createWindowLayer','setAnchor','CreateBattleSystemID','DetachBattlePictureContainer','areButtonsHidden','startShake','OUTBOUNCE','onInputBannedWords','smooth','getInputButtonString','NewGameBoot','moveRelativeToResolutionChange','processKeyboardEnd','setupCoreEngine','Show\x20Scrolling\x20Text\x20Script\x20Error','SystemLoadAudio','_encounterCount','_customModified','SceneManager_exit','Finish','WASD','228729MyyeVQ','faces','WIN_OEM_PA2','MRF','actor','nah','NUMPAD1','$dataMap','NoTileShadows','ColorMPGauge1','split','stypeId','traitObjects','startAnimation','_pagedownButton','SaveMenu','process_VisuMZ_CoreEngine_CustomParameters','maxLevel','DebugConsoleLastControllerID','random','Window_NameInput_refresh','refreshActor','_smooth','1.4.4','paramFlatBonus','backOpacity','addAnimationSpriteToContainer','ModernControls','BackOpacity','bgmVolume','_stored_tpGaugeColor1','F22','Game_Map_setup','Basic','Symbol','_textQueue','PositionY','_image','Sprite_Button_updateOpacity','gainGold','_data','cancel','adjustPictureAntiZoom','offset','writeFile','addLoadListener','updatePositionCoreEngineShakeVert','updateCoreEasing','xparamPlus2','isCancelled','setupCoreEasing','maxLvGaugeColor2','processDigitChange','xparamPlusJS','changeTileset','setMute','currencyUnit','isArrowPressed','_dimmerSprite','crisisColor','Scene_Name_create','ColorTPCost','categoryWindowRect','SELECT','_defaultStretchMode','description','Spriteset_Base_updatePosition','NUMPAD4','RPGMAKER_VERSION','_stored_crisisColor','format','Sprite_StateIcon_loadBitmap','SETTINGS','determineSideButtonLayoutValid','_updateGamepadState','right','itemRect','_lastX','applyEasing','updateAnchor','initCoreEngine','WIN_OEM_RESET','MvAnimationRate','_lastPluginCommandInterpreter','needsUpdate','innerWidth','isMagical','_hideTileShadows','SParamVocab6','setup','_tilemap','Window_NameInput_cursorLeft','playTestShiftT','isClosing','Window_NameInput_cursorPagedown','_screenY','child_process','randomInt','isItemStyle','animationBaseDelay','OutlineColorGauge','_opening','toString','helpAreaTopSideButtonLayout','getTileExtendTerrainTags','Plus2','Spriteset_Battle_createLowerLayer','F19','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','round','get','onClick','loading','_offsetX','makeTargetSprites','PAUSE','Graphics','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','ColorGaugeBack','ColorNormal','process_VisuMZ_CoreEngine_Notetags','setDisplayPos','movePageButtonSideButtonLayout','DIVIDE','hasEncryptedImages','MAXHP','ConvertNumberToString','centerCameraCheckData','isSceneMap','BACK_SLASH','F23','TAB','home','paramWidth','WIN_OEM_FJ_ROYA','_spriteset','PRINT','goto','_playTestFastMode','createContents','nextLevelExp','scrollDown','createJsQuickFunction','canAttack','enableDigitGroupingEx','mpCostColor','Window_Gold_refresh','switchModes','dimColor2','volume','gaugeBackColor','INQUAD','this.paramBase(5)','performEscape','endAnimation','setValue','process_VisuMZ_CoreEngine_Functions','CLOSE_BRACKET','%1〘End\x20Choice\x20Selection〙%1','currentExp','setTargetAnchor','PDR','188271rdEHGQ','recoverAll','processMoveCommand','ConvertToBase','stringKeyMap','SPACE','_scrollBarVert','_context','cursorDown','Pixelated','ItemMenu','isAlive','printError','MAX_SAFE_INTEGER','data/','ctGaugeColor2','BACK_QUOTE','processTouch','_battlerName','_clientArea','_animationQueue','createChildSprite','process_VisuMZ_CoreEngine_Settings','framesPerChar','ParseActorNotetags','indexOf','NONCONVERT','keyMapper','clearZoom','pixelated','createCancelButton','xdg-open','_pauseSignSprite','height','Sprite_Gauge_currentValue','INOUTBACK','Spriteset_Battle_createEnemies','terminate','_digitGroupingEx','_saveFileID','drawBackgroundRect','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','smoothSelect','Type','destroyContents','setActorHomeRepositioned','_coreEasingType','reserveCommonEvent','PGDN','Game_Map_setDisplayPos','F11','battleSystem','DOLLAR','_backSprite2','onerror','Game_Interpreter_command105','isInstanceOfSceneMap','damageColor','windowOpacity','onMoveEnd','sparamFlatJS','createBackground','ShowActorLevel','updateFauxAnimations','FTB','ColorHPGauge1','_fauxAnimationSprites','hideButtonFromView','processHandling','_stored_hpGaugeColor2','level','isMenuButtonAssistEnabled','_commonEventLayers','NUMPAD0','_list','OutlineColorDmg','initVisuMZCoreEngine','ControllerButtons','getBackgroundOpacity','deactivate','WIN_OEM_ENLW','isPlaying','attackSkillId','2091084GJpcER','TRAIT_PARAM','\x0a\x0a\x0a\x0a\x0a','Window_Selectable_processTouch','pan','%1〘Choice\x20%2〙\x20%3%1','BgType','_maxDigits','clamp','Opacity','consumeItem','mainAreaHeight','EncounterRateMinimum','maxLvGaugeColor1','paramRate','isSideButtonLayout','isLoopVertical','removeAnimation','_statusParamsWindow','updateDuration','ExportCurMapText','2205511EELosX','contents','Input_shouldPreventDefault','members','【%1】\x0a','checkPlayerLocation','easingType','sin','setupNewGame','randomJS','makeActionList','targetOpacity','Window_Base_destroyContents','ShowJS','buttonAssistWindowSideRect','SwitchRandomizeOne','SideView','OffBarOpacity','DummyRect','worldTransform','parallaxes','name','createEnemies','ENTER_SPECIAL','opacity','mmp','pictures','CIRCUMFLEX','_startPlaying','fillAll','createCustomBackgroundImages','nickname','uiAreaHeight','battlerHue','buttonAssistWindowRect','displayName','getLevel','Game_Temp_initialize','showPicture','HELP','updateScene','INOUTQUAD','cursorUp','PositionX','Sprite_Picture_loadBitmap','Game_Event_isCollidedWithEvents','_profileWindow','onBattleEnd','snapForBackground','PA1','buttonAssistText5','mhp','isEventTest','useDigitGrouping','image-rendering','Max','param','shake','Input_clear','paramchangeTextColor','_upArrowSprite','processCursorMoveModernControls','_buttonType','GoldFontSize','down2','_destroyInternalTextures','setEvent','SParamVocab3','pitch','INOUTCIRC','PRESERVCONVERSION(%1)','itemWindowRect','darwin','Flat1','CodeJS','isSceneBattle','XParamVocab2','UNDERSCORE','showFauxAnimations','updateLastTarget','setLastPluginCommandInterpreter','_originalViewport','sparamRate2','coreEngineRepositionEnemies','18VvqSOf','value','outbounce','buttonAssistOffset2','showIncompleteTilesetError','Sprite_Gauge_gaugeRate','SParamVocab8','Scene_Map_createSpriteset_detach','_helpWindow','constructor','startAutoNewGame','playBgs','playOnceParallelInterpreter','_number','faceHeight','isTriggered','_changingClass','IconParam0','Mute','background','keyCode','_displayedPassageError','stretch','eva','enter','_bgsBuffer','setBackgroundOpacity','targetY','DimColor1','clearRect','catchUnknownError','PERIOD','invokeCounterAttack','setBattleSystem','ItemPadding','Scene_MenuBase_createBackground','INOUTQUART','fillRect','ItemRect','skillId','GoldChange','InputBgType','buttonAssistOffset4','refresh','expRate','onBattleStart','reserveNewGameCommonEvent','_updateFilterArea','Chance','Window_NameInput_processHandling','SubfolderParse','Window_Selectable_processCursorMove','(\x5cd+\x5c.?\x5cd+)>','_optionsWindow','GoldMax','VisuMZ_2_BattleSystemBTB','Untitled','connected','processCursorHomeEndTrigger','<JS\x20%1\x20%2:[\x20](.*)>','Window_refreshBack','exportAllTroopStrings','show','isSpecialCode','runCombinedScrollingTextAsCode','moveCancelButtonSideButtonLayout','_rate','update','maxItems','processKeyboardHandling','this.paramBase(','Scene_Map_createMenuButton','CTRL','drawTextTopAligned','blendFunc','Scene_Base_terminateAnimationClearBugFix','ConvertParams','_targets','EditBgType','Scene_Map_createSpriteset','processKeyboardHome','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','updateScrollBars','paramX','StatusEquipBgType','dashToggle','sparam','targetScaleY','IconParam1','ApplyEasing','createScrollBarSprites','maxScrollY','_isPlaytest','WindowLayer_render','Game_Troop_setup','_clickHandler','floor','SCROLLBAR','context','CategoryRect','WIN_OEM_JUMP','mainAreaHeightSideButtonLayout','Scene_Equip_create','_timeDuration','allowShiftScrolling','advanced','MAT','Window_Selectable_drawBackgroundRect','changeClass','enemies','_inputString','_baseTexture','updateOnceParallelInterpreters','lastAnimationSprite','createSpriteset','goldWindowRect','STENCIL_BUFFER_BIT','drawParamName','parseForcedGameTroopSettingsCoreEngine','GetParamIcon','inputWindowRect','_backgroundSprite','STB','_allTextHeight','Window_NameInput_cursorDown','getGamepads','Game_Map_scrollDown','Game_Event_start','Scene_SingleLoadTransition','list','IconSParam9','OpenSpeed','ControllerMatches','playCursor','paramY','DisplayLockY','_scaleX','RepositionEnemies130','isHandled','useFontWidthFix','drawParamText','Conditional\x20Branch\x20Script\x20Error','cursorLeft','%1/','_inputSpecialKeyCode','0.00','allIcons','LINEAR','ShopMenu','Window_ShopSell_isEnabled','ParseWeaponNotetags','drawSegment','_pressed','_bgmBuffer','canUse','isMaxLevel','registerCommand','Match','_onceParallelInterpreters','EndingID','_stored_pendingColor','_pageupButton','_cacheScaleY','SystemSetFontSize','levelUpRecovery','_cancelButton','gradientFillRect','mainCommandWidth','StatusParamsRect','FUNC','Sprite_Picture_updateOrigin','framesMax','_inBattle','SParamVocab2','platform','drawGameTitle','createPointAnimationSprite','PixelateImageRendering','encounterStep','setActorHome','createLowerLayer','Game_Action_setAttack','itemHitImprovedAccuracy','BlurStrength','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','Origin','_onLoad','horzJS','updateBattleVariables','Window_NameInput_processTouch','_scrollDuration','UpdatePictureCoordinates','Tilemap_addShadow','transform','Unnamed','1.10.0','xparamFlat1','REPLACE','INOUTBOUNCE','BottomButtons','isOpenAndActive','gaugeHeight','Game_Map_scrollLeft','paintOpacity','_slotWindow','close','makeInputButtonString','drawIconBySize','getCoreEngineScreenShakeStyle','text','tilesetNames','onInputOk','isScrollBarVisible','wtypeId','onload','titleCommandWindow','Window_Base_drawFace','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','BattleManager_checkSubstitute','listWindowRect','uiAreaWidth','ALWAYS','ONE_MINUS_SRC_ALPHA','pressed','processDrawIcon','Flat2','tileHeight','Game_BattlerBase_initMembers','originalJS','updatePointAnimations','DisplayLockX'];_0x5a1f=function(){return _0x31bd05;};return _0x5a1f();}function Window_ButtonAssist(){const _0x1a055a=_0x34b3e3;this[_0x1a055a(0x7e8)](...arguments);}Window_ButtonAssist['prototype']=Object['create'](Window_Base['prototype']),Window_ButtonAssist[_0x34b3e3(0x237)]['constructor']=Window_ButtonAssist,Window_ButtonAssist[_0x34b3e3(0x237)]['initialize']=function(_0x42f220){const _0x11dc0c=_0x34b3e3;this[_0x11dc0c(0x559)]={},Window_Base['prototype']['initialize'][_0x11dc0c(0x267)](this,_0x42f220),this[_0x11dc0c(0x81b)](VisuMZ[_0x11dc0c(0x4d5)]['Settings'][_0x11dc0c(0x7ee)][_0x11dc0c(0x62c)]||0x0),this[_0x11dc0c(0x6ba)]();},Window_ButtonAssist[_0x34b3e3(0x237)][_0x34b3e3(0x2fa)]=function(){const _0x3bdbee=_0x34b3e3;return this[_0x3bdbee(0x370)]||Window_Base['prototype'][_0x3bdbee(0x2fa)][_0x3bdbee(0x267)](this);},Window_ButtonAssist['prototype'][_0x34b3e3(0x874)]=function(){const _0x56d51c=_0x34b3e3;this[_0x56d51c(0x63c)][_0x56d51c(0x1c9)]<=0x60&&(this['contents'][_0x56d51c(0x1c9)]+=0x6);},Window_ButtonAssist[_0x34b3e3(0x237)]['makeFontSmaller']=function(){const _0x2a9c74=_0x34b3e3;this[_0x2a9c74(0x63c)][_0x2a9c74(0x1c9)]>=0x18&&(this[_0x2a9c74(0x63c)][_0x2a9c74(0x1c9)]-=0x6);},Window_ButtonAssist[_0x34b3e3(0x237)][_0x34b3e3(0x6d2)]=function(){const _0x2488be=_0x34b3e3;Window_Base[_0x2488be(0x237)]['update'][_0x2488be(0x267)](this),this[_0x2488be(0x77b)]();},Window_ButtonAssist[_0x34b3e3(0x237)][_0x34b3e3(0x87e)]=function(){const _0x1f9bcf=_0x34b3e3;this[_0x1f9bcf(0x278)]=SceneManager[_0x1f9bcf(0x44b)][_0x1f9bcf(0x3d3)]()!==_0x1f9bcf(0x87b)?0x0:0x8;},Window_ButtonAssist[_0x34b3e3(0x237)][_0x34b3e3(0x77b)]=function(){const _0x20b1c6=_0x34b3e3,_0x1208f0=SceneManager['_scene'];for(let _0x48660e=0x1;_0x48660e<=0x5;_0x48660e++){if(this[_0x20b1c6(0x559)][_0x20b1c6(0x8f0)[_0x20b1c6(0x577)](_0x48660e)]!==_0x1208f0['buttonAssistKey%1'['format'](_0x48660e)]())return this[_0x20b1c6(0x6ba)]();if(this[_0x20b1c6(0x559)]['text%1'[_0x20b1c6(0x577)](_0x48660e)]!==_0x1208f0[_0x20b1c6(0x1c7)[_0x20b1c6(0x577)](_0x48660e)]())return this[_0x20b1c6(0x6ba)]();}},Window_ButtonAssist['prototype'][_0x34b3e3(0x6ba)]=function(){const _0x4a0c69=_0x34b3e3;this[_0x4a0c69(0x63c)][_0x4a0c69(0x2a3)]();for(let _0x53de97=0x1;_0x53de97<=0x5;_0x53de97++){this[_0x4a0c69(0x726)](_0x53de97);}},Window_ButtonAssist[_0x34b3e3(0x237)][_0x34b3e3(0x726)]=function(_0xed6acb){const _0x4da380=_0x34b3e3,_0x525c72=this[_0x4da380(0x586)]/0x5,_0x119be4=SceneManager[_0x4da380(0x44b)],_0xda7138=_0x119be4[_0x4da380(0x199)[_0x4da380(0x577)](_0xed6acb)](),_0x40c786=_0x119be4['buttonAssistText%1'[_0x4da380(0x577)](_0xed6acb)]();this[_0x4da380(0x559)][_0x4da380(0x8f0)['format'](_0xed6acb)]=_0xda7138,this[_0x4da380(0x559)]['text%1'['format'](_0xed6acb)]=_0x40c786;if(_0xda7138==='')return;if(_0x40c786==='')return;const _0x3b5d6f=_0x119be4[_0x4da380(0x308)[_0x4da380(0x577)](_0xed6acb)](),_0x45bbf9=this[_0x4da380(0x367)](),_0xb58411=_0x525c72*(_0xed6acb-0x1)+_0x45bbf9+_0x3b5d6f,_0x26d1cd=VisuMZ[_0x4da380(0x4d5)]['Settings']['ButtonAssist'][_0x4da380(0x884)];this[_0x4da380(0x1d4)](_0x26d1cd[_0x4da380(0x577)](_0xda7138,_0x40c786),_0xb58411,0x0,_0x525c72-_0x45bbf9*0x2);},VisuMZ['CoreEngine'][_0x34b3e3(0x2b4)]=Game_Interpreter[_0x34b3e3(0x237)][_0x34b3e3(0x47d)],Game_Interpreter[_0x34b3e3(0x237)][_0x34b3e3(0x47d)]=function(){const _0x215716=_0x34b3e3;if($gameTemp['_pictureCoordinatesMode']!==undefined)return VisuMZ[_0x215716(0x4d5)]['UpdatePictureCoordinates']();return VisuMZ['CoreEngine'][_0x215716(0x2b4)][_0x215716(0x267)](this);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x74e)]=function(){const _0x1e01e8=_0x34b3e3,_0x2df232=$gameTemp[_0x1e01e8(0x8bb)]||0x0;(_0x2df232<0x0||_0x2df232>0x64||TouchInput['isCancelled']()||Input['isTriggered'](_0x1e01e8(0x55a)))&&($gameTemp[_0x1e01e8(0x8bb)]=undefined,Input[_0x1e01e8(0x2a3)](),TouchInput[_0x1e01e8(0x2a3)]());const _0x342e34=$gameScreen[_0x1e01e8(0x494)](_0x2df232);return _0x342e34&&(_0x342e34['_x']=TouchInput['_x'],_0x342e34['_y']=TouchInput['_y']),VisuMZ[_0x1e01e8(0x4d5)][_0x1e01e8(0x1c8)](),$gameTemp[_0x1e01e8(0x8bb)]!==undefined;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x1c8)]=function(){const _0x542faf=_0x34b3e3,_0x26c121=SceneManager[_0x542faf(0x44b)];if(!_0x26c121)return;!_0x26c121[_0x542faf(0x798)]&&(SoundManager[_0x542faf(0x7a5)](),_0x26c121[_0x542faf(0x798)]=new Window_PictureCoordinates(),_0x26c121[_0x542faf(0x341)](_0x26c121[_0x542faf(0x798)])),$gameTemp[_0x542faf(0x8bb)]===undefined&&(SoundManager[_0x542faf(0x1fc)](),_0x26c121['removeChild'](_0x26c121[_0x542faf(0x798)]),_0x26c121[_0x542faf(0x798)]=undefined);};function Window_PictureCoordinates(){const _0x42c7c4=_0x34b3e3;this[_0x42c7c4(0x7e8)](...arguments);}Window_PictureCoordinates[_0x34b3e3(0x237)]=Object[_0x34b3e3(0x3d7)](Window_Base[_0x34b3e3(0x237)]),Window_PictureCoordinates['prototype'][_0x34b3e3(0x698)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x34b3e3(0x237)][_0x34b3e3(0x7e8)]=function(){const _0xee250f=_0x34b3e3;this['_lastOrigin']='nah',this[_0xee250f(0x57e)]=_0xee250f(0x536),this[_0xee250f(0x241)]=_0xee250f(0x536);const _0x1b4ec2=this['windowRect']();Window_Base[_0xee250f(0x237)]['initialize'][_0xee250f(0x267)](this,_0x1b4ec2),this['setBackgroundType'](0x2);},Window_PictureCoordinates['prototype']['windowRect']=function(){const _0x630007=_0x34b3e3;let _0x5ad57a=0x0,_0x4b8807=Graphics[_0x630007(0x5f4)]-this[_0x630007(0x2fa)](),_0x50e8c4=Graphics[_0x630007(0x4c5)],_0x1f4bc3=this[_0x630007(0x2fa)]();return new Rectangle(_0x5ad57a,_0x4b8807,_0x50e8c4,_0x1f4bc3);},Window_PictureCoordinates['prototype'][_0x34b3e3(0x87e)]=function(){const _0x46e48b=_0x34b3e3;this[_0x46e48b(0x278)]=0x0;},Window_PictureCoordinates[_0x34b3e3(0x237)][_0x34b3e3(0x6d2)]=function(){const _0x529e90=_0x34b3e3;Window_Base[_0x529e90(0x237)][_0x529e90(0x6d2)][_0x529e90(0x267)](this),this[_0x529e90(0x378)]();},Window_PictureCoordinates[_0x34b3e3(0x237)][_0x34b3e3(0x378)]=function(){const _0x35962e=_0x34b3e3;if(!this[_0x35962e(0x585)]())return;this['refresh']();},Window_PictureCoordinates['prototype'][_0x34b3e3(0x585)]=function(){const _0x249fcf=_0x34b3e3,_0x177759=$gameTemp['_pictureCoordinatesMode'],_0x2f7a9b=$gameScreen[_0x249fcf(0x494)](_0x177759);return _0x2f7a9b?this[_0x249fcf(0x410)]!==_0x2f7a9b[_0x249fcf(0x314)]||this[_0x249fcf(0x57e)]!==_0x2f7a9b['_x']||this[_0x249fcf(0x241)]!==_0x2f7a9b['_y']:![];},Window_PictureCoordinates['prototype'][_0x34b3e3(0x6ba)]=function(){const _0x162985=_0x34b3e3;this['contents'][_0x162985(0x2a3)]();const _0x15fe42=$gameTemp['_pictureCoordinatesMode'],_0x3d4942=$gameScreen[_0x162985(0x494)](_0x15fe42);if(!_0x3d4942)return;this[_0x162985(0x410)]=_0x3d4942['_origin'],this['_lastX']=_0x3d4942['_x'],this[_0x162985(0x241)]=_0x3d4942['_y'];const _0x40b28e=ColorManager[_0x162985(0x79b)]();this[_0x162985(0x63c)][_0x162985(0x6b4)](0x0,0x0,this[_0x162985(0x586)],this[_0x162985(0x370)],_0x40b28e);const _0xc1cb48='\x20Origin:\x20%1'['format'](_0x3d4942['_origin']===0x0?_0x162985(0x43e):_0x162985(0x243)),_0x449701=_0x162985(0x8bd)['format'](_0x3d4942['_x']),_0x1aab2c=_0x162985(0x82d)[_0x162985(0x577)](_0x3d4942['_y']),_0x471d0d='%1:\x20Exit\x20'[_0x162985(0x577)](TextManager[_0x162985(0x525)](_0x162985(0x55a)));let _0x3c4921=Math[_0x162985(0x6ef)](this[_0x162985(0x586)]/0x4);this[_0x162985(0x7a9)](_0xc1cb48,_0x3c4921*0x0,0x0,_0x3c4921),this[_0x162985(0x7a9)](_0x449701,_0x3c4921*0x1,0x0,_0x3c4921,_0x162985(0x366)),this[_0x162985(0x7a9)](_0x1aab2c,_0x3c4921*0x2,0x0,_0x3c4921,_0x162985(0x366));const _0x4ec92a=this['textSizeEx'](_0x471d0d)[_0x162985(0x4c5)],_0x5e6bdc=this[_0x162985(0x586)]-_0x4ec92a;this[_0x162985(0x1d4)](_0x471d0d,_0x5e6bdc,0x0,_0x4ec92a);};function _0x2daf(_0xedf3c0,_0x1b2739){const _0x5a1fab=_0x5a1f();return _0x2daf=function(_0x2daf88,_0x2ee3ad){_0x2daf88=_0x2daf88-0x115;let _0x15b657=_0x5a1fab[_0x2daf88];return _0x15b657;},_0x2daf(_0xedf3c0,_0x1b2739);}function Window_TextPopup(){const _0x100950=_0x34b3e3;this[_0x100950(0x7e8)](...arguments);}Window_TextPopup['prototype']=Object[_0x34b3e3(0x3d7)](Window_Base[_0x34b3e3(0x237)]),Window_TextPopup[_0x34b3e3(0x237)][_0x34b3e3(0x698)]=Window_TextPopup,Window_TextPopup[_0x34b3e3(0x579)]={'framesPerChar':VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x2fb)][_0x34b3e3(0x1b4)][_0x34b3e3(0x7a1)]??1.5,'framesMin':VisuMZ['CoreEngine']['Settings'][_0x34b3e3(0x1b4)][_0x34b3e3(0x323)]??0x5a,'framesMax':VisuMZ['CoreEngine'][_0x34b3e3(0x2fb)][_0x34b3e3(0x1b4)]['MaxDuration']??0x12c},Window_TextPopup[_0x34b3e3(0x237)]['initialize']=function(){const _0xb9d18a=_0x34b3e3,_0x1d1d80=new Rectangle(0x0,0x0,0x1,0x1);Window_Base[_0xb9d18a(0x237)]['initialize'][_0xb9d18a(0x267)](this,_0x1d1d80),this[_0xb9d18a(0x165)]=0x0,this['_text']='',this[_0xb9d18a(0x554)]=[],this[_0xb9d18a(0x6f6)]=0x0;},Window_TextPopup[_0x34b3e3(0x237)]['isAutoColorAffected']=function(){return!![];},Window_TextPopup[_0x34b3e3(0x237)]['addQueue']=function(_0x73ddbc){const _0x425c3f=_0x34b3e3;if(this[_0x425c3f(0x554)][this[_0x425c3f(0x554)][_0x425c3f(0x1ee)]-0x1]===_0x73ddbc)return;this[_0x425c3f(0x554)][_0x425c3f(0x1b7)](_0x73ddbc),SceneManager[_0x425c3f(0x44b)][_0x425c3f(0x341)](this);},Window_TextPopup[_0x34b3e3(0x237)][_0x34b3e3(0x6d2)]=function(){const _0x3bd626=_0x34b3e3;Window_Base['prototype'][_0x3bd626(0x6d2)][_0x3bd626(0x267)](this),this[_0x3bd626(0x7a2)](),this[_0x3bd626(0x639)]();},Window_TextPopup[_0x34b3e3(0x237)][_0x34b3e3(0x7a2)]=function(){const _0x2dbc76=_0x34b3e3;if(this[_0x2dbc76(0x42e)]!=='')return;if(this[_0x2dbc76(0x554)][_0x2dbc76(0x1ee)]<=0x0)return;if(!this['isClosed']())return;this[_0x2dbc76(0x42e)]=this[_0x2dbc76(0x554)][_0x2dbc76(0x778)]();const _0x1c8ddb=Window_TextPopup[_0x2dbc76(0x579)],_0x2b583d=Math[_0x2dbc76(0x1ce)](this[_0x2dbc76(0x42e)][_0x2dbc76(0x1ee)]*_0x1c8ddb[_0x2dbc76(0x5ea)]);this[_0x2dbc76(0x6f6)]=_0x2b583d[_0x2dbc76(0x62e)](_0x1c8ddb[_0x2dbc76(0x859)],_0x1c8ddb[_0x2dbc76(0x73a)]);const _0x123ed9=this[_0x2dbc76(0x481)](this[_0x2dbc76(0x42e)]);let _0x1f4b0b=_0x123ed9['width']+this[_0x2dbc76(0x367)]()*0x2;_0x1f4b0b+=$gameSystem[_0x2dbc76(0x3c7)]()*0x2;let _0x2c3db9=Math[_0x2dbc76(0x7ef)](_0x123ed9[_0x2dbc76(0x5f4)],this['lineHeight']());_0x2c3db9+=$gameSystem[_0x2dbc76(0x3c7)]()*0x2;const _0x511882=Math[_0x2dbc76(0x59e)]((Graphics[_0x2dbc76(0x4c5)]-_0x1f4b0b)/0x2),_0x1b8dd6=Math[_0x2dbc76(0x59e)]((Graphics['height']-_0x2c3db9)/0x2),_0x3c7445=new Rectangle(_0x511882,_0x1b8dd6,_0x1f4b0b,_0x2c3db9);this[_0x2dbc76(0x285)](_0x3c7445['x'],_0x3c7445['y'],_0x3c7445[_0x2dbc76(0x4c5)],_0x3c7445[_0x2dbc76(0x5f4)]),this[_0x2dbc76(0x5bc)](),this[_0x2dbc76(0x6ba)](),this[_0x2dbc76(0x1a5)](),SceneManager[_0x2dbc76(0x44b)]['addChild'](this);},Window_TextPopup[_0x34b3e3(0x237)]['refresh']=function(){const _0x379c2e=_0x34b3e3,_0x360b09=this['baseTextRect']();this[_0x379c2e(0x63c)]['clear'](),this[_0x379c2e(0x1d4)](this[_0x379c2e(0x42e)],_0x360b09['x'],_0x360b09['y'],_0x360b09[_0x379c2e(0x4c5)]);},Window_TextPopup[_0x34b3e3(0x237)]['updateDuration']=function(){const _0x223a3c=_0x34b3e3;if(this['isOpening']()||this[_0x223a3c(0x58e)]())return;if(this[_0x223a3c(0x6f6)]<=0x0)return;this[_0x223a3c(0x6f6)]--,this[_0x223a3c(0x6f6)]<=0x0&&(this[_0x223a3c(0x75c)](),this['_text']='');},VisuMZ[_0x34b3e3(0x82c)]=function(_0x4467ce){const _0x1512c6=_0x34b3e3;if(Utils[_0x1512c6(0x88d)](_0x1512c6(0x3e9))){var _0x11aed2=require(_0x1512c6(0x487))[_0x1512c6(0x1b4)][_0x1512c6(0x59f)]();SceneManager[_0x1512c6(0x444)]();if(_0x4467ce)setTimeout(_0x11aed2['focus'][_0x1512c6(0x2da)](_0x11aed2),0x190);}},VisuMZ['ApplyEasing']=function(_0xec11f7,_0x286c5d){const _0x6b07d=_0x34b3e3;_0x286c5d=_0x286c5d['toUpperCase']();var _0x361a48=1.70158,_0xa7d7ac=0.7;switch(_0x286c5d){case'LINEAR':return _0xec11f7;case'INSINE':return-0x1*Math[_0x6b07d(0x822)](_0xec11f7*(Math['PI']/0x2))+0x1;case _0x6b07d(0x23a):return Math['sin'](_0xec11f7*(Math['PI']/0x2));case'INOUTSINE':return-0.5*(Math[_0x6b07d(0x822)](Math['PI']*_0xec11f7)-0x1);case _0x6b07d(0x5c8):return _0xec11f7*_0xec11f7;case _0x6b07d(0x871):return _0xec11f7*(0x2-_0xec11f7);case _0x6b07d(0x664):return _0xec11f7<0.5?0x2*_0xec11f7*_0xec11f7:-0x1+(0x4-0x2*_0xec11f7)*_0xec11f7;case _0x6b07d(0x470):return _0xec11f7*_0xec11f7*_0xec11f7;case _0x6b07d(0x788):var _0x309cb4=_0xec11f7-0x1;return _0x309cb4*_0x309cb4*_0x309cb4+0x1;case _0x6b07d(0x472):return _0xec11f7<0.5?0x4*_0xec11f7*_0xec11f7*_0xec11f7:(_0xec11f7-0x1)*(0x2*_0xec11f7-0x2)*(0x2*_0xec11f7-0x2)+0x1;case _0x6b07d(0x330):return _0xec11f7*_0xec11f7*_0xec11f7*_0xec11f7;case _0x6b07d(0x447):var _0x309cb4=_0xec11f7-0x1;return 0x1-_0x309cb4*_0x309cb4*_0x309cb4*_0x309cb4;case _0x6b07d(0x6b3):var _0x309cb4=_0xec11f7-0x1;return _0xec11f7<0.5?0x8*_0xec11f7*_0xec11f7*_0xec11f7*_0xec11f7:0x1-0x8*_0x309cb4*_0x309cb4*_0x309cb4*_0x309cb4;case _0x6b07d(0x1be):return _0xec11f7*_0xec11f7*_0xec11f7*_0xec11f7*_0xec11f7;case _0x6b07d(0x2ff):var _0x309cb4=_0xec11f7-0x1;return 0x1+_0x309cb4*_0x309cb4*_0x309cb4*_0x309cb4*_0x309cb4;case _0x6b07d(0x251):var _0x309cb4=_0xec11f7-0x1;return _0xec11f7<0.5?0x10*_0xec11f7*_0xec11f7*_0xec11f7*_0xec11f7*_0xec11f7:0x1+0x10*_0x309cb4*_0x309cb4*_0x309cb4*_0x309cb4*_0x309cb4;case'INEXPO':if(_0xec11f7===0x0)return 0x0;return Math[_0x6b07d(0x22b)](0x2,0xa*(_0xec11f7-0x1));case _0x6b07d(0x379):if(_0xec11f7===0x1)return 0x1;return-Math[_0x6b07d(0x22b)](0x2,-0xa*_0xec11f7)+0x1;case'INOUTEXPO':if(_0xec11f7===0x0||_0xec11f7===0x1)return _0xec11f7;var _0x3ab637=_0xec11f7*0x2,_0x34e11b=_0x3ab637-0x1;if(_0x3ab637<0x1)return 0.5*Math[_0x6b07d(0x22b)](0x2,0xa*_0x34e11b);return 0.5*(-Math[_0x6b07d(0x22b)](0x2,-0xa*_0x34e11b)+0x2);case _0x6b07d(0x25d):var _0x3ab637=_0xec11f7/0x1;return-0x1*(Math[_0x6b07d(0x16d)](0x1-_0x3ab637*_0xec11f7)-0x1);case _0x6b07d(0x82e):var _0x309cb4=_0xec11f7-0x1;return Math[_0x6b07d(0x16d)](0x1-_0x309cb4*_0x309cb4);case _0x6b07d(0x680):var _0x3ab637=_0xec11f7*0x2,_0x34e11b=_0x3ab637-0x2;if(_0x3ab637<0x1)return-0.5*(Math[_0x6b07d(0x16d)](0x1-_0x3ab637*_0x3ab637)-0x1);return 0.5*(Math[_0x6b07d(0x16d)](0x1-_0x34e11b*_0x34e11b)+0x1);case'INBACK':return _0xec11f7*_0xec11f7*((_0x361a48+0x1)*_0xec11f7-_0x361a48);case _0x6b07d(0x320):var _0x3ab637=_0xec11f7/0x1-0x1;return _0x3ab637*_0x3ab637*((_0x361a48+0x1)*_0x3ab637+_0x361a48)+0x1;break;case _0x6b07d(0x5f6):var _0x3ab637=_0xec11f7*0x2,_0x12d133=_0x3ab637-0x2,_0x3de73a=_0x361a48*1.525;if(_0x3ab637<0x1)return 0.5*_0x3ab637*_0x3ab637*((_0x3de73a+0x1)*_0x3ab637-_0x3de73a);return 0.5*(_0x12d133*_0x12d133*((_0x3de73a+0x1)*_0x12d133+_0x3de73a)+0x2);case _0x6b07d(0x82a):if(_0xec11f7===0x0||_0xec11f7===0x1)return _0xec11f7;var _0x3ab637=_0xec11f7/0x1,_0x34e11b=_0x3ab637-0x1,_0x4861bf=0x1-_0xa7d7ac,_0x3de73a=_0x4861bf/(0x2*Math['PI'])*Math[_0x6b07d(0x3fa)](0x1);return-(Math[_0x6b07d(0x22b)](0x2,0xa*_0x34e11b)*Math[_0x6b07d(0x642)]((_0x34e11b-_0x3de73a)*(0x2*Math['PI'])/_0x4861bf));case'OUTELASTIC':var _0x4861bf=0x1-_0xa7d7ac,_0x3ab637=_0xec11f7*0x2;if(_0xec11f7===0x0||_0xec11f7===0x1)return _0xec11f7;var _0x3de73a=_0x4861bf/(0x2*Math['PI'])*Math[_0x6b07d(0x3fa)](0x1);return Math[_0x6b07d(0x22b)](0x2,-0xa*_0x3ab637)*Math[_0x6b07d(0x642)]((_0x3ab637-_0x3de73a)*(0x2*Math['PI'])/_0x4861bf)+0x1;case _0x6b07d(0x187):var _0x4861bf=0x1-_0xa7d7ac;if(_0xec11f7===0x0||_0xec11f7===0x1)return _0xec11f7;var _0x3ab637=_0xec11f7*0x2,_0x34e11b=_0x3ab637-0x1,_0x3de73a=_0x4861bf/(0x2*Math['PI'])*Math['asin'](0x1);if(_0x3ab637<0x1)return-0.5*(Math[_0x6b07d(0x22b)](0x2,0xa*_0x34e11b)*Math[_0x6b07d(0x642)]((_0x34e11b-_0x3de73a)*(0x2*Math['PI'])/_0x4861bf));return Math[_0x6b07d(0x22b)](0x2,-0xa*_0x34e11b)*Math[_0x6b07d(0x642)]((_0x34e11b-_0x3de73a)*(0x2*Math['PI'])/_0x4861bf)*0.5+0x1;case _0x6b07d(0x522):var _0x3ab637=_0xec11f7/0x1;if(_0x3ab637<0x1/2.75)return 7.5625*_0x3ab637*_0x3ab637;else{if(_0x3ab637<0x2/2.75){var _0x12d133=_0x3ab637-1.5/2.75;return 7.5625*_0x12d133*_0x12d133+0.75;}else{if(_0x3ab637<2.5/2.75){var _0x12d133=_0x3ab637-2.25/2.75;return 7.5625*_0x12d133*_0x12d133+0.9375;}else{var _0x12d133=_0x3ab637-2.625/2.75;return 7.5625*_0x12d133*_0x12d133+0.984375;}}}case _0x6b07d(0x15f):var _0x1fefee=0x1-VisuMZ[_0x6b07d(0x6e8)](0x1-_0xec11f7,_0x6b07d(0x691));return _0x1fefee;case _0x6b07d(0x755):if(_0xec11f7<0.5)var _0x1fefee=VisuMZ['ApplyEasing'](_0xec11f7*0x2,_0x6b07d(0x315))*0.5;else var _0x1fefee=VisuMZ['ApplyEasing'](_0xec11f7*0x2-0x1,_0x6b07d(0x691))*0.5+0.5;return _0x1fefee;default:return _0xec11f7;}},VisuMZ[_0x34b3e3(0x706)]=function(_0x26d844){const _0x2e5b5d=_0x34b3e3;_0x26d844=String(_0x26d844)[_0x2e5b5d(0x515)]();const _0x44ffe2=VisuMZ[_0x2e5b5d(0x4d5)][_0x2e5b5d(0x2fb)][_0x2e5b5d(0x3a9)];if(_0x26d844===_0x2e5b5d(0x5ae))return _0x44ffe2[_0x2e5b5d(0x6a0)];if(_0x26d844==='MAXMP')return _0x44ffe2[_0x2e5b5d(0x6e7)];if(_0x26d844===_0x2e5b5d(0x452))return _0x44ffe2[_0x2e5b5d(0x358)];if(_0x26d844===_0x2e5b5d(0x8b5))return _0x44ffe2[_0x2e5b5d(0x8a8)];if(_0x26d844==='MAT')return _0x44ffe2[_0x2e5b5d(0x2bf)];if(_0x26d844===_0x2e5b5d(0x825))return _0x44ffe2['IconParam5'];if(_0x26d844==='AGI')return _0x44ffe2[_0x2e5b5d(0x159)];if(_0x26d844===_0x2e5b5d(0x2a1))return _0x44ffe2[_0x2e5b5d(0x7a3)];if(_0x26d844===_0x2e5b5d(0x8d1))return _0x44ffe2[_0x2e5b5d(0x8a3)];if(_0x26d844==='EVA')return _0x44ffe2['IconXParam1'];if(_0x26d844===_0x2e5b5d(0x2e9))return _0x44ffe2['IconXParam2'];if(_0x26d844===_0x2e5b5d(0x879))return _0x44ffe2[_0x2e5b5d(0x270)];if(_0x26d844===_0x2e5b5d(0x850))return _0x44ffe2[_0x2e5b5d(0x3ab)];if(_0x26d844==='MRF')return _0x44ffe2[_0x2e5b5d(0x875)];if(_0x26d844===_0x2e5b5d(0x2a9))return _0x44ffe2[_0x2e5b5d(0x400)];if(_0x26d844==='HRG')return _0x44ffe2[_0x2e5b5d(0x7b3)];if(_0x26d844==='MRG')return _0x44ffe2[_0x2e5b5d(0x206)];if(_0x26d844==='TRG')return _0x44ffe2[_0x2e5b5d(0x396)];if(_0x26d844==='TGR')return _0x44ffe2[_0x2e5b5d(0x45b)];if(_0x26d844===_0x2e5b5d(0x343))return _0x44ffe2['IconSParam1'];if(_0x26d844===_0x2e5b5d(0x342))return _0x44ffe2['IconSParam2'];if(_0x26d844===_0x2e5b5d(0x34f))return _0x44ffe2['IconSParam3'];if(_0x26d844===_0x2e5b5d(0x42c))return _0x44ffe2['IconSParam4'];if(_0x26d844==='TCR')return _0x44ffe2['IconSParam5'];if(_0x26d844==='PDR')return _0x44ffe2['IconSParam6'];if(_0x26d844===_0x2e5b5d(0x7a0))return _0x44ffe2[_0x2e5b5d(0x291)];if(_0x26d844===_0x2e5b5d(0x1db))return _0x44ffe2['IconSParam8'];if(_0x26d844===_0x2e5b5d(0x4d9))return _0x44ffe2[_0x2e5b5d(0x711)];if(VisuMZ['CoreEngine']['CustomParamIcons'][_0x26d844])return VisuMZ[_0x2e5b5d(0x4d5)][_0x2e5b5d(0x296)][_0x26d844]||0x0;return 0x0;},VisuMZ[_0x34b3e3(0x5af)]=function(_0x576163,_0x9aa12,_0x36f05b){const _0x92a39f=_0x34b3e3;if(_0x36f05b===undefined&&_0x576163%0x1===0x0)return _0x576163;if(_0x36f05b!==undefined&&['MAXHP',_0x92a39f(0x4fd),_0x92a39f(0x452),_0x92a39f(0x8b5),_0x92a39f(0x6f9),_0x92a39f(0x825),_0x92a39f(0x4ec),_0x92a39f(0x2a1)]['includes'](String(_0x36f05b)[_0x92a39f(0x515)]()[_0x92a39f(0x85f)]()))return _0x576163;_0x9aa12=_0x9aa12||0x0;if(VisuMZ['CoreEngine'][_0x92a39f(0x4f7)][_0x36f05b])return VisuMZ[_0x92a39f(0x4d5)][_0x92a39f(0x399)][_0x36f05b]==='integer'?_0x576163:String((_0x576163*0x64)[_0x92a39f(0x7fe)](_0x9aa12))+'%';return String((_0x576163*0x64)[_0x92a39f(0x7fe)](_0x9aa12))+'%';},VisuMZ[_0x34b3e3(0x1c2)]=function(_0x32b63c){const _0x49773c=_0x34b3e3;_0x32b63c=String(_0x32b63c);if(!_0x32b63c)return _0x32b63c;if(typeof _0x32b63c!==_0x49773c(0x303))return _0x32b63c;const _0x1e93f1=VisuMZ[_0x49773c(0x4d5)][_0x49773c(0x2fb)][_0x49773c(0x1f5)]['DigitGroupingLocale']||_0x49773c(0x8fc),_0x584a4c={'maximumFractionDigits':0x6};_0x32b63c=_0x32b63c['replace'](/\[(.*?)\]/g,(_0x570dce,_0x3ce039)=>{const _0x2978ee=_0x49773c;return VisuMZ[_0x2978ee(0x1d0)](_0x3ce039,'[',']');}),_0x32b63c=_0x32b63c[_0x49773c(0x7f8)](/<(.*?)>/g,(_0x6c92c5,_0x4478d7)=>{return VisuMZ['PreserveNumbers'](_0x4478d7,'<','>');}),_0x32b63c=_0x32b63c['replace'](/\{\{(.*?)\}\}/g,(_0x108c51,_0x2a3e75)=>{const _0x4b432a=_0x49773c;return VisuMZ[_0x4b432a(0x1d0)](_0x2a3e75,'','');}),_0x32b63c=_0x32b63c[_0x49773c(0x7f8)](/(\d+\.?\d*)/g,(_0x54c851,_0x3a189b)=>{const _0x5112bf=_0x49773c;let _0x4b8b6a=_0x3a189b;if(_0x4b8b6a[0x0]==='0')return _0x4b8b6a;if(_0x4b8b6a[_0x4b8b6a['length']-0x1]==='.')return Number(_0x4b8b6a)['toLocaleString'](_0x1e93f1,_0x584a4c)+'.';else return _0x4b8b6a[_0x4b8b6a['length']-0x1]===','?Number(_0x4b8b6a)[_0x5112bf(0x480)](_0x1e93f1,_0x584a4c)+',':Number(_0x4b8b6a)['toLocaleString'](_0x1e93f1,_0x584a4c);});let _0xc35ebd=0x3;while(_0xc35ebd--){_0x32b63c=VisuMZ[_0x49773c(0x2fd)](_0x32b63c);}return _0x32b63c;},VisuMZ['PreserveNumbers']=function(_0x527ee3,_0x23c411,_0xad465b){const _0x215ac9=_0x34b3e3;return _0x527ee3=_0x527ee3['replace'](/(\d)/gi,(_0x4aaafc,_0x224475)=>_0x215ac9(0x681)[_0x215ac9(0x577)](Number(_0x224475))),_0x215ac9(0x22c)[_0x215ac9(0x577)](_0x527ee3,_0x23c411,_0xad465b);},VisuMZ[_0x34b3e3(0x2fd)]=function(_0x1948df){const _0x39926c=_0x34b3e3;return _0x1948df=_0x1948df[_0x39926c(0x7f8)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x4487b1,_0x5135b4)=>Number(parseInt(_0x5135b4))),_0x1948df;},VisuMZ['openURL']=function(_0x2af657){const _0x25395f=_0x34b3e3;SoundManager[_0x25395f(0x79e)]();if(!Utils[_0x25395f(0x8f2)]()){const _0x1ae6e8=window[_0x25395f(0x1a5)](_0x2af657,'_blank');}else{const _0x417882=process[_0x25395f(0x73d)]==_0x25395f(0x683)?'open':process[_0x25395f(0x73d)]=='win32'?_0x25395f(0x24a):_0x25395f(0x5f2);require(_0x25395f(0x591))[_0x25395f(0x7b1)](_0x417882+'\x20'+_0x2af657);}},VisuMZ[_0x34b3e3(0x849)]=function(_0x2732fc,_0x6dba13){const _0x71cfda=_0x34b3e3;if(!_0x2732fc)return'';const _0x31689f=_0x2732fc['baseId']||_0x2732fc['id'];let _0x10f82f='';return _0x2732fc[_0x71cfda(0x7bb)]!==undefined&&_0x2732fc[_0x71cfda(0x65a)]!==undefined&&(_0x10f82f=_0x71cfda(0x22e)[_0x71cfda(0x577)](_0x31689f,_0x6dba13)),_0x2732fc[_0x71cfda(0x2df)]!==undefined&&_0x2732fc[_0x71cfda(0x38f)]!==undefined&&(_0x10f82f=_0x71cfda(0x288)[_0x71cfda(0x577)](_0x31689f,_0x6dba13)),_0x2732fc[_0x71cfda(0x53c)]!==undefined&&_0x2732fc['requiredWtypeId1']!==undefined&&(_0x10f82f=_0x71cfda(0x2ad)[_0x71cfda(0x577)](_0x31689f,_0x6dba13)),_0x2732fc[_0x71cfda(0x150)]!==undefined&&_0x2732fc[_0x71cfda(0x1fd)]!==undefined&&(_0x10f82f=_0x71cfda(0x1bc)['format'](_0x31689f,_0x6dba13)),_0x2732fc[_0x71cfda(0x764)]!==undefined&&_0x2732fc['etypeId']===0x1&&(_0x10f82f=_0x71cfda(0x902)['format'](_0x31689f,_0x6dba13)),_0x2732fc['atypeId']!==undefined&&_0x2732fc[_0x71cfda(0x383)]>0x1&&(_0x10f82f=_0x71cfda(0x32c)['format'](_0x31689f,_0x6dba13)),_0x2732fc[_0x71cfda(0x335)]!==undefined&&_0x2732fc[_0x71cfda(0x65c)]!==undefined&&(_0x10f82f=_0x71cfda(0x4c2)[_0x71cfda(0x577)](_0x31689f,_0x6dba13)),_0x2732fc['autoRemovalTiming']!==undefined&&_0x2732fc[_0x71cfda(0x46e)]!==undefined&&(_0x10f82f=_0x71cfda(0x2b3)[_0x71cfda(0x577)](_0x31689f,_0x6dba13)),_0x10f82f;},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x76f)]=function(_0x20fbb4,_0x4e6125){const _0x364662=_0x34b3e3,_0x290b9d=ImageManager['standardIconWidth']||0x20,_0x4f33b0=ImageManager[_0x364662(0x352)]||0x20;if(_0x4e6125[_0x364662(0x17d)]){const _0x4a531f=_0x290b9d-ImageManager['iconWidth'],_0x3fa754=_0x4f33b0-ImageManager[_0x364662(0x349)];let _0x35c6e7=0x2,_0x3bcc70=0x2;this[_0x364662(0x2fa)]()!==0x24&&(_0x3bcc70=Math[_0x364662(0x6ef)]((this[_0x364662(0x2fa)]()-_0x4f33b0)/0x2));const _0x47e277=_0x4e6125['x']+Math[_0x364662(0x6ef)](_0x4a531f/0x2)+_0x35c6e7,_0x38495f=_0x4e6125['y']+Math[_0x364662(0x6ef)](_0x3fa754/0x2)+_0x3bcc70;this[_0x364662(0x3ce)](_0x20fbb4,_0x47e277,_0x38495f);}_0x4e6125['x']+=_0x290b9d+0x4;},Window_StatusBase[_0x34b3e3(0x237)][_0x34b3e3(0x783)]=function(_0x3dabb1,_0x5a1eee,_0x299388,_0x39c8f4){const _0x107cb9=_0x34b3e3;_0x39c8f4=_0x39c8f4||0x90;const _0x7c5791=ImageManager[_0x107cb9(0x1b5)]||0x20,_0x26d876=ImageManager['standardIconHeight']||0x20,_0x2b8315=_0x7c5791-ImageManager[_0x107cb9(0x42d)],_0x57fa2a=_0x26d876-ImageManager[_0x107cb9(0x349)],_0x5f583d=_0x7c5791,_0x333a84=_0x3dabb1[_0x107cb9(0x721)]()[_0x107cb9(0x887)](0x0,Math[_0x107cb9(0x6ef)](_0x39c8f4/_0x5f583d));let _0x9f5bef=_0x5a1eee+Math[_0x107cb9(0x1ce)](_0x2b8315/0x2),_0x5bb0e9=_0x299388+Math[_0x107cb9(0x1ce)](_0x57fa2a/0x2);for(const _0x19054a of _0x333a84){this[_0x107cb9(0x3ce)](_0x19054a,_0x9f5bef,_0x5bb0e9),_0x9f5bef+=_0x5f583d;}},Game_Picture['prototype']['anchor']=function(){return this['_anchor'];},VisuMZ['CoreEngine'][_0x34b3e3(0x869)]=Game_Picture['prototype']['initBasic'],Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x893)]=function(){const _0x109bae=_0x34b3e3;VisuMZ[_0x109bae(0x4d5)][_0x109bae(0x869)][_0x109bae(0x267)](this),this[_0x109bae(0x81f)]={'x':0x0,'y':0x0},this['_targetAnchor']={'x':0x0,'y':0x0};},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x7c6)]=Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x34a)],Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x34a)]=function(){const _0x429cb0=_0x34b3e3;this['updateAnchor']();const _0x35a904=this[_0x429cb0(0x1b1)];VisuMZ[_0x429cb0(0x4d5)][_0x429cb0(0x7c6)][_0x429cb0(0x267)](this),_0x35a904>0x0&&this[_0x429cb0(0x1b1)]<=0x0&&(this['_x']=this[_0x429cb0(0x7e3)],this['_y']=this[_0x429cb0(0x813)],this[_0x429cb0(0x717)]=this[_0x429cb0(0x3b2)],this[_0x429cb0(0x8da)]=this['_targetScaleY'],this[_0x429cb0(0x13c)]=this[_0x429cb0(0x843)],this[_0x429cb0(0x81f)]&&(this['_anchor']['x']=this[_0x429cb0(0x865)]['x'],this[_0x429cb0(0x81f)]['y']=this['_targetAnchor']['y']));},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x432)]=Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x6cd)],Game_Picture['prototype'][_0x34b3e3(0x6cd)]=function(_0x13cb1b,_0x1d8f46,_0x10164d,_0x355b70,_0xcdbc74,_0x2c998b,_0x4e1998,_0x147836){const _0x478402=_0x34b3e3;VisuMZ['CoreEngine'][_0x478402(0x432)]['call'](this,_0x13cb1b,_0x1d8f46,_0x10164d,_0x355b70,_0xcdbc74,_0x2c998b,_0x4e1998,_0x147836),this[_0x478402(0x51d)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1d8f46]||{'x':0x0,'y':0x0});},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x4b3)]=Game_Picture['prototype'][_0x34b3e3(0x285)],Game_Picture['prototype'][_0x34b3e3(0x285)]=function(_0x187bcd,_0x8bb5fe,_0x30d035,_0x165977,_0x4e9877,_0x5c45df,_0x31353b,_0x4a411a,_0x499f9c){const _0x531bf1=_0x34b3e3;VisuMZ[_0x531bf1(0x4d5)][_0x531bf1(0x4b3)][_0x531bf1(0x267)](this,_0x187bcd,_0x8bb5fe,_0x30d035,_0x165977,_0x4e9877,_0x5c45df,_0x31353b,_0x4a411a,_0x499f9c),this[_0x531bf1(0x5d1)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x187bcd]||{'x':0x0,'y':0x0});},Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x580)]=function(){const _0x4058a4=_0x34b3e3;this[_0x4058a4(0x1b1)]>0x0&&(this[_0x4058a4(0x81f)]['x']=this[_0x4058a4(0x57f)](this[_0x4058a4(0x81f)]['x'],this['_targetAnchor']['x']),this[_0x4058a4(0x81f)]['y']=this[_0x4058a4(0x57f)](this[_0x4058a4(0x81f)]['y'],this[_0x4058a4(0x865)]['y']));},Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x51d)]=function(_0x521cd7){const _0x529573=_0x34b3e3;this['_anchor']=_0x521cd7,this[_0x529573(0x865)]=JsonEx[_0x529573(0x3d4)](this['_anchor']);},Game_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x5d1)]=function(_0x52e1eb){const _0xf4e8e6=_0x34b3e3;this[_0xf4e8e6(0x865)]=_0x52e1eb;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x739)]=Sprite_Picture[_0x34b3e3(0x237)][_0x34b3e3(0x35b)],Sprite_Picture['prototype']['updateOrigin']=function(){const _0x854a36=_0x34b3e3,_0x205124=this['picture']();!_0x205124[_0x854a36(0x513)]()?VisuMZ[_0x854a36(0x4d5)]['Sprite_Picture_updateOrigin'][_0x854a36(0x267)](this):(this['anchor']['x']=_0x205124[_0x854a36(0x513)]()['x'],this[_0x854a36(0x513)]['y']=_0x205124['anchor']()['y']);},Game_Action[_0x34b3e3(0x237)][_0x34b3e3(0x27b)]=function(_0x520938){const _0x275080=_0x34b3e3;if(_0x520938){const _0x184f18=_0x520938[_0x275080(0x6b6)];if(_0x184f18===0x1&&this[_0x275080(0x4ff)]()[_0x275080(0x625)]()!==0x1)this[_0x275080(0x449)]();else _0x184f18===0x2&&this[_0x275080(0x4ff)]()[_0x275080(0x81a)]()!==0x2?this['setGuard']():this[_0x275080(0x872)](_0x184f18);}else this[_0x275080(0x2a3)]();},Game_Actor[_0x34b3e3(0x237)][_0x34b3e3(0x273)]=function(){const _0x290f44=_0x34b3e3;return this[_0x290f44(0x3f3)]()[_0x290f44(0x14d)](_0x30d9a5=>this[_0x290f44(0x729)](_0x30d9a5)&&this[_0x290f44(0x878)]()['includes'](_0x30d9a5[_0x290f44(0x53c)]));},Window_Base[_0x34b3e3(0x237)][_0x34b3e3(0x489)]=function(){const _0x192dcc=_0x34b3e3;this[_0x192dcc(0x56b)]=new Sprite(),this[_0x192dcc(0x56b)][_0x192dcc(0x401)]=new Bitmap(0x0,0x0),this[_0x192dcc(0x56b)]['x']=0x0,this['addChildToBack'](this[_0x192dcc(0x56b)]);},Window_Base['prototype'][_0x34b3e3(0x1f7)]=function(){const _0x811462=_0x34b3e3;if(this[_0x811462(0x56b)]){const _0x5189bb=this['_dimmerSprite'][_0x811462(0x401)],_0x3c2614=this[_0x811462(0x4c5)],_0xc39013=this[_0x811462(0x5f4)],_0x3288dd=this[_0x811462(0x278)],_0x552800=ColorManager[_0x811462(0x808)](),_0x37d7b9=ColorManager['dimColor2']();_0x5189bb[_0x811462(0x15d)](_0x3c2614,_0xc39013),_0x5189bb[_0x811462(0x735)](0x0,0x0,_0x3c2614,_0x3288dd,_0x37d7b9,_0x552800,!![]),_0x5189bb['fillRect'](0x0,_0x3288dd,_0x3c2614,_0xc39013-_0x3288dd*0x2,_0x552800),_0x5189bb['gradientFillRect'](0x0,_0xc39013-_0x3288dd,_0x3c2614,_0x3288dd,_0x552800,_0x37d7b9,!![]),this[_0x811462(0x56b)][_0x811462(0x147)](0x0,0x0,_0x3c2614,_0xc39013);}},Game_Actor['prototype'][_0x34b3e3(0x498)]=function(){const _0x4820a1=_0x34b3e3;for(let _0x26c952=0x0;_0x26c952<this[_0x4820a1(0x207)]();_0x26c952++){const _0x4f4167=this[_0x4820a1(0x645)]();let _0x45e038=Number[_0x4820a1(0x49b)];this[_0x4820a1(0x3e5)](_0x26c952,_0x4f4167[0x0]);for(const _0x25927a of _0x4f4167){const _0x5a10b5=_0x25927a[_0x4820a1(0x8c5)]();_0x5a10b5>_0x45e038&&(_0x45e038=_0x5a10b5,this[_0x4820a1(0x3e5)](_0x26c952,_0x25927a));}}this[_0x4820a1(0x84d)]('waiting');},Window_BattleItem[_0x34b3e3(0x237)][_0x34b3e3(0x47a)]=function(_0x58c518){const _0x46c38d=_0x34b3e3;return BattleManager['actor']()?BattleManager[_0x46c38d(0x535)]()[_0x46c38d(0x729)](_0x58c518):Window_ItemList[_0x46c38d(0x237)]['isEnabled'][_0x46c38d(0x267)](this,_0x58c518);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x4fe)]=Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x701)],Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x701)]=function(){const _0x44dc22=_0x34b3e3;VisuMZ[_0x44dc22(0x4d5)][_0x44dc22(0x4fe)][_0x44dc22(0x267)](this);const _0x42d0aa=this[_0x44dc22(0x5b8)]['_timerSprite'];if(_0x42d0aa)this['addChild'](_0x42d0aa);},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x16b)]=Scene_Battle[_0x34b3e3(0x237)][_0x34b3e3(0x701)],Scene_Battle['prototype']['createSpriteset']=function(){const _0x52a085=_0x34b3e3;VisuMZ[_0x52a085(0x4d5)][_0x52a085(0x16b)][_0x52a085(0x267)](this);const _0x73e4cf=this[_0x52a085(0x5b8)][_0x52a085(0x82b)];if(_0x73e4cf)this[_0x52a085(0x341)](_0x73e4cf);},Sprite_Actor[_0x34b3e3(0x237)][_0x34b3e3(0x6d2)]=function(){const _0x22dbf8=_0x34b3e3;Sprite_Battler[_0x22dbf8(0x237)][_0x22dbf8(0x6d2)][_0x22dbf8(0x267)](this),this['updateShadow']();if(this[_0x22dbf8(0x1ef)])this['updateMotion']();else this[_0x22dbf8(0x5e5)]!==''&&(this[_0x22dbf8(0x5e5)]='');},Window[_0x34b3e3(0x237)][_0x34b3e3(0x409)]=function(){const _0x50d908=_0x34b3e3,_0xcde6f7=this[_0x50d908(0x25f)],_0x39828a=this[_0x50d908(0x19e)],_0x298e83=0x18,_0x3f8511=_0x298e83/0x2,_0x43e9e5=0x60+_0x298e83,_0x43da37=0x0+_0x298e83;this[_0x50d908(0x8a0)][_0x50d908(0x401)]=this[_0x50d908(0x846)],this['_downArrowSprite'][_0x50d908(0x513)]['x']=0.5,this[_0x50d908(0x8a0)][_0x50d908(0x513)]['y']=0.5,this[_0x50d908(0x8a0)][_0x50d908(0x147)](_0x43e9e5+_0x3f8511,_0x43da37+_0x3f8511+_0x298e83,_0x298e83,_0x3f8511),this[_0x50d908(0x8a0)]['move'](Math[_0x50d908(0x59e)](_0xcde6f7/0x2),Math[_0x50d908(0x59e)](_0x39828a-_0x3f8511)),this[_0x50d908(0x677)][_0x50d908(0x401)]=this[_0x50d908(0x846)],this[_0x50d908(0x677)][_0x50d908(0x513)]['x']=0.5,this[_0x50d908(0x677)][_0x50d908(0x513)]['y']=0.5,this[_0x50d908(0x677)]['setFrame'](_0x43e9e5+_0x3f8511,_0x43da37,_0x298e83,_0x3f8511),this['_upArrowSprite'][_0x50d908(0x285)](Math[_0x50d908(0x59e)](_0xcde6f7/0x2),Math[_0x50d908(0x59e)](_0x3f8511));},Window[_0x34b3e3(0x237)][_0x34b3e3(0x402)]=function(){const _0x518b2e=_0x34b3e3,_0x4fe5e4=0x90,_0x416b35=0x60,_0x1fa408=0x18;this[_0x518b2e(0x5f3)][_0x518b2e(0x401)]=this[_0x518b2e(0x846)],this[_0x518b2e(0x5f3)]['anchor']['x']=0.5,this['_pauseSignSprite'][_0x518b2e(0x513)]['y']=0x1,this['_pauseSignSprite'][_0x518b2e(0x285)](Math['round'](this[_0x518b2e(0x25f)]/0x2),this[_0x518b2e(0x19e)]),this[_0x518b2e(0x5f3)][_0x518b2e(0x147)](_0x4fe5e4,_0x416b35,_0x1fa408,_0x1fa408),this['_pauseSignSprite'][_0x518b2e(0x194)]=0xff;},Window[_0x34b3e3(0x237)][_0x34b3e3(0x6be)]=function(){const _0x57b46a=_0x34b3e3,_0x19c82e=this['_clientArea']['worldTransform']['apply'](new Point(0x0,0x0)),_0x11c885=this[_0x57b46a(0x5e6)]['filterArea'];_0x11c885['x']=_0x19c82e['x']+this[_0x57b46a(0x219)]['x'],_0x11c885['y']=_0x19c82e['y']+this[_0x57b46a(0x219)]['y'],_0x11c885[_0x57b46a(0x4c5)]=Math[_0x57b46a(0x1ce)](this['innerWidth']*this[_0x57b46a(0x83c)]['x']),_0x11c885[_0x57b46a(0x5f4)]=Math[_0x57b46a(0x1ce)](this[_0x57b46a(0x370)]*this[_0x57b46a(0x83c)]['y']);},VisuMZ[_0x34b3e3(0x4d5)]['Window_refreshBack']=Window[_0x34b3e3(0x237)]['_refreshBack'],Window[_0x34b3e3(0x237)][_0x34b3e3(0x365)]=function(){const _0x59c660=_0x34b3e3,_0x38c77e=VisuMZ[_0x59c660(0x4d5)]['Settings'][_0x59c660(0x1b4)]['CorrectSkinBleeding']??!![];if(!_0x38c77e)return VisuMZ[_0x59c660(0x4d5)][_0x59c660(0x6cb)][_0x59c660(0x267)](this);const _0x5e0ddd=this['_margin'],_0x4dc6cc=Math[_0x59c660(0x7ef)](0x0,this['_width']-_0x5e0ddd*0x2),_0x1fee9e=Math[_0x59c660(0x7ef)](0x0,this[_0x59c660(0x19e)]-_0x5e0ddd*0x2),_0x56b180=this['_backSprite'],_0x59f952=_0x56b180[_0x59c660(0x130)][0x0];_0x56b180[_0x59c660(0x401)]=this[_0x59c660(0x846)],_0x56b180['setFrame'](0x0,0x0,0x60,0x60),_0x56b180['move'](_0x5e0ddd,_0x5e0ddd),_0x56b180[_0x59c660(0x83c)]['x']=_0x4dc6cc/0x60,_0x56b180[_0x59c660(0x83c)]['y']=_0x1fee9e/0x60,_0x59f952[_0x59c660(0x401)]=this[_0x59c660(0x846)],_0x59f952[_0x59c660(0x147)](0x0,0x60,0x60,0x60),_0x59f952[_0x59c660(0x285)](0x0,0x0,_0x4dc6cc,_0x1fee9e),_0x59f952[_0x59c660(0x83c)]['x']=0x1/_0x56b180[_0x59c660(0x83c)]['x'],_0x59f952['scale']['y']=0x1/_0x56b180[_0x59c660(0x83c)]['y'],_0x56b180[_0x59c660(0x389)](this[_0x59c660(0x3dc)]);},Game_Temp[_0x34b3e3(0x237)][_0x34b3e3(0x4a4)]=function(){const _0x4defa3=_0x34b3e3;this[_0x4defa3(0x5e7)]=[],this[_0x4defa3(0x3bd)]=[],this[_0x4defa3(0x886)]=[],this[_0x4defa3(0x3c5)]=[];},VisuMZ['CoreEngine'][_0x34b3e3(0x6da)]=Scene_Base['prototype'][_0x34b3e3(0x5f8)],Scene_Base[_0x34b3e3(0x237)]['terminate']=function(){const _0xe0ec38=_0x34b3e3;if($gameTemp)$gameTemp[_0xe0ec38(0x4a4)]();VisuMZ[_0xe0ec38(0x4d5)][_0xe0ec38(0x6da)]['call'](this);},Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x853)]=function(_0x3cff8d){const _0x5eb176=_0x34b3e3,_0x32ece3=this[_0x5eb176(0x6f1)];_0x32ece3[_0x5eb176(0x7fd)](),_0x32ece3[_0x5eb176(0x1a3)]=this[_0x5eb176(0x1c0)]();const _0xce4b94=_0x32ece3[_0x5eb176(0x816)](_0x3cff8d)[_0x5eb176(0x4c5)];return _0x32ece3[_0x5eb176(0x20f)](),_0xce4b94;},Window_Message['prototype'][_0x34b3e3(0x7ea)]=function(_0x212592){const _0x141776=_0x34b3e3;return this[_0x141776(0x71a)]()?this[_0x141776(0x63c)][_0x141776(0x853)](_0x212592):Window_Base[_0x141776(0x237)][_0x141776(0x7ea)][_0x141776(0x267)](this,_0x212592);},Window_Message[_0x34b3e3(0x237)]['useFontWidthFix']=function(){const _0x30c6cb=_0x34b3e3;return VisuMZ[_0x30c6cb(0x4d5)][_0x30c6cb(0x2fb)]['QoL'][_0x30c6cb(0x4e1)]??!![];},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x4f8)]=Game_Action[_0x34b3e3(0x237)][_0x34b3e3(0x12c)],Game_Action['prototype'][_0x34b3e3(0x12c)]=function(){const _0x11f0fd=_0x34b3e3;return this[_0x11f0fd(0x322)]()?VisuMZ[_0x11f0fd(0x4d5)][_0x11f0fd(0x4f8)]['call'](this):0x0;},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x744)]=Game_Action[_0x34b3e3(0x237)][_0x34b3e3(0x449)],Game_Action[_0x34b3e3(0x237)]['setAttack']=function(){const _0x2c9806=_0x34b3e3;if(this[_0x2c9806(0x4ff)]()&&this[_0x2c9806(0x4ff)]()[_0x2c9806(0x5c0)]())VisuMZ['CoreEngine'][_0x2c9806(0x744)][_0x2c9806(0x267)](this);else BattleManager[_0x2c9806(0x8ba)]?VisuMZ[_0x2c9806(0x4d5)][_0x2c9806(0x744)][_0x2c9806(0x267)](this):this[_0x2c9806(0x2a3)]();},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x21d)]=BattleManager[_0x34b3e3(0x6af)],BattleManager[_0x34b3e3(0x6af)]=function(_0x1ce76f,_0x1764e3){const _0x3d96a4=_0x34b3e3;this['_bypassCanCounterCheck']=!![],VisuMZ[_0x3d96a4(0x4d5)]['BattleManager_invokeCounterAttack'][_0x3d96a4(0x267)](this,_0x1ce76f,_0x1764e3),this['_bypassCanCounterCheck']=undefined;},Sprite_Name[_0x34b3e3(0x237)][_0x34b3e3(0x7c1)]=function(){return 0x24;},Sprite_Name['prototype']['redraw']=function(){const _0x55ee62=_0x34b3e3,_0x565d02=this['name'](),_0x12cf3d=this['bitmapWidth'](),_0x3eb63f=this[_0x55ee62(0x7c1)]();this[_0x55ee62(0x2f2)](),this[_0x55ee62(0x401)][_0x55ee62(0x2a3)](),this['bitmap']['drawTextTopAligned'](_0x565d02,0x4,0x0,_0x12cf3d-0xa,_0x3eb63f,'left');},Bitmap[_0x34b3e3(0x237)][_0x34b3e3(0x6d8)]=function(_0x1dcf5c,_0x37d4b8,_0x385336,_0x1adb37,_0x5c5b9c,_0x25870b){const _0x16aae6=_0x34b3e3,_0x58f409=this[_0x16aae6(0x6f1)],_0x329dd7=_0x58f409['globalAlpha'];_0x1adb37=_0x1adb37||0xffffffff;let _0x2a1349=_0x37d4b8,_0x2f1f1e=Math[_0x16aae6(0x59e)](_0x385336+0x18/0x2+this[_0x16aae6(0x1c9)]*0.35);_0x25870b===_0x16aae6(0x366)&&(_0x2a1349+=_0x1adb37/0x2),_0x25870b==='right'&&(_0x2a1349+=_0x1adb37),_0x58f409[_0x16aae6(0x7fd)](),_0x58f409[_0x16aae6(0x1a3)]=this[_0x16aae6(0x1c0)](),_0x58f409[_0x16aae6(0x51a)]=_0x25870b,_0x58f409['textBaseline']=_0x16aae6(0x7ad),_0x58f409['globalAlpha']=0x1,this[_0x16aae6(0x117)](_0x1dcf5c,_0x2a1349,_0x2f1f1e,_0x1adb37),_0x58f409[_0x16aae6(0x16c)]=_0x329dd7,this[_0x16aae6(0x896)](_0x1dcf5c,_0x2a1349,_0x2f1f1e,_0x1adb37),_0x58f409[_0x16aae6(0x20f)](),this[_0x16aae6(0x6fe)][_0x16aae6(0x6d2)]();},VisuMZ[_0x34b3e3(0x4d5)][_0x34b3e3(0x769)]=BattleManager[_0x34b3e3(0x1f9)],BattleManager[_0x34b3e3(0x1f9)]=function(_0x8e4b05){const _0x96c994=_0x34b3e3;if(this[_0x96c994(0x39f)]&&this['_subject'][_0x96c994(0x7ab)]()===_0x8e4b05[_0x96c994(0x7ab)]())return![];return VisuMZ['CoreEngine']['BattleManager_checkSubstitute'][_0x96c994(0x267)](this,_0x8e4b05);},BattleManager[_0x34b3e3(0x7f7)]=function(){const _0x5ace73=_0x34b3e3;if(this[_0x5ace73(0x39f)])this[_0x5ace73(0x87a)][_0x5ace73(0x7f7)](this[_0x5ace73(0x39f)]);this[_0x5ace73(0x2e3)]=_0x5ace73(0x1af),this[_0x5ace73(0x39f)]&&this[_0x5ace73(0x39f)][_0x5ace73(0x207)]()===0x0&&(this['endBattlerActions'](this[_0x5ace73(0x39f)]),this['_subject']=null);},Bitmap['prototype']['_startLoading']=function(){const _0x4936a5=_0x34b3e3;this[_0x4936a5(0x556)]=new Image(),this[_0x4936a5(0x556)][_0x4936a5(0x765)]=this[_0x4936a5(0x749)][_0x4936a5(0x2da)](this),this['_image'][_0x4936a5(0x609)]=this['_onError'][_0x4936a5(0x2da)](this),this['_destroyCanvas'](),this[_0x4936a5(0x8f9)]=_0x4936a5(0x5a1),Utils[_0x4936a5(0x5ad)]()?this['_startDecrypting']():(this[_0x4936a5(0x556)][_0x4936a5(0x3c3)]=this[_0x4936a5(0x7ed)],![]&&this['_image'][_0x4936a5(0x4c5)]>0x0&&(this['_image'][_0x4936a5(0x765)]=null,this[_0x4936a5(0x749)]()));},Scene_Skill['prototype'][_0x34b3e3(0x157)]=function(){const _0x1a3860=_0x34b3e3;Scene_MenuBase[_0x1a3860(0x237)][_0x1a3860(0x157)][_0x1a3860(0x267)](this),this[_0x1a3860(0x546)](),this[_0x1a3860(0x364)][_0x1a3860(0x622)](),this['_itemWindow'][_0x1a3860(0x292)](),this[_0x1a3860(0x440)][_0x1a3860(0x1a0)]();},Scene_Skill['prototype'][_0x34b3e3(0x7fa)]=function(){const _0x1eb58f=_0x34b3e3;return this['_skillTypeWindow']&&this[_0x1eb58f(0x440)][_0x1eb58f(0x354)];},Game_Map[_0x34b3e3(0x237)][_0x34b3e3(0x290)]=function(_0x1f2ba8,_0x48ac7b,_0x27f2dd){const _0x37fbb0=_0x34b3e3,_0x55f8ef=this[_0x37fbb0(0x2dd)](),_0x1d7629=this[_0x37fbb0(0x40b)](_0x1f2ba8,_0x48ac7b);for(const _0x230439 of _0x1d7629){const _0x3c3f9b=_0x55f8ef[_0x230439];if(_0x3c3f9b===undefined||_0x3c3f9b===null){if($gameTemp[_0x37fbb0(0x8f3)]()&&!DataManager[_0x37fbb0(0x66f)]()){let _0x2a2c7c=_0x37fbb0(0x5fc)+'\x0a';_0x2a2c7c+=_0x37fbb0(0x885)+'\x0a',_0x2a2c7c+=_0x37fbb0(0x809);if(this[_0x37fbb0(0x693)]())alert(_0x2a2c7c),SceneManager[_0x37fbb0(0x3ef)]();else{if(!this[_0x37fbb0(0x6a4)])console['log'](_0x2a2c7c);this['_displayedPassageError']=!![];}}}if((_0x3c3f9b&0x10)!==0x0)continue;if((_0x3c3f9b&_0x27f2dd)===0x0)return!![];if((_0x3c3f9b&_0x27f2dd)===_0x27f2dd)return![];}return![];},Game_Map['prototype']['showIncompleteTilesetError']=function(){if(Imported['VisuMZ_3_EventChainReact'])return!![];if(Imported['VisuMZ_4_UniqueTileEffects'])return!![];return![];},Sprite_Animation['prototype'][_0x34b3e3(0x1b3)]=function(_0x288d66){const _0x237c3a=_0x34b3e3;!this[_0x237c3a(0x68c)]&&(this[_0x237c3a(0x68c)]=_0x288d66['gl'][_0x237c3a(0x7db)](_0x288d66['gl'][_0x237c3a(0x36f)]));},VisuMZ['CoreEngine'][_0x34b3e3(0x24c)]=Scene_Map[_0x34b3e3(0x237)][_0x34b3e3(0x4a7)],Scene_Map['prototype'][_0x34b3e3(0x4a7)]=function(){const _0x4786cc=_0x34b3e3,_0x4b6c13=SceneManager[_0x4786cc(0x482)]['name'];if([_0x4786cc(0x2f3),_0x4786cc(0x496),'Scene_TitleTransition',_0x4786cc(0x70f)]['includes'](_0x4b6c13))return![];return VisuMZ['CoreEngine'][_0x4786cc(0x24c)]['call'](this);},VisuMZ['CoreEngine'][_0x34b3e3(0x80a)]=Window_SkillList[_0x34b3e3(0x237)][_0x34b3e3(0x1da)],Window_SkillList['prototype']['includes']=function(_0x2b91ec){const _0x82a075=_0x34b3e3;if(this[_0x82a075(0x458)]<=0x0)return![];return VisuMZ[_0x82a075(0x4d5)][_0x82a075(0x80a)][_0x82a075(0x267)](this,_0x2b91ec);},VisuMZ['CoreEngine'][_0x34b3e3(0x7bf)]=Game_Battler[_0x34b3e3(0x237)][_0x34b3e3(0x403)],Game_Battler[_0x34b3e3(0x237)]['initTpbChargeTime']=function(_0x1163dd){const _0x2d230c=_0x34b3e3;VisuMZ[_0x2d230c(0x4d5)][_0x2d230c(0x7bf)]['call'](this,_0x1163dd),isNaN(this[_0x2d230c(0x510)])&&(VisuMZ[_0x2d230c(0x4d5)][_0x2d230c(0x7bf)]['call'](this,_0x1163dd),isNaN(this[_0x2d230c(0x510)])&&(this[_0x2d230c(0x510)]=0x0));},Game_Battler[_0x34b3e3(0x237)]['updateTpbChargeTime']=function(){const _0xe9f450=_0x34b3e3;this[_0xe9f450(0x445)]==='charging'&&(this[_0xe9f450(0x510)]+=this[_0xe9f450(0x294)](),isNaN(this[_0xe9f450(0x510)])&&(this['_tpbChargeTime']=this[_0xe9f450(0x294)](),isNaN(this['_tpbChargeTime'])&&(this[_0xe9f450(0x510)]=0x0)),this[_0xe9f450(0x510)]>=0x1&&(this['_tpbChargeTime']=0x1,this[_0xe9f450(0x181)]()));};