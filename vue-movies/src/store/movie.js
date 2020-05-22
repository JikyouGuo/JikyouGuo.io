import movieService from '../services/movieService.js';

export default {
  namespaced: true,
  state: {
    current: 1,
    total: 0,
    pageSize: 2,
    panelSize: 5,
    datas: [],
    isLoading: false
  },
  mutations: {
    setState(state, newState = {}) {
      for (const prop in newState) state[prop] = newState[prop];
    }
  },
  actions: {
    fetch(context) {
      context.commit('setState', { isLoading: true });
      movieService.getMovies(context.state.current, context.state.pageSize).then(resp => {
        context.commit('setState', resp);
        context.commit('setState', { isLoading: false });
      });
    }
  }
};
