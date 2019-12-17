//自己封装的一个插件
// 导入vue
import Vue from 'vue';
//导入axios
import axios from 'axios';
//创建插件对象
var myaxios = {};
//添加install方法
myaxios.install = function (Vue) {
    //设置一个拦截器
    axios.interceptors.request.use(function (config) {
        // console.log(config.url);
        //请求login页面的时候不需要带请求头
        if (config.url !== 'login') {
            //统一设置token
            // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            //把token放到config中
            config.headers.common['Authorization'] = localStorage.getItem('token');
        }
        return config;
    }, function (error) {

        return Promise.reject(error);
    });
    //统一设置axios的API
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
    // 给vue实例对象添加方法
    Vue.prototype.$http = axios;
}

//将对象暴露出去
export default myaxios;
