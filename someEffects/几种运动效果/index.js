var oSliderLeft = document.querySelector(".slider.left"),
    oSliderRight = document.querySelector(".slider.right"),
    oSliderBottom = document.querySelector(".slider.bottom"),
    oLine = document.querySelector(".line"),
    oCon = document.querySelector(".container"),
    oSelected = document.querySelector(".container .selected");
var lineLeft = 400,
    sliderWidth = 100,
    sliderHeight = 100;
// 弹性运动
oSliderLeft.onclick = function () {
    doAnimatedSwitchTJXY(this, lineLeft - sliderWidth / 2)
}
// 弹性运动应用: 弹性选择框
oCon.onmouseover = function (e) {
    if (e.target.className === "select") {
        doAnimatedSwitchTJXY(oSelected, e.target.offsetLeft);
    }
}
// 模拟重力场
oSliderRight.onclick = function () {
    doAniSwitchGravity(this, -7, 7);
}
// 拖拽运动重力场
doAniSwitchDraw(oSliderBottom);
/**
 * 拖拽运动重力场
 * @param {HTMLElement} dom 添加目标
 */
function doAniSwitchDraw(dom) {
    var lastX = dom.offsetLeft,
        lastY = dom.offsetTop,
        iVX = 0,
        iVY = 0;
    dom.onmousedown = function (e) {
        clearInterval(this.timer);
        if (e.button !== 0) {
            return;
        }
        var disX = e.clientX - this.offsetLeft,
            disY = e.clientY - this.offsetTop;
        document.onmousemove = function (e) {
            var newLeft = e.clientX - disX,
                newTop = e.clientY - disY;
            dom.style.left = newLeft + "px";
            dom.style.top = newTop + "px";
            // 拖拽赋予初速度
            iVX = newLeft - lastX;
            iVY = newTop - lastY;
            lastX = newLeft;
            lastY = newTop;
        }
        document.onmouseup = function (e) {
            if (e.button !== 0) {
                return;
            }
            document.onmouseup = null;
            document.onmousemove = null;
            doAniSwitchGravity(dom, iVX, iVY);
        }
    }
}
/**
 * 模拟重力场
 * @param {HTMLElement} dom 
 */
function doAniSwitchGravity(dom, doVX, doVY) {
    clearInterval(dom.timer);
    var g = 2,
        mu = 0.99;
    dom.timer = setInterval(function () {
        doVY += g;
        var newLeft = dom.offsetLeft + doVX,
            newTop = dom.offsetTop + doVY;
        // 感知碰撞 & 碰撞损耗
        var width = document.documentElement.clientWidth - sliderWidth,
            height = document.documentElement.clientHeight - sliderHeight;
        if (newLeft <= 0) {
            doVX = -doVX;
            xyLoss(mu);
            newLeft = 0;
        }
        if (newLeft >= width) {
            doVX = -doVX;
            xyLoss(mu);
            newLeft = width;
        }
        if (newTop <= 0) {
            doVY = -doVY;
            xyLoss(mu);
            newTop = 0;
        }
        if (newTop >= height) {
            doVY = -doVY;
            xyLoss(mu);
            newTop = height;
        }
        // 判断结束
        if (Math.abs(doVX) < 1) {
            doVX = 0;
        }
        if (Math.abs(doVY) < 1) {
            doVY = 0;
        }
        dom.style.left = newLeft + "px";
        dom.style.top = newTop + "px";
        if (doVX === 0 && doVY === 0 && newTop === height) {
            clearInterval(dom.timer);
            console.log('over')
        }
    }, 17)
    /**
     * 考虑损耗, 碰撞时损耗
     */
    function xyLoss(mu) {
        doVX *= mu;
        doVY *= mu;
    }
}
/**
 * 弹性运动
 * @param {HTMLElement} dom 运动者
 * @param {*} iTarget 目标者
 */
function doAnimatedSwitchTJXY(dom, iTarget) {
    clearInterval(dom.timer);
    var curLeft,
        doSpeed = 6,
        doAcceleration,
        doMu = 0.8;
    dom.timer = setInterval(function () {
        curLeft = Math.ceil(parseFloat(getComputedStyle(dom).left));
        var deltaX = iTarget - curLeft;
        doAcceleration = deltaX / 7;
        doSpeed += doAcceleration
        doSpeed *= doMu;
        dom.style.left = curLeft + doSpeed + "px";
        if (Math.abs(doSpeed) < 1 && Math.abs(deltaX) < 1) {
            clearInterval(dom.timer);
            dom.style.left = iTarget + "px";
        }
    }, 17)
}