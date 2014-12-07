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
    ctx.drawImage(img,0,0);

    ctx.fillStyle = "rgba(0,0,0,255)";
    ctx.fillRect(0,0,1,1);
    imtools.drawComb(ctx, [40,40],20);
    var imgd = ctx.getImageData(0, 0, 2, 2);
    var bm = imtools.imageDataToBitmap(imgd);
    console.log("slice:", s(bm));
    var ret = m.toTiles(testData);
    console.log("tiles:", s(ret));
    console.log(s(m.tiles["ulEmpty"]));
    return ret;
};


module.exports = {
    test : test
};
