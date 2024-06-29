class Ammo {
    constructor(x, y, angle) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.fromAngle(angle).mult(10);
        this.lifetime = 60; // Ammo exists for 60 frames
    }

    update() {
        this.pos.add(this.vel);
        this.lifetime--;
    }

    display() {
        push();
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
        pop();
    }

    isOffScreen() {
        return this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height || this.lifetime <= 0;
    }

    hits(asteroid) {
        let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        return d < asteroid.radius;
    }
}