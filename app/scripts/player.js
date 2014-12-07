var game;
var playerGroup;
var playerSprite;
var playerCollisionGroup;
var body;

function init(gm) {
  game = gm;
  playerGroup = game.add.group();
  playerCollisionGroup = game.physics.p2.createCollisionGroup();
}

function addPlayer(x, y) {
  playerSprite = playerGroup.create(x, y, 'ant');
  playerSprite.scale.setTo(0.4, 0.4);
  playerSprite.anchor.setTo(0.5, 0.5);
  game.physics.p2.enable(playerSprite);
  body = playerSprite.body;
  body.clearShapes();
  body.addCircle(37);
  body.setCollisionGroup(playerCollisionGroup);
  body.data.gravityScale = 1;
  body.mass=1;
  body.damping=0.2;
  body.angularDamping=0.2;
  game.camera.follow(playerSprite, Phaser.Camera.FOLLOW_PLATFORMER);
}

function move(x) {
  body.applyForce([x*20, 0], playerSprite.x, playerSprite.y);
}

module.exports = {
  init: init,
  addPlayer: addPlayer,
  sprite: function() {return playerSprite;},
  collisionGroup: function() {return playerCollisionGroup;},
  move: move,
  position: function() { return {x: playerSprite.x, y: playerSprite.y} }
}
