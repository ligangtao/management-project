<template>
  <!-- 使用根组件 -->
  <el-card>
    <!-- 使用面包屑导航 -->
    <BreadNav :navone="'用户管理'" :navtwo="'用户列表'" />
    <!-- 添加一个搜索框 -->
    <el-row class="myrow">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="search"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchData"
          ></el-button>
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
            @change="changeStu(scope.row.id, scope.row.mg_state)"
            v-model="scope.row.mg_state"
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
            @click="getEdit(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="DelAdd(scope.row.id)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            plain
            size="mini"
            @click="check(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加一个对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialog">
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
          <el-input v-model="formObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="postAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加一个修改用户信息的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialog">
      <el-form :model="formObj" :rules="rules">
        <el-form-item
          label="用户名"
          prop="username"
          :label-width="formLabelWidth"
        >
          <el-input
            :disabled="true"
            v-model="formObj.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth">
          <el-input v-model="formObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="postEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加一个分配角色的对话框 -->
    <el-dialog title="分配角色" :visible.sync="checkDialog">
      <el-form :model="formObj" ref="ruleForm">
        <el-form-item
          label="用户名"
          prop="username"
          :label-width="formLabelWidth"
        >
          {{ formObj.username }}
        </el-form-item>
        <el-form-item
          label="角色"
          prop="username"
          :label-width="formLabelWidth"
        >
          {{ formObj.rid }}
          <el-select v-model="formObj.rid" placeholder="请选择">
            <el-option :value="-1" label="请选择"></el-option>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkDialog = false">取 消</el-button>
        <el-button type="primary" @click="postcheck">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import BreadNav from "../breadnav/breadnav.vue";
export default {
  data() {
    return {
      search: "", //搜索框中的数据
      tableData: [],
      pagenum: 1, //页码
      pagesize: 20, //页容量
      formObj: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addDialog: false, //控制新增对话框的显示和隐藏
      editDialog: false, //控制修改对话框的显示和隐藏
      checkDialog: false, //控制分配角色对话框的显示和隐藏
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
      },
      //选项
      options: [],
      id: ""
    };
  },
  methods: {
    //获取用户列表
    getUserList() {
      //获取token
      let token = window.localStorage.getItem("token");
      //发送请求时请求头要带上token
      this.$http
        .get("users", {
          //   headers: { Authorization: token },
          params: {
            pagenum: this.pagenum,
            pagesize: this.pagesize,
            query: this.search
          }
        })
        .then(res => {
          //   console.log(res.data);
          //接收参数
          let { meta, data } = res.data;
          if (meta.status === 200) {
            //将数据保存
            this.tableData = data.users;
          } else {
            this.$message.error(meta.msg);
          }
        });
    },
    //显示新增对话框
    showAdd() {
      //清空内容

      (this.formObj.username = ""),
        (this.formObj.password = ""),
        (this.formObj.email = ""),
        (this.formObj.mobile = ""),
        (this.addDialog = true);
    },
    //提交新增数据
    postAdd() {
      //1.验证数据是否合法
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //2.将数据提交到服务器
          this.$http
            .post("users", this.formObj, {
              //添加token
              //   headers: { Authorization: window.localStorage.getItem("token") }
            })
            .then(res => {
              //接收参数
              let { meta } = res.data;
              if (meta.status === 201) {
                //3.接收结果,重新渲染
                this.getUserList();
                //关闭面板
                this.addDialog = false;
                //清空内容

                (this.formObj.username = ""),
                  (this.formObj.password = ""),
                  (this.formObj.email = ""),
                  (this.formObj.mobile = ""),
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
              } else {
                this.$message.error(meta.msg);
              }
            });
        } else {
          this.$message.error("参数不合法");
          return false;
        }
      });
    },
    //搜索数据
    searchData() {
      //获取users中的数据
      this.getUserList();
    },
    //打开修改面板&得到要修改的数据
    getEdit(id) {
      this.editDialog = true;
      //根据id获取数据
      this.$http
        .get(`users/${id}`, {
          //   headers: {
          //     Authorization: window.localStorage.getItem("token")
          //   }
        })
        .then(res => {
          //   console.log(res.data);
          //解析赋值
          let { meta, data } = res.data;
          //判断
          if (meta.status === 200) {
            this.formObj = data;
          }
        });
    },
    //提交修改的数据
    postEdit() {
      //提交数据
      this.$http
        .put(
          `users/${this.formObj.id}`,
          {
            email: this.formObj.email,
            mobile: this.formObj.mobile
          },
          {
            // headers: { Authorization: window.localStorage.getItem("token") }
          }
        )
        .then(res => {
          //接收参数
          let { meta } = res.data;
          //判断
          if (meta.status === 200) {
            //关闭面板
            this.editDialog = false;
            //重新渲染
            this.getUserList();
            //弹出修改成功的信息
            this.$message({
              message: meta.msg,
              type: "success"
            });
          } else {
            this.$message.error(meta.msg);
          }
        });
    },
    //删除提交的数据
    DelAdd(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //根据id来删除数据
          this.$http
            .delete(`users/${id}`, {
              //   headers: { Authorization: window.localStorage.getItem("token") }
            })
            .then(res => {
              //接收参数
              let { meta } = res.data;
              //判断
              if (meta.status === 200) {
                //重新渲染页面
                this.getUserList();
                //弹出删除成功的信息
                this.$message({
                  message: meta.msg,
                  type: "success"
                });
              } else {
                this.$message.error(meta.msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //改变用户状态
    changeStu(id, state) {
      this.$http
        .put(
          `users/${id}/state/${state}`,
          {},
          {
            // headers: { Authorization: window.localStorage.getItem("token") }
          }
        )
        .then(res => {
          //console.log(res);
          //接收参数
          let { meta } = res.data;
          //判断
          if (meta.status === 200) {
            this.$message({
              message: meta.msg,
              type: "success"
            });
          } else {
            this.$message.error(meta.msg);
          }
        });
    },
    //得到下拉框中的数据
    getOptions() {
      this.$http
        .get(`roles`, {
          //   headers: { Authorization: window.localStorage.getItem("token") }
        })
        .then(res => {
          let { meta, data } = res.data;
          this.options = data;
        });
    },
    //获取角色权限
    check(id) {
      this.checkDialog = true;
      //根据id获取数据
      this.$http
        .get(`users/${id}`, {
          //   headers: { Authorization: window.localStorage.getItem("token") }
        })
        .then(res => {
          let { meta, data } = res.data;
          if (meta.status === 200) {
            this.formObj = data;
          }
        });
    },
    //修改用户权限
    postcheck() {
      console.log(this.formObj);
      this.$http
        .put(
          `users/${this.formObj.id}/role`,
          {
            rid: this.formObj.rid
          },
          {
            // headers: { Authorization: window.localStorage.getItem("token") }
          }
        )
        .then(res => {
          console.log(res.data);
          let { meta, data } = res.data;
          if (meta.status === 200) {
            this.$message({
              message: meta.msg,
              type: "success"
            });
            //重新渲染
            this.getUserList();
            // 关闭面板
            this.checkDialog = false;
          } else {
            this.$message.error(meta.msg);
          }
        });
    }
  },
  //跳转页面执行的代码段
  mounted() {
    //获取users中的数据
    this.getUserList();
    //获取下拉框中的数据
    this.getOptions();
  },
  components: {
    BreadNav
  }
};
</script>

<style scoped>
.myrow {
  margin-top: 20px;
}
</style>
