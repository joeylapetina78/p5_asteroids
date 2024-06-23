let ship;
let engine, thrusters, booster;

function setup() {
  let canvas = createCanvas(windowWidth - 200, windowHeight);
  canvas.parent('canvas-container');
    ship = new Ship(width / 2, height / 2, 3); // Ship with 3 slots

    engine = new Engine(0.1, 'BrandA', 'ModelX', 1);
    thrusters = new Thrusters(0.05, 'BrandB', 'ModelY', 1);
    booster = new Booster(0.5, 'BrandC', 'ModelZ', 1, 2000); // Booster with 2 seconds duration

    ship.addPropulsion(engine);
    ship.addPropulsion(thrusters);
    ship.addPropulsion(booster);
}

function draw() {
    background(0);
    ship.update();
    ship.edges();
    ship.display();
    ship.controls();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

