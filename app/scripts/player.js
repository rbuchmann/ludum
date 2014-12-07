var game;
var playerGroup;
var playerSprite;
var body;

function init(gm) {
  game = gm;
  playerGroup = game.add.group();
}

function addPlayer(x, y) {
  playerSprite = playerGroup.create(x, y, 'ant');
  playerSprite.scale.setTo(0.4, 0.4);
  playerSprite.anchor.setTo(0.5, 0.5);
  game.physics.p2.enable(playerSprite);
  body = playerSprite.body;
  body.clearShapes();
  body.addCircle(37);
  body.damping=0.2;
  body.angularDamping=0.2;
  game.camera.follow(playerSprite, Phaser.Camera.FOLLOW_PLATFORMER);
  
  body.onBeginContact.add(floorCollide, this);
  body.onEndContact.add(floorLeave, this);
}


// indicates if the player can jump
var canJump = false;
// if the player leaves the floor he can jump for a few seconds after it
// if the player jumps he cannot jump again immediatly, this is done by "jumpTimer"
var jumpTimer = false;
var timeoutID = null;
function floorCollide(body, shapeA, shapeB, equation){
  canJump = true;
  // player touches floor every timer discards "deactivate jump"
  jumpTimer = false;
  clearTimeout(timeoutID);
}

function floorLeave(){
  // player doesn't touch the floor timer accepts "deactivate jump"
  jumpTimer = true;
  clearTimeout(timeoutID);
  timeoutID = setTimeout(function(){ deactivateJump() }, 500);
}

function deactivateJump(){
  if(jumpTimer){
    canJump = false;
  }
}

function inAir(){
  return !canJump;
}


function control(cursors){
  if (cursors.left.isDown) {
    move((inAir()) ? 0.1 : 1);
  }
  if (cursors.right.isDown) {
    move((inAir()) ? -0.1 : -1);
  }
  if (cursors.up.isDown && canJump){
    move(0,50);
    canJump = false;
  }
}

function move(x,y) {
  y = y || 0;
  body.applyForce([x*20, y*20], playerSprite.x, playerSprite.y);
}

module.exports = {
  init: init,
  addPlayer: addPlayer,
  sprite: function() {return playerSprite;},
  move: move,
  control: control,
  position: function() { return {x: playerSprite.x, y: playerSprite.y} }
}
