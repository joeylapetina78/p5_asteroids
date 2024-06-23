class Propulsion {
    constructor(force, brand, model, slotSize) {
        this.force = force;
        this.brand = brand;
        this.model = model;
        this.slotSize = slotSize;
    }

    applyThrust(angle) {
        let force = p5.Vector.fromAngle(angle);
        force.mult(this.force);
        return force;
    }
}
