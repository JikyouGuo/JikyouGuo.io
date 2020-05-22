import Movie from './Movie.js';

const template = `
<div class="movieList">
    <Movie :movie="movie" :key="movie._id" v-for="movie in datas"/>
</div>
`;

export default {
  template,
  components: {
    Movie
  },
  props: {
    datas: {
      type: Array,
      default: () => []
    }
  }
};
