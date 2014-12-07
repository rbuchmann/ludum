var game;
var tiles;
var player;

var tileSize = 128;
var halfSize = tileSize/2;

var levelgen = require('./levelgen');

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

function addTile(x, y, name, poly, rotation) {
  if (name == "empty") return;
  var tile = game.add.tileSprite(tileSize*x+halfSize, tileSize*y+halfSize, 
				 tileSize, tileSize, name);
//				 tileSize, tileSize);
  var points = _.map(poly,resize);
//  tile.anchor.setTo(0.5,0.5);
  if (poly != null) {
    game.physics.p2.enable(tile, true);
//    game.physics.p2.enable(tile);
    tile.body.clearShapes();
    tile.body.addPolygon({}, points);
    tile.body.angle=90*rotation;
    tile.body.kinematic = true;  
  }
} 

function generateTiles(tileData) {
  _.forEach(tileData, function(t) {
    addTile(t[0],t[1],t[2],t[3],t[4]);
  });
}

function init(_game) {
  game = _game; 
  tiles = game.add.group();
  generateTiles(levelgen.test());
}

module.exports = {
  init: init
}
