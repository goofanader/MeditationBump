function Desire(pos, vel, mass, radius, source) {
    Actor.call(this, pos, vel, mass, radius);
 
    var localBitmap;
    
    if (source) {
        this.bitmap = new createjs.Bitmap("img/desires/" + source);
    }
    else {
        var randomNumber = Math.ceil(Math.random() * 9);
        if (randomNumber == 1) {
            this.bitmap = new createjs.Bitmap("img/desires/Apple_Desire.png");
        }
        else if (randomNumber == 2) {
            this.bitmap = new createjs.Bitmap("img/desires/Car_Desire.png");
        }
        else if (randomNumber == 3) {
            this.bitmap = new createjs.Bitmap("img/desires/Guitar_Desire.png");
        }
        else if (randomNumber == 4) {
            this.bitmap = new createjs.Bitmap("img/desires/Wig_Desire.png");
        }
        else if (randomNumber == 5) {
            this.bitmap = new createjs.Bitmap("img/desires/Money_Desire.png");
        }
        else if (randomNumber == 6) {
            this.bitmap = new createjs.Bitmap("img/desires/Phone_Desire.png");
        }
        else if (randomNumber == 7) {
            this.bitmap = new createjs.Bitmap("img/desires/Dog_Desire.png");
        }
        else if (randomNumber == 8) {
            this.bitmap = new createjs.Bitmap("img/desires/Heart_Desire.png");
        }
        else if (randomNumber == 9) {
            this.bitmap = new createjs.Bitmap("img/desires/Peace_Desire.png");
        }
    }
    localBitmap = this.bitmap;
    this.bitmap.x = this.position.x - 32;
    this.bitmap.y = this.position.y - 32;
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
	var acceleration = toCenter.scale(a_magnitude/toCenter.magnitude());
    // TODO: ELLIOT THIS NEEDS TO BE FIXED OR IM DOING IT WRONG. - Andrew
    this.velocity = this.velocity.add(acceleration);
    this.position = this.position.add(this.velocity);
    
    this.bitmap.x = this.position.x - (0.15) * 512/2;
    this.bitmap.y = this.position.y - (0.15) * 512/2;
    
    stage.update();
    return true;
};
