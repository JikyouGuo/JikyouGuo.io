import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
    totalPage: 0,
    current: 1,
    pageSize: 5,

    showModal: false,
    editStudent: {},

    searchValue: ''
  },
  mutations: {
    setState(state, newState = {}) {
      for (const prop in newState) state[prop] = newState[prop];
    },
    setTotalPage(state, count) {
      state.totalPage = Math.ceil(count / state.pageSize);
    },
    setCurrent(state, n) {
      if (n === -1 && state.current === 1) return;
      if (n === 0 && state.current === state.totalPage) return;
      if (n === -1) n = state.current - 1;
      if (n === 0) n = state.current + 1;
      state.current = n;
    }
  },
  actions: {
    getStuList({ commit, state }) {
      api.findByPage(state.current, state.pageSize).then(resp => {
        commit('setState', { list: resp.data.data.findByPage });
        commit('setTotalPage', resp.data.data.cont);
      });
    },
    updateStudent({ state, commit }, options) {
      return api.updateStudent(options).then(
        resp => {
          if (resp.data.status === 'success') {
            commit('setState', { showModal: false });
            Object.assign(state.editStudent, options);
            return {
              ...resp.data,
              duration: 2000
            };
          } else {
            return {
              ...resp.data,
              duration: 2000
            };
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    turnPage({ dispatch, commit, state }, n) {
      commit('setCurrent', n);
      if (state.searchValue) {
        dispatch('search', state.searchValue);
      } else {
        dispatch('getStuList');
      }
    },
    search({ commit, state }, v) {
      if (v) {
        api
          .searchStudent({ search: v, page: state.current, size: state.pageSize }) // 获取数据
          .then(resp => {
            commit('setState', { searchValue: v });
            commit('setCurrent', 1);
            commit('setState', { list: resp.data.data.searchList });
            commit('setTotalPage', resp.data.data.cont);
          });
      } else {
        this.dispatch('getStuList');
      }
    },
    detStu({ dispatch, state }, sNo) {
      api.delStu(sNo).then(_ => {
        if (state.totalPage === Math.ceil((state.count - 1) / state.size)) {
          dispatch('turnPage', state.nowPage);
        } else {
          dispatch('turnPage', -1);
        }
      });
    }
  },
  modules: {}
});
