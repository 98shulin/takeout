<template>
  <div class="store">
    <div class="store-top">
      <h4>店铺管理</h4>
      <el-button type="primary" @click="keep(data)">保存</el-button>
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
          action="http://127.0.0.1:5000/shop/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="host+imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺图片">
        <el-upload
          action="http://127.0.0.1:5000/shop/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="Success"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
         
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" v-if="true"> 
          <img width="100%" v-for="i in data.pics" :key="i" :src="i" alt /></el-dialog>
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
        <el-checkbox-group v-model="supports">
          <el-checkbox label="在线支付满28立减5" name="type"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
          <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
          <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
          <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
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
import { INFO_SHOP, EDIT_SHOP } from "@/api/apis";
export default {
  data() {
    return {
      data: "",
      supports: [],
      fileList: [],
      imgAll: [],
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      host: "http://127.0.0.1:5000/upload/shop/"
      // da: { id: localStorage.shopid }
    };
  },
  methods: {
    keep(d) {
      EDIT_SHOP(
        d.id,
        d.name,
        d.bulletin,
        this.imageUrl,
        d.deliveryPrice,
        d.deliveryTime,
        d.description,
        d.score,
        d.sellCount,
        JSON.stringify(d.supports),
        JSON.stringify(this.imgAll),
        JSON.stringify(d.date)
      ).then(res => {
        INFO_SHOP().then(res => {
          this.data = res.data.data;
          this.supports = [...this.data.supports];
          this.imageUrl = res.data.data.avatar;
        });
      });
    },
    handleChange(value) {
      console.log(value);
    },
    // 删除图片
    handleRemove(file, fileList) {
      // this.fileList=fileList
      let arr = fileList.map(i => i.url.substr(34));
      this.imgAll = arr;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 店铺头像 上传成功
    handleAvatarSuccess(res) {
      this.imageUrl = res.imgUrl;
    },
    // 店铺图片上传成功
    Success(res) {
      this.imgAll.push(res.imgUrl);
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
      this.supports = [...this.data.supports];
      this.imageUrl = res.data.data.avatar;
      this.imgAll=[...this.data.pics]
      // console.log(this.imgAll);  
      this.imgAll.forEach(i =>
        this.fileList.push({
          url: this.host + i
        })
      );
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