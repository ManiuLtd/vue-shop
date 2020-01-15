// 包含n个基于state的getter计算属性方法的对象模块
export default {
    // 用户信息
    userInfo(state) {
        const userStr = window.sessionStorage.getItem('data');
        return state.userInfo = JSON.parse(userStr)
    }
}
