<template>
  <div class="category">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="(item, index) in list" :key="index">
        <a :href="'#city-' + item">{{ item }}</a>
      </dd>
    </dl>
    <dl
      class="m-categroy-section "
      v-for="(item, index) in cityGroup"
      :key="index"
      :id="'city-' + index"
    >
      <dt>{{ index }}</dt>
      <dd>
        <span v-for="city in item" :key="city.id" @click="changeCity(city)">
          {{ city.name }}</span
        >
      </dd>
    </dl>
  </div>
</template>
<script>
import serve from "@/serve";
export default {
  created() {
    serve.getCityList().then(resp => {
      var obj = {};
      resp.data.data.forEach((item, index) => {
        if (!obj[item.firstChar.toUpperCase()]) {
          obj[item.firstChar.toUpperCase()] = [];
        }
        obj[item.firstChar.toUpperCase()].push(item);
      });
      this.cityGroup = obj;
    });
  },
  data() {
    return {
      list: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      cityList: [],
      cityGroup: {}
    };
  },
  methods: {
    changeCity(item) {
      this.$store.dispatch("setPosition", item);
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/changecity/category.scss";
</style>
