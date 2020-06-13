<template>
  <div class="add">
    <h4>商品添加</h4>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="form.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="form.region" placeholder="商品分类">
          <el-option v-for="item in listgoods" :key="item.index" :value="item.cateName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number v-model="num" :min="50" :max="500"></el-input-number>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          action="http://127.0.0.1:5000/goods/goods_img_upload"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { CATEGORIES_GOODS, ADD_GOODS } from "@/api/apis";
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        desc: ""
      },
      imgAll: [],
      listgoods: "",
      dialogImageUrl: "",
      dialogVisible: false,
      num: 50
    };
  },
  methods: {
    onSubmit() {
      ADD_GOODS(
        this.form.name,
        this.form.region,
        this.num,
        this.imgAll,
        this.form.desc
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "添加成功!"
          })
        
        }else{
          this.$message.error('每一项都必填哦！');
        }
      });
    },

    handleAvatarSuccess(res) {
      this.imgAll.push(res.imgUrl);
    }
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
  },
  created() {
    CATEGORIES_GOODS().then(res => {
      this.listgoods = res.data.categories;
    });
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
    width: 460px;
    padding: 20px;
  }
}
</style>