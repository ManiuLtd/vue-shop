import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

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

import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
