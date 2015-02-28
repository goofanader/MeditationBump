/*
    Main class for all objects in game world.
    All objects in world must inherit the Actor class.
*/
function Actor(pos, vel, mass, radius) {
    this.position = pos; // Position of Actor
    this.velocity = vel; // Velocity of Actor
    this.mass = mass;    // Mass of Actor
    this.radius = radius; // Collision radious of Actor
}

Actor.prototype.move = function(newPos) {
    this.position = newPos;
};

Actor.prototype.step = function(x, y) {
    this.position.add(new Vector(x, y));
};

Actor.prototype.update = function() {
    console.log('NOT IMPLEMENTED');
};

Actor.prototype.collision_check = function(other) {
    return (this.velocity.distance(other.velocity) < (this.radius + other.radius));
};

Actor.prototype.collide = function(other) {
    
    // Calculate relative velocity
    var relativeVelocity = this.velocity.sub(other.velocity);
    
    // Find Normal Vector
    var normal = this.position.sub(other.position).norm();
    
    // Calculate relative velocity in terms of the normal direction
    var velAlongNormal = relativeVelocity.dot(normal);
 
    // Do not resolve if velocities are separating
    if(velAlongNormal > 0) {
        return;
    } else {
		// Calculate impulse scalar
		var j = -1 * (1 + MEDITATION_BUMP_CONSTANTS.RESTITUTION) * velAlongNormal;
		j = j / (1 / this.mass + 1 / other.mass);
	 
		// Apply impulse
		var impulse = normal.scale(j);
		var mass_sum = this.mass + other.mass;
		var ratio = this.mass / mass_sum;
		this.velocity = this.velocity.add(impulse.scale(ratio));
	 
		ratio = other.mass / mass_sum;
		other.velocity = other.velocity.add(impulse.scale(ratio));
	}
};

