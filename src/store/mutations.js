// 包含n个由action触发用于直接更新状态的方法的对象模块
import * as A from './mutation-types'

export default {
  [A.RECEIVE_USER_INFO] (state, { userInfo }) {
    state.userInfo = userInfo
    localStorage.userInfo = JSON.stringify(state.userInfo) // 可以顺手存入 localStorage 中
  },
  [A.RECEIVE_SCHOOL_LIST] (state, { schoolList }) {
    state.schoolList = schoolList
  },
  [A.RECEIVE_GOODS_TYPE] (state, { goodsType }) {
    state.goodsType = goodsType
  },
  [A.RECEIVE_GOODS_LIST] (state, { goodsList }) {
    state.goodsList = goodsList
  },
  [A.RECEIVE_LOST_LIST] (state, { lostList }) {
    state.lostList = lostList
  },
  [A.RECEIVE_GOODS_INFORM] (state, { goodsInform }) {
    state.goodsInform = goodsInform
  },
}
