<template>
  <!-- 使用根组件 -->
  <el-card>
    <!-- 使用面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加一个搜索框 -->
    <el-row class="myrow">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="search"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <!-- 添加一个按钮 -->
      &nbsp;<el-button type="success" plain @click="showAdd"
        >添加用户</el-button
      >
    </el-row>
    <!-- 添加一个表格 -->
    <!-- create_time: 1486720211
         email: "adsfad@qq.com"
         id: 500
         mg_state: true
         mobile: "12345678"
         role_name: "主管"
         username: "admin"-->
    <el-table :data="tableData" :border="true" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="mg_state" label="状态">
        <template slot-scope="scope">
          <!-- {{ scope.row }} scope.row:当前行的数据源 -->
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加一个对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="formObj" :rules="rules" ref="ruleForm">
        <el-form-item
          label="用户名"
          prop="username"
          :label-width="formLabelWidth"
        >
          <el-input v-model="formObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          type="password"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input v-model="formObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth">
          <el-input v-model="formObj.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postAdd">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      tableData: [],
      pagenum: 1, //页码
      pagesize: 10, //页容量
      formObj: {
        username: "",
        password: "",
        email: "",
        phone: ""
      },
      dialogFormVisible: false, //控制对话框的显示和隐藏
      formLabelWidth: "120px", //文本的宽度
      //表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "用户名长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "密码长度在 6 到 10 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //获取用户列表
    getUserList() {
      //获取token
      let token = window.localStorage.getItem("token");
      //发送请求时请求头要带上token
      this.$http
        .get("/users", {
          headers: { Authorization: token },
          params: {
            pagenum: this.pagenum,
            pagesize: this.pagesize
          }
        })
        .then(res => {
          //接收参数
          let { meta, data } = res.data;
          if (meta.status === 200) {
            // console.log(res.data);

            //将数据保存
            this.tableData = data.users;
          }
        });
    },
    showAdd() {
      this.dialogFormVisible = true; //打开对话框
    },
    //提交新增数据
    postAdd() {
      //获取token
      let token = window.localStorage.getItem("token");
      //1.验证数据是否合法
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //2.将数据提交到服务器
          this.$http
            .post("users", this.formObj, {
              //添加token
              headers: { Authorization: token }
            })
            .then(res => {
              console.log(res);
              //接收参数
              let { meta } = res.data;
              if (meta.status === 201) {
                //3.接收结果,重新渲染
                this.getUserList();
                //关闭面板
                this.dialogFormVisible = false;
                //清空内容
                
                this.formObj.username = "",
                this.formObj.password= "",
                this.formObj.email="",
                this.formObj.phone= "",
                
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
              }else{
                this.$message.error(meta.msg);       
              }
            });
        } else {
          this.$message.error("参数不合法");
          return false;
        }
      });
    }
  },
  //跳转页面执行的代码段
  mounted() {
    //获取users中的数据
    this.getUserList();
  }
};
</script>

<style scoped>
.myrow {
  margin-top: 20px;
}
</style>
