<!--
 @Description:
 @author BY
 @date 2019/12/7-21:01
-->
<template>
    <section class="inform-nav">
        <van-nav-bar title="失物招领" :fixed="fixed"
                     right-text="发表" left-arrow
                     @click-right="onClickRight"/>
        <div style="margin-top: 46px">
            <div class="addr">
                <van-row type="flex" justify="space-between">
                    <van-col span="7">修改手机号码</van-col>
                    <van-col span="7" class="t-right">
                        <span>159******65</span>
                        <van-icon name="arrow"/>
                    </van-col>
                </van-row>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    export default {
        data() {
            return {
                fixed: true, // 是否固定在顶部
            }
        },
        mounted() {
            this.$store.dispatch('reqLostList');
        },
        computed: {
            ...mapGetters(['userInfo']),
            ...mapState(['lostList']),
        },
        methods: {
            onClickRight() {
                this.$toast('按钮');
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
