<template>
  <div class="wrapper">
    <system-header></system-header>
    <system-menu></system-menu>
    <div class="right-content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import SystemHeader from './components/SystemHeader';
  import SystemMenu from './components/SystemMenu';
  export default {
    components: {
      SystemHeader,
      SystemMenu
    }
  };
</script>

<style></style>
