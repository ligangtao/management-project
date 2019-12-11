//自己封装的一个插件
// 导入vue
import Vue from 'vue';
//导入axios
import axios from 'axios';
//创建插件对象
var myaxios = {};
//添加install方法
myaxios.install = function (Vue) {
    // 统一设置axios的API
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
    // 给vue实例对象添加方法
    Vue.prototype.$http = axios;
}

//将对象暴露出去
export default myaxios;
