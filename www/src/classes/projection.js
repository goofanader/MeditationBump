function Projection() {
    var that = this;
    this.flyingProjection = true; //I CHANGED THIS TO TRUE 'CAUSE IT DOESN'T MAKE SENSE -- Phyllis

    Actor.call(this, new Vector(game.world.centerX, game.world.centerY), new Vector(0, 0), 8, 50, 'astral');

    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.alpha = 0;
    this.isControlledByPlayer = false;
    this.originalSize = new Vector(this.sprite.width, this.sprite.height);
    
    this.radius = this.sprite.width / 2;
    // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
    /*this.bitmap.on("mousedown", function (evt) {
    this.parent.addChild(this);
    this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
    that.flyingProjection = true;
});

    this.bitmap.on("pressup", function (evt) {
    that.position.x = evt.stageX;
    that.position.y = evt.stageY;
        
    that.position.velocity = new Vector(0, 0);
    that.flyingProjection = false;
});

    this.bitmap.on("pressmove", function (evt) {
       this.x = evt.stageX + this.offset.x;
       this.y = evt.stageY + this.offset.y;
        
       that.position = new Vector(this.x, this.y);
       // indicate that the stage should be updated on the next tick:
       update = true;
       that.flyingProjection = true;
    });*/
}

Projection.prototype = Object.create(Actor.prototype);

Projection.prototype.constructor = Actor;

Projection.prototype.update = function (monk) {
    var offset = 50;

    if (this.position.y > game.world._height + offset || this.position.y < 0 - offset ||
        this.position.x > game.world._width + offset || this.position.x < 0 - offset) {
        this.velocity = new Vector(0, 0);
        this.position = new Vector(monk.position.x, monk.position.y);
        return;
    }

    // Updating acceleration every tick based on spring & damper physics
    var positionFromCenter = this.position.sub(monk.position);
    var acceleration = positionFromCenter.scale(-MEDITATION_BUMP_CONSTANTS.SPRING_CONSTANT).sub(this.velocity.scale(MEDITATION_BUMP_CONSTANTS.DAMPING)).scale(1 / this.mass);
    
    // do some nice things to the projection. Making it kinda juicy? I guess?
    this.sprite.alpha = game.math.clamp(Math.abs(this.position.distance(monk.position) / 100) - .1, 0, 1);
    this.sprite.width = this.originalSize.x + this.sprite.alpha * 10;
    this.sprite.height = this.originalSize.y + this.sprite.alpha * 10;

    //console.log(positionFromCenter.distance(monk.position));
    if (this.velocity.equals(new Vector(0, 0)) && !this.isControlledByPlayer) {
        this.flyingProjection = true;
        //this.sprite.alpha = 255;
    }

    if (this.flyingProjection) {
        this.velocity = this.velocity.add(acceleration);
        this.position = this.position.add(this.velocity);
        /*this.bitmap.x = this.position.x - (0.15) * 512/2;
        this.bitmap.y = this.position.y - (0.15) * 512/2;           */

        this.sprite.x = this.position.x; // - (0.15) * 512 / 2; //.15 = scaling, 512 = width
        this.sprite.y = this.position.y; // - (0.15) * 512 / 2;
    }

}
/*Projection.prototype.update = function(monk) {
    if (this.position.y > stage.canvas.height || this.position.y < 0 ||
        this.position.x > stage.canvas.width || this.position.x < 0) {
            this.velocity = new Vector(0, 0);
            this.position = new Vector(stage.canvas.width/2, stage.canvas.height/2);
            return;
    }

    // Updating acceleration every tick based on spring & damper physics
    var positionFromCenter = this.position.sub(monk.position);
    var acceleration = positionFromCenter.scale(-MEDITATION_BUMP_CONSTANTS.SPRING_CONSTANT).sub(this.velocity.scale(MEDITATION_BUMP_CONSTANTS.DAMPING)).scale(1/this.mass);

    if (this.velocity.equals(new Vector(0, 0))) {
       this.flyingProjection = false;   
    }

    if (!this.flyingProjection) {
        this.velocity = this.velocity.add(acceleration);
        this.position = this.position.add(this.velocity);
        this.bitmap.x = this.position.x - (0.15) * 512/2;
        this.bitmap.y = this.position.y - (0.15) * 512/2;           
    }
    //super.update();
}*/