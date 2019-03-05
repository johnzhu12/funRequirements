

window.onload = function () {
    var mycanvas = document.getElementById('mycanvas');
    var context = mycanvas.getContext('2d');

    // context.fillStyle = '#99f';    //   填充颜色
    // context.fillRect(0, 0, 1000, 1000);

    var img = new Image;
    img.src = 'imgs/stamp.png';
    img.onload = function () {
        context.drawImage(img, 0, 0, 200, 200);
        drawText()

    }

    function drawText() {
        //96位的hash
        var myhash = 'akadjkdawdwahdawhawhdwdrrjkadjkdawdwahdawhdwdrrjkadjkdawdwahdawhdwdrrjkadjkdawdwahdawhdwdrrdwdrr';
        context.font = "12pt Arial";
        context.textAlign = "center";
        var centerX = 400;
        var centerY = 160;
        // var angle = Math.PI * 0.5; // radians
        var radius = 90
        context.fillTextCircle(myhash, centerX, centerY, radius, 0)
    }
};


/**
 *
 *画出弧形文字
 * @param {*} 文字
 * @param {*} x 中心坐标x轴
 * @param {*} y 中心坐标y轴
 * @param {*} radius  半径
 * @param {*} startRotation  转圈的起始 0最上边 
 */
CanvasRenderingContext2D.prototype.fillTextCircle = function (text, x, y, radius, startRotation) {
    // var numRadsPerLetter = 2 * Math.PI / text.length;
    this.save();
    this.translate(x, y);
    this.rotate(startRotation);

    // for (var i = 0; i < text.length; i++) {
    //     this.save();
    //     this.rotate(i * numRadsPerLetter);

    //     this.fillText(text[i], 0, -radius);
    //     this.restore();
    // }
    this.fillText(text, 0, 0);
    this.restore();
}