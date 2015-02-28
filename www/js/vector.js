function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.add(other) {
    this.x = this.x + other.x;
    this.y = this.y + other.y;
}

Vector.prototype.sub(other) {
    this.x = this.x + other.x;
    this.y = this.y + other.y;   
}

Vector.prototype.scale(scale) {
    this.x = scale * this.x;
    this.y = scale * this.y;
}

Vector.prototype.dot(other) {
    return this.x * other.x + this.y * other.y;
}

Vector.prototype.cross(other) {
    size_this = Math.sqrt(Math.pow(this.x,2), Math.pow(this.y,2))
    size_other = Math.sqrt(Math.pow(other.x,2), Math.pow(other.y,2))
    return Math.pow(size_this, 2) * Math.pow(size_other, 2) - Math.pow(this.dot(other),2)
}

Vector.prototype.equals(other) {
    return (this.x == other.x && this.y == other.y);
}