

function Actor(pos, vel, mass, radius) {
    this.position = pos;
    this.velocity = vel;
    this.mass = mass;
    this.radius = radius;
}

Actor.prototype.move = function(newPos) {
    this.position = newPos;
};

Actor.prototype.step = function(x, y) {
    this.position.add(new Vector(x, y));
};

Actor.prototype.update = function() {
    
};

Actor.prototype.collision_check = function(other) {
    return (this.velocity.distance(other.velocity) < (this.radius + other.radius));
};

Actor.prototype.collide = function(other) {
    
    // Calculate relative velocity
    var relative_velocity = this.velocity - other.velocity;
    
    // Find Normal Vector
    var normal = new Vector(this.x - other.x, this.y - other.y).norm();
    
    // Calculate relative velocity in terms of the normal direction
    var velAlongNormal = relative_velocity.dot(normal);
 
    // Do not resolve if velocities are separating
    if(velAlongNormal > 0)
        return;
 
    // Calculate impulse scalar
    var j = -1 * (1 + Constants.RESTITUTION) * velAlongNormal;
    j = j / (1 / this.mass + 1 / other.mass);
 
    // Apply impulse
    var impulse = normal.scale(j);
    var mass_sum = this.mass + other.mass;
    var ratio = this.mass / mass_sum;
    this.velocity = this.velocity.add(impulse.scale(ratio));
 
    ratio = other.mass / mass_sum;
    other.velocity = other.velocity.add(impulse.scale(ratio));
};

