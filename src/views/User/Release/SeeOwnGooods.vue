<template>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <div class="mui-nav" v-if="goodsInform.goods">
            <van-sticky>
                <div class="header-fixed">
                    <div id="city_pick" @click="prev">
                        <span style="vertical-align: -3px"><van-icon name="arrow-left"/></span>
                        <span>返回</span>
                    </div>
                    <div class="ownGoods">
                        已发布商品
                    </div>
                </div>
                <div style="height: 36px"></div>
            </van-sticky>
            <div class="mui-card">
                <van-row style="width: 100%;">
                    <van-col span="6" class="order-img">
                        <img alt="" :src="goodsInform.goods.gPicture">
                    </van-col>
                    <van-col style="text-align: left" span="18">
                        <div class="in-l span-r">标题： {{goodsInform.goods.gTitle}}</div>
                        <div class="in-l span-g">
                            <span>销量: {{goodsInform.goods.gSales}}</span>
                            <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                            <span>库存: {{goodsInform.goods.gNumber}}</span>
                        </div>
                        <div class="in-l span-g">价格：{{goodsInform.goods.gPrice}}</div>
                        <div class="in-l span-g">日期：{{goodsInform.goods.gTime | dataFmt('YYYY-MM-DD HH:mm')}}</div>
                    </van-col>
                </van-row>
            </div>
            <div class="mui-card">
                <div class="mui-card-header">商品简介</div>
                <div class="mui-card-disc">
                    <p v-html="goodsInform.goods.gIntroduce"/>
                </div>
            </div>
            <div class="mui-card">
                <van-divider :style="{ color: '#fc9153', borderColor: '#fc9153', padding: '0 16px' }">
                    商品图片
                </van-divider>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <img v-for="(img, index) in goodsPictures" :key="index"
                             :src="img" class="lazy-img" alt="稍等片刻">
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
        </div>
    </van-pull-refresh>
</template>

<script>
    import { mapState } from 'vuex'
    import skuData from '../../Goods/data'

    export default {
        data () {
            return {
                current: 0,
                goodsPictures: [],
                isLoading: false,
                title: '商品详情页',
            }
        },
        computed: {
            ...mapState(['goodsInform']),
        },
        mounted () {
            const gId = this.$route.params.id
            this.$store.dispatch('reqGoodsInform', gId)
        },
        watch: {
            goodsInform () {
                if (!this.$store.state.goodsInform) {
                    return
                } else {
                    const goodsInform = JSON.parse(JSON.stringify(this.$store.state.goodsInform))
                    skuData.sku.stock_num = goodsInform.goods.gNumber
                    skuData.sku.price = goodsInform.goods.gPrice
                    skuData.quota = goodsInform.goods.gNumber - 1
                    skuData.goods_info.picture = goodsInform.goods.gPicture
                    if (goodsInform.goods.gPictures) {
                        const _gPicture = goodsInform.goods.gPictures
                        this.goodsPictures = _gPicture.slice(0, _gPicture.length - 1).split('，')
                    } else {
                        console.log('暂无商品图片')
                    }
                }
            }
        },
        methods: {
            // 返回上一级
            prev () {
                this.$router.go(-1)
            },
            // 刷新
            onRefresh () {
                setTimeout(() => {
                    this.$router.go(0)
                    this.$toast('刷新成功')
                    this.isLoading = false
                }, 500)
            },
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    @import "../../../assets/stylus/goodsItem.styl"
    .header-fixed
        .ownGoods
            display inline-block
            color #FFF
            width: 72%;
            font-size 14px
            text-align center

    .order-img
        margin-top 12px
        text-align center

        img
            width 59px

    .in-l
        margin 6px 0

        span
            margin-right 6px

    .span-g
        color #73806f

    .span-r
        color #f06c7a
        font-weight: 600

    .mui-card-header
        margin-bottom 3px
        color #f06c7a

    .lazy-img
        width: 42%;
        margin 3px 6px

    .van-row
        background-color #fff
        padding: 8px 6px
        text-align center
        font-size 12px

</style>
