const template = `
<div class="movie">
    <div class="poster">
        <img :src="movie.poster" alt="">
    </div> 
    <div class="words">
        <h2 class="title">
            <RouterLink :to="'/movies/'+movie._id">{{movie.name}}</RouterLink>
        </h2>
        <div class="attach">
            <span>英文名：{{movie.ename}}</span>
            <span>类型：{{movie.type}}</span>
            <span>上映地区：{{movie.area}}</span>
            <span>上映时间：{{movie.upDate}}</span>
            <span>时长：{{movie.time}}</span>
        </div> 
        <div class="desc">{{movie.intro}}</div>
    </div>
</div>
`;

export default {
  template,
  props: {
    movie: {
      type: Object,
      default: {}
    }
  }
};
