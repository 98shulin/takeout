<template>
  <div class="list">
    <h4>账户列表</h4>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="80"></el-table-column>
      <el-table-column label="账号" width="240" prop="account"></el-table-column>
      <el-table-column prop="userGroup" label="用户组" width="240"></el-table-column>
      <el-table-column prop="ctime" label="创建时间" width="240"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <div style="margin: 10px">
      <el-button type="danger" @click="bulkdelete">批量删除</el-button>
      <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
    </div>
    <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="obj.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组" :label-width="formLabelWidth">
          <el-select v-model="obj.userGroup">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm(obj)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ACC_LIST, DEL_ACC, BATCHDE_ACC, EDIT_ACC } from "@/api/apis";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      dialogTableVisible: false,
      dialogFormVisible: false,
      total: 0,
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 5,
      pageSizes: [5, 8, 10, 12],
      obj: "",
      modal: false
    };
  },
  methods: {
    resolvingDate(date) {
      //date是传入的时间
      let d = new Date(date);

      let month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();

      let times =
        d.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        min +
        ":" +
        sec;

      return times;
    },
    //批量删除
    bulkdelete() {
      // let pages=this.currentPage
      if (this.total % this.pageSize == this.multipleSelection.length|| Math.ceil(this.total / this.pageSize)==this.currentPage&&this.currentPage!=1) {
        if (this.multipleSelection.length == 0) {
          this.$message.error("你没有选,请选了再操作");
        } else {
          BATCHDE_ACC(JSON.stringify(this.multipleSelection)).then(() => {
            if (confirm("删除不可逆，请谨慎")) {
              this.initialization(--this.currentPage);
            }
          });
        }
   
      } else {
        if (this.multipleSelection.length == 0) {
          this.$message.error("你没有选,请选了再操作");
        } else {
          if (confirm("删除不可逆，请谨慎")) {
            BATCHDE_ACC(JSON.stringify(this.multipleSelection)).then(() => {
              this.initialization(this.currentPage);
            });
          }
        }
      }
    },
    //每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.initialization(this.currentPage);
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.initialization(val);
    },
    // 多选框发生变化
    handleSelectionChange(val) {
      this.multipleSelection = val.map(i => i.id);
      // console.log(this.multipleSelection.length);
    },
    //编辑
    handleEdit(row) {
      // console.log(row);
      this.obj = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
    },
    // 确认
    confirm(r) {
      EDIT_ACC(r.id, r.account, r.userGroup).then(() => {
        this.initialization(this.currentPage);
      });
      this.dialogFormVisible = false;
    },
    //删除
    handleDelete(row) {
      if (this.total % this.pageSize == 1) {
        DEL_ACC(row.id).then(() => {
          if (confirm("删除不可逆，请谨慎")) {
            this.initialization(this.currentPage - 1);
          }
        });
      } else {
        DEL_ACC(row.id).then(() => {
          if (confirm("删除不可逆，请谨慎")) {
            this.initialization(this.currentPage);
          }
        });
      }
    },
    // 封装初始化
    initialization(currentPage) {
      ACC_LIST(currentPage, this.pageSize).then(res => {
        for (let item of res.data.data) {
          item.ctime = this.resolvingDate(item.ctime);
        }
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    }
  },
  // 初始化
  created() {
    this.initialization(this.currentPage);
  }
};
</script>

<style lang="less" scoped>
.list {
  background-color: #fff;
  padding-bottom: 20px;
  h4 {
    color: #333;
    margin: 0;
    padding: 4px 10px 4px 0;
    font-weight: normal;
    height: 40px;
    line-height: 40px;
    text-indent: 20px;
    border-bottom: 1px solid #f0f2f5;
  }
  .el-pagination {
    padding: 20px;
  }
}
</style>