import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/index.css';
import api from './api'; // 默认index.js
import toast from './tools/toast';

Vue.config.productionTip = false;
Vue.prototype.$api = api; // api导出封装好的，ajax请求，挂载到原型，便于使用
Vue.prototype.$Toast = toast;

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount('#app');
