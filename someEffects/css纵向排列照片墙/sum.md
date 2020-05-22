# 卷帘画廊

1. 要点
   1. **初始化：**
      1. 设置init样式，再用js去掉`init`类名。
      需要用setTimeout保证在DOM加载完成后。
      2. keyframes animation.
      但必须经过，从初始状态，瞬间变化到，第一帧。不友好。需要加``保持最后一帧。
   2. **过渡变异：** 添加`active`类名，实现的动画，在去掉类名时，需要不同的过渡效果。
      在其父级添加`active`：
        1. 添加时的过渡：
        `sup.active sub{transition}`
        `sup.active sub:not(.active){transition}`
        2. 去掉时的过渡：
        `sub{transition}`
