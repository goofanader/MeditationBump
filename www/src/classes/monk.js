function Monk() {
    Actor.call(this, new Vector(game.world.centerX, game.world.centerY), new Vector(0,0), 8, 50, 'monk');
    
    // Set the anchor to the center of the sprite
    this.sprite.anchor.setTo(0.5, 0.5);
    
    // add animations for the monk
    var animationFrames = [];
    for (i = 0; i < 24; i++) {
        animationFrames[i] = i;
    }
    this.sprite.animations.add('floating', animationFrames, 24, true);
    var offset = 10;
    this.radius = this.sprite.width / 2 - offset;
}

Monk.prototype = Object.create(Actor.prototype);

Monk.prototype.constructor = Actor;