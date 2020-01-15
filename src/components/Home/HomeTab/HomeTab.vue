<!--
 @Description:
 @author BY
 @date 2019/11/3-10:26
-->
<template>
    <div style="margin-bottom: 60px">
        <div class="goods-list">
            <!--                        :to="`/goods/${item.id}`"-->
            <router-link class="goods-item" v-for="item in goodsList.pageOne" :key="item.gId"
                         :to="`/goods/${item.id}`"
                         tag="div">
                <img :src="item.gPicture" alt="">
                <div style="padding: 0 2px">
                    <h1 class="title">{{item.gIntroduce}}</h1>
                    <div class="info">
                        <p class="sell"><span class="gNumber">剩{{item.gNumber}}件</span></p>
                        <p class="price">
                            <span class="now">¥{{ item.gPrice }}</span>
                            <span class="gSales">月销量{{item.gSales}}</span>
                        </p>

                    </div>
                </div>
            </router-link>
        </div>
        <van-tabs animated>
            <van-tab v-for="(item, index) in goodsList.goodsTypes" :key="index" :title="item.name"></van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                list: [],
            }
        },
        computed: {
            ...mapState(['goodsList', 'goodsType']),
        },
        mounted() {
            this.$store.dispatch('reqGoodsList');
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    .van-ellipsis
        font-size 11px
    .goods-list
        padding: 7px;
        overflow: hidden;
        background-color #F8F8F8
        .goods-item
            width: 49%;
            font-size 11px
            float left
            border-radius .2rem
            background-color: #fff
            box-shadow: 0 0.02rem 0.16rem 0 rgba(0,0,0,.12);
            margin: 4px 0;
            padding: 2px
            img
                width: 100%;
            .title
                line-height: 14px
                background-color #FFF
                overflow: hidden;
                display: -webkit-box;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size 13px
            .info
                p
                    margin: 0;
                    padding: 5px 0;
                    display: flex;
                    justify-content: space-between;

                .price
                    .now
                        font-weight: bold;
                        font-size 14px
                    .gSales
                        color: #c8c8c8;
                        font-size: 0.24rem;
                .sell
                    .gNumber
                        text-align: center;
                        padding 2px 8px
                        background: rgba(255,75,75,.1);
                        border-radius: 1rem;
                        font-size: .24rem;
                        color: #fd354d;
</style>
