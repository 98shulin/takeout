<template>
  <div class="store">
    <div class="store-top">
      <h4>店铺管理</h4>
      <el-button type="primary" @click="keep">保存</el-button>
    </div>
    <el-form label-width="80px">
      <el-form-item label="店铺名称">
        <el-input v-model="data.name" placeholder="店铺名称"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-input type="textarea" v-model="data.bulletin"></el-input>
      </el-form-item>
      <el-form-item label="店铺头像">
        <el-upload
          class="avatar-uploader"
          :action="shopupload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="data.avatar" :src="shopuploadimg+data.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺图片">
        <el-upload
          :action="shopupload"
          list-type="picture-card"
          :on-remove="handleRemove"
          :on-success="Success"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" v-if="true">
          <img width="100%" :src="data.pics" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="配送费">
        <el-input v-model="data.deliveryPrice" placeholder="配送费"></el-input>
      </el-form-item>
      <el-form-item label="起送费">
        <el-input v-model="data.minPrice" placeholder="起送费"></el-input>
      </el-form-item>
      <el-form-item label="配送时间">
        <el-input v-model="data.deliveryTime" placeholder="配送时间"></el-input>
      </el-form-item>
      <el-form-item label="配送描述">
        <el-input v-model="data.description" placeholder="配送描述"></el-input>
      </el-form-item>
      <el-form-item label="店铺评分">
        <el-input v-model="data.score" placeholder="店铺评分"></el-input>
      </el-form-item>
      <el-form-item label="销量">
        <el-input v-model="data.sellCount" placeholder="销量"></el-input>
      </el-form-item>
      <el-form-item label="活动">
        <el-checkbox-group v-model="data.supports">
          <el-checkbox v-for="item in checks" :key="item" :label="item" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-time-picker
          is-range
          v-model="data.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { INFO_SHOP, EDIT_SHOP, SHOP_UPLOAD, SHOP_UPLOAD_IMG } from "@/api/apis";
export default {
  data() {
    return {
      data: {
        id: "",
        name: "",
        bulletin: "",
        avatar: "",
        deliveryPrice: "",
        deliveryTime: "",
        description: "",
        score: "",
        sellCount: "",
        supports: "",
        date: "",
        pics: ""
      }, //初始化对象
      shopupload: SHOP_UPLOAD, //店铺图片上传接口
      shopuploadimg: SHOP_UPLOAD_IMG, //店铺图片拼接接口
      checks: [
        "在线支付满28立减5",
        "VC无限橙果汁全场8折",
        "单人精彩套餐",
        "特价饮品8折抢购",
        "单人特色套餐"
      ], //循环活动数组
      fileList: [],
      dialogVisible: false,
    };
  },
  methods: {
    // 保存 
    keep() {
      let newdata={...this.data}
      newdata.supports=JSON.stringify(newdata.supports)
      newdata.pics=JSON.stringify(newdata.pics)
      newdata.date=JSON.stringify(newdata.date)
      // console.log(newdata);
      EDIT_SHOP(newdata).then(() => {
        this.$message({
          showClose: true,
          message: "恭喜你,修改成功",
          type: "success"
        });
        // INFO_SHOP().then(res => {
        //   this.data = res.data.data;
        //   // this.data.supports = [...this.data.supports];
        //   // this.imageUrl = res.data.data.avatar;
        // });
      });
    },
      // 店铺头像 上传成功
    handleAvatarSuccess(res) {
       this.data.avatar=res.imgUrl
    },
    // 店铺图片上传成功
    Success(res) {
      this.data.pics=this.data.pics.concat(res.imgUrl)
      // console.log(this.data.pics);
      
    },
    // 删除图片
    handleRemove(file) {
      // this.fileList=fileList
      let a = file.url.substr(file.url.lastIndexOf('/')+1);
      // this.imgAll = arr;
      this.data.pics.splice(this.data.pics.indexOf(a),1)
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
    INFO_SHOP().then(res => {
      this.data = res.data.data;
      this.fileList = this.data.pics.map(img => {
        return { url: this.shopuploadimg + img };
      });
    });
  }
};
</script>
<style lang="less" scoped>
.store {
  background-color: #fff;
  .store-top {
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>