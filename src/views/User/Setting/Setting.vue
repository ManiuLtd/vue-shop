<template>
   <div>
       <section  v-if="security">
           <Security/>
       </section>
       <section v-else class="inform-nav">
           <van-nav-bar title="设置" left-arrow :fixed="fixed" @click-left="onClickLeft"/>
           <div style="margin-top: 46px">
               <router-link to="/person" class="addr">
                   <van-row type="flex" justify="space-between">
                       <van-col span="5">个人资料</van-col>
                       <van-col span="1" class="t-right">
                           <van-icon name="arrow"/>
                       </van-col>
                   </van-row>
               </router-link>
               <div class="addr" @click="security =!security">
                   <van-row type="flex" justify="space-between">
                       <van-col span="6">账户与安全</van-col>
                       <van-col span="1" class="t-right">
                           <van-icon name="arrow"/>
                       </van-col>
                   </van-row>
               </div>
               <div class="addr">
                   <van-row type="flex" justify="space-between">
                       <van-col span="5">账户状态</van-col>
                       <van-col span="2.5">
                           <span>{{userInfo.uAccount}}</span>
                       </van-col>
                   </van-row>
               </div>
           </div>
       </section>

   </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Security from '../../../components/User/Security/Security.vue'
    export default {
        data() {
            return {
                fixed: true, // 是否固定在顶部
                security: false// 账户与安全组件
            }
        },
        components: {
            Security
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
            width 94%
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
