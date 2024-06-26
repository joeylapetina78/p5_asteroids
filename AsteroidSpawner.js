class AsteroidSpawner {
    constructor(numAsteroids) {
        this.asteroids = [];
        for (let i = 0; i < numAsteroids; i++) {
            this.spawnAsteroid();
        }
    }

    spawnAsteroid(size = 'large') {
        let x = random(width);
        let y = random(height);
        this.asteroids.push(new Asteroid(x, y, size));
    }

    update() {
        for (let i = this.asteroids.length - 1; i >= 0; i--) {
            this.asteroids[i].update();
            if (this.asteroids[i].toBeDestroyed) {
                this.asteroids.splice(i, 1); // Remove the asteroid if flagged for destruction
            }
        }
    }

    display() {
        for (let asteroid of this.asteroids) {
            asteroid.display();
        }
    }

    checkCollisions(ship) {
        for (let i = this.asteroids.length - 1; i >= 0; i--) {
            if (this.asteroids[i].isInvulnerable()) {
                continue; // Skip invulnerable asteroids
            }
            let distance = dist(ship.pos.x, ship.pos.y, this.asteroids[i].pos.x, this.asteroids[i].pos.y);
            if (distance < this.asteroids[i].radius + ship.shipWidth / 2) {
                // Apply collision response to the ship
                let collisionForce = p5.Vector.sub(ship.pos, this.asteroids[i].pos);
                collisionForce.normalize();
                collisionForce.mult(this.asteroids[i].speed * 0.9); // Adjust the force multiplier as needed
                ship.applyCollisionForce(collisionForce);
                
                let newAsteroids = this.asteroids[i].break(ship);
                this.asteroids.splice(i, 1);  // Remove the collided asteroid
                this.asteroids = this.asteroids.concat(newAsteroids);  // Add the new smaller asteroids
            }
        }
    }


    checkAmmoCollisions(ammo) {
        for (let i = this.asteroids.length - 1; i >= 0; i--) {
            if (this.asteroids[i].isInvulnerable()) {
                continue; // Skip invulnerable asteroids
            }
            if (ammo.hits(this.asteroids[i])) {
                let newAsteroids = this.asteroids[i].break();
                this.asteroids.splice(i, 1);  // Remove the hit asteroid
                this.asteroids = this.asteroids.concat(newAsteroids);  // Add the new smaller asteroids
                return true;  // Collision occurred
            }
        }
        return false;  // No collision
    }
}