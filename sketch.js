let ship;
let shipWidth = 30;
let shipLength = 20;
let thrust = 0.1;
let drag = 0.99;

function setup() {
    createCanvas(windowWidth, windowHeight);
    ship = new Ship();
}

function draw() {
    background(0);
    ship.update();
    ship.edges();
    ship.display();
    ship.controls();
}

class Ship {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.angle = 0; // Start by facing to the right
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        noFill();
        stroke(255);
        beginShape();
        vertex(-shipWidth / 2, shipLength / 2);
        vertex(shipLength / 2, 0);
        vertex(-shipWidth / 2, -shipLength / 2);
        endShape(CLOSE);
        pop();
    }

    update() {
        this.vel.add(this.acc);
        this.vel.mult(drag);
        this.pos.add(this.vel);
        this.acc.mult(0);  // Reset acceleration
    }

    applyForce(force) {
        this.acc.add(force);
    }

    edges() {
        if (this.pos.x > width) this.pos.x = 0;
        else if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        else if (this.pos.y < 0) this.pos.y = height;
    }

    controls() {
        if (keyIsDown(87)) {  // W key
            let force = p5.Vector.fromAngle(this.angle);
            force.mult(thrust);
            this.applyForce(force);
        }
        if (keyIsDown(83)) {  // S key
            let force = p5.Vector.fromAngle(this.angle);
            force.mult(-thrust);
            this.applyForce(force);
        }
        if (keyIsDown(65)) {  // A key
            this.angle -= 0.05;
        }
        if (keyIsDown(68)) {  // D key
            this.angle += 0.05;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
