<template>
  <div class="container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="选择时间">
        <el-date-picker
          v-model="date"
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
    <div id="mycharts"></div>
  </div>
</template>

<script>
import { ORDER_ORDERTOTAL } from "@/api/apis";
import echarts from "echarts";
export default {
  data() {
    return {
      date: [new Date(2020, 0, 1, 0, 0), new Date(2020, 11, 31, 0, 0)]
    };
  },
  methods: {
    onSubmit() {
      var myCharts = echarts.init(document.getElementById("mycharts"));
      myCharts.showLoading();
      this.date = this.date.map(
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
      ORDER_ORDERTOTAL(JSON.stringify(this.date)).then(res => {
        let orderAmount = res.data.data.map(i => i.orderAmount);
        let orderTime = res.data.data.map(i => this.resolvingDate(i.orderTime));
        // let{orderAmount}=res.data.data
        console.log(orderAmount);

        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999"
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ["订单金额"]
          },
          xAxis: [
            {
              type: "category",
              data: orderTime,
              axisPointer: {
                type: "shadow"
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "订单金额",
              min: 0,
              max: 250,
              interval: 30,
              axisLabel: {
                formatter: "{value} ￥"
              }
            }
          ],
          series: [
            {
              name: "订单金额",
              type: "bar",
              data: orderAmount
            }
          ]
        };

        myCharts.setOption(option);
        myCharts.hideLoading();
      });
    },
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
    }
  },
  mounted() {
    var myCharts = echarts.init(document.getElementById("mycharts"));
    myCharts.showLoading();
    this.date = this.date.map(
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
    ORDER_ORDERTOTAL(JSON.stringify(this.date)).then(res => {
      let orderAmount = res.data.data.map(i => i.orderAmount);
      let orderTime = res.data.data.map(i => this.resolvingDate(i.orderTime));
      // let{orderAmount}=res.data.data
     

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["订单金额"]
        },
        xAxis: [
          {
            type: "category",
            data: orderTime,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "订单金额",
            min: 0,
            max: 250,
            interval: 30,
            axisLabel: {
              formatter: "{value} ￥"
            }
          }
        ],
        series: [
          {
            name: "订单金额",
            type: "bar",
            data: orderAmount
          }
        ]
      };

      myCharts.setOption(option);
      myCharts.hideLoading();
    });
  }
};
</script>

<style lang="less" scoped>
#mycharts {
  width: 100%;
  height: 400px;
}
</style>