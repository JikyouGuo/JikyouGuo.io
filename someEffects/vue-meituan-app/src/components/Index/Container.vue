<template>
  <div class="m-istyle">
    <dl @mouseover="over" :class="nav.class">
      <dt>{{ nav.title }}</dt>
      <dd
        v-for="(item, index) in nav.list"
        :key="index"
        :class="{ active: kind == item.tab }"
        :data-type="item.tab"
      >
        {{ item.text }}
      </dd>
    </dl>
    <ul class="ibody">
      <li v-for="(item, index) in resultsData[kind]" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.image" class="image" />
          <div class="cbody">
            <div class="title" :title="item.title">{{ item.title }}</div>
            <div class="sub-title" :title="item.sub_title">
              {{ item.sub_title }}
            </div>
            <div class="price-info">
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">¥</span>
                <span class="current-price numfont">{{ item.price }}</span>
              </span>
              <span class="sold bottom-right-info">{{ item.address }}</span>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
import serve from '@/serve'
export default {
  created() {
    serve.getProducts().then(res => {
      this.resultsData = res.data.data;
    });
  },
  props: ["nav"],
  data() {
    return {
      kind: "all",
      resultsData: {}
    };
  },
  methods: {
    over(e) {
      let dom = e.target;
      let tagName = dom.tagName.toLowerCase();
      if (tagName != "dd") {
        return false;
      }
      this.kind = dom.getAttribute("data-type");
      // 动态获取数据  ajax请求
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>
