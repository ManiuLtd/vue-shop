<template>
    <div class="order-nav">
        <div class="header-fixed">
            <div id="city_pick" @click="prev">
                <span style="vertical-align: -3px"><van-icon name="arrow-left"/></span>
                <span>返回</span>
            </div>
            <div class="ownGoods">
                订单信息
            </div>
        </div>
        <div style="height: 41px"></div>
<!--        <div class="addr" v-for="(order, index) in allOrderList" :key="index">-->
<!--            <div>-->
<!--                订单编号：-->
<!--                <span>{{order.order.number}}</span>-->
<!--            </div>-->
<!--            <div>-->
<!--                下单时间：-->
<!--                <span>{{order.order.time | dataFmt('YYYY-MM-DD HH:mm')}}</span>-->
<!--            </div>-->
<!--            <div>-->
<!--                订单金额： {{order.order.gMoney}}-->
<!--            </div>-->
<!--            <div>-->
<!--                订单状态： {{order.order.whetherDealt}}-->
<!--            </div>-->
<!--            <div>-->
<!--                买方是否确认付款： {{order.order.uStatus}}-->
<!--            </div>-->
<!--            <div>-->
<!--                卖方是否确认收款： {{order.order.mStatus}}-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'AllOrder',
        mounted () {
            this.$store.dispatch('reqOrderList')
            // 买家购买，给商家发送信息0，1卖家确认可卖，2订单完成，3订单超出时间，订单作废
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

            .order-item
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                line-height 16px !important
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                line-clamp: 3;
                -webkit-box-orient: vertical;

            .order-img
                margin-top 4px
                text-align center

                img
                    width 59px

            .order-price
                color #f06c7a

            .span-g
                color grey

            .order-item
                line-height: 15px

</style>