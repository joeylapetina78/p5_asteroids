class Propulsion {
    constructor(force, brand, model, slotSize, fuelConsumption) {
        this.force = force;
        this.brand = brand;
        this.model = model;
        this.slotSize = slotSize;
        this.fuelConsumption = fuelConsumption || 1; // Default fuel consumption
    }

    applyThrust(angle) {
        let force = p5.Vector.fromAngle(angle);
        force.mult(this.force);
        return force;
    }
}
