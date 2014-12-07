var tools = require('./tools.js');
var imtools = require('./imagetools.js');
var m = require('./marchingsquares.js');

var drawLine = imtools.drawLine;

function mlog(d) {
    console.log(JSON.stringify(d));
}

var testData = {height : 3,
                width  : 3,
                data   : [[1, 0, 1],
                          [0, 0, 0],
                          [0, 0, 0]]};

var test = function() {
    var buffer = document.createElement('canvas');
    buffer.width = 600;
    buffer.height = 350;
    var img = new Image();
    img.src = 'images/levelbitmap.png';
    var ctx = buffer.getContext('2d');
    ctx.drawImage(img,0,0);
    document.body.appendChild(buffer);
    var imgd = ctx.getImageData(0, 0, 600, 350);
    console.log("Marched:");
    mlog(m.toTiles(testData));
};


module.exports = {
    test : test
};
