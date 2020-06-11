<template>
  <div class="my">
    <h4>管理员信息</h4>
    <div class="list">
      <p>
        管理员ID：
        <span>{{id}}</span>
      </p>
      <p>
        账号：
        <span>{{acc}}</span>
      </p>
      <p>
        用户组：
        <span>{{userGroup}}</span>
      </p>
      <p>
        创建时间：
        <span>{{time}}</span>
      </p>
      <div class="title-img">
        管理员头像：
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="data"
        >
          <img v-if="squareUrl" :src="squareUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <el-avatar shape="square" :size="60" :src="squareUrl"></el-avatar> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ACCountinfo } from "@/api/apis";
export default {
  data() {
    return {
      squareUrl: "",
      id: localStorage.id,
      acc: "",
      time: "",
      userGroup: "",
      data: { id: localStorage.id }
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
    handleAvatarSuccess() {
     window.location.reload()
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    ACCountinfo(localStorage.id).then(res => {
      this.acc = res.data.accountInfo.account;
      this.time = this.resolvingDate(res.data.accountInfo.ctime);
      this.userGroup = res.data.accountInfo.userGroup;
      this.squareUrl = res.data.accountInfo.imgUrl;
    });
  }
};
</script>
<style lang="less" scoped>
.my {
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
  .list {
    padding: 0 20px;
    p {
      margin: 0;
      padding: 14px 0;
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #f0f2f5;
    }
    div {
      height: 80px;
      line-height: 80px;
      position: relative;
        .el-upload {
          img {
             width: 60px;
            height: 60px;
           position: absolute;
            top: -68px;
            left: 100px;  
          }
      }
    }
  }
}
</style>