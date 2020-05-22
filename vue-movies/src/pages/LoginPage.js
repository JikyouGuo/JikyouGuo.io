import Loading from '../components/Loading.js';

const template = `
<div class="loginPage">
    <div>
        <p>username: admin</p>
        <p>password: 123</p>
    </div>
    <label for="id">Username:
        <input v-model="user.id" type="text" name="id"/>
    </label>
    <label for="pwd">Password:
        <input v-model="user.pwd" type="password" maxlength="16" name="pwd"/>
    </label>
    <button @click="handleLogin()">login</button>
    <Loading v-show="isLoading"/>
</div>
`;

export default {
  template,
  components: {
    Loading
  },
  data() {
    return {
      user: {
        id: null,
        pwd: null
      }
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.user.isLoading;
    }
  },
  methods: {
    async handleLogin() {
      const result = await this.$store.dispatch('user/login', this.user);
      if (result) {
        this.$router.push(this.$store.state.user.toPath);
      } else {
        alert('Wrong username or password.');
      }
    }
  }
};
