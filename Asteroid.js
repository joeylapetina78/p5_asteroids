class Asteroid {
    constructor(x, y, size = 'large') {
        this.pos = createVector(x, y);
        this.size = size;
        this.radius = this.getRadius();
        this.speed = random(1, 3);
        this.angle = random(TWO_PI);
        this.vel = p5.Vector.fromAngle(this.angle).mult(this.speed);
        this.vertices = this.createVertices();
        this.color = this.getColor();
        this.destroyTime = this.size === 'small' ? millis() + random(5000, 10000) : null; // Destroy small asteroids after 5 seconds
        this.bornTime = millis();
        this.invulnerabilityDuration = 1000; // 2 seconds of invulnerability
    }

    getRadius() {
        switch (this.size) {
            case 'small':
                return random(10, 20);
            case 'medium':
                return random(21, 40);
            case 'large':
            default:
                return random(41, 60);
        }
    }

    getColor() {
        if (this.size === 'small') {
            return color(0, 255, 0); // Green for small asteroids
        }
        return color(255); // White for other sizes
    }

    createVertices() {
        let vertices = [];
        let numVertices = floor(random(5, 10)); // Number of vertices for the asteroid
        for (let i = 0; i < numVertices; i++) {
            let angle = map(i, 0, numVertices, 0, TWO_PI);
            let r = this.radius + random(-this.radius * 0.3, this.radius * 0.3);
            let x = r * cos(angle);
            let y = r * sin(angle);
            vertices.push(createVector(x, y));
        }
        return vertices;
    }

    update() {
        this.pos.add(this.vel);
        this.edges();

        // Check if the asteroid should be destroyed
        if (this.destroyTime && millis() > this.destroyTime) {
            this.destroy();
        }
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        noFill();
        stroke(this.color);
        beginShape();
        for (let v of this.vertices) {
            vertex(v.x, v.y);
        }
        endShape(CLOSE);
        pop();
    }

    edges() {
        if (this.pos.x > width + this.radius) this.pos.x = -this.radius;
        else if (this.pos.x < -this.radius) this.pos.x = width + this.radius;
        if (this.pos.y > height + this.radius) this.pos.y = -this.radius;
        else if (this.pos.y < -this.radius) this.pos.y = height + this.radius;
    }

    break(ship = null) {
        let newAsteroids = [];
        if (this.size === 'large') {
            for (let i = 0; i < random(2, 4); i++) {
                let offset = p5.Vector.random2D().mult(this.radius / 2);
                let newAsteroid = new Asteroid(this.pos.x + offset.x, this.pos.y + offset.y, 'medium');
                newAsteroid.vel = p5.Vector.random2D().mult(random(1, 2));
                newAsteroids.push(newAsteroid);
            }
        } else if (this.size === 'medium') {
            for (let i = 0; i < random(2, 4); i++) {
                let offset = p5.Vector.random2D().mult(this.radius / 2);
                let newAsteroid = new Asteroid(this.pos.x + offset.x, this.pos.y + offset.y, 'small');
                newAsteroid.vel = p5.Vector.random2D().mult(random(.1, .5));
                newAsteroids.push(newAsteroid);
            }
        }  else if (this.size === 'small' && this.color.levels[1] === 255 && ship) { // Check if it's green
            ship.addFuel(50); // Add fuel to the ship
        }
        return newAsteroids;
    }

    destroy() {
        // This function will be used to flag the asteroid for removal
        this.toBeDestroyed = true;
    }

    isInvulnerable() {
        return millis() - this.bornTime < this.invulnerabilityDuration;
    }
}
