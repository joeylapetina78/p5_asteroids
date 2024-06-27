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
        for (let asteroid of this.asteroids) {
            asteroid.update();
        }
    }

    display() {
        for (let asteroid of this.asteroids) {
            asteroid.display();
        }
    }

    checkCollisions() {
        for (let i = this.asteroids.length - 1; i >= 0; i--) {
            if (this.asteroids[i].isClicked(mouseX, mouseY)) {
                let newAsteroids = this.asteroids[i].break();
                this.asteroids.splice(i, 1);  // Remove the clicked asteroid
                this.asteroids = this.asteroids.concat(newAsteroids);  // Add the new smaller asteroids
                console.log(`Asteroid broken into ${newAsteroids.length} pieces`);
            }
        }
    }
}
