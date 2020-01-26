import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuex from 'vuex';
Vue.use(Vuex);

Vue.config.productionTip = false
//开启debug模式
import axios from 'axios';
Vue.config.debug = true;
Vue.prototype.axios = axios;
axios.defaults.withCredentials = true;//每次请求，无论是否跨域，都带上cookie信息。
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.config.productionTip = false;

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// 瀑布流
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

//定义一个全局过滤器实现日期格式化
import moment from 'moment'
Vue.config.productionTip = false
Vue.filter('dataFmt',function (time,fmtString) {
    // 使用moment.js这个日期格式化类库实现日期的格式化功能
    return moment(time).subtract(8, 'hour').format(fmtString);
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
