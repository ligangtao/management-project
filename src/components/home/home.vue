<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <Tophead />
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <Aside />
      </el-aside>
      <!-- 内容区域 -->
      <el-main>
        <!-- 添加一个路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//引入头部组件
import Tophead from "../layout/Tophead.vue";
//引入侧边栏组件
import Aside from "../layout/Aside.vue";

export default {
  //进入页面执行的代码
  mounted() {
    //判断页面是否存在token
    let token = window.localStorage.getItem("token");
    if (!token) {
      //跳转回登录页面
      this.$router.push("/login");
    }
  },
  components: {
    Tophead,
    Aside
  }
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
