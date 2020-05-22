import Movie from '../components/Movie.js';
import Loading from '../components/Loading.js';
import movieService from '../services/movieService.js';

const template = `
<div>
    <Movie v-if="movie" :movie="movie"/>
    <Loading v-if="isLoading"/>
</div>
`;

export default {
  template,
  components: {
    Movie,
    Loading,
    movieService
  },
  data() {
    return {
      movie: null,
      isLoading: false
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.isLoading = true;
    movieService.getMovie(id).then(resp => {
      this.movie = resp;
      this.isLoading = false;
    });
  }
};
