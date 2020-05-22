class MyCollection {
  constructor(arr = [], dom = document.body) {
    const set = new Set();
    arr.forEach(item => {
      if (set.has(item.type)) this[item.type].push(item);
      else {
        this[item.type] = [item];
        set.add(item.type);
      }
    });
    this._dom = dom;
    this._set = set;
    this._str = ``;
  }
  addType() {
    this._set.forEach(type => {
      let _innerType = ``;
      this[type].forEach(ele => {
        let _authorDesc = ``;
        if (ele.authorDesc) _authorDesc = ele.authorDesc;
        let _authorUrl = ``;
        if (ele.authorUrl) _authorUrl = `<a target="_blank" href="${ele.authorUrl}">${ele.author}</a>`;
        else _authorUrl = ele.author;
        let _author = ``;
        if (ele.author) _author = `<span>by ${_authorUrl}${_authorDesc}</span>`;
        const _item = `<a target="_blank" href="${ele.url}">${ele.name}</a>`;
        _innerType += `<dd>${_item}${_author}</dd>`;
      });
      this._str += `<dl><dt>${type}</dt>${_innerType}</dl>`; // type
    });
  }
  render() {
    this.addType();
    this._dom.innerHTML = this._str;
  }
}
new MyCollection([
  {
    type: '后台管理系统循环迭代项目',
    name: '原生JS',
    url: './iteraive-ISMS/1.ISMS.originalJS'
  },
  {
    type: '后台管理系统循环迭代项目',
    name: 'jQuery',
    url: './iteraive-ISMS/2.ISMS.jQuery'
  },
  {
    type: '后台管理系统循环迭代项目',
    name: '+CSS3HTML5',
    url: './iteraive-ISMS/3.ISMS.Css3Html5'
  },
  {
    type: '后台管理系统循环迭代项目',
    name: 'Bootstrap',
    url: './iteraive-ISMS/4.ISMS.Bootstrap'
  },
  {
    type: '后台管理系统循环迭代项目',
    name: 'Vue',
    url: './iteraive-ISMS/5.ISMS.vue/dist'
  },
  {
    type: '其他demo',
    name: '移动端音乐播放器',
    url: './c3h5-music/dist/html'
  },
  {
    type: '其他demo',
    name: 'vue 电影列表页',
    url: './vue-movies'
  },
  {
    type: '其他demo',
    name: 'flayyp bird - 面向对象',
    url: './effects/es6-flappybird'
  },
  {
    type: '效果',
    name: '九格滑块拼图',
    url: './effects/拼图游戏'
  },
  {
    type: '效果',
    name: '无缝轮播图',
    url: './effects/无缝轮播图'
  },
  {
    type: '效果',
    name: 'CSS3 效果展示',
    url: './effects/css3'
  },
  {
    type: '效果',
    name: 'CSS 纵向照片墙',
    url: './effects/css纵向排列照片墙'
  },
  {
    type: '效果',
    name: '图片瀑布流',
    url: './effects/imagesWaterfall'
  },
  {
    type: '效果',
    name: '许愿墙',
    url: './effects/许愿墙'
  },
  {
    type: '效果',
    name: '3D立体旋转动画',
    url: './effects/3D立体旋转动画'
  },
  {
    type: '效果',
    name: 'canvas 雪花背景效果',
    url: './effects/canvas雪花背景效果'
  },
  {
    type: '效果',
    name: 'canvas 光标移动效果',
    url: './effects/canvas光标移动效果'
  }
  // ,{
  //   type: '效果',
  //   name: '美团静态页面',
  //   url: './effects/vue-meituan-app/'
  // }
]).render();
