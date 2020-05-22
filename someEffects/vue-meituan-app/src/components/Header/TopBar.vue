<template>
  <el-row class="m-header-topbar m-header">
    <el-col :span='10'>
      <geo />
    </el-col>
    <el-col :span='14'>
      <my-nav />
    </el-col>
  </el-row>
</template>

<script>
import Geo from './Geo'
import MyNav from './Nav'
export default {
  components: {
    Geo,
    MyNav
  }
}
</script>
