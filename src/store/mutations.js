// 包含n个由action触发用于直接更新状态的方法的对象模块
import * as A from './mutation-types'

export default {
  [A.RECEIVE_USER_INFO] (state, { userInfo }) {
    state.userInfo = userInfo
    localStorage.userInfo = JSON.stringify(state.userInfo) // 可以顺手存入 localStorage 中
  },
  // 遍历学校
  [A.RECEIVE_SCHOOL_LIST] (state, { schoolList }) {
    state.schoolList = schoolList
  },
  // 遍历商品类型
  [A.RECEIVE_GOODS_TYPE] (state, { goodsType }) {
    state.goodsType = goodsType
  },
  // 遍历全部商品
  [A.RECEIVE_GOODS_LIST] (state, { goodsList }) {
    state.goodsList = goodsList
  },
  // 根据商品类型查询商品
  [A.RECEIVE_TYPE_GOODS] (state, { goodsList }) {
    state.goodsList = goodsList
  },
  // 查看商品详细信息
  [A.RECEIVE_GOODS_INFORM] (state, { goodsInform }) {
    state.goodsInform = goodsInform
  },
  [A.RECEIVE_LOST_LIST] (state, { lostList }) {
    state.lostList = lostList
  },

}
