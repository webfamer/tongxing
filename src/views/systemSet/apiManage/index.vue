<template>
  <div class="apiManage">
    <el-card class="search-box" shadow="hover">
    <p class="title">
          <i class="el-icon-menu"></i>API服务管理
        </p>
    </el-card>

    <div class="content-box">
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <el-button type="primary" icon="el-icon-plus" @click="add">添加</el-button>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column prop="date" label="API服务名称"  width="180"></el-table-column>
          <el-table-column prop="name" label="上架状态"  width="180"></el-table-column>
          <el-table-column prop="address" label="API路径" :formatter="formatter"></el-table-column>
          <el-table-column prop="address" label="每日请求上限/客户" :formatter="formatter"></el-table-column>
          <el-table-column prop="address" label="描述" :formatter="formatter"></el-table-column>
          <el-table-column prop="address" label="修改时间"  sortable :formatter="formatter"></el-table-column>
          <el-table-column  label="操作" width="150" >
            <template slot-scope="scope" >
              <el-button @click="delApiinterface()" type="text" icon="el-icon-edit" size="small">下架</el-button>
              <el-button @click="edit(scope.row)" type="text" icon="el-icon-s-shop" size="small">配置</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="float:right; margin-top:30px;margin-bottom:30px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage2"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="sizes, prev, pager, next"
            :total="1000"
          ></el-pagination>
        </div>
      </el-card>
    </div>
    <Detail ref="detail"></Detail>
  </div>
</template>
<script>
import Detail from "./Detail";
export default {
  data() {
    return {
      input: "",
      value1: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  methods: {
    formatter(row, column) {
      //表格排序
      return row.address;
    },
    edit() {
      this.$refs.detail.openDialog();
    },
    add() {
      this.$refs.detail.openDialog();
    },
      delApiinterface() {
      this.$confirm(
        "<strong>是否确定下架API服务?</strong><br>下架后会导致10个客户无法使用该服务",
        "确认提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    openCustomer() {
      this.$confirm(
        "<strong>是否确定启用客户?</strong><br>启用后恢复服务的使用",
        "确认提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  components: {
    Detail
  }
};
</script>
<style lang="scss" scoped>
.apiManage {
  .search-box{
      .title {
      color: #666666;
      font-size: 20px;
      padding-left: 20px;
    }
  }
  .content-box {
    margin: 30px;
    box-sizing: border-box;
    .pagination {
      margin-top: 30px;
    }
  }
}
</style>
