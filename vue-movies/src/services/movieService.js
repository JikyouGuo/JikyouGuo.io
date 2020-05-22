const url = './src/services/mock.json';

export default {
  async getMovies(current, pageSize) {
    const datas = await fetch(url).then(resp => resp.json());
    return {
      total: datas.length,
      datas: datas.slice((current - 1) * pageSize, current * pageSize)
    };
  },
  async getMovie(id) {
    const datas = await fetch(url).then(resp => resp.json());
    return datas.find(item => item._id === id);
  }
};
