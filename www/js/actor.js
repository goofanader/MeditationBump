function Actor(pos, vel) {
    this.position = pos;
    this.velocity = vel;
}

Actor.prototype.move = function(newPos) {
    this.position = newPos;
};

Actor.prototype.step = function(x, y) {
    this.position.add(x, y);
};

Actor.prototype.update = function() {
    
};