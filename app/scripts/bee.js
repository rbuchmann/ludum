var game;
var bees;

function init(gm) {
  game = gm;
  bees = game.add.group();
  bees.scale.setTo(0.1, 0.1);
  bees.enableBody = true;
}

function addBee(x, y) {
  var bee = bees.create(x, y, 'zombee');
  bee.body.bounce.y = 0.2;
  bee.body.gravity.y = 300;
//  bee.body.collideWorldBounds = true;
} 

module.exports = {
  init: init,
  addBee: addBee
}
