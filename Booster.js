class Booster extends Propulsion {
    constructor(force, brand, model, slotSize, duration, fuelConsumption) {
        super(force, brand, model, slotSize, fuelConsumption);
        this.duration = duration; // Duration for which the booster applies force in milliseconds
        this.active = false;
        this.startTime = 0;
    }

    activate() {
        this.active = true;
        this.startTime = millis();
    }

    deactivate() {
        this.active = false;
    }

    isActive() {
        if (this.active && (millis() - this.startTime < this.duration)) {
            return true;
        } else {
            this.deactivate();
            return false;
        }
    }

    getThrust() {
        let elapsedTime = millis() - this.startTime;
        let decayFactor = elapsedTime / this.duration;
        let currentThrust = this.force * Math.exp(-5 * decayFactor); // Exponential decay
        return currentThrust;
    }

    applyThrust(angle) {
        let thrustForce = this.getThrust();
        let force = p5.Vector.fromAngle(angle);
        force.mult(thrustForce);
        return force;
    }
}
