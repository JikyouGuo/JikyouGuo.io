import toast from './toast.vue';
import Vue from 'vue';

const Toast = Vue.extend(toast);
const statuss = {
  success: '✔',
  fail: '✖',
  info: '●'
};

export default function({ status = 'success', msg = 'OK', duration = 2000 }) {
  const app = new Toast({
    el: document.createElement('div'),
    data: {
      status,
      statusValue: statuss[status],
      msg
    }
  });
  document.body.appendChild(app.$el);
  setTimeout(() => {
    app.flag = false;
    setTimeout(() => {
      app.show = false;
    }, duration - 500);
  }, duration);
}
