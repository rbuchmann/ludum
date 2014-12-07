var game;
var tiles;
var player;

var tileSize = 128;
var halfTile = tileSize/2;

var levelgen = require('./levelgen');

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

function resize(pt) {
  return [pt[0]*tileSize, pt[1]*tileSize];
}

function addTile(x, y, poly) {
  var tile = tiles.create(tileSize*x, tileSize*y);
  var points = _.map(poly,resize);
  game.physics.p2.enable(tile, true);
  tile.body.clearShapes();
  console.log("poly "+points);
  tile.body.addPolygon({}, points);
  tile.body.kinematic = true;  
}

function generateTiles(tileData) {
  addTile(0,0,[[0,0],[1,0],[1,1],[0,1]]);
  addTile(2,2,[[0,0],[1,0],[1,1],[0,1]]);
}

function init(_game) {
  game = _game;
  tiles = game.add.group();
  generateTiles(levelgen.test());
}

module.exports = {
  init: init
}
