<template>
    <div class="own-nav">
        <div class="header-fixed">
            <div id="city_pick" @click="prev">
                <span style="vertical-align: -3px"><van-icon name="arrow-left"/></span>
                <span>返回</span>
            </div>
            <div class="ownGoods">
                已发布商品
            </div>
        </div>
        <div style="height: 41px"></div>
        <div class="addr" v-for="(goods, index) in ownGoodsList" :key="index">
            <router-link tag="div" :to="`/ownGoods/${goods.id}`">
                <van-row style="width: 100%;">
                    <van-col span="6" class="order-img">
                        <img alt="" :src="goods.gPicture">
                    </van-col>
                    <van-col span="18">
                        <van-row>
                            <van-col span="24" class="order-item">{{goods.gIntroduce}}</van-col>
                            <van-col span="24"><van-divider /></van-col>
                            <van-col span="24" class="order-price">
                                <van-row>
                                    <van-col span="10">￥ {{goods.gPrice}}</van-col>
                                    <span class="span-g">{{goods.gTime | dataFmt('YYYY-MM-DD HH:mm')}}</span>
                                </van-row>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
            </router-link>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'Release',
        mounted () {
            this.$store.dispatch('reqOwnGoodsList')
        },
        computed: {
            ...mapState(['ownGoodsList']),
        },
        methods: {
            // 返回上一级
            prev () {this.$router.go(-1);},
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    .own-nav
        position: absolute
        width: 100%;
        height: 100%;
        background-color #F8F8F8
        .header-fixed
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
                line-height 16px!important
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