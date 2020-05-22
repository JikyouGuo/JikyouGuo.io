import Vue from 'vue';
import VueRouter from 'vue-router';
import StudentList from '../views/StudentList';
import AddStudent from '../views/AddStudent';
import Test from '../views/Test';

Vue.use(VueRouter);

const routes = [
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/AddStudent',
    name: 'AddStudent',
    component: AddStudent
  },
  {
    path: '/StudentList',
    name: 'StudentList',
    component: StudentList
  },
  {
    path: '*',
    redirect: '/StudentList'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
