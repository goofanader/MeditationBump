function Projection(pos, vel, mass, radius) {
	Actor.call(this, pos, vel, mass, radius);
}

Projection.prototype = Object.create(Actor.prototype);

Projection.prototype.constructor = Actor

Projection.prototype.update = function() {
	// Updating acceleration every tick based on spring & damper physics
	positionFromCenter = position.nonImmuteSub(monk.position);
	acceleration = positionFromCenter.scale(-SPRING_CONSTANT).nonImmuteSub(velocity.scale(DAMPING)).scale(1/mass);
	super.update();
}