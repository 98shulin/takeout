<template>
  <el-container>
    <el-aside width="200px">
      <h3>
        <img src="../assets/images/head.jpg" />外卖商家中心
      </h3>
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#6666ff"
        router
        unique-opened
      >
        <div v-for="item in newleftlist" :key="item.index">
          <!-- 二级 -->
          <el-submenu v-if="item.children" :index="item.index">
            <template slot="title">
              <i :class="item.cls"></i>
              <span>{{item.title}}</span>
            </template>
            <!-- 二级列表 -->
            <el-menu-item
              v-for="child in item.children"
              :key="child.toindex"
              :index="child.toindex"
            >{{child.totitle}}</el-menu-item>
          </el-submenu>
          <!-- 一级 -->
          <el-menu-item v-else :index="item.index">
            <i :class="item.cls"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <el-breadcrumb separator=">">
            <el-breadcrumb-item v-for="hash in Changebread" :key="hash">{{hash}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div>
          <span>欢迎你,{{acc}}</span>
          <router-link to="/index/my">
            <img :src="imgUrl" />
          </router-link>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import { ACCountinfo } from "@/api/apis";
import { TOKEN, ACCountinfo } from "@/api/apis";
export default {
  data() {
    return {
      acc: localStorage.acc,
      imgUrl: "",
      username: "",
      id: localStorage.id,
      // leftlist:左侧列表//  index:hash值// cls:图标// title：文字
      leftlist: [
        {
          index: "/index/home",
          cls: "el-icon-s-home",
          title: "后台首页",
          role: ["super", "normal"]
        },
        {
          index: "/index/order",
          cls: "el-icon-document-checked",
          title: "订单管理",
          role: ["super", "normal"]
        },
        {
          index: "goods",
          cls: "el-icon-goods",
          title: "商品管理",
          role: ["super", "normal"],
          //子列表
          children: [
            { toindex: "/index/ProductList", totitle: "商品列表" },
            { toindex: "/index/ProductAdd", totitle: "商品添加" },
            { toindex: "/index/Categories", totitle: "商品分类" }
          ]
        },
        {
          index: "/index/Store",
          cls: "el-icon-s-shop",
          title: "店铺管理",
          role: ["super"]
        },
        {
          index: "custom",
          cls: "el-icon-s-custom",
          title: "账号管理",
          role: ["super"],
          children: [
            { toindex: "/index/AccountList", totitle: "账号列表" },
            { toindex: "/index/AddAcc", totitle: "添加账号" },
            { toindex: "/index/ChangePwd", totitle: "修改密码" }
          ]
        },
        {
          index: "chart",
          cls: "el-icon-pie-chart",
          title: "销售统计",
          role: ["super"],
          children: [
            { toindex: "/index/CoStatistics", totitle: "商品统计" },
            { toindex: "/index/OrderStatistics", totitle: "订单统计" }
          ]
        }
      ],
      Changebread: [],
      defaultActive: ""
    };
  },
  methods: {
    // 判断hash显示面包屑导航
    breadhash(h) {
      let arr = [];
      switch (h) {
        case "/index/home":
          arr = ["首页"];
          break;
        case "/index/order":
          arr = ["订单管理"];
          break;
        case "/index/Store":
          arr = ["店铺管理"];
          break;
        case "/index/ProductList":
          arr = ["商品管理", "商品列表"];
          break;
        case "/index/ProductAdd":
          arr = ["商品管理", "商品添加"];
          break;
        case "/index/Categories":
          arr = ["商品管理", "商品分类"];
          break;
        case "/index/AccountList":
          arr = ["账户管理", "账号列表"];
          break;
        case "/index/AddAcc":
          arr = ["账户管理", "添加账号"];
          break;
        case "/index/ChangePwd":
          arr = ["账户管理", "修改密码"];
          break;
        case "/index/CoStatistics":
          arr = ["销售统计", "商品统计"];
          break;
        case "/index/OrderStatistics":
          arr = ["销售统计", "订单统计"];
          break;
        case "/index/my":
          arr = ["我的"];
          break;
      }
      this.Changebread = arr;
    }
  },
  // 权限
  computed: {
    newleftlist() {
      return this.leftlist.filter(i => i.role.includes(localStorage.role));
      // var news = this.leftlist.filter(i => {
      //   return i.role.includes(localStorage.role);
      // });
      // return news;
    }
  },
  // 监听hash值变化
  watch: {
    $route: {
      handler: function(val) {
        window._indexhash.breadhash(val.path);
      },
      // 深度观察监听
      deep: true
    }
  },
  // 初始化刷新页面
  created() {
    let hash = this.$route.path;
    this.defaultActive = hash;
    this.breadhash(hash);
    window._indexhash = this;
    // 初始化渲染用户头像
    ACCountinfo(this.id).then(res => {
      this.imgUrl = res.data.accountInfo.imgUrl;
    });
    //  验证token
    TOKEN(localStorage.token).then(res => {
      if (res.data.code == 0) {
        return;
      } else {
        this.$alert("账号已过期，请重新登录", "通知", {
          confirmButtonText: "确定",
          callback: () => {
            this.$router.push("/");
          }
        });
      }
    });
  }
};
</script>

<style lang="less" scoped>
@bgc: #304156;
.el-container {
  height: 100%;
  background-color: #f0f2f5;
  .el-aside {
    background-color: @bgc;
    height: 100%;
    .el-menu {
      border: none;
      a {
        text-decoration: none;
      }
    }
    h3 {
      color: #fff;
      text-align: center;
      margin: 0;
      line-height: 60px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
  .el-header {
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    height: 50px;
    align-items: center;
    img {
      margin-left: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
  .el-main {
    background-color: #f0f2f5;
    padding: 20px;
  }
  a {
    text-decoration: none;
    color: #333;
  }
}
</style>