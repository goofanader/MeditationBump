function Desire(pos, vel, mass, radius) {
    Actor.call(this, pos, vel, mass, radius);
 
    var localBitmap;
    this.bitmap = new createjs.Bitmap("img/desires/Desire__Cloud.png");
    localBitmap = this.bitmap;
    this.bitmap.x = this.position.x - (0.15) * 512/2;
    this.bitmap.y = this.position.y - (0.15) * 512/2;
    this.bitmap.scaleX = 0.15;
    this.bitmap.scaleY = 0.15;
    this.bitmap.image.onload = function() {
        stage.addChild(localBitmap);
        stage.update();
    };
}

Desire.prototype = Object.create(Actor.prototype);

Desire.prototype.constructor = Actor;

Desire.prototype.update = function(monk) {
    if (this.position.y > stage.canvas.height || this.position.y < 0 ||
        this.position.x > stage.canvas.width || this.position.x < 0) {
          stage.removeChild(this.bitmap);
          return false;
    }
	// Updating acceleration every tick based on gravity
	var toCenter = monk.position.sub(this.position);
	var a_magnitude = MEDITATION_BUMP_CONSTANTS.GRAVITY * monk.mass / (Math.pow(toCenter.magnitude(),2));
	var acceleration = toCenter.norm().scale(a_magnitude);
    // TODO: ELLIOT THIS NEEDS TO BE FIXED OR IM DOING IT WRONG. - Andrew
    this.velocity = this.velocity.add(acceleration);
    this.position = this.position.add(this.velocity);
    
    this.bitmap.x = this.position.x - (0.15) * 512/2;
    this.bitmap.y = this.position.y - (0.15) * 512/2;
    
    stage.update();
    return true;
};
