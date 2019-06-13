// 导入vuex
import Vuex from "vuex";
import Vue from "vue";
// 注册vuex
Vue.use(Vuex)
// 新建一个仓库
 const store = new Vuex.Store({
    //  数据位置
     state:{
         user:JSON.parse(localStorage.getItem("user")) || {}
     },
     mutations:{
         // 设置用户数据
        // state是默认的参数，所有mutations下的方法第一个参数都是state
        // state指向上面的仓库数据
        setUser(state,data){
            state.user=data
            // data是一个对象，本地存储是只能存储字符串
            // 所以使用JSON.stringfry转换
            // console.log(data);
            localStorage.setItem("user",JSON.stringify(data))
        }
    }
 })
 
//  暴露
export default store;
