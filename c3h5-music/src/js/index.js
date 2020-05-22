// 获取音频、注册事件
var root = window.player;
var dataList = [];
var len = 0;
var audio = root.audioManager;
var contolIndex = null;
var timer = null;

// 获取数据
function getData(url) {
  $.ajax({
    type: 'GET',
    url: url,
    success: function(data) {
      dataList = data;
      contolIndex = new root.controlIndex(data.length);
      bindEvent();
      bindTouch();
      $('body').trigger('play:change', 0);
      renList();
    },
    error: function() {
      console.log('error');
    }
  });
}
// 绑定点事件
function bindEvent() {
  $('body').on('play:change', function(e, index) {
    audio.getAudio(dataList[index].audio);
    root.render(dataList[index]);
    if (audio.status == 'play') {
      audio.play();
      rotated(0);
    }
    $('.img-box').attr('data-deg', 0);
    $('.img-box').css({
      transform: 'rotateZ(' + 0 + 'deg)',
      transition: 'none'
    });
    // 进行渲染时间
    root.pro.renderAlltime(dataList[index].duration);
  });
  $('.prev').on('click', function(e) {
    changeSong('-');
  });
  $('.next').on('click', function(e) {
    changeSong('+');
  });
  $('.play').on('click', function(e) {
    if (audio.status == 'pause') {
      audio.play();
      // 进度条开始计时
      root.pro.start();
      var deg = $('.img-box').attr('data-deg') || 0;
      rotated(deg);
    } else {
      audio.pause();
      // 进度条停止更新
      // root.pro.stop();
      clearInterval(timer);
      root.pro.stop();
    }
    $('.play').toggleClass('playing');
  });
  $('.btn.list').on('click', function(e) {
    $('.wrapper > .list').toggleClass('show');
  });
  $('div.list').on('click', function(e) {
    if (e.target.tagName === 'LI') {
      var index = $(e.target).index();
      changeSong(index);
      $(this).toggleClass('show');
    }
  });
}
function changeSong(index) {
  var i = contolIndex.getIndex(index);
  $('body').trigger('play:change', i);
  // 切歌时清零
  root.pro.start(0);
  if (audio.status == 'pause') {
    audio.pause();
    root.pro.stop();
  }
}
function rotated(deg) {
  clearInterval(timer);
  deg = parseInt(deg);
  timer = setInterval(function() {
    deg += 2;
    $('.img-box').attr('data-deg', deg);
    $('.img-box').css({
      transform: 'rotateZ(' + deg + 'deg)',
      transition: 'transform 0.2s linear'
    });
  }, 200);
}
// 拖拽事件  拖动小圆点 带着进度条运动
function bindTouch() {
  var $spot = $('.spot');
  var offset = $('.pro-bottom').offset();
  var left = offset.left;
  var width = offset.width;
  $spot
    .on('touchstart', function() {
      root.pro.stop();
    })
    .on('touchmove', function(e) {
      var x = e.changedTouches[0].clientX;
      var per = (x - left) / width;
      if (per > 0 && per < 1) {
        root.pro.update(per);
      }
    })
    .on('touchend', function(e) {
      var x = e.changedTouches[0].clientX;
      var per = (x - left) / width;
      if (per > 0 && per < 1) {
        var cutTime = per * dataList[contolIndex.index].duration;
        $('.play').addClass('playing');
        audio.playTo(cutTime);
        audio.status = 'play';
        audio.play();
        root.pro.start(per);
      }
    });
}
function renList() {
  var str = '';
  var lis = dataList.map(function(data) {
    return '<li>' + data.song + ' - ' + data.singer + '</li>';
  });
  lis.forEach(function(li) {
    return (str += li);
  });
  $('div.list ul').html(str);
}
getData('../mock/data.json');
