let ship;
let asteroids;

function setup() {
    let canvas = createCanvas(windowWidth - 200, windowHeight);
    canvas.parent('canvas-container');

     // Takamota - Mid Level Ship
     let takamota_ship = new Ship(width / 2, height / 2, 3, "Takamota", "FJ7", 0.99, 500);
     let takamota_x_engine = new Engine(0.15, 'Takamota', 'X', 1);
     let takamota_jimsoms_thrusters = new Thrusters(0.05, 'Takamota', 'Jimsoms', 1);
     let takamota_2000_booster = new Booster(0.5, 'Takamota', '2000', 1, 2000);
 
     // Cygnus Dynamics - Budget Ship (fewer slots, no booster)
     let cygnus_budget_ship = new Ship(width / 2, height / 2, 2, "Cygnus Dynamics", "Alpha", 0.97, 500);
     let cygnus_alpha_engine = new Engine(0.12, 'Cygnus Dynamics', 'Alpha', 1);
     let cygnus_basic_thrusters = new Thrusters(0.04, 'Cygnus Dynamics', 'Basic', 1);
 
     // Zenith Enterprises - High Performance Ship (more slots, all modules)
     let zenith_high_perf_ship = new Ship(width / 2, height / 2, 4, "Zenith Enterprises", "Delta", 0.98, 500);
     let zenith_delta_engine = new Engine(0.3, 'Zenith Enterprises', 'Delta', 2);
     let zenith_quick_thrusters = new Thrusters(0.06, 'Zenith Enterprises', 'Quick', 1);
     let zenith_rapid_booster = new Booster(0.6, 'Zenith Enterprises', 'Rapid', 1, 2500);
 
     // NovaTech - Balanced Ship (standard slots, all modules)
     let novatech_balanced_ship = new Ship(width / 2, height / 2, 3, "NovaTech", "Gamma", 0.99, 500);
     let novatech_gamma_engine = new Engine(0.15, 'NovaTech', 'Gamma', 1);
     let novatech_precision_thrusters = new Thrusters(0.05, 'NovaTech', 'Precision', 1);
     let novatech_boost_booster = new Booster(0.5, 'NovaTech', 'Boost', 1, 2000);
 
     // Orion Systems - Modular Ship (different engine, no booster)
     let orion_modular_ship = new Ship(width / 2, height / 2, 2, "Orion Systems", "Sigma", 0.96, 500);
     let orion_sigma_engine = new Engine(0.14, 'Orion Systems', 'Sigma', 1);
     let orion_agile_thrusters = new Thrusters(0.05, 'Orion Systems', 'Agile', 1);

    ship = zenith_high_perf_ship;
    ship.addPropulsion(zenith_delta_engine);
    ship.addPropulsion(zenith_quick_thrusters);
    ship.addPropulsion(novatech_boost_booster);

    // Create the asteroid spawner
    asteroids = new AsteroidSpawner(10);  // Example number of initial asteroids
}

function draw() {
    background(0);
    ship.update(asteroids);
    ship.edges();
    ship.display();
    ship.controls();
    
    asteroids.update();
    asteroids.display();
    asteroids.checkCollisions(ship);
    
    updateGameInfo();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function updateGameInfo() {
    document.getElementById('sb').innerText = `Brand: ${ship.brand}`;
    document.getElementById('sm').innerText = `Model: ${ship.model}`;
    
    document.getElementById('propulsion-info').innerHTML = '';

    ship.propulsions.forEach((propulsion, index) => {
        let type = propulsion.constructor.name;
        let brand = propulsion.brand;
        let model = propulsion.model;
        let info = `
            <h3>${type}</h3>
            <p>Brand: ${brand}</p>
            <p>Model: ${model}</p>
        `;
        document.getElementById('propulsion-info').insertAdjacentHTML('beforeend', info);
    });

    document.getElementById('fuel').innerText = `Fuel: ${ship.fuel}`; // Update the fuel display
}
