// ===============================
// REMOVE DEFAULT TITLE COMMANDS
// ===============================
Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = { 
        isClosing: function() { return false; },
        isOpening: function() { return false; },
        isOpen: function() { return true; },
        isClosed: function() { return false; },
        close: function() {},
        open: function() {},
        activate: function() {},
        deactivate: function() {},
        select: function() {}
    };
};

// ===============================
// CUSTOM BACKGROUND
// ===============================
Scene_Title.prototype.createBackground = function() {
    this._backSprite1 = new Sprite();
    this._backSprite1.bitmap = ImageManager.loadTitle1("mainmenuv2");
    this.addChild(this._backSprite1);
    
    this._backSprite2 = new Sprite();
    this._backSprite2.bitmap = ImageManager.loadTitle2($dataSystem.title2Name);
    this.addChild(this._backSprite2);
};

// ===============================
// FIX BACKGROUND SCALING
// ===============================
Scene_Title.prototype.adjustBackground = function() {
    if (this._backSprite1 && this._backSprite1.bitmap && this._backSprite1.bitmap.isReady()) {
        this.scaleSprite(this._backSprite1);
    }
    if (this._backSprite2 && this._backSprite2.bitmap && this._backSprite2.bitmap.isReady()) {
        this.scaleSprite(this._backSprite2);
    }
};

// ===============================
// CREATE
// ===============================
const _Scene_Title_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
    _Scene_Title_create.call(this);
    this._customMenuCreated = false;
};

// ===============================
// UPDATE
// ===============================
const _Scene_Title_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
    _Scene_Title_update.call(this);
    
    if (!this._customMenuCreated && this.isReady()) {
        this.createCustomMenu();
        this._customMenuCreated = true;
    }
    
    if (this._customMenuCreated && this._highlightBar) {
        this.updateCustomMenu();
    }
};

// ===============================
// MENU SETUP - EXACT POSITION 416,349
// ===============================
Scene_Title.prototype.createCustomMenu = function() {
    this._menuIndex = 0;
    
    // EXACT positions - NOT centered, using your exact coordinates
    this._menuHitBoxes = [
        { x: 416, y: 349, width: 260, height: 50, name: "Play", command: 0 },    // EXACT: 416,349
        { x: 410, y: 408, width: 260, height: 50, name: "Options", command: 2 },  // 65px down
        { x: 401, y: 466, width: 260, height: 50, name: "Extras", command: 3 },   // 65px down
        { x: 406, y: 515, width: 260, height: 50, name: "Quit", command: 4 }      // 65px down
    ];

    this.createHighlightBar();
};
// ===============================
// CREATE HIGHLIGHT BAR - WIDER & LONGER
// ===============================
Scene_Title.prototype.createHighlightBar = function() {
    this._highlightBar = new Sprite();
    this._highlightBar.bitmap = ImageManager.loadTitle1("MenuHighlight");
    
    const onLoad = function() {
        if (this._highlightBar && this._highlightBar.bitmap) {
            // ADJUST THESE VALUES TO WIDEN AND LENGTHEN
            this._highlightBar.scale.x = 0.23;  // WIDER (was 0.20)
            this._highlightBar.scale.y = 0.16;  // LONGER (was 0.10)
            this._highlightBar.opacity = 160;
            
            this.positionHighlightBar();
            console.log("Highlight bar loaded and positioned");
        }
    }.bind(this);
    
    this._highlightBar.bitmap.addLoadListener(onLoad);
    this._highlightBar.z = 100;
    this.addChild(this._highlightBar);
};
// ===============================
// POSITION HIGHLIGHT BAR - MOVED UP 50, LEFT 40
// ===============================
Scene_Title.prototype.positionHighlightBar = function() {
    if (!this._menuHitBoxes || this._menuHitBoxes.length === 0) return;
    if (!this._highlightBar.bitmap || !this._highlightBar.bitmap.isReady()) return;
    
    const box = this._menuHitBoxes[this._menuIndex];
    
    // MOVED LEFT 40 PIXELS (from -20 to -60)
    this._highlightBar.x = box.x - 180;  // -60 = 40 pixels left of before
    
    // MOVED UP 50 PIXELS (from -5 to -55)
    this._highlightBar.y = box.y - 80;   // -55 = 50 pixels higher than before
    
    this._highlightBar.visible = true;
    console.log(`Highlight on ${box.name}:`, this._highlightBar.x, this._highlightBar.y);
};
// ===============================
// UPDATE HIGHLIGHT POSITION
// ===============================
Scene_Title.prototype.updateHighlightPosition = function() {
    if (this._highlightBar && this._menuHitBoxes[this._menuIndex]) {
        this.positionHighlightBar();
    }
};

// ===============================
// UPDATE HIGHLIGHT POSITION
// ===============================
Scene_Title.prototype.updateHighlightPosition = function() {
    if (this._highlightBar && this._menuHitBoxes[this._menuIndex]) {
        this.positionHighlightBar();
    }
};

// ===============================
// CUSTOM MENU INPUT
// ===============================
Scene_Title.prototype.updateCustomMenu = function() {
    // Click position debug
    if (TouchInput.isTriggered()) {
        console.log("Clicked at:", TouchInput.x, TouchInput.y);
    }
    
    // Mouse click
    if (TouchInput.isTriggered()) {
        const x = TouchInput.x;
        const y = TouchInput.y;
        
        for (let i = 0; i < this._menuHitBoxes.length; i++) {
            const box = this._menuHitBoxes[i];
            if (x >= box.x && x <= box.x + box.width && 
                y >= box.y && y <= box.y + box.height) {
                this._menuIndex = i;
                this.updateHighlightPosition();
                SoundManager.playOk();
                this.executeMenuCommand(box.command);
                return;
            }
        }
    }
    
    // Mouse hover
    if (TouchInput.isMoved()) {
        const x = TouchInput.x;
        const y = TouchInput.y;
        
        for (let i = 0; i < this._menuHitBoxes.length; i++) {
            const box = this._menuHitBoxes[i];
            if (x >= box.x && x <= box.x + box.width && 
                y >= box.y && y <= box.y + box.height) {
                if (this._menuIndex !== i) {
                    this._menuIndex = i;
                    this.updateHighlightPosition();
                    SoundManager.playCursor();
                }
                break;
            }
        }
    }
    
    // Keyboard navigation
    if (Input.isTriggered("down") || Input.isRepeated("down")) {
        this._menuIndex++;
        if (this._menuIndex >= this._menuHitBoxes.length) {
            this._menuIndex = 0;
        }
        this.updateHighlightPosition();
        SoundManager.playCursor();
    }

    if (Input.isTriggered("up") || Input.isRepeated("up")) {
        this._menuIndex--;
        if (this._menuIndex < 0) {
            this._menuIndex = this._menuHitBoxes.length - 1;
        }
        this.updateHighlightPosition();
        SoundManager.playCursor();
    }

    // Confirm selection
    if (Input.isTriggered("ok")) {
        SoundManager.playOk();
        this.executeMenuCommand(this._menuHitBoxes[this._menuIndex].command);
    }
};

// ===============================
// EXECUTE MENU COMMAND
// ===============================
Scene_Title.prototype.executeMenuCommand = function(commandIndex) {
    switch(commandIndex) {
        case 0: this.commandNewGame(); break;
        case 1: console.log("Continue not available"); break;
        case 2: this.commandOptions(); break;
        case 3: console.log("Extras menu"); break;
        case 4: SceneManager.exit(); break;
    }
};
