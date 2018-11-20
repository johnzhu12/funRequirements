
document.querySelector('.btn').onclick = function () {
    screenShot($('#targetDom'), function (canvas, width, height) {
        // document.querySelector('#screenShotImg').src = canvas;
        // document.querySelector('#screenShotImg').style.width = width + "px";
        // document.querySelector('#screenShotImg').style.height = height + "px";
    });
}

/**
 * 截图功能
 * targetDom 要克隆的目标dom元素
 * cb 回调函数
 */
function screenShot(targetDom, cb) {
    html2canvas(document.body, {
        allowTaint: false,
        useCORS: true,
        logging: true
    }).then(function (canvas) {
        // document.body.appendChild(canvas);
        if (cb) {
            console.log(canvas.toDataURL())
        }

    });
}

