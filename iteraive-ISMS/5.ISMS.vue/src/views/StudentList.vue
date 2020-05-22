<template>
  <div class="student-list content" id="student-list">
    <student-search></student-search>
    <student-table></student-table>
    <pager></pager>
    <transition>
      <show-modal v-show="$store.state.showModal"></show-modal>
    </transition>
  </div>
</template>

<script>
  import StudentSearch from '../components/StudentList/StudentSearch';
  import StudentTable from '../components/StudentList/StudentTable';
  import Pager from '../components/StudentList/Pager';
  import ShowModal from '../components/StudentList/ShowModal';
  export default {
    components: {
      StudentSearch,
      StudentTable,
      Pager,
      ShowModal
    }
  };
</script>

<style>
  /* <transition></transition>会生成6个类名，用来过度动画 */
  /* v-enter v-enter-to v-enter-active */
  /* v-leave v-leave-to v-leave-active */
  .v-enter,
  .v-leave-to {
    opacity: 0;
  }
  .v-enter-to,
  .v-leave {
    opacity: 1;
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s linear;
  }
</style>
