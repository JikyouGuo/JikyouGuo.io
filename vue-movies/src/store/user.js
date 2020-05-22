import loginService from '../services/loginService.js';

export default {
  namespaced: true,
  state: {
    user: null,
    isLoading: false,
    toPath: null
  },
  mutations: {
    setState(state, newState = {}) {
      for (const prop in newState) state[prop] = newState[prop];
    }
  },
  actions: {
    async login(context, payload) {
      context.commit('setState', { isLoading: true });
      const resp = await loginService.login(payload.id, payload.pwd);
      if (resp) {
        context.commit('setState', { user: resp });
        localStorage.setItem('userData', JSON.stringify(resp)); // 用户数据存储到本地
        context.commit('setState', { isLoading: false });
        return true;
      }
      context.commit('setState', { isLoading: false });
      return false;
    },
    logout(context) {
      context.commit('setState', { user: null });
      localStorage.removeItem('userData'); // 清除本地用户数据
    },
    syncLocal(context) {
      const local = localStorage.getItem('userData'); // 读取本地数据
      if (local) {
        const user = JSON.parse(local);
        context.commit('setState', { user }); // 更新本地数据到仓库
      }
    }
  }
};
