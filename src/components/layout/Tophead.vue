<template>
  <!-- 分三个部分 -->
  <el-row>
    <el-col class="my-col" :span="4">
      <div class="grid-content bg-purple">
        <img src="../../../static/logo.png" alt="" />
      </div>
    </el-col>
    <el-col class="my-col" :span="16">
      <div class="grid-content bg-purple-light">
        <h1>电商后台管理系统</h1>
      </div>
    </el-col>
    <el-col class="my-col loginout" :span="4">
      <div class="grid-content bg-purple">
        <a href="#" @click.prevent="loginout">退出</a>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    loginout() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "退出登录成功!"
        });
        //清除token
        window.localStorage.removeItem("token");
        //跳转回登录页面
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
.mycol {
  height: 60px;
}
.loginout {
  text-align: right;
}
.loginout a {
  text-decoration: none;
  color: green;
}
</style>
