<template>
  <div class="main">
    <div class="login">
      <h3>千禧餐饮管理系统</h3>
      <p>
        <span class="el-icon-user-solid left-icon"></span>
        <input type="text" placeholder="请输入管理员账号" v-model="acc" />
      </p>
      <p>
        <span class="el-icon-lock left-icon"></span>
        <input type="password" placeholder="请输入密码" v-model="pwd" />
        <span class="el-icon-view eye"></span>
      </p>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { LOGIN } from "@/api/apis";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      isreq: true
    };
  },
  methods: {
    login() {
      // 判断标杆是否是点击一次
      if (this.isreq == false) return;
      this.isreq = false;
      LOGIN(this.acc, this.pwd).then(res => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "恭喜你,登陆成功",
            type: "success"
          });
          localStorage.token=res.data.token;
          localStorage.id=res.data.id;
          localStorage.role=res.data.role;
          localStorage.acc=this.acc 
            this.$router.push("/index/home");
        } else if (res.data.code == 1) {
          this.$message({
            showClose: true,
            message: "账号或密码错误",
            type: "error"
          });
        } else {
          this.$message({
            showClose: true,
            message: "账号或密码不能为空",
            type: "warning"
          });
        }
        
      });
      //
      setTimeout(() => {
        this.isreq = true;
      }, 3000);
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  background-color: #2d3a4b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    text-align: center;
    h3 {
      color: #fff;
      margin-bottom: 30px;
    }
    p {
      position: relative;
      margin-bottom: 20px;
      .eye {
        position: absolute;
        right: 8px;
        top: 8px;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
      }
      .left-icon {
        color: #fff;
        position: absolute;
        font-size: 18px;
        top: 8px;
        left: 8px;
      }
      input {
        width: 300px;
        height: 36px;
        background-color: #283443;
        outline: none;
        border: 1px solid #69727e;
        border-radius: 5px;
        text-indent: 38px;
        color: #fff;
      }
    }
    .el-button {
      width: 300px;
      height: 36px;
    }
  }
}
</style>