<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="apiChiName" label="服务名称" sortable ></el-table-column>
      <el-table-column prop="status" label="服务状态" sortable  :formatter="formatter"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import customerApi from "@/api/customer.js";
import Detail from "@/views/customerApp/Detail";
import Bus from '@/components/bus'
export default {
  data() {
    return {
      userdata: "",
      tableData:[]
    };
  },
  methods: {
    getapiList() {
      customerApi
        .getCustomerApi({
            merchantId: this.userdata.id
        })
        .then(res => {
          this.tableData = res.data
        });
    },
    getlist(){
      this.$nextTick(()=>{
     this.getapiList();

      })
    },
    formatter(row){
      if(row.status==='1'){
        return '进行中'
      }else{
        return '已过期'
      }
    } 
  },
  mounted(){
    Bus.$on('getList',()=>{
      this.getlist();
    })
  },
  created(){
    this.userdata = JSON.parse(localStorage.getItem('userdata'));
    this.getapiList();
  }
};
</script>

<style>
</style>