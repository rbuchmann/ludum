var _ = require("lodash");

function getPixel( imagedata, x, y ) {
    var position = ( x + imagedata.width * y ) * 4, data = imagedata.data;
    return { r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ]};
}

function boxToSegments (a) {
}

test = function() {
    buffer = document.createElement('canvas');
    buffer.width = 600;
    buffer.height = 350;
    img = new Image();
    img.src = 'images/levelbitmap.png';
    ctx = buffer.getContext('2d');
    ctx.drawImage(img,0,0);
    document.body.appendChild(buffer);
    imgd = ctx.getImageData(0, 0, 600, 350);
    console.log(getPixel(imgd, 50, 50));
    console.log('Foo2');
};

module.exports = {
    test : test
};
