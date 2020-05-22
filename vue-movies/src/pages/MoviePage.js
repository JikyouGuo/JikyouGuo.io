import MovieList from '../components/MovieList.js';
import Pager from '../components/Pager.js';
import Loading from '../components/Loading.js';

const template = `
<div class="moviePage">
    <MovieList :datas="datas"/>
    <Pager @changePage="current=$event" :current="current" :total="total" :pageSize="pageSize" :panelSize="panelSize"/>
    <Loading v-show="isLoading"/>
</div>
`;

export default {
  template,
  components: {
    MovieList,
    Pager,
    Loading
  },
  mounted() {
    this.$store.dispatch('movie/fetch');
  },
  computed: {
    ...Vuex.mapState('movie', ['total', 'datas', 'pageSize', 'panelSize', 'isLoading']),
    current: {
      get() {
        return this.$store.state.movie.current;
      },
      set(newPage) {
        this.$store.commit('movie/setState', { current: newPage });
        this.$store.dispatch('movie/fetch');
      }
    }
  }
};
