<template>
  <div class="m-geo">
    <div class="position">
      <i class="el-icon-location" />
      {{ $store.state.position.name }}
      <router-link class="changeCity" :to="{ name: 'changeCity' }">
        切换城市
      </router-link>
      [
      <a href="#" v-for="(item, index) in nearCity" :key="index">
        {{ item.name }}
      </a>
      ]
    </div>
    <div class="m-user" v-if="!$store.state.userName">
      <router-link class="login" :to="{ name: 'login' }">
        立即登录
      </router-link>
      <router-link class="register" :to="{ name: 'register' }">
        注册
      </router-link>
    </div>
  </div>
</template>

<script>
import serve from "@/serve";
export default {
  data() {
    return {
      nearCity: []
    };
  },
  watch: {
    "$store.state.position": function() {
      this.nearCity = this.$store.state.position.nearCity;
    }
  },
  created() {
    serve.getPosition().then(resp => {
      this.$store.dispatch("setPosition", resp.data.data);
      this.nearCity = resp.data.data.nearCity;
    });
  }
};
</script>
