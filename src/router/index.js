import Vue from 'vue'
import Router from 'vue-router'
//导入组件
import Login from '../components/login/login.vue';
import UserElement from '../components/userElement.vue';
import Home from '../components/home/home.vue';
import Users from '../components/users/users.vue';
import Rights from '../components/rights/rights.vue';
import Roles from '../components/roles/roles.vue';
import Categories from '../components/categories/categories.vue';

// 单独引入 Message：

import { Message } from 'element-ui';

Vue.use(Router)

var router = new Router({
  routes: [
    //当请求根目录时重定向到/home
    // { path: '/', redirect: '/home' },//重定向
    { path: '/', redirect: { name: 'home' } },//另一种写法
    { path: '/userElement', component: UserElement },//使用element-ui的路由
    { path: '/login', name: "login", component: Login }, //登录页面的路由
    //给home添加子路由
    {
      path: '/home', name: "home", component: Home, children: [
        { path: '/users', name: 'users', component: Users },//添加一个home的子路由users
        { path: '/rights', name: 'rights', component: Rights },//添加一个home的子路由rights
        { path: '/roles', name: 'roles', component: Roles },//添加一个home的子路由rights
        { path: '/categories', name: 'categories', component: Categories },//添加一个home的子路由categories
      ]
    }//home主页的路由
  ]
})
//使用导航守卫
router.beforeEach((to, from, next) => {
  //只要请求的路由不是login,都要进行登录验证
  if (to.path !== '/login') {
    //判断是否存在token
    let token = localStorage.getItem('token');
    if (!token) {
      Message.error('请先登录页面')
      //跳转到登录页面
      router.push('/login');
      return;
    }
  };
  next()//后续代码代码是否执行
})

export default router;