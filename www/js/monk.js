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
    
    // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
    this.bitmap.on("mousedown", function (evt) {
    this.parent.addChild(this);
    this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
});

    this.bitmap.on("pressmove", function (evt) {
       this.x = evt.stageX + this.offset.x;
       this.y = evt.stageY + this.offset.y;
       // indicate that the stage should be updated on the next tick:
       update = true;
    });
}

Monk.prototype = Object.create(Actor.prototype);

Monk.prototype.constructor = Actor;