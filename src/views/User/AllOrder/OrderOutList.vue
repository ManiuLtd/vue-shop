<template>
    <div class="order-nav">
        <div class="header-fixed">
            <div id="city_pick" @click="prev">
                <span style="vertical-align: -3px"><van-icon name="arrow-left"/></span>
                <span>返回</span>
            </div>
            <div class="ownGoods">我卖出的</div>
        </div>
        <div style="height: 41px"></div>
        <div class="addr" v-for="(ordeOut, index) in orderOutList" :key="index">
            <router-link tag="div" :to="`/orderDetail2/${ordeOut.order.id}`">
                <div class="head-t">
                    <img :src="ordeOut.user.uHead" alt="">
                    <span>{{ordeOut.user.uEmail}}</span>
                    <span class="order-z">
                    <van-tag v-if="ordeOut.order.whetherDealt === 0" type="success">等待卖家确认</van-tag>
                    <van-tag v-if="ordeOut.order.whetherDealt === 1" type="warning">卖家已确认</van-tag>
                    <van-tag v-if="ordeOut.order.whetherDealt === 2" type="primary">订单已完成</van-tag>
                    <van-tag v-if="ordeOut.order.whetherDealt === 3" type="danger">订单已失效</van-tag>
                    <van-tag v-if="ordeOut.order.whetherDealt === 4">卖家取消</van-tag>
                    <van-tag v-if="ordeOut.order.whetherDealt === 5">买家取消</van-tag>
                    <span v-if="ordeOut.order.whetherDealt === 1">
                        <van-tag v-if="ordeOut.order.uStatus" type="primary">买家已付款</van-tag>
                        <van-tag v-else>买家未付款</van-tag>
                    </span>
                </span>
                </div>
                <div style="width: 100%;">
                    <van-row>
                        <van-col span="6" class="order-img">
                            <div style="height: 81px;overflow:hidden;">
                                <img alt="" :src="ordeOut.goods.gPicture">
                            </div>
                        </van-col>
                        <van-col span="18">
                            <van-row>
                                <van-col span="24" class="order-item">{{ordeOut.goods.gIntroduce}}</van-col>
                                <van-col span="24">
                                    <van-divider/>
                                </van-col>
                                <van-col span="24" class="order-price">
                                    <van-row>
                                        <van-col span="10">
                                            <span style="color: #24292e;">实付款:</span>
                                            <span style="font-weight: 700;">￥{{ordeOut.goods.gPrice}}</span>
                                        </van-col>
                                        <span class="span-g">{{ordeOut.goods.gTime | dataFmt('YYYY-MM-DD HH:mm')}}</span>
                                    </van-row>
                                </van-col>
                            </van-row>
                        </van-col>
                    </van-row>
                </div>
                <div class="contact-m">
                    <ul>
                        <li>
                            <van-icon name="chat-o"/>
                            <span>联系买家</span></li>
                        <li>
                            <van-icon name="more-o"/>
                            <span>查看评价</span></li>
                    </ul>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'AllOrder',
        data () {
            return {
                orderOutList: {}
            }
        },
        mounted () {
            this.$store.dispatch('reqOrderList')
            this.orderOutList = this.allOrderList.out
            // console.log(this.allOrderList)
            // console.log(this.orderOutList)
            // 买家购买，给商家发送信息0，1卖家确认可卖，2订单完成，3订单超出时间，订单作废
            // whetherDealt
        },
        computed: {
            ...mapState(['allOrderList']),
        },
        methods: {
            // 返回上一级
            prev () {
                this.$router.go(-1)
            },
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    .order-nav
        position: absolute
        width: 100%;
        height: 100%;
        background-color #F8F8F8

        .ownGoods
            display inline-block
            color #FFF
            width: 72%;
            font-size 14px
            text-align center

        .addr
            width: 90%;
            background-color #FFF
            padding: 8px 3%;
            margin: 12px auto 8px auto;
            -webkit-box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
            box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
            border-radius: 8px;

            .head-t
                padding 1px 4px 12px
                overflow: hidden;

                .order-z
                    float: right;

                span
                    vertical-align middle
                    margin-left 12px

                img
                    width 24px
                    height 24px
                    vertical-align middle
                    border-radius 100%

            .order-img
                img
                    width: 95%;
                    border-radius: 3px;

            .order-item
                padding-left 12px
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                line-height 21px !important
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                line-clamp: 3;
                -webkit-box-orient: vertical;

            .order-price
                color #f06c7a
                padding-left 12px
                overflow hidden

                .span-g
                    color #73806f
                    float: right;

            .contact-m
                text-align center
                margin 12px 5%

                ul
                    li
                        display inline-block
                        margin 0 8%

                        i
                            font-size 18px

                        span
                            vertical-align top
                            margin 0 6px
</style>