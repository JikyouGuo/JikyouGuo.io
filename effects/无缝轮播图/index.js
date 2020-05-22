(function () {
    var imgWidth = 640,
        curIndex = 1,
        autoMove;
    var oWrapper = document.querySelector(".wrapper"),
        oImg = document.querySelector(".wrapper .img"),
        oLeft = document.querySelector(".wrapper .arrow .left"),
        oRight = document.querySelector(".wrapper .arrow .right"),
        oNav = document.querySelector(".wrapper .nav"),
        oDots = document.querySelectorAll(".wrapper .nav span"),
        oItems = document.querySelectorAll(".wrapper .img img");
    var imgArr = Array.from(oItems),
        dotsArr = Array.from(oDots);
    // #1. to left
    oLeft.onclick = function () {
        if (curIndex === 1) {
            doAniMove(oImg, 0);
        } else {
            doAniMove(oImg, getCorrectIndex(curIndex - 1));
        }
    }
    // #2. to right
    oRight.onclick = function () {
        if (curIndex === dotsArr.length) {
            doAniMove(oImg, dotsArr.length + 1);
        } else {
            doAniMove(oImg, getCorrectIndex(curIndex + 1));
        }
    }
    // #3. click dot
    oNav.onclick = function (e) {
        if (e.target === dotsArr[curIndex - 1]) {
            return;
        }
        oDots.forEach(function (v, k) {
            if (e.target === v) {
                doAniMove(oImg, k + 1);
            }
        })
    }
    // #4. auto move
    startAutoMove();
    oWrapper.onmouseenter = function () {
        clearInterval(autoMove);
    };
    oWrapper.onmouseleave = function () {
        startAutoMove();
    };
    /**
     * 执行动画化移动
     * @param {HTMLElement} iDom 移动对象
     * @param {Number} iTarget 移动目标
     * @param {String} iDrt 移动方向
     */
    function doAniMove(iDom, iTarget, iDrt) {
        clearInterval(iDom.timer);
        var tarLeft = -imgWidth * iTarget;
        iDom.timer = setInterval(function () {
            var curLeft = iDom.offsetLeft,
                doSpeed = (tarLeft - curLeft) / 5;
            doSpeed = doSpeed > 0 ? Math.ceil(doSpeed) : Math.floor(doSpeed);
            var newLeft = curLeft + doSpeed;
            // 判断是否到达边界, 并切换img位置
            if (newLeft >= 0 && iTarget === 0) {
                newLeft = (dotsArr.length) * (-imgWidth);
                iTarget = dotsArr.length;
                tarLeft = -imgWidth * iTarget;
            }
            if (newLeft <= (dotsArr.length + 1) * (-imgWidth) && iTarget === dotsArr.length + 1) {
                newLeft = -imgWidth;
                iTarget = 1;
                tarLeft = -imgWidth * iTarget;
            }
            iDom.style.left = newLeft + "px";
            // 判断是否已经完成移动, 并初始化 计时器, curIndex, 导航点
            if (newLeft === tarLeft) {
                clearInterval(iDom.timer);
                curIndex = iTarget;
                setDotsStatus();
            }
        }, 17)
    }
    /**
     * 获取正确的下标
     */
    function getCorrectIndex(index) {
        if (index < 1) {
            index = dotsArr.length;
        }
        if (index > dotsArr.length) {
            index = 1;
        }
        return index;
    }
    /**
     * 设置点的状态 (.active)
     */
    function setDotsStatus() {
        dotsArr.forEach(function (v, k) {
            v.classList.remove("active");
            if (k === curIndex - 1) {
                v.classList.add("active");
            }
        });
    }
    /**
     * 开始自动轮播
     */
    function startAutoMove() {
        autoMove = setInterval(function () {
            oRight.click();
        }, 2000);
    }
}())