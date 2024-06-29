class Ship {
    constructor(x, y, slots, brand, model, drag, fuel) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.angle = 0;
        this.slots = slots; // Total slots available on the ship
        this.usedSlots = 0;
        this.propulsions = [];
        this.shipWidth = 30; // Update this with your current width
        this.shipLength = 15; // Update this with your current length
        this.brand = brand;
        this.model = model;
        this.drag = drag;
        this.fuel = fuel; // Add fuel property
        this.weaponSystem = new WeaponSystem(10, 1); 
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

        this.weaponSystem.display();
    }

    update(asteroidSpawner) {
        this.vel.add(this.acc);
        this.vel.mult(this.drag);
        this.pos.add(this.vel);
        this.acc.mult(0);  // Reset acceleration

        this.weaponSystem.update(asteroidSpawner);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    applyCollisionForce(force) {
        this.vel.add(force);
        this.angle += random(-0.5, 0.5); // Random small rotation on collision
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
                    if (this.fuel > 0) {
                        let force = propulsion.applyThrust(this.angle);
                        this.applyForce(force);
                        this.fuel -= propulsion.fuelConsumption;
                    }
                }
                if (keyIsDown(83)) {  // S key
                    if (this.fuel > 0) {
                        let force = propulsion.applyThrust(this.angle);
                        force.mult(-.1);
                        this.applyForce(force);
                        this.fuel -= propulsion.fuelConsumption;
                    }
                }
            } else if (propulsion instanceof Thrusters) {
                if (keyIsDown(81)) {  // Q key
                    if (this.fuel > 0) {
                        let force = propulsion.applyThrust(this.angle - HALF_PI);
                        this.applyForce(force);
                        this.fuel -= propulsion.fuelConsumption;
                    }
                }
                if (keyIsDown(69)) {  // E key
                    if (this.fuel > 0) {
                        let force = propulsion.applyThrust(this.angle + HALF_PI);
                        this.applyForce(force);
                        this.fuel -= propulsion.fuelConsumption;
                    }
                }
            } else if (propulsion instanceof Booster) {
                if (keyIsDown(70) && !propulsion.isActive()) {  // "F" key for booster
                    if (this.fuel > 0) {
                        propulsion.activate();
                    }
                }
                if (propulsion.isActive()) {
                    if (this.fuel > 0) {
                        let force = propulsion.applyThrust(this.angle);
                        this.applyForce(force);
                        this.fuel -= propulsion.fuelConsumption;
                    } else {
                        propulsion.deactivate();
                    }
                }
            }
        });

        if (keyIsDown(65)) {  // A key
            this.angle -= 0.05;
        }
        if (keyIsDown(68)) {  // D key
            this.angle += 0.05;
        }

        if (keyIsDown(32)) { // Spacebar key
            this.weaponSystem.fire(this.pos, this.angle);
        }
    }
}
