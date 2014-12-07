var tools = require('./tools.js');

function line (a,b) {
    return [a,b];
}

var down  = [0.5,1];
var left  = [0,0.5];
var up    = [0.5,0];
var right = [1,0.5];

function boxToSegments (a) {
    var marchingLookup = _.object([[[0,0,0,0], []],
                                   [[1,1,1,1], []],
                                   [[1,0,0,0], [line(left, up)]],
                                   [[0,1,0,0], [line(up, right)]],
                                   [[0,0,1,0], [line(right, down)]],
                                   [[0,0,0,1], [line(down, left)]],
                                   [[0,0,1,1], [line(left, up)]],
                                   [[1,1,0,0], [line(left, up)]],
                                   [[1,0,0,1], [line(right, up)]],
                                   [[0,1,1,0], [line(right, up)]],
                                   [[1,0,1,0], [line(left, down),
                                                line(up,right)]],
                                   [[0,1,0,1], [line(left, up),
                                                line(down,right)]],
                                   [[0,1,1,1], [line(left, up)]],
                                   [[1,0,1,1], [line(up, right)]],
                                   [[1,1,0,1], [line(right, down)]],
                                   [[1,1,1,0], [line(down, left)]]]);
    return marchingLookup[a];
}

function cubePoints(x,y) {
    return [[x,y], [x + 1, y], [x+1,y+1], [x,y+1]];
}

function colToMarker(c) {
    return _.max(c) === 0 ? 0 : 1 ;
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

function dirChecker (dir) {
    return function(col) {
        return _.contains(col, dir);
    };
}

function toPolys(bitmap) {
    var polys = [];
    var squares = [];
    var unneeded = [];
    for(y = 0; y < bitmap.height - 1; y++) {
        squares[y] = [];
        for(x = 0; x < bitmap.width - 1; x++) {
            var left = x === 0 ? false : squares[y][x-1].right;
            var up = y === 0 ? false : squares[y-1][x].down;
            var isInside = function(p) {return bitmap.data[p[1]][p[0]];};
            var box = _.map(cubePoints(x,y), isInside);
            var segments = boxToSegments(box);
            squares[y][x] = {};
            squares[y][x].down = _.some(segments, dirChecker(down));
            squares[y][x].right = _.some(segments, dirChecker(right));
            _.forEach(segments, function (s) {polys.push(s);});
            var b = [2,2,[4,5]];
            var a = [1, b, 3];
        }
    }
    return polys;
}

module.exports = {
    toPolys : toPolys,
    boxToSegments : boxToSegments
};
