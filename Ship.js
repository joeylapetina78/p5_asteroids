class Ship {
    constructor(x, y, slots) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.angle = 0;
        this.slots = slots; // Total slots available on the ship
        this.usedSlots = 0;
        this.propulsions = [];
        this.shipWidth = 20;
        this.shipLength = 30;
        this.drag = 0.99;
    }

    addPropulsion(propulsion) {
        if (this.usedSlots + propulsion.slotSize <= this.slots) {
            this.propulsions.push(propulsion);
            this.usedSlots += propulsion.slotSize;
        } else {
            console.log('Not enough slots to add this propulsion system.');
        }
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        noFill();
        stroke(255);
        beginShape();
        vertex(-this.shipWidth / 2, this.shipLength / 2);
        vertex(this.shipLength / 2, 0);
        vertex(-this.shipWidth / 2, -this.shipLength / 2);
        endShape(CLOSE);
        pop();
    }

    update() {
        this.vel.add(this.acc);
        this.vel.mult(this.drag);
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
        this.propulsions.forEach(propulsion => {
            if (propulsion instanceof Engine) {
                if (keyIsDown(87)) {  // W key
                    let force = propulsion.applyThrust(this.angle);
                    this.applyForce(force);
                }
                if (keyIsDown(83)) {  // S key
                    let force = propulsion.applyThrust(this.angle);
                    force.mult(-1);
                    this.applyForce(force);
                }
                if (keyIsDown(65)) {  // A key
                    this.angle -= 0.05;
                }
                if (keyIsDown(68)) {  // D key
                    this.angle += 0.05;
                }
            } else if (propulsion instanceof Thrusters) {
                if (keyIsDown(81)) {  // Q key
                    let force = propulsion.applyThrust(this.angle - HALF_PI);
                    this.applyForce(force);
                }
                if (keyIsDown(69)) {  // E key
                    let force = propulsion.applyThrust(this.angle + HALF_PI);
                    this.applyForce(force);
                }
            } else if (propulsion instanceof Booster) {
                if (keyIsDown(32) && !propulsion.isActive()) {  // Space key for booster
                    propulsion.activate();
                }
                if (propulsion.isActive()) {
                    let force = propulsion.applyThrust(this.angle);
                    this.applyForce(force);
                }
            }
        });
    }
}
