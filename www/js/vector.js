function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.add(other) {
    return new Vector(this.x + other.x, this.y + other.y);
}

Vector.prototype.sub(other) {
    return new Vector(this.x + other.x, this.y + other.y);   
}

Vector.prototype.scale(scale) {
    return new Vector(scale * this.x, scale * this.y);
}

Vector.prototype.dot(other) {
    
}

Vector.prototype.cross(other) {
    
}