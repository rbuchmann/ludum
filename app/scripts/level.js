var game;
var levelSprites;
var levelGraphics;
var levelCollisionGroup;

//var points = [[0, 100], [100, 200], [200, 300], [300, 250], [400, 300], [500, 400],
	      //[500, 1000], [0, 1000]];

var curHeight = 300;
var points = _.map(_.range(500), function(idx){
	curHeight = curHeight + (Math.random()-0.5)*10;
	x = idx*40;
	return [x, curHeight];
});
points.splice(0,0,[0,1000]);
points.push([500,1000]);

function polygon(points) {
  return new Phaser.Polygon(_.map(points, function(p) {
    return new Phaser.Point(p[0], p[1]);
  }));
}

function drawPolygon (points) {
  levelGraphics = game.add.graphics(0, 0);
  levelGraphics.beginFill(0xFF33ff);
  levelGraphics.drawPolygon(polygon(points).points);
  levelGraphics.endFill();
}

function addPhysics(points) {
  levelSprite = game.add.sprite(0, 0);
  game.physics.p2.enable(levelSprite);
  levelSprite.body.clearShapes();
  levelSprite.body.addPolygon({}, points);
  levelSprite.body.kinematic = true;  
  levelSprite.body.setCollisionGroup(levelCollisionGroup);
}

function registerCollisions(player) {
  levelSprite.body.collides(player.collisionGroup(), function() {console.log("coll1");});
  player.sprite().body.collides(levelCollisionGroup, function() {console.log("coll2");});
}

function init(gm, player) {
  game = gm;
  levelCollisionGroup = game.physics.p2.createCollisionGroup();
  drawPolygon(points);
  addPhysics(points);
  registerCollisions(player);
}

module.exports = {
  init: init
}
