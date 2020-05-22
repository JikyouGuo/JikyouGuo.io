<!-- 
  1. 单独编写
  2. totalPage在store里，再加入current
  3. 添加setCurrent到mutations
  4. 改写turnPage到actions
  5. 引入current, totalPage, turnPage()到pager
 -->
<template>
  <div class="pager">
    <ul>
      <li @click="turnPage(-1)" :class="current === 1 ? 'disabled' : ''">&lt;</li>
      <template v-if="totalPage > panelSize && current > this.panelUnit + 1">
        <li @click="turnPage(1)">1</li>
        <li v-show="current - this.panelUnit > 2">···</li>
      </template>
      <li
        v-for="i in panelArray"
        :key="i"
        @click="turnPage(i)"
        :class="i === current ? 'current' : ''"
      >{{ i }}</li>
      <template v-if="totalPage > panelSize && current < totalPage - this.panelUnit">
        <li v-show="current + this.panelUnit < totalPage - 1">···</li>
        <li @click="turnPage(totalPage)">{{ totalPage }}</li>
      </template>
      <li @click="turnPage(0)" :class="current === totalPage ? 'disabled' : ''">&gt;</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    panelSize: {
      type: Number,
      default: 5
    }
  },
  computed: {
    ...mapState(["current", "totalPage"]),
    panelUnit() {
      return Math.floor(this.panelSize / 2);
    },
    panelArray() {
      let arr;
      if (this.totalPage < this.panelSize) {
        arr = [];
        for (let i = 0; i < this.totalPage; i++) arr[i] = i + 1;
      } else {
        arr = new Array(this.panelSize);
        let min = this.current - this.panelUnit;
        const minMax = this.totalPage - this.panelSize + 1;
        if (min < 1) min = 1;
        if (min > minMax) min = minMax;
        for (let i = 0; i < this.panelSize; i++) arr[i] = min + i;
      }
      return arr;
    }
  },
  methods: {
    ...mapActions(["turnPage"])
  }
};
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.pager {
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
.pager ul {
  display: flex;
  justify-content: space-between;
}
.pager li {
  width: 30px;
  height: 30px;
  font: 20px/30px serif;
  color: black;
  text-align: center;
  box-shadow: 1px 1px 5px -2px;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  margin: 0 2px;
  user-select: none;
}
.pager li.current {
  color: mediumaquamarine;
  cursor: default;
}
li:hover:not(.current, .disabled) {
  color: coral;
}
li.disabled {
  color: gray;
  cursor: not-allowed;
  background-color: lightgray;
}
</style>
