function getPixel( imageData, p ) {
    var x = p[0];
    var y = p[1];
    var position = ( x + imageData.width * y ) * 4;
    var data = imageData.data;
    return [data[position], data[position + 1], data[position + 2]];
}

function drawLine (ctx, l) {
    ctx.beginPath();
    var a = l[0];
    var b = l[1];
    var d = 50;
    ctx.strokeStyle = "red";
    ctx.moveTo(a[0]*d+2*d,a[1]*d+2*d);
    ctx.lineTo(b[0]*d+2*d,b[1]*d+2*d);
    ctx.stroke();
}

function drawPolyLine (ctx, pl, color) {
    if (color) {
        ctx.strokeStyle = color;
    }
    ctx.beginPath ();
    ctx.moveTo(pl[0][0], pl[0][1]);
    for (var i=1; i<pl.length; i++) {
        ctx.lineTo(pl[i][0], pl[i][1]);
    }
    ctx.stroke();
}

function drawComb (ctx, p, r) {
    var angles = _.map(_.range(7), function (phi) { return phi * 2 * Math.PI / 6;});
    console.log("angles", angles);
    var points = _.map(angles, function (phi) {return [r*Math.sin(phi) + p[0], r*Math.cos(phi) + p[1]];});
    console.log("points", points);
    drawPolyLine(ctx, points);
}

function colToMarker(c) {
    return _.max(c) === 0 ? 0 : 1 ;
}

function imageDataToBitmap (imgd) {
    var bitmap = [];
    for(var y = 0; y < imgd.height; y++) {
        bitmap[y] = [];
        for(var x = 0; x < imgd.width; x++) {
            bitmap[y][x] = colToMarker(getPixel(imgd, [x, y]));
        }
    }
    return {height : imgd.height,
            width : imgd.width,
            data : bitmap};
}

module.exports = {
    drawPolyLine : drawPolyLine,
    drawLine : drawLine,
    drawComb : drawComb,
    getPixel : getPixel,
    colToMarker : colToMarker,
    imageDataToBitmap : imageDataToBitmap
};
