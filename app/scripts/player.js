var game;
var playerGroup;
var playerSprite;

function init(gm) {
  game = gm;
  playerGroup = game.add.group();
  playerGroup.enableBody = true;
}

function addPlayer(x, y) {
  playerSprite = playerGroup.create(x, y, 'ant');
  playerSprite.body.bounce.y = 0.2;
  playerSprite.body.gravity.y = 200;
  playerSprite.body.collideWorldBounds = true;
}

function move(x, y) {
  playerSprite.x += x;
  playerSprite.y += y;
}

module.exports = {
  init: init,
  addPlayer: addPlayer,
  move: move
}
