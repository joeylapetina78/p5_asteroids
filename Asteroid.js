class Asteroid {
    constructor(x, y, size = 'large') {
        this.pos = createVector(x, y);
        this.size = size;
        this.radius = this.getRadius();
        this.speed = random(1, 3);
        this.angle = random(TWO_PI);
        this.vel = p5.Vector.fromAngle(this.angle).mult(this.speed);
        this.vertices = this.createVertices();
        console.log(`Asteroid created at (${this.pos.x}, ${this.pos.y}) with size ${this.size} and radius ${this.radius}`);
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
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        noFill();
        stroke(255);
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

    break() {
        console.log(`Breaking asteroid of size ${this.size} at (${this.pos.x}, ${this.pos.y})`);
        let newAsteroids = [];
        if (this.size === 'large') {
            for (let i = 0; i < random(2, 4); i++) {
                newAsteroids.push(new Asteroid(this.pos.x, this.pos.y, 'medium'));
            }
        } else if (this.size === 'medium') {
            for (let i = 0; i < random(2, 4); i++) {
                newAsteroids.push(new Asteroid(this.pos.x, this.pos.y, 'small'));
            }
        }
        return newAsteroids;
    }

    isClicked(mouseX, mouseY) {
        let distance = dist(mouseX, mouseY, this.pos.x, this.pos.y);
        let clicked = distance < this.radius;
        if (clicked) {
            console.log(`Asteroid of size ${this.size} clicked at (${this.pos.x}, ${this.pos.y}) with distance ${distance}`);
        }
        return clicked;
    }
}