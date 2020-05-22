<template>
  <div class="search">
    <input
      type="text"
      id="search-inp"
      @input="searchValue = $event.target.value"
      @keypress="$event.key === 'Enter' && search()"
    />
    <button id="search-btn" @click="search">
      搜索
    </button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchValue: ''
      };
    },
    methods: {
      search() {
        this.$store.commit('setState', { searchValue: this.searchValue });
        this.$store.dispatch('search', this.searchValue);
      }
    }
  };
</script>

<style></style>
