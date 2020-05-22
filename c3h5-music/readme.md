# 移动端音乐播放器

## 技术选择

构建工具：gulp
js 库：zepto.js
css: less
data: "local mock"

## 内容

player 全局变量，控整个播放器

1. `player.render(data)` 渲染：img, info, isLike
2. `player.audioManager` 实例，控制音频播放相关功能
   1. 实例属性
      1. `audio` Audio 实例
      2. `status` "pause" | "play"
   2. 原型方法
      1. `play()`
      2. `pause()`
      3. `getAudio(src)` 改变 audio 的 src ，并 audio.load()
      4. `playTo(time)` 改变 audio 的 currentTime
3. `player.controlIndex`(长度) 控制播放哪一首歌
   1. `prev()` => 改变后索引
   2. `next()` => 改变后索引
   3. `getIndex()` => 改变后索引 改变索引的通用方法
4. `player.pro` 控制进度条：时间、长度、播放相关
   1. `renderAlltime(duration)` 渲染总时长、初始化
   2. `start(percent)` 播放
   3. `stop()`暂停
   4. `update(percent)` 更新
