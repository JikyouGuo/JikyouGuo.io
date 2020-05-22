# test

1. 3d
   1. 自身：`transform: preserve-3d;` + `transform: rotateX(10deg) rotateY(-15deg);`
   2. 父级：`perspective: 景深`
2. 景深：
   1. `perspective`：距离观察者距离（none）
   2. `perspective-origin`：消失点（50% 50%）
3. 动画
   1. js 添加/清除 id/类 ，可以用`animation`或直接改变`transition`可监控的属性
