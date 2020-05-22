<template>
  <div class="page-changeCity">
    <el-row>
      <province />
    </el-row>
    <el-row>
      <hot title="热门城市:" :list="hotList" />
    </el-row>
    <el-row>
      <hot title="最近访问:" :list="rencentList" />
    </el-row>
    <el-row>
      <category />
    </el-row>
  </div>
</template>
<script>
import Province from "@/components/ChangeCity/Province";
import Hot from "@/components/Changecity/Hot";
import Category from "@/components/ChangeCity/Category";
import serve from "@/serve";
export default {
  data() {
    return {
      hotList: [],
      rencentList: []
    };
  },
  created() {
    serve.getHotCitys().then(resp => {
      this.hotList = resp.data.data.map(item => item.name);
    });
    serve.getRecentCitys().then(resp => {
      this.rencentList = resp.data.data.map(item => item.name);
    });
  },
  components: {
    Province,
    Hot,
    Category
  }
};
</script>
