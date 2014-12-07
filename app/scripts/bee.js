var game;
var bees;

function init(gm) {
  game = gm;
  bees = game.add.group();
//  bees.scale.setTo(0.08, 0.08);
//  bees.enableBody = true;
}

function addBee(x, y) {
  var bee = bees.create(x, y, 'zombee');
  bee.startTime = game.time.now;
  bee.scale.setTo(0.08,0.08);
  bee.anchor.setTo(0.5,0.75);
  bee.animations.add('fly',[0,1,2,1],40,true);
  bee.animations.play("fly");
  game.physics.p2.enable(bee);
  bee.body.fixedRotation = true;
  bee.body.data.gravityScale = 0;
  bee.body.damping = 0;
  bee.body.velocity.x = -100;
} 

function target(bee, pos){
  var dx = pos.x - bee.x;
  var dy = pos.y - bee.y;
  var rotCorr = 0;
  if(bee.scale.x > 0){
    if(dx > 0){
      bee.scale.x *= -1;
    }
  } else if(bee.scale.x < 0){
    rotCorr = Math.PI;
    if(dx < 0){
      bee.scale.x *= -1;
    }
  }
  var phi = Math.atan2(dy,dx);
  bee.rotation = phi+rotCorr;
}

function updateBees(player) {
  now = game.time.now;
  bees.forEach(function (bee) {
    t = (now - bee.startTime) / 300.0;
    bee.body.velocity.y = 70*Math.sin(t);
    target(bee,player);
  });
}

module.exports = {
  init: init,
  addBee: addBee,
  updateBees: updateBees
}
