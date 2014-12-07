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
    for (i=1; i<pl.length; i++) {
        ctx.lineTo(p[i][0], p[i][1]);
    }
    ctx.stroke();
}

function colToMarker(c) {
    return _.max(c) === 0 ? 0 : 1 ;
}

module.exports = {
    drawPolyLine : drawPolyLine,
    drawLine : drawLine,
    getPixel : getPixel,
    colToMarker : colToMarker
};
