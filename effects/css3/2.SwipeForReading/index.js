(function() {
  // 翻页: 控制CSS中transition
  // 滑动检测: 比较 e.clientX 在按下和抬起鼠标左键时的大小
  config = {
    // 参数
    readArea: {
      width: 360,
      height: 640
    },
    columnGap: 100,
    // 辅助变量
    isTurned: false,
    curTranX: 0
  };
  var $window = $(window),
    $BookPage = $('.bookPage'),
    $Article = $('.article');

  $.fn.extend({
    nextPage: nextPage,
    prevPage: prevPage
  });
  // 执行部分
  initStyle();
  config.totleX =
    $BookPage[0].scrollWidth - parseInt($BookPage.css('padding-left')); // 实际 文章总width
  // config.totleX = config.readArea.width * PAGE + (PAGE - 1) * config.columnGap; // 理论 文章总width
  regEvent();
  // 函数与工具
  function initStyle() {
    $BookPage.css({
      width: config.readArea.width + 'px',
      height: config.readArea.height + 'px'
    });
    $Article.css({
      width: config.readArea.width + 'px',
      height: config.readArea.height + 'px',
      columnWidth: config.readArea.width + 'px',
      columnGap: config.columnGap + 'px'
    });
  }

  function regEvent() {
    regKeyControl();
    regSwipeControl();
    /**
     * 注册鼠标事件, 监控滑动
     */
    function regSwipeControl() {
      var initX, finalX, direction;
      $BookPage.on('mousedown', function(e) {
        if (e.button === 0) {
          initX = e.clientX;
        }
      });
      $window.on('mouseup', function(e) {
        if (e.button === 0) {
          finalX = e.clientX;
          direction = finalX - initX;
          if (direction > 10) {
            // 10 --> 防误触
            $Article.prevPage();
          } else if (direction < -10) {
            $Article.nextPage();
          }
        }
        direction = initX = finalX = 0;
      });
    }
    /**
     * 注册键盘事件, 监控方向键
     */
    function regKeyControl() {
      $window
        .on('keydown', function(e) {
          if (e.key === 'ArrowRight' && config.isTurned == false) {
            $Article.nextPage();
            config.isTurned = true;
          } else if (e.key === 'ArrowLeft' && config.isTurned == false) {
            $Article.prevPage();
            config.isTurned = true;
          }
        })
        .on('keyup', function(e) {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft')
            config.isTurned = false;
        });
    }
  }

  /**
   * jQuery拓展, 下一页
   */
  function nextPage() {
    var self = this;
    self.eq(0).css(
      {
        transform: `translateX(${getCorTranX('next')}px)`
      },
      1000
    );
  }
  /**
   * jQuery拓展, 上一页
   */
  function prevPage() {
    var self = this;
    self.eq(0).css(
      {
        transform: `translateX(${getCorTranX('prev')}px)`
      },
      1000
    );
  }
  /**
   * 执行翻页前, 获取正确的 translateX
   * @param {String} dir 翻页方向
   */
  function getCorTranX(dir) {
    if (dir === 'next') {
      config.curTranX -= config.readArea.width + config.columnGap;
    } else if (dir === 'prev') {
      config.curTranX += config.readArea.width + config.columnGap;
    }
    var finalX = -(config.totleX - config.readArea.width);
    if (config.curTranX < finalX) {
      config.curTranX = finalX;
    } else if (config.curTranX > 0) {
      config.curTranX = 0;
    }
    return config.curTranX;
  }
})();
