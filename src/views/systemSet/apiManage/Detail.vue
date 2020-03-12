<template>
  <el-dialog title="新增API服务" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="API服务中文名称：">
        <el-input v-model="form.apiChiName"></el-input>
      </el-form-item>
      <el-form-item label="API服务英文名称：">
        <el-input v-model="form.apiEngName"></el-input>
      </el-form-item>
      <el-form-item label="所属分组：">
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
      <el-form-item label="路径：">
        <el-input v-model="form.apiPath"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveForm" icon="el-icon-check">提交</el-button>
      <el-button @click="dialogVisible = false" icon="el-icon-refresh-right">重置</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { resetDataAttr } from "@/utils/index.js";
import customerApiList from '@/api/customerApi'
export default {
  data() {
    return {
      form: {},
      dialogVisible: false,
        treeData: [],
        value1: [],
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    openDialog() {
      this.dialogVisible = true;
       resetDataAttr(this, "form");
      this.getTreeNode();
    },
      getTreeNode() {
        console.log(123)
      customerApiList.getSetApiTree().then(res => {
        this.treeData = res.data;
      });
    },
     handleCheckChange() {
      let treeNode = this.$refs.tree.getCheckedNodes(true, true);
      console.log(treeNode,'haa')
      let arrNode = [];
      let arrlabel = [];
      treeNode.forEach(item => {
        arrlabel.push(item.label);
        arrNode.push(item);
      });
      console.log(treeNode);
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
    },
    saveForm(){
      customerApiList.getApi({
        
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>>

</style>