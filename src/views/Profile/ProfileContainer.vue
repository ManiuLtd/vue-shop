<template>
    <div class="van-nav">
        <section>
            <header>
                <div class="icon-btn">
                    <router-link to="/message">
                        <van-icon name="more-o"></van-icon>
                    </router-link>
                    <router-link v-if="userInfo" to="/setting">
                        <van-icon name="setting-o"></van-icon>
                    </router-link>
                    <router-link v-else to="/login">
                        <van-icon name="setting-o"></van-icon>
                    </router-link>
                </div>
            </header>
            <div style="height: 42px;"></div>
            <div>
                <div class="user" v-if="userInfo">
                    <img class="portrait" :src="userInfo.uHead" alt="">
                    <van-row style="width: 60%">
                        <router-link to="/person" class="router-a">
                            <van-col span="24" class="van-name">
                                {{userInfo.uId}}
                            </van-col>
                        </router-link>
                        <van-col span="24">点击昵称编辑资料</van-col>
                    </van-row>
                    <div class="QR-code">
                        <img src="./img/QR-code.png" alt="">
                    </div>
                </div>
                <div class="user" v-else>
                    <img class="portrait" src="./img/portrait.png" alt="">
                    <van-row style="width: 60%">
                        <router-link to="/login" class="router-a">
                            <van-col span="24" class="van-name">游客在线001</van-col>
                        </router-link>
                        <van-col span="24">点击昵称跳转到登录/注册页</van-col>
                    </van-row>
                </div>
                <div style="margin-top: -37px">
                    <div class="addr">
                        <van-row style="padding: 3px 0 5px">
                            <van-col span="18" class="van-temp">浏览历史</van-col>
                            <van-col span="6" style="color: #17e6a1">
                                查看全部
                                <van-icon name="arrow"></van-icon>
                            </van-col>
                        </van-row>
                        <div class="view-img">
                            <img v-for="(img, index) in viewImg" :key="index" :src="img" alt="">
                        </div>
                    </div>
                    <div class="addr">
                        <van-row type="flex" justify="space-between" style="width: 100%">
                            <van-col span="7" class="van-temp">
                                <van-icon name="gold-coin"></van-icon>
                                <span>我的资金</span>
                            </van-col>
                            <van-col span="2">
                                <van-icon name="arrow"></van-icon>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="addr">
                        <van-row type="flex" justify="space-between" style="width: 100%">
                            <van-col span="7" class="van-temp">
                                <van-icon name="star"></van-icon>
                                <span>我的收藏</span>
                            </van-col>
                            <van-col span="2">
                                <van-icon name="arrow"></van-icon>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="addr">
                        <van-row type="flex" justify="space-between" style="width: 100%">
                            <van-col span="7" class="van-temp">
                                <van-icon name="invition"></van-icon>
                                <span>全部订单</span>
                            </van-col>
                            <van-col span="2">
                                <van-icon name="arrow"></van-icon>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="addr">
                        <router-link to="/release">
                            <van-row type="flex" justify="space-between" style="width: 100%">
                                <van-col span="7" class="van-temp">
                                    <van-icon name="hot"></van-icon>
                                    <span>晒商品</span>
                                </van-col>
                                <van-col span="2">
                                    <van-icon name="arrow"></van-icon>
                                </van-col>
                            </van-row>
                        </router-link>
                    </div>
                    <div class="addr">
                        <van-row type="flex" justify="space-between" style="width: 100%">
                            <van-col span="7" class="van-temp">
                                <van-icon name="setting"></van-icon>
                                <span>设置</span>
                            </van-col>
                            <van-col span="2">
                                <van-icon name="arrow"></van-icon>
                            </van-col>
                        </van-row>
                    </div>
                </div>
            </div>
        </section>
        <button @click="test">测试</button>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                viewImg: [
                    "https://gd3.alicdn.com/imgextra/i3/TB1RPFPPFXXXXcNXpXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg",
                    "https://img.alicdn.com/imgextra/i1/2899059632/O1CN012L1VMqO37XtrF3G_!!2899059632.jpg",
                    "https://img.alicdn.com/imgextra/i4/789372247/O1CN011STAR30wqGPmfqv_!!789372247.jpg",
                    "https://img.alicdn.com/imgextra/i4/789372247/O1CN01EQ3qnK1STAR6yXCk2_!!789372247.jpg",
                ],
            }
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
        methods: {
            goTo(path) {
                this.$router.replace(path)
            },
            test() {
                let myName = JSON.parse(sessionStorage.getItem("data"));
                console.log(myName);
                let _myName = JSON.parse(localStorage.getItem("userInfo"));
                console.log(_myName);
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    .van-nav
        position: absolute
        width: 100%;
        height: 100%;
        background-color #F8F8F8

        .profile
            padding 100px 0
            text-align center
            box-sizing: border-box;

            .login_img
                padding 12px 0

            .van-button--large
                border-radius 5px

    header
        width: 92%;
        padding: 0 4%;
        height: 42px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: fixed;
        top: 0;
        z-index: 10;
        background-color: #f06c7a;

    .icon-btn
        width: 51px;
        height: 25px;
        line-height 25px
        flex-shrink: 0;
        display: flex;
        color: #fff;

        a
            color #FFF

        .van-icon
            font-size 17px
            margin 0 6px

    .user
        width: 92%;
        padding: 0 4%;
        color #FFF
        display: flex;
        align-items: center;
        background-color: #f06c7a;
        padding-bottom: 51px;

        .router-a
            color #FFF

        .portrait
            width 48px
            height 48px
            border-radius 100%
            margin-right 5px

        .van-name
            font-size 14px
            padding 6px 0

        .QR-code
            flex-shrink: 0;
            width: 10vw;
            height: 10vw;
            margin-left: 5vw;
            border-radius: 100%;
            background: linear-gradient(to left, #fbbb37 0%, #fcf0d0 105%);

    .addr
        width: 94%;
        background-color #FFF
        padding: 8px 3%;
        margin: 12px auto 8px auto;
        -webkit-box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
        border-radius: 8px;

        a
            color #000
            text-decoration none

        .van-temp span
            position relative
            left 3px
            top -1px

        .view-img
            img
                width 64px
                height 64px
                margin 0 3px
                border-radius 5px

        .van-icon
            top 3px

        .van-icon-star
            font-size 16px
            color #54b4ef

        .van-icon-setting
            font-size 16px
            color #e07472

        .van-icon-gold-coin
            font-size 16px
            color #F00

        .van-icon-hot
            font-size 16px
            color #ee883b

        .van-icon-invition
            font-size 16px
            color #9789f7
</style>
