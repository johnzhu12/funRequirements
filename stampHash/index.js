

window.onload = function () {
    var mycanvas = document.getElementById('mycanvas');
    var context = mycanvas.getContext('2d');

    // context.fillStyle = '#99f';    //   填充颜色
    // context.fillRect(0, 0, 1000, 1000);

    var img = new Image;
    img.src = 'imgs/stamp.jpg';
    img.onload = function () {
        context.drawImage(img, 300, 60, 200, 200);
        drawText()

    }
    function drawText() {
        //96位的hash
        var myhash = 'jkadjkdawdwahdawhawhdwdrrjkadjkdawdwahdawhdwdrrjkadjkdawdwahdawhdwdrrjkadjkdawdwahdawhdwdrrdwdrr';
        context.font = "12pt Arial";
        context.textAlign = "center";
        var centerX = 400;
        var centerY = 160;
        var angle = Math.PI * 0.5; // radians
        var radius = 100
        // drawTextAlongArc(context, myhash, centerX, centerY, radius, angle);
        context.fillTextCircle(myhash, centerX, centerY, radius, angle)
    }
};
//画出弧形文字
CanvasRenderingContext2D.prototype.fillTextCircle = function (text, x, y, radius, startRotation) {
    var numRadsPerLetter = 2 * Math.PI / text.length;
    this.save();
    this.translate(x, y);
    this.rotate(startRotation);

    for (var i = 0; i < text.length; i++) {
        this.save();
        this.rotate(i * numRadsPerLetter);

        this.fillText(text[i], 0, -radius);
        this.restore();
    }
    this.restore();
}