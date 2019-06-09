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
// 引入Register组件
import Register from "./pages/Register.vue"
// 引入Admin组件
import Admin from "./pages/Admin.vue"
import GoodsList from "./pages/GoodsList.vue"
import CategryList from "./pages/CategryList.vue"


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
      }
    ]
  }
]
// 创建路由实例
const router = new VueRouter({
  routes
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
