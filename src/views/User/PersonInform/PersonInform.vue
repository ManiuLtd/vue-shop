
<!--
 @Description:
 @author BY
 @date 2019/12/6-8:26
-->
<template>
    <section class="setting-nav">
        <van-nav-bar title="个人信息"
                     right-text="按钮" left-arrow :fixed="fixed"
                     @click-right="onClickRight"
                     @click-left="onClickLeft"></van-nav-bar>
        <div style="margin-top: 46px">
            <div class="addr" style="padding: 0 3%">
                <van-row type="flex" justify="space-between" style="line-height: 18px;">
                    <van-col span="4" class="van-temp">头像</van-col>
                    <van-col span="4">
                        <img class="portrait" :src="userInfo.uHead" alt="">
                    </van-col>
                </van-row>
            </div>
            <div class="addr">
                <van-row type="flex" justify="space-between">
                    <van-col span="4">用户名</van-col>
                    <van-col span="12" class="t-right">
                        <span>{{userInfo.uId}}</span>
                    </van-col>
                </van-row>
            </div>
            <div class="addr">
                <van-row type="flex" justify="space-between">
                    <van-col span="4">邮箱号</van-col>
                    <van-col span="12" class="t-right">
                        <span>{{userInfo.uEmail}}</span>
                    </van-col>
                </van-row>
            </div>
            <div class="addr">
                <van-row type="flex" justify="space-between">
                    <van-col span="4">昵称</van-col>
                    <van-col span="6" class="t-right">
                        <span>暂无昵称</span>
                        <van-icon name="arrow"></van-icon>
                    </van-col>
                </van-row>
            </div>
            <div class="addr">
                <van-row type="flex" justify="space-between">
                    <van-col span="4">性别</van-col>
                    <van-col span="5" class="t-right">
                        <span>保密中</span>
                        <van-icon name="arrow"></van-icon>
                    </van-col>
                </van-row>
            </div>
            <div class="addr">
                <van-row type="flex" justify="space-between">
                    <van-col span="4">手机</van-col>
                    <van-col span="2.5">
                        <span>暂无</span>
                        <van-icon name="arrow"></van-icon>
                    </van-col>
                </van-row>
            </div>
            <div class="addr">
                <van-row type="flex" justify="space-between">
                    <van-col span="5">学校编号</van-col>
                    <van-col span="2.5">
                        <span>{{userInfo.uSchool}}</span>
                        <van-icon name="arrow"></van-icon>
                    </van-col>
                </van-row>
            </div>
            <div class="addr">
                <van-row type="flex" justify="space-between">
                    <van-col span="5">所在地区</van-col>
                    <van-col span="4.5">
                        <span @click="show=!show">{{userregion || "暂未设置"}}</span>
                        <van-icon name="arrow"></van-icon>
                    </van-col>
                </van-row>
            </div>
            <van-cell-group style="font-size: 13px">
                <van-field v-model="address" rows="1" autosize label="详细地址" type="textarea"
                           placeholder="请输入详细地址"></van-field>
            </van-cell-group>
            <van-popup v-model="show" position="bottom">
                <van-area
                        :area-list="areaList" @confirm="onConfirm"
                        :columns-placeholder="['请选择', '请选择', '请选择']">
                </van-area>
            </van-popup>

        </div>
    </section>

</template>

<script>
    import areaList from './area'
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                fixed: true, // 是否固定在顶部
                show: false, // 弹出层
                address: '',
                areaList,
                userregion: ''
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            onClickRight() {
                this.$toast('按钮');
            },
            onConfirm(e){
                this.show = false;
                console.log(e);
                this.regiondata = e;
                this.userregion = this.regiondata[0].name + this.regiondata[1] .name + this .regiondata[2].name
                console.log(this.userregion);
            },

        },
        computed: {
            ...mapGetters(['userInfo'])
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    .setting-nav
        position: absolute
        width: 100%;
        height: 100%;
        background-color #F8F8F8
        .van-nav-bar .van-icon
            color #f06c7a
        .van-cell
            padding: 10px 3%
        .addr
            background-color #FFF
            padding: 0 3%
            border-bottom 1px dotted #847e7e 3 d
            -webkit-box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
            box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);

            .t-right
                text-align right

            span
                position: relative;
                top -2px
                right 1px
                color #999

            .portrait
                width 48px
                height 48px
                border-radius 100%
                margin-right 5px

            .van-temp
                line-height 43px

            .van-row--justify-space-between
                line-height: 43px
</style>
