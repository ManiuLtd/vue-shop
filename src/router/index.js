import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login/Login.vue'
import Register from '../views/Register/Register.vue'
// 发布商品
import Release from '../views/Release/Release.vue'

import ProfileContainer from '../views/Profile/ProfileContainer.vue'
// 设置
import Setting from '../views/User/Setting/Setting.vue'
// 个人信息
import PersonInform from '../views/User/PersonInform/PersonInform.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home, meta: {showFooter: true} },
  { path: '/login', name: 'login', component: Login, },
  { path: '/register', name: 'register', component: Register, },
  {path: "/release", name: "Release", component: Release},// 发布商品
  {path: "/profile", name: "ProfileContainer", component: ProfileContainer, meta: {showFooter: true},},
  {path: '/setting', name: Setting, component: Setting}, // 设置
  {path: '/person', name: PersonInform, component: PersonInform},// 个人信息

  { path: '/about', name: 'about', component: ()=> import('../views/About.vue')}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
