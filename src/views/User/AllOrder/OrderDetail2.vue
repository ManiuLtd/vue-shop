<template>
    <section class="order-nav">
        <div class="header-fixed">
            <div id="city_pick" @click="prev">
                <span style="vertical-align: -3px"><van-icon name="arrow-left"/></span>
                <span>返回</span>
            </div>
            <div class="ownGoods">我卖出的</div>
        </div>
        <div style="height: 45px"></div>
        <div v-if="OrderDetail">
            <van-notice-bar v-if="OrderDetail.order.whetherDealt === 0" text="喵~~请尽快确认该商品是否可卖" color="#1989fa"
                            background="#ecf9ff"
                            left-icon="info-o" />
            <span v-if="OrderDetail.order.whetherDealt === 1">
                 <van-notice-bar v-if="OrderDetail.order.uStatus === 1" text="喵~~该订单买家已付款， 请尽快确认收款" color="#1989fa"
                                 background="#ecf9ff" wrapable
                                 left-icon="info-o"/>
                <van-notice-bar v-else text="喵~~该订单卖家已确认可卖，是否确认付款" color="#1989fa"
                                background="#ecf9ff" wrapable
                                left-icon="info-o"/>
            </span>
            <van-notice-bar v-if="OrderDetail.order.whetherDealt === 2" text="喵~~该订单已完成" color="#1989fa"
                            background="#ecf9ff"
                            left-icon="info-o" />
            <van-notice-bar v-if="OrderDetail.order.whetherDealt === 3" text="喵~~该订单已失效" color="#1989fa"
                            background="#ecf9ff"
                            left-icon="info-o" />
            <van-notice-bar v-if="OrderDetail.order.whetherDealt === 4" text="喵~~卖家已取消该订单" color="#1989fa"
                            background="#ecf9ff"
                            left-icon="info-o" />
            <div style="height: 5px;"></div>
            <div class="mui-card">
                <van-row>
                    <van-col span="6" class="order-img">
                        <div style="height: 81px;overflow:hidden;">
                            <img alt="" :src="OrderDetail.goods.gPicture">
                        </div>
                    </van-col>
                    <van-col span="18">
                        <van-row>
                            <van-col span="24" class="order-item">
                                {{OrderDetail.goods.gTitle}}
                                {{OrderDetail.goods.gIntroduce}}
                            </van-col>
                            <van-col span="24">
                                <van-divider/>
                            </van-col>
                            <van-col span="24" class="order-price">
                                <van-row>
                                    <van-col span="10">
                                        <span style="color: #24292e;">
                                            <span v-if="OrderDetail.order.uStatus===0">应收款:</span>
                                            <span v-else>实收款:</span>
                                            <span style="font-weight: 700;">￥{{OrderDetail.goods.gPrice}}</span>
                                        </span>
                                    </van-col>
                                    <van-button type="warning" size="mini" v-if="OrderDetail.order.mStatus">已收款</van-button>
                                    <van-button type="primary" size="mini" v-else @click="payment(OrderDetail.order.id)">确认收款</van-button>
                                </van-row>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
                <div class="contact-m">
                    <ul>
                        <li><van-icon name="chat-o"/><span>联系买家</span></li>
                        <li><van-icon name="more-o"/><span>查看评价</span></li>
                    </ul>
                </div>
            </div>
            <div v-if="OrderDetail.order.whetherDealt === 0" class="mui-card sale-t" >
                该商品是否可卖？
                <van-button  type="info" size="mini" @click="sureSale(OrderDetail.order.id, 1)">同意卖出</van-button>
                <van-button plain type="info" size="mini" @click="sureSale(OrderDetail.order.id, 4)">拒绝卖出</van-button>
            </div>
            <div class="mui-card">
                <van-divider :style="{ color: '#fc9153', borderColor: '#fc9153', padding: '0 16px' }">
                    订单信息
                </van-divider>
                <div class="mui-card-disc">
                    <ul class="order-u">
                        <li>
                            <b>订单编号: </b>
                            <span>{{OrderDetail.order.number}}</span>
                        </li>
                        <li>
                            <b>订单金额: </b>
                            <span>{{OrderDetail.order.gMoney}}</span>
                        </li>
                        <li>
                            <b>订单状态: </b>
                            <span v-if="OrderDetail.order.whetherDealt === 0">等待卖家确认</span>
                            <span v-if="OrderDetail.order.whetherDealt === 1">卖家已确认</span>
                            <span v-if="OrderDetail.order.whetherDealt === 2">订单已完成</span>
                            <span v-if="OrderDetail.order.whetherDealt === 3">订单已失效</span>
                            <span v-if="OrderDetail.order.whetherDealt === 4">卖家取消</span>
                        </li>
                        <li>
                            <b>下单时间: </b>
                            <span>{{OrderDetail.order.time | dataFmt('YYYY-MM-DD HH:mm')}}</span>
                        </li>
                        <li>
                            <b>买方确认付款: </b>
                            <span v-if="OrderDetail.order.uStatus">是</span>
                            <span v-else>否</span>
                        </li>
                        <li>
                            <b>卖方确认收款：</b>
                            <span v-if="OrderDetail.order.mStatus">是</span>
                            <span v-else>否</span>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="mui-card">
                <van-divider :style="{ color: '#fc9153', borderColor: '#fc9153', padding: '0 16px' }">
                    买家信息
                </van-divider>
                <div class="mui-card-header">关于买家</div>
                <div class="mui-card-disc">
                    <div class="user-inform">
                        <van-row style="text-align: left">
                            <van-col span="3">
                                <img :src="OrderDetail.user.uHead" alt="">
                            </van-col>
                            <van-col span="20">
                                <span><b>昵称： </b>{{OrderDetail.user.uName?OrderDetail.user.uName:'暂无'}}</span>
                                <span><b>邮箱： </b>{{OrderDetail.user.uEmail}}</span>
                                <span><b>住址： </b>{{OrderDetail.user.uAddress}}</span>
                            </van-col>
                        </van-row>
                    </div>
                </div>
                <div class="mui-card-footer">
                    <li><b>所在学校：</b> {{OrderDetail.school}}</li>
                    <li><b>账户状态：</b> {{OrderDetail.user.uAccount}}</li>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <van-divider :style="{ color: '#fc9153', borderColor: '#fc9153', padding: '0 16px' }">
                版权所有
            </van-divider>
            <p class="good-right">
                Copy right 02018-02019大脸猫All Rights Reserved
            </p>
        </div>
    </section>
</template>

<script>
    import { mapState } from 'vuex'
    import {Toast } from 'vant'
    import {getCheque, getSale} from '../../../api/index'
    export default {
        name: 'OrderDetail',
        mounted () {
            const oId = this.$route.params.id
            this.$store.dispatch('reqOrderDetail', oId)
            console.log(this.OrderDetail)
        },
        computed: {
            ...mapState(['OrderDetail']),
        },
        methods: {
            prev () {
                this.$router.go(-1)
            },
            // 确认收款
            async payment(oId) {
                const result = await getCheque(oId);
                Toast(result.msg);
                this.$router.go(0);
            },
            // 确认是否可卖
            async sureSale(oId, status) {
                const result = await getSale(oId, status);
                if (result.success) {
                    this.$router.go(0);
                }
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    @import "../../../assets/stylus/goodsItem.styl"
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
        .sale-t
            padding 12px 0
            text-align center

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
            -webkit-box-orient: vertical;

        .order-price
            color #f06c7a
            padding-left 12px
            overflow hidden

            .van-button--mini
                float: right;

        .order-u
            li
                padding-bottom 6px

                b
                    margin 0 12px

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