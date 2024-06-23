class Booster extends Propulsion {
    constructor(force, brand, model, slotSize, duration) {
        super(force, brand, model, slotSize);
        this.duration = duration; // Duration for which the booster applies force
        this.active = false;
        this.startTime = 0;
    }

    activate() {
        this.active = true;
        this.startTime = millis();
    }

    isActive() {
        if (this.active && (millis() - this.startTime < this.duration)) {
            return true;
        } else {
            this.active = false;
            return false;
        }
    }
}