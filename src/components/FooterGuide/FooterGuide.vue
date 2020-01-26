<!--
 @Description:
 @author BY
 @date 2019/11/2-20:11
-->
<template>
    <div>
        <van-tabbar v-model="active" active-color="#f06c7a" inactive-color="#000">
            <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
            <van-tabbar-item icon="hot-o" to="/service">服务</van-tabbar-item>
            <van-tabbar-item icon="add" class="release" @click="toRelease">发布</van-tabbar-item>
            <van-tabbar-item icon="chat" dot to="/message">消息</van-tabbar-item>
            <van-tabbar-item icon="user-circle-o" info="5" to="/profile">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {Toast} from 'vant'
export default {
    data() {
        return {
            active: 0,
        };
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    methods: {
        toRelease() {
            if (this.userInfo) {
                this.$router.push('/release')
            } else {
                Toast('您暂未登录，请先登录~~');
                this.$router.push('/login')
            }
        }

    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
.release
    position: relative;
    top: -10px;
    z-index: 99;
    color #f06c7a!important
    i
        font-size 30px!important
</style>
