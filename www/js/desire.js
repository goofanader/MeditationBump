function Desire(pos, vel, mass, radius) {
	Actor.call(this, pos, vel, mass, radius);
    
    var localBitmap;
    this.bitmap = new createjs.Bitmap("img/desires/Desire__Cloud.png");
    localBitmap = this.bitmap;
    this.bitmap.x = pos.x - (0.15) * 512/2;
    this.bitmap.y = pos.y - (0.15) * 512/2;
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

Desire.prototype = Object.create(Actor.prototype);

//Desire.prototype.constructor = Actor

Desire.prototype.update = function(monk) {
	// Updating acceleration every tick based on gravity
    //console.log(monk.position);
	var toCenter = monk.position.nonImmuteSub(this.position);
	var a_magnitude = MEDITATION_BUMP_CONSTANTS.GRAVITY * monk.mass / (Math.pow(toCenter.magnitude,2));
	var acceleration = toCenter.norm().scale(a_magnitude);
    this.bitmap.y = this.bitmap.y + 1;
    stage.update();
	Actor.prototype.update.call(this);
}