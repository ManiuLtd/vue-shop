<!--
 @Description:
 @author BY
 @date 2019/11/3-17:14
-->
<template>
    <van-pull-refresh class="message" v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <van-sticky>
            <van-nav-bar title="消息列表"/>
        </van-sticky>
        <van-row class="message-item">
            <van-col span="18" class="van-col" style="padding-left: 6px;">关注微信公众号，通过微信随时接收用户咨询、订单状态</van-col>
            <van-col span="6" style="text-align: center">
                <van-button color="#FE5455" size="small">立即关注</van-button>
            </van-col>
        </van-row>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="message-list" v-for="(item, index) in list" :key="index">
                <keep-alive>
                    <van-row @click="goTo('/chat', item.id, item.name)">
                        <van-col class="list-l" span="4">
                            <img src="./img/sleep.jpg" alt="">
                        </van-col>
                        <van-col class="list-r" span="20">
                            <van-row>
                                <van-col span="21"><h2>{{item.name}}</h2></van-col>
                                <van-col span="3">
                                    <small>{{item.date}}</small>
                                </van-col>
                            </van-row>
                            <p dot>{{item.content}}</p>
                        </van-col>
                    </van-row>
                </keep-alive>

            </div>
        </van-list>
        <!--        <button @click="reqGood">点击</button>-->
    </van-pull-refresh>

</template>

<script>
    // import {_reqGoodsInfo} from '../../api/index'
    let moment = require("moment");
    export default {
        data() {
            return {
                list: [],
                isLoading: false,// 下拉刷新
                loading: false,//列表加载
                finished: false
            }
        },
        mounted() {

        },
        methods: {
            goTo(path, id, name) {
                this.$router.push({path: path, query: {id: id, name: name}})
            },
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.isLoading = false;
                }, 500);
            },
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        this.list.push({
                            id: i + 1,
                            name: '栗子超可爱耶' + (i+1),
                            content: '栗子超可爱耶栗子超可爱耶栗子超可爱耶栗子超可爱耶栗子超可爱耶',
                            date: moment(new Date()).format('MM-DD')
                        });
                    }
                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= 40) {
                        this.finished = true;
                    }
                }, 500);
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    .message
        margin-bottom 60px

    .message-item
        padding: 0 2px
        line-height: 21px
        font-size 12px

    .message-list
        padding: 6px
        border-bottom 1px solid #EEE

    .list-r
        h2
            padding: 6px 0
            line-height 24px
            color: #525252;
            margin 0
            font-size 12px

        p
            padding-right 8px
            font-size 12px
            margin 0
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

        small
            position: relative;
            top: 7px;
            font-size 9px
            color #bebebe

    .list-l
        position: relative;
        top: 7px;
        padding-bottom 6px

        img
            width 42px
            height 42px
            border-radius 5px
</style>
