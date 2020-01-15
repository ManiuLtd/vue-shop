<!--
 @Description:
 @author BY
 @date 2019/11/3-8:20
-->
<template>
    <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in SwiperImg" :key="index">
            <img :src="image" alt=""/>
        </van-swipe-item>
    </van-swipe>
</template>

<script>
    import banner2 from './img/banner2.jpg'
    import banner4 from './img/banner4.jpg'
    import banner5 from './img/banner5.jpg'
    import banner6 from './img/banner6.jpg'
    export default {
        data() {
            return {
                SwiperImg: [
                    banner2,
                    banner4,
                    banner5,
                    banner6
                ],
            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    img
        width 100%
</style>
