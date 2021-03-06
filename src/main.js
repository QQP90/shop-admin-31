import Vue from 'vue'
import App from './App.vue'
// 导入组件element-ui
import ElementUI from "element-ui";
// 引入样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入vue-router
import VueRouter from "vue-router"
// 引入axios组件
import axios from "axios"
// 引入Login组件
import Login from "./pages/Login.vue"
// 引入Admin组件
import Admin from "./pages/Admin.vue"
import GoodsList from "./pages/GoodsList.vue"
import CategryList from "./pages/CategryList.vue"
import GoodsAdd from "./pages/GoodsAdd.vue"
import GoodsEdit from "./pages/GoodsEdit.vue"
//导入vuex中的store
import store from "./store"


// 注册VueRouter
Vue.use(VueRouter);

// 注册组件element
Vue.use(ElementUI);
Vue.config.productionTip = false


// 绑定axios
Vue.prototype.$axios = axios

// 组件配置路由
const routes = [
  {
    path:"/",redirect:"/admin/goods-list"
  },
  {
    path:"/login",component:Login
  },
  {
    path:"/admin",component:Admin,meta:"后台管理", children:[
      {
        path:"goods-list", meta:"商品管理", component:GoodsList
      },
      {
        path:"categry-list", meta:"栏目管理", component:CategryList
      },
      {
        path:"goods-add", meta:"添加商品", component:GoodsAdd
      },
      {
        path:"goods-edit/:id", meta:"编辑商品", component:GoodsEdit
      }
    ]
  }
]
// 创建路由实例
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next)=>{
  // console.log(to,from)
  axios({
    url:"http://localhost:8899/admin/account/islogin",
    method:"GET",
    // 处理session跨域
    withCredentials: true
  }).then(res=>{
    // console.log(res)
    const {code} = res.data
    // 未登录状态
    if(to.path==="/login"){
      if(code==="logined"){
        next("/admin/goods-list")
      }else{
        next()
      }
    }
    // 如果已经登录
    else{
      if(code==="logined"){
        next()
      }else{
        next("/login")
      }
    }
  })
  
})


new Vue({
  render: h => h(App),
  router,
  // 仓库对象
  store
}).$mount('#app')
