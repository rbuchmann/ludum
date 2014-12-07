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
  console.log("activatedJump");
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
    console.log("deactivatedJump");
  }
}


function control(cursors){
  if (cursors.left.isDown) {
    move(1);
  }
  if (cursors.right.isDown) {
    move(-1);
  }
  if (cursors.up.isDown){
    if(canJump){
      move(0,50);
      canJump = false;
    } else {
      console.log("no JUMP!!");
    }
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
  collisionGroup: function() {return playerCollisionGroup;},
  move: move,
  control: control,
  position: function() { return {x: playerSprite.x, y: playerSprite.y} }
}
