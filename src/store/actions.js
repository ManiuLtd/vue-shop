import { getSchool, searchSchool, getGoodTypes, getGoodsList, getLostList, getGoodsInform } from '../api'
import * as A from './mutation-types'

export default {
  // 同步记录用户信息
  recordUser ({ commit }, userInfo) {
    commit(A.RECEIVE_USER_INFO, { userInfo })
  },
  // 异步获取学校列表
  async reqSchoolList ({ commit }) {
    // 发送异步ajax请求
    const result = await getSchool()
    if (result.success) {
      var schoolList = result.data
      commit(A.RECEIVE_SCHOOL_LIST, { schoolList })
    }
  },
  // 查找学校
  async searchSchool ({ commit }, keywords) {
    // 发送异步ajax请求
    const result = await searchSchool(keywords)
    if (result.code === 0) {
      var schoolList = result.data.data
      commit(A.RECEIVE_SCHOOL_LIST, { schoolList })
    }
  },
  // 异步获取分类列表
  async reqGoodsType ({ commit }) {
    const result = await getGoodTypes()
    if (result.success) {
      var goodsType = result.data
      commit(A.RECEIVE_GOODS_TYPE, { goodsType })
    }
  },
  // 异步获取商品列表
  async reqGoodsList ({ commit }) {
    // 发送异步ajax请求
    const result = await getGoodsList()
    if (result.success) {
      var goodsList = result.data
      commit(A.RECEIVE_GOODS_LIST, { goodsList })
    }
  },
  // 查看商品详情
  async reqGoodsInform ({ commit }, gId) {
    const result = await getGoodsInform(gId);
    if (result.success) {
      var goodsInform = result.data
      commit(A.RECEIVE_GOODS_INFORM, { goodsInform })
    }
  },
  // 异步获取失物招领列表
  async reqLostList ({ commit }) {
    // 发送异步ajax请求
    const result = await getLostList()
    if (result.success) {
      var lostList = result.data
      commit(A.RECEIVE_LOST_LIST, { lostList })
    }
  },
}
