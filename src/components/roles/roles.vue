<template>
  <div>
    <!-- 添加一个根组件 -->
    <el-card>
      <!-- 添加面包屑导航 -->
      <BreadNav :navone="'权限管理'" :navtwo="'角色列表'" />
      <!-- 添加一个按钮 -->
      <el-row class="myrow">
        <el-col :span="6">
          <el-button plain>添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 添加一个表格 -->
      <el-table :data="rolesData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 外层行 -->
            <el-row v-for="(item1, index1) in scope.row.children" :key="index1">
              <!-- 一级权限 -->
              <el-col :span="4">
                <el-tag
                  @close="myclose(scope.row.id, item1.id, scope)"
                  closable
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row v-for="(item2, index2) in item1.children" :key="index2">
                  <!-- 二级权限 -->
                  <el-col :span="5">
                    <el-tag
                      @close="myclose(scope.row.id, item2.id, scope)"
                      type="success"
                      closable
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="19">
                    <el-tag
                      @close="myclose(scope.row.id, item3.id, scope)"
                      class="mytag"
                      type="warning"
                      closable
                      v-for="(item3, index3) in item2.children"
                      :key="index3"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
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
              @click="openroleDialog(scope)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加一个分配角色权限的对话框 -->
      <!-- default-expand-all:默认全部展开  :default-checked-keys="[]":默认选中的节点-->
      <!-- node-key:设置节点的唯一标识 -->
      <el-dialog title="权限分配" :visible.sync="roleDialog">
        <el-tree
          :data="tableData"
          :props="props"
          node-key="id"
          ref="tree"
          :default-expand-all="true"
          :default-checked-keys="defaultCheck"
          show-checkbox
        >
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="roleDialog = false">取 消</el-button>
          <el-button type="primary" @click="setRight">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import BreadNav from "../breadnav/breadnav.vue";

export default {
  data() {
    return {
      rolesData: [],
      roleDialog: false, //控制分配角色对话框的显示和隐藏
      tableData: [],
      props: {
        children: "children",
        label: "authName"
      },
      defaultCheck: [], //默认选中的数组
      rid: "" //保存分配权限的角色的id
    };
  },
  methods: {
    async getRolesList() {
      let res = await this.$http.get("roles");
      // console.log(res);
      //解构赋值
      let { meta, data } = res.data;
      //判断
      if (meta.status === 200) {
        this.rolesData = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    //删除角色权限
    async myclose(roleId, rightId, scope) {
      // console.log(roleId, rightId);
      //发送请求到服务器去删除角色对应的权限
      let res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`);
      // console.log(res);
      //解构赋值
      let { meta, data } = res.data;
      //判断
      if (meta.status === 200) {
        //更新当前行的数据源
        scope.row.children = data;
        this.$message.success(meta.msg);
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 打开分配角色权限的对话框
    async openroleDialog(scope) {
      this.rid = scope.row.id; //打开对话框时要把角色id保存起来
      this.defaultCheck = []; //每次打开对话框清空默认选中
      this.roleDialog = true; //打开分配角色权限的对话框
      //渲染所有角色权限列表
      let res = await this.$http.get(`rights/tree`);
      // console.log(res);
      //解构赋值
      let { meta, data } = res.data;
      //判断
      if (meta.status === 200) {
        //将数据保存到tableData
        this.tableData = data;
        //设置默认选中的权限
        //得到所有的三级权限
        //第一级权限
        scope.row.children.forEach(item1 => {
          //第二级权限
          item1.children.forEach(item2 => {
            //第三级权限
            item2.children.forEach(item3 => {
              //得到所有三级权限的id
              this.defaultCheck.push(item3.id);
            });
          });
        });
        // console.log(this.defaultCheck);
      } else {
        this.$message.error(meta.msg);
      }
    },
    //设置权限
    async setRight() {
      //获取当前树形结构中的一级权限&二级权限&三级权限
      //getCheckedKeys	得到全选节点的key
      //getHalfCheckedKeys	得到半选节点的key
      let allcheck = this.$refs.tree.getCheckedKeys();
      // console.log(allcheck);
      let half = this.$refs.tree.getHalfCheckedKeys();
      // console.log(half);
      //合并
      let arr = [...half, ...allcheck];
      //转为字符串
      let rids = arr.join(",");
      // console.log(rids);
      //发送请求到服务器
      let res = await this.$http.post(`roles/${this.rid}/rights`, {
        rids: rids
      });
      console.log(res);
      //结构
      let { meta, data } = res.data;
      //判断
      if (meta.status === 200) {
        this.$message.success(meta.msg);
        //关闭对话框
        this.roleDialog = false;
        //更新数据
        this.getRolesList();
      } else {
        this.$message.error(meta.msg);
      }
    }
  },
  mounted() {
    this.getRolesList();
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
.mytag {
  margin-right: 20px;
  margin-bottom: 10px;
}
</style>
