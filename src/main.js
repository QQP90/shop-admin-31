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
import Login from "./components/Login.vue"

// 注册axios组件
Vue.use(axios);
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
    path:"/login",component:Login
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
