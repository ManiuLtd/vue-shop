<template>
    <div class="cmt-container">
        <van-row type="flex" justify="space-between" style="width: 100%">
            <van-col span="12" class="van-temp">商品评价({{number}})</van-col>
            <van-col span="5" style="color: #17e6a1">查看全部 ></van-col>
        </van-row>
        <div class="demo-preview" v-for="(item, index) in parameter" :key="index">
            <img :src="item.src" alt="">
            <div class="demo-content">
                <van-row class="van-s">
                    <van-col span="16" class="van-name">{{item.name}}</van-col>
                    <van-col span="8" class="bot">{{item.date}}</van-col>
                </van-row>
                <p class="van-comment">{{item.content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    let moment = require("moment");
    export default {
        data() {
            return {
                number: 102,
                parameter: [
                    {
                        name: "王福坤大坏蛋",
                        content: '王福坤十足大坏蛋大坏蛋大坏蛋大坏蛋大坏蛋大坏蛋大坏蛋大坏蛋大坏蛋大坏蛋大坏蛋大坏蛋大坏蛋大坏蛋大坏蛋大坏蛋',
                        src: "http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg",
                        type: ["X", "酒红色"],
                        date: moment(new Date()).format('YY-MM-DD hh:mm')
                    },
                    {
                        name: "王福坤大坏蛋",
                        content: '商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢',
                        src: "http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg",
                        type: ["X", "酒红色"],
                        date: moment(new Date()).format('YY-MM-DD hh:mm')
                    },
                ]

            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    .van-row
        background-color #fff
        padding: 8px 6px
    .demo-preview
        display: flex;
        font-size 11px
        background-color #FFF
        padding: 5px
        border-bottom 1px dotted #eee
        img
            width: 32px;
            height: 32px;
            border-radius 100%
            margin-right: 4px;
        .van-s
            padding:0
        .van-name
            padding 2px 0
            font-size 12px
        .van-comment
            line-height:18px
            color #606266
            margin 2px 0
    .bot
        color: #909399
        font-size 10px
        padding 5px 0
</style>
