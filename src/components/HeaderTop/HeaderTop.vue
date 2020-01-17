<!--
 @Description:
 @author BY
 @date 2019/11/2-20:58
-->
<template>
    <div id="top">
        <div class="header-fixed">
            <div id="city_pick">
                <span>北京</span>
                <van-icon name="arrow-down"></van-icon>
            </div>
            <div class="header-center">
                <div class="header-search-box">
                    <van-icon name="search"></van-icon>
                    <label for=""></label>
                    <input id="" type="text" v-model="value" placeholder="手机狂欢节 抢 iPhone X" class="header-search">
                </div>
            </div>
            <div class="header-icon">
                <van-icon name="scan"></van-icon>
            </div>
            <div :id="searchBarFixed === true ? 'scrollBg' :''"></div>
        </div>
        <div style="height: 28px"></div>
        <Swiper/>
    </div>
</template>

<script type="es6">
    import {Toast} from 'vant';
    import Swiper from '../Home/Swiper/Swiper.vue'
    export default {
        data() {
            return {
                value: '',
                searchBarFixed: false
            }
        },
      components: {
        Swiper,
      },
        methods: {
            onSearch() {
                // 得到搜索关键字
                const keyword = this.value.trim();
                // 进行搜索
                if (keyword) {
                    console.log(keyword);
                }
                const toast = Toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true,
                    message: '倒计时 3 秒'
                });

                let second = 3;
                const timer = setInterval(() => {
                    second--;
                    if (second) {
                        toast.message = `倒计时 ${second} 秒`;
                    } else {
                        clearInterval(timer);
                        // 手动清除 Toast
                        Toast.clear();
                    }
                }, 1000);
            },
            handleScroll: function () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                var offsetTop = document.querySelector('#top').offsetTop;
                this.searchBarFixed = scrollTop > offsetTop;
            },
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll)
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
    #top
        width: 100%;
        padding  2px 0 3px 0
        background-color #f06c7a
        border-bottom-left-radius 9%
        border-bottom-right-radius 9%
        overflow: hidden;
        zoom 1
    .header-fixed{
        position: fixed
        height 40px
        z-index 999999
        width 100%
        background-color #f06c7a
    }
    .van-swipe
            margin-top 12px
        #city_pick
            display inline-block
            width 15%
            padding: .07rem .25rem 0 .2rem
            color: #fff
            font-size 15px
            .van-icon-arrow-down
                position: relative;
                top: 3px;
        .header-center
            display: inline-block;
            width: 69%;
            margin 0 3px
            .header-search-box
                background-color: #fff
                width: 100%;
                height: 27px;
                line-height: 27px;
                padding-left: 10px;
                border-radius: 30px;
                .van-icon-search
                    font-size 18px
                    vertical-align: middle;
                .header-search
                    width: 90%;
                    padding-left 2px
                    background: none;
                    border: none;
                    color: #222;
                    font-size: 12px;
                    line-height: 27px;
        .header-icon
            display: inline-block
            color #FFF
            position: relative
            top: 6px
            left: 3%
            i
                font-size 24px

        #scrollBg
            width: 100%;
            height: 45px;
            line-height: 45px;
            background: #f06c7a;
            z-index: -1;
            position: fixed;
            left: 0;
            top: 0;
            text-align: center;
            font-size: 20px;
            color: #fff;
</style>

