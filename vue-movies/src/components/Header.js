const template = `
<nav>
    <div class="left">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/movies">Movies</RouterLink>
    </div>
    <div class="right">
        <span v-if="userName">{{userName}}</span>
        <button v-if="!userName" @click="login">login</button>
        <button v-if="userName" @click="logout">logout</button>
    </div>
</nav>
`;

export default {
  template,
  computed: {
    userName() {
      if (this.$store.state.user.user) return this.$store.state.user.user.name;
    }
  },
  methods: {
    login() {
      this.$router.push('/login');
    },
    logout() {
      this.$store.dispatch('user/logout');
      window.location.reload(); // 刷新，触发路由
    }
  }
};
