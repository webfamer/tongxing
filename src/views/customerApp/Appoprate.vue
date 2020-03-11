<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="apiChiName" label="操作人姓名"></el-table-column>
      <el-table-column prop="status" label="操作记录"></el-table-column>
      <el-table-column prop="startTime" label="操作时间" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script>
import customerApp from '@/api/custmoerApp'
export default {
  data(){
    return{

    }
  },
  methods(){
    function getOpration(){
      
    }
  }
    
}
</script>

<style>
</style>