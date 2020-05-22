const dom = document.querySelector('.cube-container');
const cubes = dom.querySelectorAll('.cube-container .cube');

document.onmousemove = function (e) {
  dom.querySelector('.box').style.perspectiveOrigin = e.pageX + 'px ' + +e.pageY + 'px';

}
cubes.forEach(cube => {
  cube.onmouseenter = e => {
    addClass(e, 'in', e.target);
    changeBg(e.target);
  }
  cube.onmouseleave = e => {
    addClass(e, 'out', e.target);
    e.target.onanimationend = e => {
      if (e.target.getAttribute('id').includes('out'))
        e.target.setAttribute('id', '');
    }
  }
})

function addClass(e, state, item) {
  var d = getDir(e, item);
  var str = '';
  switch (d) {
    case 0:
      str = '-top';
      break;
    case 1:
      str = '-right';
      break;
    case 2:
      str = '-bottom';
      break;
    case 3:
      str = '-left';
      break;
  }
  item.setAttribute('id', '');
  item.setAttribute('id', state + str);
};

function getDir(e, item) {
  var left = item.offsetLeft;
  var top = item.offsetTop;
  var w = item.offsetWidth;
  var x = e.clientX - left - w / 2;
  var y = e.clientY - top - w / 2;
  // 取到x,y两点坐标
  var d = (Math.round(((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
  return d;
};

function changeBg(item) {
  var color = item.getAttribute('data-bg');
  dom.style.backgroundColor = color
};