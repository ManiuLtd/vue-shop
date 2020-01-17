<!--
 @Description:
 @author BY
 @date 2019/11/3-8:54
-->
<template>
    <nav class="nav">
        <!-- 快捷导航 -->
        <div class="sc-nav"></div>
        <div class="swiper-container" v-if="goodsType">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(goodsTypes, index) in goodsTypeArr" :key="index">
                    <router-link :to="`/classify/${goodsType.id}`" tag="div" class="link_to_nav" v-for="(goodsType, index) in goodsTypes"
                       :key="index">
                        <div class="nav_container">
                            <img :src="goodsType.ico" alt="">
                        </div>
                        <span>{{goodsType.name}}</span>
                    </router-link>
                </div>
            </div>
        </div>
        <img src="img/home_back.svg" alt="home_back" v-else>
    </nav>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    mounted() {
      this.$store.dispatch('reqGoodsType');
    },
    computed: {
      ...mapState(['goodsType']),
      goodsTypeArr () {
        const {goodsType} = this
        const arr = []
        let minArr = []
        // 遍历goodsType
        goodsType.forEach(c => {
          if (minArr.length === 2) {
            minArr = []
          }
          if (minArr.length === 0) {
            arr.push(minArr)
          }
          minArr.push(c)
        })
        return arr
      }
    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    @import "../../../assets/stylus/mixins.styl"
    /*首页导航*/
    .nav
        bottom-border-1px(#e4e4e4)
        background-color: #FFF
        .sc-nav
            background url("./img/grid.png")
        .swiper-container
            width 100%
            height 100%
            .swiper-wrapper
                width 100%
                height 100%
                padding 12px 0
                overflow-x: scroll
                white-space: nowrap;
                -webkit-overflow-scrolling:touch;
                .swiper-slide
                    display: inline-block;
                    vertical-align: text-top;
                    .link_to_nav
                        display block
                        margin 0 10px
                        text-align center
                        .nav_container
                            display inline-block
                            width 100%
                            text-align center
                            img
                                display inline-block
                                width 25px
                        span
                            display block
                            width 52px
                            color #666
                            margin-bottom: 12px;

            .swiper-pagination
                > span.swiper-pagination-bullet-active
                    background #02a774

</style>
