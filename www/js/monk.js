function Monk(pos, vel, mass, radius) {
    Actor.call(this, pos, vel, mass, radius);
}

Monk.prototype = Object.create(Actor.prototype);

Monk.prototype.constructor = Actor


monk = new Monk(new Vector(0, 0), new Vector(0, 0), 1, 1);
monk.step(1, 2);
console.log(monk);