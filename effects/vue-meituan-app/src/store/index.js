import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    position: {},
    userName: ''
  },
  mutations: {
    setPosition (state, val) {
      state.position = val
    },
    setUserName (state, val) {
      state.userName = val
    }
  },
  actions: {
    setPosition ({ commit }, val) {
      // 异步请求后端获取当前位置数据
      commit('setPosition', val)
    }
  }
})
