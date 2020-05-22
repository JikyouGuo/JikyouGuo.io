(function init() {
  var config = {
      wishWidth: 160,
      wishHeight: 175,
      dom: {
        wall: document.querySelector('.container .wall'),
        input: document.querySelector('.container .input input')
      }
    },
    v = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  // 配置完成
  var text;
  initWish();
  pushWish('世界和平');
  pushWish('与人为善');
  pushWish('与书为伴');
  // wall自适应
  initWall();
  // 执行结束
  function initWall() {
    window.onresize = function() {
      var dX = document.documentElement.clientWidth - v.width,
        dY = document.documentElement.clientHeight - v.height;
      Array.from(config.dom.wall.children).forEach(function(item) {
        var left = parseFloat(item.style.left),
          right = v.width - left - config.wishWidth,
          newLeft = left + dX * (left / (left + right));
        item.style.left = newLeft + 'px';
        var top = parseFloat(item.style.top),
          bottom = v.height - top - config.wishHeight,
          newTop = top + dY * (top / (top + bottom));
        item.style.top = newTop + 'px';
      });
      // 每当resize后，给记录viewport宽高的变量重新赋值
      v.width = document.documentElement.clientWidth;
      v.height = document.documentElement.clientHeight;
    };
  }

  /**
   * 发布愿望
   * @param {String} text
   */
  function pushWish(text) {
    if (text) {
      var wish = document.createElement('DIV'),
        x = document.createElement('DIV');
      wish.className = 'wish';
      // wish文字
      wish.innerText = text;
      // wish颜色
      wish.style.backgroundColor = `rgba(${getRandom(0, 255)},${getRandom(
        0,
        255
      )},${getRandom(0, 255)}, 0.75)`;
      // wish位置
      wish.style.position = 'absolute';
      wish.style.cursor = 'move';
      x.innerText = 'x';
      x.style.position = 'absolute';
      x.style.top = '5px';
      x.style.right = '0';
      x.style.cursor = 'pointer';
      x.style.textAlign = 'center';
      x.style.width = '20px';
      wish.appendChild(x);
      config.dom.wall.appendChild(wish);
      wish.style.top = `${getRandom(0, v.height - config.wishHeight)}px`;
      wish.style.left = `${getRandom(0, v.width - config.wishWidth)}px`;
      regWish();
      /**
       * 注册关闭、拖动事件
       */
      function regWish() {
        x.onclick = function(e) {
          e.target.parentElement.remove();
        };
        wish.onmousedown = function(e) {
          if (e.button === 0) {
            var style = getComputedStyle(wish),
              left = parseFloat(style.left),
              top = parseFloat(style.top),
              x = e.pageX,
              y = e.pageY;
            window.onmousemove = function(e) {
              var dx = e.pageX - x,
                dy = e.pageY - y,
                leftNow = left + dx,
                topNow = top + dy;
              if (leftNow < 0) {
                leftNow = 0;
              }
              if (leftNow > v.width - config.wishWidth) {
                leftNow = v.width - config.wishWidth;
              }
              if (topNow < 0) {
                topNow = 0;
              }
              if (topNow > v.height - config.wishHeight) {
                topNow = v.height - config.wishHeight;
              }
              wish.style.left = leftNow + 'px';
              wish.style.top = topNow + 'px';
            };
            window.onmouseup = window.onmouseleave = function() {
              window.onmousemove = '';
            };
          }
        };
      }
    }
    /**
     * 输出随机数
     * @param {Number} min
     * @param {Number} max
     */
    function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }
  /**
   * 初始化愿望
   */
  function initWish() {
    // 为input注册键盘事件
    config.dom.input.onkeydown = function(e) {
      if (e.key === 'Enter') {
        // 获取wish内容
        text = e.target.value;
        e.target.value = '';
        pushWish(text);
      }
    };
  }
})();
