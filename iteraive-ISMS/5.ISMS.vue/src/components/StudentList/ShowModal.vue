<template>
  <div class="modal" id="modal">
    <!-- 遮罩层 -->
    <div
      class="mask"
      id="mask"
      @click="$store.commit('setState', { showModal: false })"
    ></div>
    <!-- 编辑内容区 -->
    <div class="modal-content">
      <h3>编辑信息</h3>
      <form id="edit-form">
        <div>
          <label for="name">姓名 </label>
          <input
            type="text"
            id="name"
            name="name"
            :value="editStudent.name"
            @input="getValue($event, 'name')"
          />
        </div>
        <div>
          <label for="">性别</label>
          <input
            type="radio"
            name="sex"
            id="male"
            value="0"
            :checked="editStudent.sex === 0"
            @change="curStudent.sex = 0"
          />
          <label for="male" class="label-sex">男</label>
          <input
            type="radio"
            name="sex"
            id="female"
            value="1"
            :checked="editStudent.sex === 1"
            @change="curStudent.sex = 1"
          />
          <label for="female" class="label-sex">女</label>
        </div>
        <div>
          <label for="sNo">学号</label
          ><input
            type="text"
            id="sNo"
            name="sNo"
            :value="editStudent.sNo"
            @input="getValue($event, 'sNo')"
          />
        </div>
        <div>
          <label for="email">邮箱</label
          ><input
            type="text"
            id="email"
            name="email"
            :value="editStudent.email"
            @input="getValue($event, 'email')"
          />
        </div>
        <div>
          <label for="birth">出生年</label>
          <input
            type="text"
            id="birth"
            name="birth"
            :value="editStudent.birth"
            @input="getValue($event, 'birth')"
          />
        </div>
        <div>
          <label for="phone">手机号</label>
          <input
            type="text"
            id="phone"
            name="phone"
            :value="editStudent.phone"
            @input="getValue($event, 'phone')"
          />
        </div>
        <div>
          <label for="address">住址</label>
          <input
            type="text"
            id="address"
            name="address"
            :value="editStudent.address"
            @input="getValue($event, 'address')"
          />
        </div>
        <div>
          <label for=""></label>
          <input
            type="button"
            class="btn"
            id="edit-submit-btn"
            value="submit"
            @click="commit"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        curStudent: {}
      };
    },
    computed: {
      editStudent() {
        return this.$store.state.editStudent;
      }
    },
    methods: {
      getValue(e, prop) {
        this.curStudent[prop] = e.target.value;
      },
      commit() {
        // curStudent editStudent
        const student = Object.assign({}, this.editStudent, this.curStudent);
        this.$store.dispatch('updateStudent', student).then(data => {
          this.$Toast(data);
        });
      }
    }
  };
</script>

<style></style>
