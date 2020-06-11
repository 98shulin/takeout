<template>
  <div class="list">
    <h4>商品列表</h4>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img v-for="i in props.row.imgUrl" :key="i" :src="host+i" class="imgs" />
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price}}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片" prop="imgUrl">
        <template slot-scope="props">
          <img :src="host+props.row.imgUrl[0]" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[8, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 模态框 -->
    <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
      <el-form ref="form" label-width="80px">
        <el-form-item label="商品ID">
          <span>{{ obj.id }}</span>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="obj.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="obj.category">
            <el-option
              v-for="item in listgoods"
              :key="item.index"
              :value="item.cateName"
            >{{item.cateName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number v-model="obj.price" :min="50" :max="500"></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            list-type="picture-card"
            :file-list="fileList"
            :multiple="true"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :on-preview="handlePictureCardPreview"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img v-for="i in obj.imgUrl" :key="i" width="100%" :src="i" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="obj.goodsDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm(obj)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  LIST_GOODS,
  DEL_GOODS_LIST,
  CATEGORIES_GOODS,
  EDIT_GOODS
} from "@/api/apis";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 8,
      fileList: [],
      imgAll: [],
      total: 0,
      host: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      dialogFormVisible: false,
      listgoods: "",
      dialogVisible: false,
      num: 50,
      formLabelWidth: "120px",
      obj: ""
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
    // 换条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.goodslist(this.currentPage);
    },
    // 换页
    handleCurrentChange(val) {
      this.goodslist(val);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上传成功
    handleAvatarSuccess(res) {
      this.imgAll.push(res.imgUrl);
    },
    // 删除图片
    handleRemove(file, fileList) {
      let arr = fileList.map(i => i.url.substr(44));
      console.log(arr);
      
      this.imgAll = arr;
    },
    // 编辑
    handleEdit(row) {
      this.obj = JSON.parse(JSON.stringify(row));
      this.imgAll = [...this.obj.imgUrl];
      this.imgAll.forEach(i =>
        this.fileList.push({
          url: this.host + i
        })
      );
      // console.log(this.fileList);
      this.dialogFormVisible = true;
    },
    // 确认
    confirm(r) {
      EDIT_GOODS(
        r.name,
        r.category,
        r.price,
        this.imgAll,
        r.goodsDesc,
        r.id
      ).then(() => {
        this.goodslist(this.currentPage);
      });
      this.dialogFormVisible = false;
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        DEL_GOODS_LIST(row.id).then(() => {
          this.goodslist(this.currentPage);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        });
      });
    },
    // 初始化
    goodslist(page) {
      LIST_GOODS(page, this.pageSize).then(res => {
        res.data.data.forEach(item => {
          item.imgUrl = item.imgUrl.split(",");
          item.ctime = this.resolvingDate(item.ctime);
        });
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    }
  },
  created() {
    CATEGORIES_GOODS().then(res => {
      this.listgoods = res.data.categories;
    });
    this.goodslist(this.currentPage);
  }
};
</script>

<style lang="less" scoped>
.list {
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
  .el-pagination {
    padding: 20px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  img {
    width: 80px;
    height: 80px;
  }
  .imgs {
    padding: 0 4px;
  }
}
</style>