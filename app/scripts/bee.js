var game;
var bees;

function init(gm) {
  game = gm;
  bees = game.add.group();
  bees.scale.setTo(0.08, 0.08);
//  bees.enableBody = true;
}

function addBee(x, y) {
  var bee = bees.create(x, y, 'zombee');
  bee.startTime = game.time.now;
//  bee.body.collideWorldBounds = true;
} 

function updateBees() {
  now = game.time.now;
  bees.forEach(function (bee) {
    t = (now - bee.startTime) / 300.0;
    bee.reset(1000-30*t, 400 + 100*Math.sin(t));
  }, undefined);
}

module.exports = {
  init: init,
  addBee: addBee,
  updateBees: updateBees
}
