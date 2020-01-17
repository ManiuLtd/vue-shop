import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login/Login.vue'
import Register from '../views/Register/Register.vue'
// 主页
import Home from '../views/Home.vue'
// 商品详情页
import GoodsList from '../views/Goods/GoodsList.vue'
// 分类
import Classify from '../views/Classify/Classify.vue'

// 失物招领
import ServiceContainer from '../views/Service/ServiceContainer.vue'
// 发布失物招领信息
import LostAndFound from '../views/Service/LostAndFound.vue'
// 发布商品
import Release from '../views/Release/Release.vue'

import Message from '../views/Message/Message.vue'
import Chat from '../views/Chat/Chat.vue'
// 个人中心
import ProfileContainer from '../views/Profile/ProfileContainer.vue'
// 设置
import Setting from '../views/User/Setting/Setting.vue'
// 个人信息
import PersonInform from '../views/User/PersonInform/PersonInform.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, },
  { path: '/register', name: 'register', component: Register, },

  { path: '/', name: 'home', component: Home, meta: { showFooter: true } },
  { path: '/goods/:id', name: 'GoodsList', component: GoodsList, },
  { path: '/classify/:id', name: 'Classify', component: Classify },
  { path: '/service', name: 'ServiceContainer', component: ServiceContainer, meta: { showFooter: true } },
  { path: '/lost', name: 'LostAndFound', component: LostAndFound },

  { path: '/message', name: 'Message', component: Message, meta: { showFooter: true } },
  { path: '/chat', name: 'Chat', component: Chat },

  { path: '/release', name: 'Release', component: Release },// 发布商品
  { path: '/profile', name: 'ProfileContainer', component: ProfileContainer, meta: { showFooter: true }, },
  { path: '/setting', name: Setting, component: Setting }, // 设置
  { path: '/person', name: PersonInform, component: PersonInform },// 个人信息

  { path: '/about', name: 'about', component: () => import('../views/About.vue') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
