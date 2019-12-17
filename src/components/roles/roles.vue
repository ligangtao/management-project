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
                <el-tag closable>{{ item1.authName }}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row v-for="(item2, index2) in item1.children" :key="index2">
                  <!-- 二级权限 -->
                  <el-col :span="5">
                    <el-tag type="success" closable>{{
                      item2.authName
                    }}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="19">
                    <el-tag
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
              @click="check(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import BreadNav from "../breadnav/breadnav.vue";
export default {
  data() {
    return {
      rolesData: []
    };
  },
  methods: {
    async getRolesList() {
      let res = await this.$http.get("roles");
      console.log(res);
      //解构赋值
      let { meta, data } = res.data;
      //判断
      if (meta.status === 200) {
        this.rolesData = data;
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
