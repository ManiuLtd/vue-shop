import {
    getSchool,
    searchSchool,
    getGoodTypes,
    getGoodsList,
    getLostList,
    getGoodsInform,
    getTypeGoods,
    getUserOder,
    getOwnGoods,
    getAllOrder,
} from '../api'
import * as A from './mutation-types'
import {Toast} from 'vant'
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
    // 根据类型查询商品
    async reqTypeGoods ({ commit }, { ageNumber, size, tId }) {
        const result = await await getTypeGoods(ageNumber, size, tId)
        if (result.success) {
            const goodsList = result.data
            commit(A.RECEIVE_GOODS_LIST, { goodsList })
        }
    },
    // 查看商品详情
    async reqGoodsInform ({ commit }, gId) {
        const result = await getGoodsInform(gId)
        if (result.success) {
            var goodsInform = result.data
            commit(A.RECEIVE_GOODS_INFORM, { goodsInform })
        }
    },
    //用户下单信息
    async reqOrderInform ({ commit }, gId) {
        const result = await getUserOder(gId)
        console.log(result)
        if (result.success) {
            var orderInform = result.data
            commit(A.RECEIVE_ORDER_INFORM, { orderInform })
            Toast(result.msg);
        }
        Toast({
            message: result.msg,
            duration: 5000
        })
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
    // 用户查看自己发布的所有商品
    async reqOwnGoodsList ({ commit }) {
        // 发送异步ajax请求
        const result = await getOwnGoods()
        if (result.success) {
            var ownGoodsList = result.data
            console.log(ownGoodsList)
            commit(A.RECEIVE_OWN_LIST, { ownGoodsList })
        }
    },
    // 返回用户的所有的订单信息
    async reqOrderList ({ commit }) {
        // 发送异步ajax请求
        const result = await getAllOrder()
        if (result.success) {
            var allOrderList = result.data
            commit(A.RECEIVE_ORDER_LIST, { allOrderList })
        }
    },
}
