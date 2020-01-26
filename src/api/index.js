/**
 * @Description:
 * @author BY
 * @date 2019/11/3-17:25
 */
import ajax from './ajax'

const BASE_URL = '/api'
// 查看所有学校
export const getSchool = () => ajax(BASE_URL + '/school')
// 搜索学校
export const searchSchool = (schoolName) => ajax(BASE_URL + `/school/{schoolName}?schoolName=${schoolName}`)
// 判断邮箱是否已被注册
export const judgeEmail = (uEmail) => ajax(BASE_URL + '/user/3', { uEmail })
// 获取验证码
export const reqSendCode = (uEmail) => ajax(BASE_URL + `/user/4/{uEmail}?uEmail=${uEmail}`, { uEmail }, 'POST')
// 注册
export const register = (userEmail, userPassword, code, sId) => ajax(BASE_URL + `/user/2?userEmail=${userEmail}&userPassword=${userPassword}&code=${code}&sId=${sId}`, {
    userEmail,
    userPassword,
    code,
    sId
}, 'POST')
// 登录
export const login = (userEmail, userPassword, flag) => ajax(BASE_URL + `user/1?userEmail=${userEmail}&userPassword=${userPassword}&flag=1`, {
    userEmail,
    userPassword,
    flag
}, 'POST')
// 用户修改信息

// 遍历商品
export const getGoodsList = () => ajax(BASE_URL + '/goods')
// 遍历商品类型
export const getGoodTypes = () => ajax(BASE_URL + '/goodsType/all')
// 用户确认下单
export const getUserOder = (gId) => ajax(BASE_URL + '/goods/' + `${gId}`, gId, 'PUT')
// 根据类型查询商品
export const getTypeGoods = (pageNumber, size, tId) => ajax(BASE_URL + '/goods/getPageByType/' + `${pageNumber}/` + `${tId}/` + `${size}`)
// 查看商品的详情
export const getGoodsInform = (gId) => ajax(BASE_URL + '/goods/2/' + `${gId}`)

// 遍历失物招领信息
export const getLostList = () => ajax(BASE_URL + '/lost/1')

// 根据页数查询数据
export const getGoods = (pageNumber) => ajax(BASE_URL + `/goods/page/${pageNumber}`)

// 用户查看自己发布的所有商品
export const getOwnGoods =() => ajax(BASE_URL + '/goods/own')
// 返回用户的所有的订单信息
export const getAllOrder = () => ajax(BASE_URL + '/3')