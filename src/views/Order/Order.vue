<!--
 @Description:
 @author BY
 @date 2019/11/16-11:35
-->
<template>
    <div class="order-nav">
        <van-sticky>
            <van-nav-bar
                    title="确认订单"
                    left-text="返回"
                    left-arrow
                    @click-left="prev">
            </van-nav-bar>
        </van-sticky>
        <div class="addr">
            <van-row>
                <van-col span="5" style="position: relative; top: 5px; right: 3px;">
                    <img src="./img/addr.svg" alt="">
                </van-col>
                <van-col span="19">
                    <van-row>
                        <van-col span="24">昵称：{{user.uName}}&emsp;性别： {{user.uSex}}</van-col>
                        <br>
                        <van-col span="24">邮箱：{{user.uEmail}}</van-col>
                    </van-row>
                    <van-row class="address">
                        <van-col>住址： {{user.uAddress}}</van-col>
                    </van-row>
                </van-col>
            </van-row>
        </div>
        <div class="addr" @click="getDescribe">
            <van-row style="width: 100%;">
                <van-col span="6" class="order-img">
                    <img :src="goods.gPicture" alt="">
                </van-col>
                <van-col span="18">
                    <van-row>
                        <van-col span="24" class="order-item">{{goods.gIntroduce}}</van-col>
                        <van-col span="24"><van-divider /></van-col>
                        <van-col span="24" class="order-price">￥ {{goods.gPrice}}</van-col>
                    </van-row>
                </van-col>
            </van-row>
        </div>
        <div class="addr">
            <van-row type="flex" justify="space-between" style="width: 100%">
                <van-col span="5" class="van-temp">支付方式</van-col>
                <div class="f-r">
                    <van-tag plain type="primary">支付宝</van-tag>
                    <van-tag plain type="success">微信支付</van-tag>
                    <van-tag plain type="danger">现金支付</van-tag>
                </div>
            </van-row>
        </div>
        <div class="addr">
            <van-row type="flex" justify="space-between" style="width: 100%">
                <van-col span="5" class="van-temp">配送方式</van-col>
               <div class="f-r">
                   <van-tag plain type="success">当面交易</van-tag>
               </div>
            </van-row>
        </div>
        <div class="addr">
            <van-row style="width: 100%">
                <van-col span="4" class="van-temp">备注：</van-col>
                <van-col span="20">
                </van-col>
            </van-row>
        </div>
        <van-submit-bar :price="goods.gPrice*100" @submit="onSubmit" button-text="确认下单"/>
    </div>
</template>

<script>
    import Address from '../../components/AddressList/AddressList.vue'
    import { mapState } from 'vuex'

    export default {
        data () {
            return {
                message: '',
                user: {},
                goods: {}
            }
        },
        components: {
            Address
        },
        computed: {
            ...mapState(['goodsInform']),
        },
        mounted () {
            const gId = this.$route.params.id
            this.$store.dispatch('reqGoodsInform', gId)
            this.user = this.goodsInform.user
            this.goods = this.goodsInform.goods
            console.log(gId)
            console.log(this.goods.id)
        },
        methods: {
            prev () {
                const id = this.$route.params.id
                this.$router.push(`/goods/${id}`)
            },
            getDescribe() {
                const id = this.$route.params.id
                this.$router.push(`/goods/${id}`)
            },
            onSubmit () {
                const gId = this.$route.params.id
                this.$store.dispatch('reqOrderInform', gId);
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    .order-nav
        position: absolute
        width: 100%;
        height: 100%;
        background-color: #f8f8f8;

        .addr
            width: 90%;
            background-color #FFF
            padding: 8px 3%;
            margin: 12px auto 8px auto;
            -webkit-box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
            box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            display: flex;
            overflow: hidden;
            
            .f-r
                float: right;

            .address
                font-size: 11px;
                color: #999;
                padding 4px 0
                line-height 15px

            .order-img
                margin-top 4px
                img
                    width 59px

            .order-price
                color #f06c7a

            .order-item
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                line-height 16px!important
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;

            .van-tag
                margin 0 3px

    .van-button--large
        width: 51%;
        height: 37px;
        line-height: 37px;
        font-size 14px

    .van-temp
        color #909399
        margin-top 2px
        text-align center

    .van-input-input
        width 168%
        height 100%
        background: none;
        color: inherit;
        opacity: 1;
        -webkit-text-fill-color: currentcolor;
        font: inherit;
        line-height: inherit;
        letter-spacing: inherit;
        text-align: inherit;
        text-indent: inherit;
        text-transform: inherit;
        text-shadow: inherit;
</style>
