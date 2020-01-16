<!--
 @Description:
 @author BY
 @date 2019/11/5-17:46
-->
<template>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <div class="mui-nav" v-if="goodsInform.goods">
            <van-sticky>
                <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="prev"/>
            </van-sticky>
            <div style="position: relative;">
                <van-swipe :autoplay="3000" @change="onChange">
                    <van-swipe-item v-for="(picture, index) in goodsPictures" :key="index">
                        <img :src="picture" alt="" class="van-img"/>
                    </van-swipe-item>
                </van-swipe>
                <div class="indicator">{{current+1}}/{{goodsPictures.length}}</div>
            </div>
            <div class="mui-card">
                <div class="mui-card-header">
                    {{goodsInform.goods.gTitle}}
                </div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <span class="price-tip">￥</span>
                        <span class="price">{{goodsInform.goods.gPrice}}</span>
                        <span class="m-price">线下交易</span>
                    </div>
                </div>
                <van-row>
                    <van-col span="8">销量: {{goodsInform.goods.gSales}}</van-col>
                    <van-col span="8">库存: {{goodsInform.goods.gNumber}}</van-col>
                    <van-col span="8">浏览量: 768</van-col>
                </van-row>
            </div>
            <div class="mui-card">
                <div class="mui-card-header">商品简介</div>
                <div class="mui-card-disc">
                    <p v-html="goodsInform.goods.gIntroduce">

                    </p>
                </div>
            </div>
            <div class="mui-card">
                <Comment/>
            </div>
            <div class="mui-card">
                <van-divider :style="{ color: '#fc9153', borderColor: '#fc9153', padding: '0 16px' }">
                    商品详情
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
                    发布者信息
                </van-divider>
                <div class="mui-card-header">关于卖家</div>
                <div class="mui-card-disc">
                    <div class="user-inform">
                        <van-row style="text-align: left">
                            <van-col span="3">
                                <img :src="goodsInform.user.uHead" alt="">
                            </van-col>
                            <van-col span="20">
                                <span>昵称： {{goodsInform.user.uName}}</span>
                                <span>邮箱：{{goodsInform.user.uEmail}}</span>
                                <span>住址：{{goodsInform.user.uAddress}}</span>
                            </van-col>
                        </van-row>
                    </div>
                </div>
            </div>
            <div class="mui-card"  style="margin-bottom: 52px">
                <van-divider :style="{ color: '#fc9153', borderColor: '#fc9153', padding: '0 16px' }">
                    版权所有
                </van-divider>
                <p class="good-right">
                    Copy right 02018-02019大脸猫All Rights Reserved
                </p>
            </div>
        </div>
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="聊一聊"/>
            <van-goods-action-icon icon="star-o" text="收藏"/>
            <van-goods-action-button type="danger" text="马上买" @click="showBase = true"/>
        </van-goods-action>
        <!-- 基础用法 -->
        <van-sku
                v-model="showBase"
                :sku="skuData.sku"
                :goods="skuData.goods_info"
                :goods-id="skuData.goods_id"
                :hide-stock="skuData.sku.hide_stock"
                :quota="skuData.quota"
                :quota-used="skuData.quota_used"
                :initial-sku="initialSku"
                :showAddCartBtn="showAddCartBtn"
                reset-stepper-on-hide
                reset-selected-sku-on-hide
                disable-stepper-input
                :close-on-click-overlay="closeOnClickOverlay"
                :custom-sku-validator="customSkuValidator"
                @buy-clicked="onBuyClicked">
        </van-sku>
    </van-pull-refresh>
</template>

<script>
  import Comment from '../../components/Good/Subcomponents/Comment/Comment.vue'
  import skuData from './data'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        current: 0,
        goodsPictures: [],
        isLoading: false,
        title: '商品详情页',
        skuData: skuData,
        showBase: false,
        showCustom: false,
        showStepper: false,
        showSoldout: false,
        showAddCartBtn: false,
        closeOnClickOverlay: true,
        initialSku: {
          s1: '30349',
          s2: '1193',
          selectedNum: 1
        },
        customSkuValidator: () => '请选择xxx!',
      }
    },
    components: {
      Comment
    },
    computed: {
      ...mapState(['goodsInform']),
    },
    mounted() {
      const gId = this.$route.params.id
      this.$store.dispatch('reqGoodsInform', gId);

      console.log(skuData)
    },
    watch: {
        goodsInform() {
          if (!this.$store.state.goodsInform) {
            return
          } else {
            const goodsInform = JSON.parse(JSON.stringify(this.$store.state.goodsInform))
            skuData.sku.stock_num = goodsInform.goods.gNumber
            skuData.sku.price = goodsInform.goods.gPrice
            skuData.quota = goodsInform.goods.gNumber-1
            skuData.goods_info.picture = goodsInform.goods.gPicture
            if (goodsInform.goods.gPictures) {
              const _gPicture = goodsInform.goods.gPictures;
              this.goodsPictures = _gPicture.slice(0, _gPicture.length - 1).split('，');
            }else {
              console.log('暂无商品图片')
            }
          }
        }
    },
    methods: {
      // 返回上一级
      prev () {this.$router.push('/')},
      // 轮播图数字变化
      onChange (index) {this.current = index},
      // 刷新
      onRefresh () {
        setTimeout(() => {
          this.$router.go(0)
          this.$toast('刷新成功')
          this.isLoading = false
        }, 500)
      },
      onBuyClicked (data) {
        console.log(JSON.stringify(data))
        const id = this.$route.params.id
        this.$router.push(`/order/${id}`)
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    @import "../../assets/stylus/goodsItem.styl"
    .van-img
        width: 100%;
        height 280px
    .swiper
        width: 100%;

        .van-swipe
            img
                width: 100%;
                height: 100%;

    .indicator
        padding: 0 10px;
        height: 17px;
        line-height: 17px;
        border-radius: 17px;
        font-size: 9px;
        position: absolute;
        bottom: 12px
        right: 8px;
        color: #FFF;
        background-color: rgba(0, 0, 0, 0.2);

    .lazy-img
        width: 100%

    .van-row
        background-color #fff
        padding: 8px 6px
        text-align center
        font-size 12px

    .van-sku-container
        min-height 369px

        .van-sku-actions > .van-button
            height: 32px

</style>
