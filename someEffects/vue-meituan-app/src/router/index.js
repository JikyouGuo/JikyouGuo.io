import Vue from 'vue'
import Router from 'vue-router'
import DefaultPage from '@/layout/DefaultPage'
import BlankPage from '@/layout/BlankPage'
import GoodsList from '@/page/GoodsList'
import Index from '@/page/Index'
import ChangeCity from '@/page/ChangeCity'
import Login from '@/page/Login'
import Register from '@/page/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DefaultPage',
      component: DefaultPage,
      redirect: '/index',
      children: [{ // 嵌套路由，在父组件添加router-view的位置渲染
        path: 's/:name',
        name: 'goods',
        component: GoodsList
      }, {
        path: '/index',
        name: 'index',
        component: Index
      }, {
        path: '/changeCity',
        name: 'changeCity',
        component: ChangeCity
      }]
    },
    {
      path: '/blank',
      name: 'BlankPage',
      component: BlankPage,
      children: [{
        path: 'login',
        name: 'login',
        component: Login
      }, {
        path: 'register',
        name: 'register',
        component: Register
      }]
    }
  ]
})
