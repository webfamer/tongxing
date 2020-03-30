<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="API服务中文名称：">
        <el-select v-model="value1" multiple placeholder="请选择" @change="selectChange">
          <el-option style="height: auto" :value="treeData">
            <el-tree
              :data="treeData"
              show-checkbox
              ref="tree"
              id="testTree"
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
            value-format="yyyy-MM-dd"
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
import Bus from "@/components/bus";
import qs from "qs";
export default {
  data() {
    return {
      form: {
        date: [],
      },
      saveNode: "", //存储节点的变量
      value1: [],
        title:'开通服务',
      tableData: [],
      dialogVisible: false,
      treeData: []
    };
  },
  methods: {
    saveForm() {
      console.log(this.form);

      let checkedKey = this.$refs.tree.getCheckedKeys(true);
      let params = qs.stringify({ ids: checkedKey }, { arrayFormat: "repeat" });
      customerApi
        .generateApiTree({
          merchantId: JSON.parse(localStorage.getItem("userdata")).id,
          startTime: this.form.date[0]+'T00:00:00.000Z',
          endTime: this.form.date[1]+'T00:00:00.000Z',
          listApi: checkedKey
        })
        .then(res => {
          if (res.code === 0) {
            Bus.$emit("getList");//成功了再去调用刷新函数
            this.dialogVisible = false;
            this.$message({
              message: "保存成功",
              type: "success"
            });
            console.log(121);
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    getapiList() {
      //编辑的时候用
      customerApi
        .getCustomerApi({
          merchantId: JSON.parse(localStorage.getItem("userdata")).id
        })
        .then(res => {
          this.checkData(res.data); //处理数据并回显
        });
    },
    checkData(arr) {
      let { startTime, endTime } = arr[0];
      let checkedKey = []; //树节点回显
      arr.forEach(item => {
        checkedKey.push(item.apiId);
      });
      
      this.$nextTick(()=>{
      this.$refs.tree.setCheckedKeys(checkedKey);
       setTimeout(()=>{
          this.handleCheckChange()
        },200)
      })
      this.form.date = [startTime, endTime];
      // this.handleCheckChange();
    },
    resetForm() {
      resetDataAttr(this, "form");
      this.$nextTick(()=>{
      this.value1 = [];
      })
      this.$refs.tree.setCheckedKeys([], true);
      // this.dialogVisible = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    openDialog() {
      this.dialogVisible = true;
      this.title = '开通服务',
      this.setTreeNode();
    },
    editDialog(data) {
      this.dialogVisible = true;
      this.title = '修改服务',
      this.setTreeNode(true);
    },
    async setTreeNode(arrKey) {
      await this.getTreeNode();
      if (arrKey) {
        this.getapiList();
      } else {
        this.form = {};
        this.$nextTick(()=>{
        this.value1 = [];
        })
        this.$refs.tree.setCheckedKeys([]);
      }
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
        console.log(item);
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