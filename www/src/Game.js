// create BasicGame Class
BasicGame = {

};

//some local global vars
var music;

// create Game function in BasicGame
BasicGame.Game = function(game) {
};

// set Game function prototype
BasicGame.Game.prototype = {

    init: function() {
        // set up input max pointers
        this.input.maxPointers = 1;
        // set up stage disable visibility change
        this.stage.disableVisibilityChange = true;
        // Set up the scaling method used by the ScaleManager
        // Valid values for scaleMode are:
        // * EXACT_FIT
        // * NO_SCALE
        // * SHOW_ALL
        // * RESIZE
        // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // If you wish to align your game in the middle of the page then you can
        // set this value to true. It will place a re-calculated margin-left
        // pixel value onto the canvas element which is updated on orientation /
        // resizing events. It doesn't care about any other DOM element that may
        // be on the page, it literally just sets the margin.
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // Force the orientation in landscape or portrait.
        // * Set first to true to force landscape. 
        // * Set second to true to force portrait.
        this.scale.forceOrientation(false, true);
        // Sets the callback that will be called when the window resize event
        // occurs, or if set the parent container changes dimensions. Use this 
        // to handle responsive game layout options. Note that the callback will
        // only be called if the ScaleManager.scaleMode is set to RESIZE.
        this.scale.setResizeCallback(this.gameResized, this);
        // Set screen size automatically based on the scaleMode. This is only
        // needed if ScaleMode is not set to RESIZE.
        this.scale.setScreenSize(true);
        // Re-calculate scale mode and update screen size. This only applies if
        // ScaleMode is not set to RESIZE.
        this.scale.refresh();

    },

    preload: function() {

        // Here we load the assets required for our preloader (in this case a 
        // background and a loading bar)
        //this.load.image('logo', 'asset/phaser.png');
        
        //load background images
        this.load.image('bg', 'asset/Background.png');
        this.load.image('bgCloud1', 'asset/Cloud1.png');
        this.load.image('bgCloud2', 'asset/Cloud2.png');
        
        //load desire images
        this.load.spritesheet('desireCloud', 'asset/Cloud_Floating_Small.png', 90, 60);
        this.load.image('dogDesire', 'asset/Dog_Desire.png');
        
        //load protagonist images
        this.load.spritesheet('monk', 'asset/protagonist_floating_longer_small.png', 105, 90);
        //this.load.spritesheet('monk', 'asset/protagonist_floating_longer.png', 700, 600);
        this.load.image('astral', 'asset/AstralProtagonist_Small.png');
        
        //load audio
        this.load.audio('gameMusic', ['asset/Song.mp3', 'asset/Song.wav', 'asset/Song.ogg']);
    },

    create: function() {
        /**** BACKGROUND CREATION ****/
        this.background = this.add.sprite(
            0,
            0,
            'bg'
        );
        this.background.anchor.setTo(0, 0);
        this.background.width = this.world._width;
        this.background.height = this.world._height;
        
        this.clouds = [];
        this.clouds[0] = this.add.sprite(
            0,
            this.world.centerY / 2,
            'bgCloud1'
        );
        this.clouds[1] = this.add.sprite(
            this.world._width / 4 * 3,
            this.world.centerY / 4,
            'bgCloud2'
        );
        
        for (var i = 0; i < this.clouds.length; i++) {
            this.clouds[i].anchor.setTo(0.5, 0.5);
        }
        
        /**** MONK CREATION ****/
        // Add monk to the center of the stage
        this.monk = this.add.sprite(
            this.world.centerX, // (centerX, centerY) is the center coordination
            this.world.centerY,
            'monk');
        // Set the anchor to the center of the sprite
        this.monk.anchor.setTo(0.5, 0.5);
        // add animations for the monk
        var animationFrames = [];
        for (i = 0; i < 24; i++) {
            animationFrames[i] = i;
        }
        this.monk.animations.add('floating', animationFrames, 24, true);
        
        //begin the animation
        this.monk.animations.play('floating');
        
        /**** AUDIO CREATION ****/
        music = this.add.audio('gameMusic');//, 1, true);
        this.gameMusic = music;
        //console.log(music);
        //this.gameMusic.play();//'',0,1,true);
        //this.gameMusic.play();
        music.play();
        console.log("gameMusic: ", this.gameMusic);
    },
    
    update: function() {
        this.clouds[0].x += 1;
        this.clouds[1].x += 2;
        
        for (var i = 0; i < this.clouds.length; i++) {
            //this.clouds[i].x += 5;
            
            if (this.clouds[i].x > this.world._width + this.clouds[i].width / 2) {
                this.clouds[i].x = -this.clouds[i].width / 2;
            }
        }
    },

    gameResized: function(width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.
        
    }/*,

    render: function() {
        if (music) {
            console.log("Music: ", music);
            //this.debug.soundInfo(music, 0,0);
        }
    }*/
};