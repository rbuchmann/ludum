var tools = require('./tools.js');
var imtools = require('./imagetools.js');
var m = require('./marchingsquares.js');

var drawLine = imtools.drawLine;

function testMS (ctx,a) {
    var lines = m.boxToSegments(a);
    _.forEach(lines, _.curry(drawLine)(ctx));
}

function mlog(d) {
    console.log(JSON.stringify(d));
}

var testData = {height : 2,
                width  : 3,
                data   : [[1, 0, 1],
                          [0, 0, 0]]};

var test = function() {
    buffer = document.createElement('canvas');
    buffer.width = 600;
    buffer.height = 350;
    img = new Image();
    img.src = 'images/levelbitmap.png';
    ctx = buffer.getContext('2d');
    ctx.drawImage(img,0,0);
    document.body.appendChild(buffer);
    imgd = ctx.getImageData(0, 0, 600, 350);
    console.log("Marched:");
    mlog(m.toPolys(testData));
    testMS(ctx, [1,0,1,0]);
};


module.exports = {
    test : test
};
