import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
// import { TOKEN } from "@/api/apis";
Vue.use(VueRouter)
const router=new VueRouter({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta:{ role: ["super", "normal"]}
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../pages/Index.vue'),
      children: [
        {
          path: '/index/home',
          name: 'home',
          component: () => import('../pages/index/Home.vue'),
          meta:{ role: ["super", "normal"]}
        },
        {
          path: '/index/order',
          name: 'order',
          component: () => import('../pages/index/Order.vue'),
          meta:{ role: ["super", "normal"]}
        },
        {
          path: '/index/my',
          name: 'my',
          component: () => import('../pages/index/My.vue'),
          meta:{ role: ["super", "normal"]}
        },
        {
          path: '/index/ProductList',
          name: 'goods',
          component: () => import('../pages/index/goods/ProductList.vue'),
          meta:{ role: ["super", "normal"]}
        },
        {
          path: '/index/ProductAdd',
          name: 'ProductAdd',
          component: () => import('../pages/index/goods/ProductAdd.vue'),
          meta:{ role: ["super", "normal"]}
        },
        {
          path: '/index/Categories',
          name: 'Categories',
          component: () => import('../pages/index/goods/Categories.vue'),
          meta:{ role: ["super", "normal"]}
        },
        {
          path: '/index/Store',
          name: 'Store',
          component: () => import('../pages/index/Store.vue'),
          meta:{ role: ["super"]}
        },
        {
          path: '/index/AccountList',
          name: 'AccountList',
          component: () => import('../pages/index/account/AccountList.vue'),
          meta:{ role: ["super"]}
        },
        {
          path: '/index/AddAcc',
          name: 'AddAcc',
          component: () => import('../pages/index/account/AddAcc.vue'),
          meta:{ role: ["super"]}
        },
        {
          path: '/index/ChangePwd',
          name: 'ChangePwd',
          component: () => import('../pages/index/account/ChangePwd.vue'),
          meta:{ role: ["super"]}
        },
        {
          path: '/index/OrderStatistics',
          name: 'OrderStatistics',
          component: () => import('../pages/index/sale/OrderStatistics.vue'),
          meta:{ role: ["super"]}
        },
        {
          path: '/index/CoStatistics',
          name: 'CoStatistics',
          component: () => import('../pages/index/sale/CoStatistics.vue'),
          meta:{ role: ["super"]}
        }
      ]
    }


  ]
})
// router.beforeEach((to,from, next) => {
//   // ${/    /to and from are Route Object,next() must be called to resolve the hook}
//   if(to.path!="/"){//跳转路由不是/
//     TOKEN(localStorage.token).then(res=>{
//       //判断是否登录
//       if(res.data.code==0){
       
//         if(to.meta.role.includes(localStorage.role)){
//           next()
//         }else{
//           next(from.path)
//         }
//       }
//       //登陆失效后拦截到登录页面
//       else next('/')
//       })
    
//   }else {
//     if(to.meta.role.includes(localStorage.role)){
//       next()
//     }else{
//       next(from.path)
//     }
//   }//前往
// })
export default router