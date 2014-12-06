var game;
var playerGroup;
var playerSprite;
var playerCollisionGroup;

function init(gm) {
  game = gm;
  playerGroup = game.add.group();
  playerCollisionGroup = game.physics.p2.createCollisionGroup();
}

function addPlayer(x, y) {
  playerSprite = playerGroup.create(x, y, 'ant');
  playerSprite.anchor.setTo(0.0, 0.0);
  game.physics.p2.enable(playerSprite);
  playerSprite.body.setCollisionGroup(playerCollisionGroup);
  playerSprite.body.data.gravityScale = 5;
  playerSprite.body.collideWorldBounds = true;
  game.camera.follow(playerSprite, Phaser.Camera.FOLLOW_PLATFORMER);
}

function move(x, y) {
  playerSprite.body.moveRight(x);
  playerSprite.body.moveDown(y);
}

module.exports = {
  init: init,
  addPlayer: addPlayer,
  sprite: function() {return playerSprite;},
  collisionGroup: function() {return playerCollisionGroup;},
  move: move
}
