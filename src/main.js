import Vue from 'vue'
import ElementUI from 'element-ui'
import $ from 'jquery'

import App from './App'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './assets/baseCss.css'
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(ElementUI)

new Vue({
  el:'#app',
  render:h=>h(App),
  router
})



