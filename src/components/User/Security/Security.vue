<!--
 @Description:
 @author BY
 @date 2019/12/7-21:01
-->
<template>
    <section class="inform-nav">
        <van-nav-bar title="账户与安全"
                     left-arrow :fixed="fixed"
                     @click-left="onClickLeft"></van-nav-bar>
        <div style="margin-top: 46px">
            <div class="addr">
                <van-row type="flex" justify="space-between">
                    <van-col span="4">用户名</van-col>
                    <van-col span="12" class="t-right">
                        <span>{{userInfo.uId}}</span>
                    </van-col>
                </van-row>
            </div>
            <div class="addr">
                <van-row type="flex" justify="space-between">
                    <van-col span="7">修改手机号码</van-col>
                    <van-col span="7" class="t-right">
                        <span>159******65</span>
                        <van-icon name="arrow"></van-icon>
                    </van-col>
                </van-row>
            </div>
            <div class="addr">
                <van-row type="flex" justify="space-between">
                    <van-col span="7">修改登录密码</van-col>
                    <van-col span="2" class="t-right">
                        <van-icon name="arrow"></van-icon>
                    </van-col>
                </van-row>
            </div>
            <div class="addr">
                <van-row type="flex" justify="space-between">
                    <van-col span="5">注销账户</van-col>
                    <van-col span="2" class="t-right">
                        <van-icon name="arrow"></van-icon>
                    </van-col>
                </van-row>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                fixed: true, // 是否固定在顶部
            }
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    .inform-nav
        position: absolute
        width: 100%;
        height: 100%;
        background-color #F8F8F8
        .van-nav-bar .van-icon
            color #f06c7a
        .addr
            display: inline-block
            width 100%
            background-color #FFF
            padding: 0 3%
            border-bottom 1px dotted #847e7e 3 d
            -webkit-box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
            box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);

            .t-right
                text-align right

            span
                position: relative;
                top -2px
                right 1px
                color #999

            .portrait
                width 48px
                height 48px
                border-radius 100%
                margin-right 5px

            .van-temp
                line-height 43px

            .van-row--justify-space-between
                line-height: 43px
</style>
