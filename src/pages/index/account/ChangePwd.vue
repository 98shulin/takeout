<template>
  <div class="add">
    <h4>修改密码</h4>
    <el-form status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码">
        <el-input v-model="oldpwd" @change="old"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input type="password" v-model="newpwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="cheakPwd" @change="cnki"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { OLD } from "@/api/apis";
import { MODIFY_ACC } from "@/api/apis";
export default {
  data() {
    return {
      oldpwd: "",
      cheakPwd: "",
      newpwd: "",
      id: localStorage.getItem("id"),
      resold: "",
      isreq: true
    };
  },
  methods: {
    // 两次密码验证相同
    cnki() {
      if (this.newpwd == this.cheakPwd) return;
      this.$message.error("两次密码不同");
    },
    // 旧密码验证
    old() {
      OLD(this.id, this.oldpwd).then(res => {
        this.resold = res.data.code;
        if (res.data.code == 0) return;
        this.$message.error("原密码错误");
      });
    },
    // 修改密码
    submitForm() {
      // 判断标杆是否是点击一次
      if (this.isreq == false) return;
      this.isreq = false;
      if (
        this.newpwd != this.oldpwd &&
        this.newpwd == this.cheakPwd &&
        this.resold == 0
      ) {
        MODIFY_ACC(this.id, this.newpwd).then(res => {
          if (res.data.code == 0) {
            localStorage.removeItem("id");
            this.$message({
              message: "密码修改成功",
              type: "success"
            });
            setTimeout(() => {
              this.$router.push("/");
            }, 800);
          } 
        });
      }else {
            this.$message.error(
              "原密码错误或两次新密码不一样或新密码与原密码相同"
            );
          }
       setTimeout(() => {
        this.isreq = true;
      }, 3000);
    },
    resetForm() {
      (this.oldpwd = ""), (this.cheakPwd = ""), (this.newpwd = "");
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