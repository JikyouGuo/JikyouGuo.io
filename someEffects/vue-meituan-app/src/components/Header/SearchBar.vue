<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col class="left" :span="3">
        <a target="_blank" href="https://meituan.com/">
          <img
            src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png"
            alt="美团"
          />
        </a>
      </el-col>
      <el-col class="center" :span="15">
        <div class="wrapper">
          <el-input
            v-model="searchWord"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @input="input"
          />
          <el-button type="primary" icon="el-icon-search" />
          <dl class="hotPlace" v-show="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, index) in hotPlaceList" :key="item + '_' + index">
              <router-link :to="{ name: 'goods', params: { name: item } }">
                {{ item }}
              </router-link>
            </dd>
          </dl>
          <dl class="searchList" v-show="isSearchList">
            <dd v-for="(item, index) in searchList" :key="item + '_' + index">
              <router-link :to="{ name: 'goods', params: { name: item } }">
                {{ item }}
              </router-link>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <router-link
            v-for="(item, index) in suggestList"
            :key="item + '_' + index"
            :to="{ name: 'goods', params: { name: item } }"
          >
            {{ item }}
          </router-link>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import serve from "@/serve";
export default {
  created() {
    serve.getHotSearch().then(resp => {
      this.hotPlaceList = resp.data.data;
      this.suggestList = resp.data.data;
    });
  },
  data() {
    return {
      searchWord: "",
      isFocus: false,
      hotPlaceList: [],
      searchList: [],
      suggestList: []
    };
  },
  computed: {
    isHotPlace() {
      return this.isFocus && !this.searchWord;
    },
    isSearchList() {
      return this.isFocus && this.searchWord;
    }
  },
  methods: {
    focus() {
      this.isFocus = true;
    },
    blur() {
      setTimeout(() => {
        this.isFocus = false;
      }, 200);
    },
    input() {
      const val = this.searchWord;
      serve.getSearchList().then(resp => {
        this.searchList = resp.data.data.list.filter(v => v.includes(val));
      });
    }
  }
};
</script>
