<template>
  <el-dialog title="开通服务" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="API服务中文名称：">
        <el-select
          v-model="value1"
          multiple
          placeholder="请选择"
          @change="selectChange"
        >
          <el-option style="height: auto" :value=treeData>
            <el-tree
              :data="treeData"
              show-checkbox
              ref="tree"
              @check-change="handleCheckChange"
              node-key="id"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="有效期：">
        <div class="datechose">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveForm" icon="el-icon-check">提交</el-button>
      <el-button @click="resetForm" icon="el-icon-refresh-right">重置</el-button>
    </span>
  </el-dialog>
</template>

<script>
import customerApi from "@/api/customer";
import { resetDataAttr } from "@/utils/index.js";
import qs from 'qs'
export default {
  data() {
    return {
      form: {
        date:[]
      },
      saveNode: "", //存储节点的变量
      value1: [],
      tableData: [],
      dialogVisible: false,
      treeData: []
    };
  },
  methods: {
    saveForm() {
        let checkedKey =  this.$refs.tree.getCheckedKeys();
        let params =qs.stringify({ids: checkedKey}, {arrayFormat: 'repeat'}) 
        customerApi.generateApiTree({
            merchantId:JSON.parse(localStorage.getItem('userdata')).id,
            startTime:this.form.date[0],endTime:this.form.date[1],
            listApi:checkedKey
        }).then(res=>{
          console.log(res)
        })
    },
    resetForm(){
      resetDataAttr(this, "form");
      this.dialogVisible = false;
    },
    porcessData(arr){
      let newstr = '';
      arr.forEach(item=>{
        newstr += item+'&'

      })
      return newstr.substr(0,newstr.length-1);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    openDialog(){
       this.dialogVisible = true;
      resetDataAttr(this, "form");
      this.getTreeNode();
    },
    editDialog(data) {
      this.dialogVisible = true;
      resetDataAttr(this, "form");
      console.log(data,'传过来的数据')
      this.getTreeNode();
      this.$nextTick(()=>{
        this.$refs.tree.setCheckedKeys(data);

      })
    },
    getTreeNode() {
      customerApi.getCustomerApiTree().then(res => {
        this.treeData = res.data;
      });
    },
    handleCheckChange() {
      let treeNode = this.$refs.tree.getCheckedNodes(true, true);
      let arrNode = [];
      let arrlabel = [];
      treeNode.forEach(item => {
        console.log(item)
        arrlabel.push(item.label);
        arrNode.push(item);
      });
      this.value1 = arrlabel;
      this.saveNode = arrNode;
    },
    selectChange(e) {
      let newarr = [];
      for (var i = 0; i < this.saveNode.length; i++) {
        for (var j = 0; j < e.length; j++) {
          if (e[j] === this.saveNode[i].label) {
            newarr.push(this.saveNode[i]);
          }
        }
      }
      console.log(newarr, "saveNode");
      this.$refs.tree.setCheckedNodes(newarr);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
/deep/.datechose {
  .el-date-editor {
    width: 100%;
  }
}
</style>