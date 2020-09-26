import Vue from 'vue'
import App from './App.vue'

// 导入 ant-design-vue 组件库
import Antd from 'ant-design-vue'
// 导入组件库的样式表
import 'ant-design-vue/dist/antd.css'
import store from './store.js'

Vue.config.productionTip = false
// 挂载组件库
Vue.use(Antd)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
