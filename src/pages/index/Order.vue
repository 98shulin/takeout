<template>
  <div class="container">
    <div class="top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input v-model="formInline.orderNo" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="formInline.consignee" placeholder="收货人"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="formInline.orderState" placeholder="订单状态">
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择时间">
          <el-date-picker
            v-model="formInline.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="120"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="300"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="120"></el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[6, 8, 12, 16]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 模态框 -->
    <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="订单id" :label-width="formLabelWidth">
          <span autocomplete="off">{{obj.id}}</span>
        </el-form-item>
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <span autocomplete="off">{{obj.orderNo}}</span>
        </el-form-item>
        <el-form-item label="下单时间" :label-width="formLabelWidth">
          <span autocomplete="off">{{obj.orderTime}}</span>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="obj.phone" autocomplete="off" v-if="fl"></el-input>
          <span autocomplete="off" v-else>{{obj.phone}}</span>
        </el-form-item>
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input v-model="obj.consignee" autocomplete="off" v-if="fl"></el-input>
          <span autocomplete="off" v-else>{{obj.consignee}}</span>
        </el-form-item>
        <el-form-item label="送货地址" :label-width="formLabelWidth">
          <el-input v-model="obj.deliverAddress" autocomplete="off" v-if="fl"></el-input>
          <span autocomplete="off" v-else>{{obj.deliverAddress}}</span>
        </el-form-item>
        <el-form-item label="送达时间" :label-width="formLabelWidth">
          <span autocomplete="off">{{obj.deliveryTime}}</span>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="obj.remarks" autocomplete="off" v-if="fl"></el-input>
          <span autocomplete="off" v-else>{{obj.remarks}}</span>
        </el-form-item>
        <el-form-item label="订单金额" :label-width="formLabelWidth">
          <span autocomplete="off">{{obj.orderAmount}}</span>
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <span autocomplete="off">{{obj.orderState}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" v-if="fl">取 消</el-button>
        <el-button type="primary" @click="editfix(obj)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { LIST_ORDER, SEARCH_ORDER, DETAIL_ORDER, EDIT_ORDER } from "@/api/apis";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 6,
      formInline: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: [new Date(2020, 0, 1, 0, 0), new Date(2021, 0, 0, 0, 0)]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      obj: "",
      fl: false
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.orserlist(this.currentPage);
    },
    handleCurrentChange(val) {
      this.orserlist(val);
    },
    // 查看
    handleClick(row) {
      this.fl = false;
      this.dialogFormVisible = true;
      DETAIL_ORDER(row.id).then(res => {
        res.data.data.orderTime = this.resolvingDate(res.data.data.orderTime);
        res.data.data.deliveryTime = this.resolvingDate(
          res.data.data.deliveryTime
        );
        this.obj = res.data.data;
      });
    },
    // 编辑
    edit(row) {
      this.fl = true;
      this.dialogFormVisible = true;
      DETAIL_ORDER(row.id).then(res => {
        res.data.data.orderTime = this.resolvingDate(res.data.data.orderTime);
        res.data.data.deliveryTime = this.resolvingDate(
          res.data.data.deliveryTime
        );
        this.obj = res.data.data;
      });
    },
    // 修改订单确定
    editfix(row) {
      EDIT_ORDER(
        row.id,
        row.orderNo,
        row.orderTime,
        row.phone,
        row.consignee,
        row.deliverAddress,
        row.deliveryTime,
        row.remarks,
        row.orderAmount,
        row.orderState
      ).then(() => {
         this.orserlist(this.currentPage);
      });
      this.dialogFormVisible = false;
    },
    // 查询
    onSubmit() {
      this.formInline.date = this.formInline.date.map(
        j =>
          j.getFullYear() +
          "-" +
          (j.getMonth() + 1) +
          "-" +
          j.getDate() +
          " " +
          j.getHours() +
          ":" +
          j.getMinutes() +
          ":" +
          j.getSeconds()
      );
      SEARCH_ORDER(
        1,
        6,
        this.formInline.orderNo,
        this.formInline.consignee,
        this.formInline.phone,
        this.formInline.orderState,
        JSON.stringify(this.formInline.date)
      ).then(res => {
        for (let item of res.data.data) {
          item.orderTime = this.resolvingDate(item.orderTime);
          item.deliveryTime = this.resolvingDate(item.deliveryTime);
        }
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },
    // 封装初始化
    orserlist(currentPage) {
      LIST_ORDER(currentPage, this.pageSize).then(res => {
        for (let item of res.data.data) {
          item.orderTime = this.resolvingDate(item.orderTime);
          item.deliveryTime = this.resolvingDate(item.deliveryTime);
        }
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    }
  },
  created() {
    this.orserlist(this.currentPage);
  }
};
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  height: 100%;
  .top {
    padding: 20px;
    margin-bottom: 1px;
  }
}
</style>