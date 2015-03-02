var w = window.innerWidth; //window.innerWidth * window.devicePixelRatio,
var h = window.innerHeight; //window.innerHeight * window.devicePixelRatio;

console.log("width, height", w, h);

var game = new Phaser.Game(w, h, Phaser.CANVAS, 'game', {
    preload: preload,
    create: create,
    update: update,
    render: render,
    resize: resize
}, false, true);

intel.xdk.device.hideSplashScreen();
intel.xdk.device.setRotateOrientation("portrait");
intel.xdk.device.setAutoRotate(false);

function preload() {
    game.input.maxPointers = 1;
    // set up stage disable visibility change
    game.stage.disableVisibilityChange = true;
    // Set up the scaling method used by the ScaleManager
    // Valid values for scaleMode are:
    // * EXACT_FIT
    // * NO_SCALE
    // * SHOW_ALL
    // * RESIZE
    // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
    game.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    // If you wish to align your game in the middle of the page then you can
    // set this value to true. It will place a re-calculated margin-left
    // pixel value onto the canvas element which is updated on orientation /
    // resizing events. It doesn't care about any other DOM element that may
    // be on the page, it literally just sets the margin.
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    // Force the orientation in landscape or portrait.
    // * Set first to true to force landscape. 
    // * Set second to true to force portrait.
    game.scale.forceOrientation(false, true);
    // Sets the callback that will be called when the window resize event
    // occurs, or if set the parent container changes dimensions. Use this 
    // to handle responsive game layout options. Note that the callback will
    // only be called if the ScaleManager.scaleMode is set to RESIZE.
    game.scale.setResizeCallback(this.gameResized, this);
    // Set screen size automatically based on the scaleMode. This is only
    // needed if ScaleMode is not set to RESIZE.
    //game.scale.setScreenSize(true);
    // Re-calculate scale mode and update screen size. This only applies if
    // ScaleMode is not set to RESIZE.
    game.scale.refresh();


    // Here we load the assets required for our preloader (in this case a 
    // background and a loading bar)
    //this.load.image('logo', 'asset/phaser.png');

    //load background images
    game.load.image('bg', 'asset/images/bg/Background.png');
    game.load.image('bgCloud1', 'asset/images/bg/Cloud1.png');
    game.load.image('bgCloud2', 'asset/images/bg/Cloud2.png');

    //load desire images
    game.load.spritesheet('desireCloud', 'asset/images/desires/Cloud_Floating_Small.png', 90, 60);
    game.load.image('dogDesire', 'asset/images/desires/Dog_Desire.png');

    //load protagonist images
    game.load.spritesheet('monk', 'asset/images/monk/protagonist_floating_longer_small.png', 105, 90);
    //this.load.spritesheet('monk', 'asset/protagonist_floating_longer.png', 700, 600);
    game.load.image('astral', 'asset/images/monk/AstralProtagonist_Small.png');

    //load audio
    game.load.audio('gameMusic', 'asset/sound/Song.mp3'); //['asset/sound/Song.ogg', 'asset/sound/Song.wav', 'asset/sound/Song.mp3']);
}

var s;
var music;
var background;
var clouds;
var monk;
var projection;
var desires;

function create() {
    /**** BACKGROUND CREATION ****/
    background = game.add.sprite(
        0,
        0,
        'bg'
    );
    background.anchor.setTo(0, 0);
    background.width = game.world._width;
    background.height = game.world._height;

    clouds = [];
    clouds[0] = game.add.sprite(
        0,
        game.world.centerY / 2,
        'bgCloud1'
    );
    clouds[1] = game.add.sprite(
        game.world._width / 4 * 3,
        game.world.centerY / 4,
        'bgCloud2'
    );

    for (var i = 0; i < clouds.length; i++) {
        clouds[i].anchor.setTo(0.5, 0.5);
        clouds[i].width = clouds[i].width / 1440 * game.world._width;
        clouds[i].height = clouds[i].height / 2560 * game.world._height;
    }
    
    /**** DESIRE CREATION ****/
    desires = [];

    /**** ASTRAL PROJECTION ****/
    projection = new Projection();

    /**** MONK CREATION ****/
    // Add monk to the scene
    monk = new Monk();
    //begin the animation
    monk.sprite.animations.play('floating');

    /**** AUDIO CREATION ****/
    music = game.add.audio('gameMusic', 1, true);
    //console.log(music);
    //this.gameMusic.play();//'',0,1,true);
    //this.gameMusic.play();

    game.stage.backgroundColor = '#182d3b';
    game.input.touch.preventDefault = false;

    /*s = game.add.sprite(game.world.centerX, game.world.centerY, 'dogDesire');
    s.anchor.setTo(0.5, 0.5);

    game.input.onDown.add(changeVolume, this);*/
    music.play('', 0, 1, true);
    console.log("gameMusic: ", music);
}

function changeVolume(pointer) {

    if (pointer.y < 300) {
        music.volume += 0.1;
    } else {
        music.volume -= 0.1;
    }

}

function update() {
    //s.rotation += 0.01;
    
    /**** UPDATE BACKGROUND ****/
    clouds[0].x += .5;
    clouds[1].x += 1;

    for (var i = 0; i < clouds.length; i++) {
        //this.clouds[i].x += 5;

        if (clouds[i].x > game.world._width + clouds[i].width / 2) {
            clouds[i].x = -clouds[i].width / 2;
        }
    }
    
    /**** UPDATE DESIRES ****/
    for (var i = 0; i < desires.length; i++) {
    }
    
    /**** UPDATE PROJECTION ****/
    if (game.input.pointer1.isDown || game.input.mousePointer.isDown) {
        //console.log(game.input.point1.x, game.input.pointer1.y);
        //if this is the first time the player has touched the screen
        var radius = 20;
        var pointer;
        
        if (game.input.pointer1.isDown) {
            pointer = game.input.pointer1;
        } else {
            pointer = game.input.mousePointer;
        }
        
        if (!projection.isControlledByPlayer && projection.collision_check(new Actor(new Vector(pointer.positionDown.x, pointer.positionDown.y), new Vector(0, 0), 0, radius))) {
            projection.isControlledByPlayer = true;
            projection.flyingProjection = false;
            
            console.log("grabbed the projection!");
        } else if (projection.isControlledByPlayer) {
            projection.position.x = pointer.screenX;
            projection.position.y = pointer.screenY;
            
            projection.sprite.x = projection.position.x;
            projection.sprite.y = projection.position.y;
        }
    }
    
    if ((game.input.pointer1.isUp || game.input.mousePointer.isUp) && projection.isControlledByPlayer) {
        projection.isControlledByPlayer = false;
        projection.flyingProjection = true;
        
        console.log("released the projection");
    }
    
    projection.update(monk);
}

function render() {
    game.debug.soundInfo(music, 20, 32);

    game.debug.pointer(game.input.pointer1);
}

function resize(width, height) {
    //game.world.width = width;
    //game.world.height = height;
    background.width = width;
    background.height = height;
    console.log("resized!");
}