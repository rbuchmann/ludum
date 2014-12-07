var tools = require('./tools.js');

var down      = [0.5,1];
var left      = [0,0.5];
var up        = [0.5,0];
var right     = [1,0.5];
var upLeft    = [0,0];
var upRight   = [1,0];
var downRight = [1,1];
var downLeft  = [0,1];

function squarePoints(x,y) {
    return [[x,y], [x + 1, y], [x+1,y+1], [x,y+1]];
}

function mapToGlobal(pos, dir, scale) {
    var s = function (x) {
        return x * scale;
    };
    scale = tools.defaultFor(scale,10);
    var p = _.map(pos, s);
    var d = _.map(dir,s);
    return [p[0]+d[0], p[1]+d[1]];
}

var tilePolys = {
    empty    : null,
    solid    : null,
    downHalf : [left, right, downRight, downLeft],
    leftHalf : [upLeft, up, down, downLeft],
    ulEmpty  : [left, up, upRight, downRight, downLeft],
    ulSolid  : [upLeft, up, left],
    ulBridge : [upLeft, up, right, downRight, down, left]
};

function boxToTile (a) {

    var tileLookup = _.object([[[0,0,0,0], ["empty", 0]],
                               [[1,1,1,1], ["solid", 0]],
                               [[1,0,0,0], ["ulSolid", 0]],
                               [[0,1,0,0], ["ulSolid", 1]],
                               [[0,0,1,0], ["ulSolid", 2]],
                               [[0,0,0,1], ["ulSolid", 3]],
                               [[0,0,1,1], ["downHalf", 0]],
                               [[1,1,0,0], ["downHalf", 2]],
                               [[1,0,0,1], ["leftHalf", 0]],
                               [[0,1,1,0], ["leftHalf", 2]],
                               [[1,0,1,0], ["ulBridge", 0]],
                               [[0,1,0,1], ["ulBridge", 1]],
                               [[0,1,1,1], ["ulEmpty", 0]],
                               [[1,0,1,1], ["ulEmpty", 1]],
                               [[1,1,0,1], ["ulEmpty", 2]],
                               [[1,1,1,0], ["ulEmpty", 3]]]);
    return tileLookup[a];
}

function getBox (bitmap, x, y) {
    var boxPoints = squarePoints(x,y);
    return _.map(boxPoints, function (p) { return bitmap.data[p[1]][p[0]];});
}

function toTiles(bitmap) {
    var tiles = [];
    for(var x = 0; x < bitmap.width - 1; x++) {
        for(var y = 0; y < bitmap.height - 1; y++) {
            var tile = boxToTile(getBox(bitmap, x, y));
            var name = tile[0];
            var rotation = tile[1];
            tiles.push([x,y,name,tilePolys[name],rotation]);
        }
    }
    return tiles;
}

module.exports = {
    tiles: tilePolys,
    toTiles : toTiles,
    boxToTile : boxToTile
};
