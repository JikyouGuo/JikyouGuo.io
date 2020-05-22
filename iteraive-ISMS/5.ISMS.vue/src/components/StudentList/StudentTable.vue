<template>
  <table>
    <thead>
      <tr>
        <th>学号</th>
        <th>姓名</th>
        <th>性别</th>
        <th>邮箱</th>
        <th>年龄</th>
        <th>手机号</th>
        <th>住址</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody id="table-body">
      <tr v-for="(item, index) in list" :key="index">
        <td>{{ item.sNo }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.sex ? '女' : '男' }}</td>
        <td>{{ item.email }}</td>
        <td>{{ countAge(item.birth) }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.address }}</td>
        <td>
          <button class="btn edit" @click="editStudent(item)">编辑</button>
          <button class="btn del" @click="deleteStudent(item.sNo)">删除</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  export default {
    created() {
      this.getStuList();
    },
    methods: {
      editStudent(stu) {
        this.setState({
          showModal: true,
          editStudent: stu
        });
      },
      deleteStudent(sNo) {},
      countAge(birthYear) {
        return new Date().getFullYear() - birthYear;
      },
      ...mapMutations(['setState']),
      ...mapActions(['getStuList'])
    },
    computed: {
      ...mapState(['list'])
    }
  };
</script>

<style></style>
