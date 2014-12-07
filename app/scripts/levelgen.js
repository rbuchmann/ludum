var tools = require('./tools.js');
var imtools = require('./imagetools.js');
var m = require('./marchingsquares.js');

var drawLine = imtools.drawLine;

var testData = {height : 5,
                width  : 5,
                data   : [[1, 1, 1, 1, 1],
			  [1, 1, 0, 1, 1],
                          [1, 0, 0, 0, 1],
                          [1, 0, 0, 0, 1],
                          [1, 1, 1, 1, 1]]};

function s (foo) {
    return JSON.stringify(foo);
}

var test = function() {
    var buffer = document.createElement('canvas');
    document.body.appendChild(buffer);
    buffer.width = 600;
    buffer.height = 350;
    var img = new Image();
    img.src = 'images/levelbitmap.png';
    var ctx = buffer.getContext('2d');
    ctx.fillStyle = "rgba(255,255,255,255)";
    ctx.fillRect(0,0,600,350);
    ctx.fillStyle = "rgba(0,255,0,255)";
    var x = 70;
    var y = 60;
    var size = 80;
    //ctx.fillRect(x,y, size, size);
    ctx.drawImage(img,0,0);
    imtools.drawComb(ctx, [40,40], 20);
    var imgd = ctx.getImageData(x, y, size, size);
    var bm = imtools.imageDataToBitmap(imgd);
    return m.toTiles(bm);
};


module.exports = {
    test : test
};
