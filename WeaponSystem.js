class WeaponSystem {
    constructor(fireRate, slots) {
        this.fireRate = fireRate; // Number of frames between shots
        this.slots = slots;
        this.lastFiredTime = 0;
        this.ammoList = [];
    }

    fire(shipPos, shipAngle) {
        if (frameCount - this.lastFiredTime >= this.fireRate) {
            this.ammoList.push(new Ammo(shipPos.x, shipPos.y, shipAngle));
            this.lastFiredTime = frameCount;
        }
    }

    update(asteroidSpawner) {
        for (let i = this.ammoList.length - 1; i >= 0; i--) {
            this.ammoList[i].update();
            if (this.ammoList[i].isOffScreen()) {
                this.ammoList.splice(i, 1);
            } else {
                // Check for collisions with asteroids
                if (asteroidSpawner.checkAmmoCollisions(this.ammoList[i])) {
                    this.ammoList.splice(i, 1);
                }
            }
        }
    }

    display() {
        for (let ammo of this.ammoList) {
            ammo.display();
        }
    }
}