function Monk(pos, vel, mass, radius) {
    Actor.call(this, pos, vel, mass, radius);
    
    var localBitmap;
    this.bitmap = new createjs.Bitmap("img/protagonist/Protagonist_Static.png");
    localBitmap = this.bitmap;
    this.bitmap.x = stage.canvas.width/2 - (0.15) * 512/2;
    this.bitmap.y = stage.canvas.height/2 - (0.15) * 512/2;
    this.bitmap.scaleX = 0.15;
    this.bitmap.scaleY = 0.15;
    this.bitmap.image.onload = function() {
        stage.addChild(localBitmap);
        stage.update();
    };
}

Monk.prototype = Object.create(Actor.prototype);

Monk.prototype.constructor = Actor;