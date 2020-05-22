(function($, root) {
  function Control(len) {
    this.index = 0;
    this.len = len;
  }
  Control.prototype = {
    // 计算改变后的索引
    getIndex: function(i) {
      if (typeof i === 'number') {
        this.index = i;
      } else if (i === '+') {
        this.index = (this.index + 1) % this.len;
      } else if (i === '-') {
        this.index = (this.index - 1) % this.len;
      }
      // 改变后的索引
      return this.index;
    }
  };
  root.controlIndex = Control;
})(window.Zepto, window.player || (window.player = {}));
