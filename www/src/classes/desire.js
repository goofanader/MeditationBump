function Desire(monk, spriteImage) {
    //need to get a random value for position and then get the correct velocity.
    //var newPos = new Vector(0, 0);
    spriteImage = spriteImage ? spriteImage : "desireCloud";
    var start = new Vector(-90 / 2, -90 / 2);
    Actor.call(this, start, monk.position.sub(start).norm()/*.scale(0.2 + Math.random() * 1.5)*/, /*desires[desireIndex].mass*/1, 90 / 2, spriteImage);
    this.radius = this.sprite.width / 2;
    this.sprite.anchor.setTo(0.5, 0.5);
    
    // add animations for the monk
    var animationFrames = [];
    for (i = 0; i < 24; i++) {
        animationFrames[i] = i;
    }
    this.sprite.animations.add('floating', animationFrames, 24, true);
    this.sprite.animations.play('floating');
    
    var offset = 10;
    var posX = Math.random() * game.world._width;
    
    var posY;
    
    if (Math.random() < .5) {
        posY = 0 - this.radius;
    } else {
        posY = game.world._height + this.radius;
    }
    
    
    //determining values for each desire
    var desires = [
        {mass: 1, name: "appleDesire"},
        {mass: 1, name: "carDesire"},
        {mass: 1, name: "guitarDesire"},
        {mass: 1, name: "wigDesire"},
        {mass: 1, name: "moneyDesire"},
        {mass: 1, name: "phoneDesire"},
        {mass: 1, name: "dogDesire"},
        {mass: 1, name: "heartDesire"}
    ];
    
    var desireIndex = Math.ceil(Math.random() * (desires.length - 1));
    
    this.position = new Vector(posX, posY);
    this.velocity = monk.position.sub(this.position).norm()/*.scale(0.2 + Math.random() * 1.5)*/;
    this.hasCollided = false;
 
    /*var localBitmap;
    
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
    };*/
}

Desire.prototype = Object.create(Actor.prototype);

Desire.prototype.constructor = Actor;

Desire.prototype.update = function(monk) {
    if ((this.position.y > game.world._height + (this.sprite.heigth / 2) || this.position.y < -this.sprite.height / 2 || this.position.x > game.world._width + (this.sprite.width / 2) || this.position.x < -this.sprite.width / 2)) {
          //stage.removeChild(this.bitmap);
        //this.marked = true;
          return false;
    }
	// Updating acceleration every tick based on gravity
	var toCenter = monk.position.sub(this.position);
	var a_magnitude = MEDITATION_BUMP_CONSTANTS.GRAVITY * monk.mass / (Math.pow(toCenter.magnitude(),2));
	var acceleration = toCenter.scale(a_magnitude/toCenter.magnitude());
    
    console.log("acceleration: ", acceleration, "\na_magnitude: ", a_magnitude);
    // TODO: ELLIOT THIS NEEDS TO BE FIXED OR IM DOING IT WRONG. - Andrew
    this.velocity = this.velocity.add(acceleration);
    this.position = this.position.add(this.velocity);
    
    this.sprite.x = this.position.x;// - (0.15) * 512/2;
    this.sprite.y = this.position.y;// - (0.15) * 512/2;
    
    //stage.update();
    return true;
}

Desire.prototype.removeSprites = function() {
    this.sprite.destroy();
    //also need to destroy desireTypeSprite
}