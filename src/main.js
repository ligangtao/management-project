//引入vue
import Vue from 'vue'
//引入element-ui
import ElementUI from 'element-ui';
//引入element-ui的样式文件
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import App from './App'
//引入路由
import router from './router'
//引入axios
import myaxios from './assets/js/myaxios.js';
//使用myaxios
Vue.use(myaxios);

//使用element-ui
Vue.use(ElementUI);

//引入全局样式
import './assets/css/index.css'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
