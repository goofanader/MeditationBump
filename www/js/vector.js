function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.add = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};

Vector.prototype.sub = function(other) {
    return new Vector(this.x - other.x,this.y - other.y);   
};

Vector.prototype.scale = function(scale) {
    return new Vector(scale * this.x, scale * this.y);
};

Vector.prototype.dot = function(other) {
    return this.x * other.x + this.y * other.y;
};

Vector.prototype.cross = function(other) {
    return Math.pow(this.magnitude(), 2) * Math.pow(other.magniude(), 2) - Math.pow(this.dot(other), 2);
};

Vector.prototype.equals = function(other) {
    return (this.x == other.x && this.y == other.y);
};

Vector.prototype.norm = function() {
    return new Vector(this.x / this.magnitude(), this.y / this.magnitude());
};

Vector.prototype.magnitude = function() {
    return Math.sqrt(Math.pow(this.x, 2), Math.pow(this.y, 2));
};

Vector.prototype.distance = function(other) {
    return Math.sqrt(Math.pow(this.x - other.x, 2), Math.pow(this.y - other.y, 2));
};