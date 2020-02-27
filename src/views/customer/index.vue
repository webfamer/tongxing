<template>
  <div class="student-main">
    <el-card class="search-box" shadow="hover">
  <el-row :gutter="20">
  <el-col :span="3" :offset="1"><div class="block"><el-input v-model="input" placeholder="请输入内容"></el-input></div></el-col>
  <el-col :span="3" >  
    <el-date-picker
      v-model="value1"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </el-col>
  <el-col :span="4">
    <el-button type="primary" icon="el-icon-search">查询</el-button>
<el-button type="primary" icon="el-icon-refresh-right">上传</el-button>
  </el-col>
</el-row>
    </el-card>

    <div class="content-box">

    </div>

  </div>
</template>
<script>

export default {
  data(){
   return{
     input:'',
     value1:''
   }
  }
};
</script>
<style lang="scss" scoped>
.student-main {
  .content-box {
    margin: 30px;
    box-sizing: border-box;
    .pagination {
      margin-top: 30px;
    }
  }
}
</style>