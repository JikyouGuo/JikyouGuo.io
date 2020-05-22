<template>
  <div class="m-header">
    <el-row>
      <top-bar/>
    </el-row>
    <el-row>
      <search-bar/>
    </el-row>
  </div>
</template>

<script>
import TopBar from './TopBar'
import SearchBar from './SearchBar'
export default {
  components: {
    TopBar,
    SearchBar
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/public/header/index.scss';
</style>
