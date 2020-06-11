<template>
  <div class="add">
    <div class="add-top">
      <h4>商品分类</h4>
      <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="180"></el-table-column>
      <el-table-column prop="cateName" label="分类名称" width="240">
        <template slot-scope="scope">
          <input v-model="scope.row.cateName" v-if="!scope.row.fl" class="input-data" />
          <span v-if="scope.row.fl">{{scope.row.cateName}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="state" label="是否启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="scope.row.fl"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.fl" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="success" v-if="!scope.row.fl" @click="keep(scope.row)">保存</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-switch v-model="form.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addcate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  CATELIST_GOODS,
  ADDCATE_GOODS,
  DEL_GOODS,
  EDITCCATE_GOODS
} from "@/api/apis";
export default {
  data() {
    return {
      form: {
        name: "",
        value: true
      },
      total: 0,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      tableData: [],
      currentPage: 1,
      pageSize: 5
    };
  },
  methods: {
    // 添加分类
    addcate() {
      ADDCATE_GOODS(this.form.name, JSON.stringify(this.form.value)).then(
        () => {
          this.newtable(this.currentPage);
        }
      );
      this.dialogFormVisible = false;
    },
    // 编辑
    handleEdit(row) {
      console.log(row);
      
      row.fl = !row.fl;
    },
  
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        DEL_GOODS(row.id).then(() => {
          this.newtable(this.currentPage);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        });
      });
    },
    // 每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.newtable(this.currentPage);
    },
    // 跳转页码
    handleCurrentChange(val) {
      this.newtable(val);
    },
      // 保存
    keep(row) {
      EDITCCATE_GOODS(row.id, row.cateName, JSON.stringify(row.state)).then(() => {
        this.newtable(this.currentPage);
      });
      row.fl = !row.fl;
    },
    // 封装初始化
    newtable(page) {
      CATELIST_GOODS(page, this.pageSize).then(res => {
        res.data.data.forEach(item => {
          item.fl = true;
          if (item.state == 1) {
            item.state = true;
          } else {
            item.state = false;
          }
        });
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    }
  },
  // 初始化
  created() {
    this.newtable(this.currentPage);
  }
};
</script>

<style lang="less" scoped>
.add {
  background-color: #fff;
  .add-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
    border-bottom: 1px solid #f0f2f5;
    h4 {
      color: #333;
      margin: 0;
      padding: 4px 10px 4px 0;
      font-weight: normal;
      height: 40px;
      line-height: 40px;
      text-indent: 20px;
    }
    .el-button {
      height: 40px;
    }
  }
  .el-form {
    width: 460px;
    padding: 20px;
  }
  .input-data {
    border: none;
    background-color: none;
    outline: none;
  }
}
</style>