var game;
var tiles;
var player;

var curHeight = 300;
var points = _.map(_.range(100), function(idx){
	curHeight = curHeight + (Math.random()-0.5)*10;
	x = idx*40;
	return [x, curHeight];
});
points.push([4000,1000], [0,1000]);

function polygon(points) {
  return new Phaser.Polygon(_.map(points, function(p) {
    return new Phaser.Point(p[0], p[1]);
  }));
}

function drawTile (points) {
  var g = game.add.graphics(0, 0);
  g.beginFill(0xFF33ff);
  g.drawPolygon(polygon(points).points);
  g.endFill();
}

function addTile(points) {
  drawTile(points);
  var tile = game.add.sprite(0, 0);
  game.physics.p2.enable(tile);
  tile.body.clearShapes();
  tile.body.addPolygon({}, points);
  tile.body.kinematic = true;  
  drawTile(points);
}

function init(_game) {
  game = _game;
  addTile(points);
}

module.exports = {
  init: init
}
