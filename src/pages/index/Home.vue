<template>
  <div class="home">
    <div class="top">
      <el-card class="box-card">
        <div class="concent">
          <span class="el-icon-document-checked" style="color:#1296DB;"></span>
          <div>
            <p>总订单</p>
            <span>{{totalOrder}}</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="concent">
          <span class="el-icon-coin" style="color:#D4237A;"></span>
          <div>
            <p>总销售额</p>
            <span>{{totalAmount}}</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="concent">
          <span class="el-icon-s-claim" style="color:#1296DB;"></span>
          <div>
            <p>今日订单数</p>
            <span>{{todayOrder}}</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="concent">
          <span class="el-icon-present" style="color:#1AFA29;"></span>
          <div>
            <p>今日销售额</p>
            <span>{{totayAmount}}</span>
          </div>
        </div>
      </el-card>
    </div>
    <div id="mycharts"></div>
  </div>
</template>

<script>
import { ORDER_TOTALDATA } from "@/api/apis";
import echarts from 'echarts'
export default {
  data() {
    return {
      todayOrder: 0,
      totalAmount: 0,
      totalOrder: 0,
      totayAmount: 0
    };
  },
  mounted() {
    var myCharts = echarts.init(document.getElementById('mycharts'));
    myCharts.showLoading()
    ORDER_TOTALDATA().then(res => {
      let {
        amountData,
        orderData,
        todayOrder,
        totalAmount,
        totalOrder,
        totayAmount,
        xData
      } = res.data;
      this.todayOrder = todayOrder;
      this.totalAmount = totalAmount;
      this.totalOrder = totalOrder;
      this.totayAmount = totayAmount;

      let option = {
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单数据", "金额数据"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: orderData
          },
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: amountData
          }
        ]
      };
      myCharts.setOption(option);
      myCharts.hideLoading()
    });
  }
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  .box-card {
    width: 260px;
    height: 160px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    .concent {
      width: 200px;
      display: flex;
      justify-content: space-around;
      text-align: center;
      > span {
        font-size: 80px;
      }
      > div {
        p {
          color: #999;
          font-size: 18px;
        }
        span {
          font-weight: bold;
        }
      }
    }
  }
 
}
 #mycharts{
    width: 100%;
    height: 400px;
  }
</style>