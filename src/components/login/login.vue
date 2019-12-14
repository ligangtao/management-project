<template>
  <div id="loginbox">
    <h3>用户登录</h3>
    <!-- 通过设置 label-position 属性可以改变表单域标签的位置，可选值为 top、left，当设为 top 时标签会置于表单域的顶部 -->
    <!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      label-position="top"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="mybtn" type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用户对象
      ruleForm: {
        username: "",
        password: ""
      },
      // 验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      // 判断 form 中的元素是否满足验证条件
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //发送登录请求
          this.$http.post("/login", this.ruleForm).then(res => {
            //解构参数
            let { meta, data } = res.data;
            //判断登录状况
            if (meta.status == 200) {
              this.$message({
                message: meta.msg,
                type: "success"
              });
              //跳转到首页
              this.$router.push("/home");
              //将登录中的token保存到浏览器中的localstorage
              //   console.log(res.data.data.token);//token
              localStorage.setItem("token", res.data.data.token);
            } else {
              this.$message.error(meta.msg);
            }
          });
        } else {
          this.$message.error("请输入正确的用户名和密码!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
#loginbox {
  padding: 20px;
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
}
#loginbox .mybtn {
  width: 100%;
}
</style>
