<!--
 @Description:
 @author BY
 @date 2019/11/14-22:41
-->
<template>
    <div id="container">
        <van-sticky>
            <van-nav-bar
                    :title=$route.query.name
                    left-arrow
                    @click-left="onClickLeft"/>

        </van-sticky>
        <div id="content">
            <ul id="save">

            </ul>
        </div>
        <van-row id="edit" type="flex" justify="space-around">
            <van-col span="3">
                <img src="./img/sleep.jpg" id="Img" alt="">
            </van-col>
            <van-col span="15">
                <el-input v-model="message" placeholder="请输入内容"/>
            </van-col>
            <van-col span="5" style="text-align: center">
                <el-button type="danger" size="small">发送</el-button>
            </van-col>
        </van-row>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                message: ''
            }
        },
        methods: {
            onClickLeft() {
                this.$router.push('/message')
            },
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    .el-input__inner
        height: 32px;
        line-height: 32px;
    .van-nav-bar__title
        text-align center
        max-width 100%
        margin 0
        background-color #F8F8F8
    #container
        position absolute
        width 100%
        height 100%
        background-color #F8F8F8

    #content{
        height 85%
        background-color #FFF
    }

    #content ul{
        margin: 0;
        padding: 0;
    }

    #edit{
        background: #ece7e766;
        position absolute
        bottom 0
        width 100%
        padding-top 5px
    }
    #Img{
        width: 36px;
        height: 36px;
        border-radius: 100%;
    }
    .showTxt{
        width: auto;
        height: auto;
        max-width: 230px;
        background: #008000a8;
        border:0;
        font-size: 15px;
        color: white;
        padding: 5px;
        border-radius: 2px;
        word-break: break-all;
        list-style: none;
        margin-top: 5px;
        display: list-item;
    }
    .left{
        text-align: left;
        margin-left: 50px;
        float: left;
    }
    .right{
        text-align: right;
        margin-right: 50px;
        float: right;
    }
    .showImg{
        width: 26px;
        height: 26px;
        border-radius: 13px;

    }
    .leftImg{
        left: 10px;
        position: absolute;
    }
    .rightImg{
        right: 10px;
        position: absolute;
    }

</style>
