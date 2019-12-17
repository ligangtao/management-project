<template>
  <!-- 使用根组件 -->
  <el-card>
    <!-- 使用面包屑导航 -->
    <BreadNav :navone="'权限管理'" :navtwo="'权限列表'" />
    <!-- 添加一个表格 -->
    <el-table
      :data="getRightsData"
      :border="true"
      style="width: 100%"
      class="myclass"
    >
      <!-- authName: "商品管理" id: 101 level: "0" path: "goods" pid: 0 -->
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="authName" label="权限名称"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          {{
            scope.row.level == 0
              ? "一级"
              : scope.row.level == 1
              ? "二级"
              : "三级"
          }}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import BreadNav from "../breadnav/breadnav.vue";
export default {
  data() {
    return {
      getRightsData: []
    };
  },
  methods: {
    async getAllRights() {
      let res = await this.$http.get(`rights/list`);
      console.log(res);
      //解构赋值
      let { meta, data } = res.data;
      //判断
      if (meta.status === 200) {
        //保存数据到getRightsData
        this.getRightsData = data;
      } else {
        this.$message.error(meta.msg);
      }
    }
  },
  mounted() {
    this.getAllRights();
  },
  components: {
    BreadNav
  }
};
</script>

<style scoped>
.myclass {
  margin-top: 20px;
}
</style>
