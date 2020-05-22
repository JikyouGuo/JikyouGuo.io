const template = `
<div class="pager">
    <a class="pager-item" @click="changePage(current-1)" :class="{disabled:current===1}">Prev</a>
    <a class="pager-item" @click="changePage(1)" :class="{disabled:current===1}">First</a>
    <a class="pager-item pager-num"
    :class="{active: current===num}"
    @click="changePage(num)"
    v-for="num in panelArr">{{num}}</a>
    <a class="pager-item" @click="changePage(pageNum)" :class="{disabled:current===pageNum}">Last</a>
    <a class="pager-item" @click="changePage(current+1)" :class="{disabled:current===pageNum}">Next</a>
    <span class="pager-text">
        <i>{{current}}/{{pageNum}}</i>
    </span>
</div>
`;

export default {
  template,
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 33
    },
    pageSize: {
      type: Number,
      default: 10
    },
    panelSize: {
      type: Number,
      default: 5
    }
  },
  computed: {
    pageNum() {
      return Math.ceil(this.total / this.pageSize);
    },
    panelArr() {
      const arr = Array(this.panelSize);
      const unit = Math.floor(this.panelSize / 2);
      let min = this.current - unit;
      const minMax = this.pageNum - this.panelSize + 1;
      if (min < 1) min = 1;
      if (min > minMax) min = minMax;
      for (let i = 0; i < this.panelSize; i++) {
        arr[i] = min + i;
      }
      return arr;
    }
  },
  methods: {
    changePage(newPage) {
      if (newPage < 1 || newPage > this.pageNum || newPage === this.current) return;
      this.$emit('changePage', newPage);
    }
  }
};
