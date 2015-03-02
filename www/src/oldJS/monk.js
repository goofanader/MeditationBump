function Monk(pos, vel, mass, radius) {
    Actor.call(this, pos, vel, mass, radius);
    
    var localBitmap;
    /*var data = {
        images: ["img/protagonist/protagonist_floating_longer_small.png"],
        frames: {width:105, height:90},
        animations: {
            floating:[0,23,"floating"]
        },
        framerate: 12
    };
    
    var spriteSheet = new createjs.SpriteSheet(data);
    var animation = new createjs.Sprite(spriteSheet, "floating");*/
    
    this.bitmap = new createjs.Bitmap("img/protagonist/Protagonist_Static.png");
    
    localBitmap = this.bitmap;
    this.bitmap.x = stage.canvas.width/2 - (0.15) * 512/2;
    this.bitmap.y = stage.canvas.height/2 - (0.15) * 512/2;
    this.bitmap.scaleX = 0.15;
    this.bitmap.scaleY = 0.15;
    //this.bitmap.gotoAndPlay("floating");
    
    //stage.addChild(localBitmap);
    //stage.update();
    this.bitmap.image.onload = function() {
        stage.addChild(localBitmap);
        stage.update();
    };
}

Monk.prototype = Object.create(Actor.prototype);

Monk.prototype.constructor = Actor;