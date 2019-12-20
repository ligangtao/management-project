<template>
  <!-- 添加一个根元素 -->
  <el-card>
    <!-- 添加一个面包屑导航 -->
    <BreadNav :navone="'商品管理'" :navtwo="'商品分类'" />
    <!-- 添加一个按钮 -->
    <el-row>
      <el-col :span="4">
        <el-button class="mybtn" type="success" plain>添加分类</el-button>
      </el-col>
    </el-row>
    <!-- 添加一个表格 -->
    <!-- cat_deleted: false
        cat_id: 1
        cat_level: 0
        cat_name: "大家电"
        cat_pid: 0
        children: Array(4) -->

    <!-- prop:当前列显示的数据属性 
        label:表头的名称
        parentKey:当前元素的父元素
        levelKey:当前元素的级别
    -->

    <el-table :data="pageList" border>
      <el-table-tree-column
        file-icon="icon icon-file"
        folder-icon="icon icon-folder"
        prop="cat_name"
        label="分类名称"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
      ></el-table-tree-column>
      <el-table-column prop="cat_level" label="级别" width="180">
        <template slot-scope="scope">
          {{
            scope.row.cat_level === 0
              ? "一级"
              : scope.row.cat_level === 1
              ? "二级"
              : "三级"
          }}
        </template>
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效" width="180">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? "无效" : "有效" }}
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
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-table :data="CateList" :border="true" style="width: 100%">
      <el-table-column prop="cat_name" label="分类名称"></el-table-column>
      <el-table-column prop="cat_level" label="级别" width="180">
        <template slot-scope="scope">
          {{
            scope.row.cat_level == 0
              ? "一级"
              : scope.row.cat_level == 1
              ? "二级"
              : "三级"
          }}
        </template>
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效" width="180">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? "无效" : "有效" }}
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
        </template>
      </el-table-column>
    </el-table> -->
    <!-- 添加一个分页 -->
    <!-- size-change	pageSize 改变时会触发 -->
    <!-- current-change	currentPage 改变时会触发 -->
    <el-pagination
      :current-page="currentpage"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      @current-chanage="currentChange"
      @size-change="sizeChange"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
//导入封装的面包屑导航组件
import BreadNav from "../breadnav/breadnav.vue";
export default {
  data() {
    return {
      cateList: [], //表格的数据
      pageList: [], //分页的数据
      total: 0, //数据的总条数
      pagesize: 5, //页容量
      pagesizes: [5, 10, 15], //所有可选的页容量
      currentpage: 1 //当前页
    };
  },
  components: {
    BreadNav
  },
  methods: {
    //渲染出商品分类页面
    async getCateList() {
      // 获取所有的分类数据
      let res = await this.$http.get("categories?type=3");
      // 解构
      let { meta, data } = res.data;
      // 判断
      if (meta.status === 200) {
        this.cateList = data;
        // 得到数据的总条数
        this.total = data.length;
        // 第一次得到分页数据
        this.getPageList();
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 当当前页发生改变时，触发
    currentChange(val) {
      console.log(`当前页: ${val}`);
      // val 改变后的当前页
      this.currentpage = val;
      // 重新获取分页数据
      this.getPageList();
    },
    //得到分页的数据源
    getPageList() {
      // 计算开始和结束的数据
      let start = (this.currentpage - 1) * this.pagesize;
      let end = this.currentpage * this.pagesize;
      console.log(this.cateList, start, end);
      // 得到数据源 slice:查找数组元素 slice(start，end)  start <=  范围  < end
      this.pageList = this.cateList.slice(start, end);
      console.log(this.pageList);
    },
    // 当页容量发生改变时，触发
    sizeChange(val) {
      console.log(`每页${val}条`),
        // val 页容量改变后的值
        (this.pagesize = val);
      // 重新请求数据
      this.getPageList();
    }
  },
  mounted() {
    //重新渲染页面
    this.getCateList();
  }
};
</script>

<style scoped>
.mybtn {
  margin-top: 20px;
}
</style>
