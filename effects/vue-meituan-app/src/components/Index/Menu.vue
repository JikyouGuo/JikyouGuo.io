<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="menuLeave">
      <dt>全部分类</dt>
      <dd
        v-for="(item, index) in menuList"
        :key="index"
        @mouseenter="menuEnter(item)"
      >
        <i :class="item.type"></i>
        {{ item.name }}
        <span class="arrow"></span>
      </dd>
    </dl>
    <div
      v-if="curDetail"
      class="detail"
      @mouseenter="detailEnter"
      @mouseleave="detailLeave"
    >
      <template v-for="(item, index) in curDetail.items">
        <h4 :key="index">{{ item.title }}</h4>
        <span v-for="(v, i) in item.items" :key="v + '_' + i">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
import serve from '@/serve'
export default {
  created() {
    serve.getLeftNav().then(resp=>{
      this.menuList=resp.data.data
    })
  },
  data() {
    return {
      menuList: [],
      curDetail: null,
      timer: null
    };
  },
  methods: {
    menuEnter(item) {
      this.curDetail = item;
    },
    menuLeave() {
      this.timer = setTimeout(() => {
        this.curDetail = null;
      }, 200);
    },
    detailEnter() {
      clearTimeout(this.timer);
    },
    detailLeave() {
      this.curDetail = null;
    }
  }
};
</script>

<style></style>
