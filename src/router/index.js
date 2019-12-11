import Vue from 'vue'
import Router from 'vue-router'
//导入组件
import Login from '../components/login/login.vue';
import UserElement from '../components/userElement.vue';
import Home from '../components/home/home.vue';

Vue.use(Router)

export default new Router({
  routes: [
    //当请求根目录时重定向到/home
    // { path: '/', redirect: '/home' },//重定向
    { path: '/', redirect: { name: 'home' } },//另一种写法
    { path: '/userElement', component: UserElement },//使用element-ui的路由
    { path: '/login', name: "login", component: Login }, //登录页面的路由
    { path: '/home', name: "home", component: Home }//home主页的路由
  ]
})
