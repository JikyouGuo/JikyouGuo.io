<!-- 
  toast 通知消息
  为Vue添加构造函数，以创建多个相同的Vue实例
  1. ./toast.vue 编写组件
  2. ./index.js Vue.extend() 扩展
  3. main.js 将Toast放到Vue.prototype上
  4. 使用
 -->
<template>
  <div class="show-content" v-if="show" :class="animate">
    <div class="info-content" :class="'style-' + status">
      <span>{{ statusValue }}</span>
      <span>{{ msg }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: true,
        flag: true
      };
    },
    computed: {
      animate() {
        return this.flag ? 'fade-in' : 'fade-out';
      }
    }
  };
</script>

<style scoped>
  /* scoped 局部作用域 */
  .style-success span:nth-child(1) {
    color: lightseagreen;
  }
  .style-fail span:nth-child(1) {
    color: crimson;
  }
  .style-info span:nth-child(1) {
    color: orange;
  }
  .info-content {
    padding: 5px 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px -2px black;
    background-color: white;
    color: black;
    font-weight: 700;
  }
  .show-content span:nth-child(1) {
    margin-right: 10px;
  }
  .show-content {
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
  }
  @keyframes fadeIn {
    from {
      top: 0;
      opacity: 0;
    }
    to {
      top: 50px;
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    to {
      top: 0;
      opacity: 0;
    }
    from {
      top: 50px;
      opacity: 1;
    }
  }
  .fade-in {
    animation: fadeIn 0.5s;
  }
  .fade-out {
    animation: fadeIn 0.5s;
  }
</style>
