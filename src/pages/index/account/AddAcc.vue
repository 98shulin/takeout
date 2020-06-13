<template>
  <div class="add">
    <h4>添加账户</h4>
    <el-form ref="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="acc" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="pwd" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="用户组">
        <el-select v-model="userGroup" placeholder="选择用户组">
          <el-option v-for="item in userGroups" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="cancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Add_ACC } from "@/api/apis";
export default {
  data() {
    return {
      userGroups:['超级管理员','普通管理员'],
      acc: "",
      pwd: "",
      userGroup: "",
      isreq: true
    };
  },
  methods: {
    onSubmit() {
      if (this.isreq == false) return;
      this.isreq = false;
      Add_ACC(this.acc, this.pwd, this.userGroup).then(res => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "恭喜你,注册成功",
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: "账号或密码不能为空,用户组必选",
            type: "warning"
          });
        }
      });
      setTimeout(() => {
        this.isreq = true;
      }, 3000);
    },
    cancel() {
      (this.acc = ""), (this.pwd = ""), (this.userGroup = "");
    }
  }
};
</script>

<style lang="less" scoped>
.add {
  background-color: #fff;
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
  .el-form {
    width: 300px;
    padding: 20px;
  }
}
</style>