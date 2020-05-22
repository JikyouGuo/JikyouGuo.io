import App from './App.js';
import router from './router.js';
import store from './store/store.js';

store.dispatch('user/syncLocal'); // 启动Vue时同步本地数据

new Vue({
  el: '#app',
  template: `<App/>`,
  components: { App },
  router,
  store
});
