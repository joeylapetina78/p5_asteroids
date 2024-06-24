let ship;
let engine, thrusters, booster;

function setup() {
  let canvas = createCanvas(windowWidth - 200, windowHeight);
  canvas.parent('canvas-container');
    ship = new Ship(width / 2, height / 2, 3, "Takamota", "FJ7", .99); // Ship with 3 slots

    engine = new Engine(0.15, 'Takamota', 'X', 1);
    thrusters = new Thrusters(0.05, 'Takamota', 'Jimsoms', 1);
    booster = new Booster(0.5, 'Takamota', '2000', 1, 2000); // Booster with 2 seconds duration

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
    updateGameInfo();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function updateGameInfo() {
    document.getElementById('sb').innerText = `Brand: ${ship.brand}`;
    document.getElementById('sm').innerText = `Model: ${ship.model}`;
    document.getElementById('eb').innerText = `Brand: ${engine.brand}`;
    document.getElementById('em').innerText = `Model: ${engine.model}`;
    document.getElementById('tb').innerText = `Brand: ${thrusters.brand}`;
    document.getElementById('tm').innerText = `Model: ${thrusters.model}`;
    document.getElementById('bb').innerText = `Brand: ${booster.brand}`;
    document.getElementById('bm').innerText = `Model: ${booster.model}`;
}