<!--
 @Description:
 @author BY
 @date 2019/11/2-20:57
-->
<template>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <div class="home-bg">
            <HeaderTop></HeaderTop>
            <Grid></Grid>
            <div style="z-index: 9999;">
                <van-notice-bar :text="noticeValue" left-icon="http://img.yzcdn.cn/vant/volume.png"></van-notice-bar>
                <HomeTab></HomeTab>
            </div>

        </div>
    </van-pull-refresh>
</template>

<script>
  import HeaderTop from '../components/HeaderTop/HeaderTop.vue'

  import Grid from '../components/Home/Grid/Grid.vue'
  import HomeTab from '../components/Home/HomeTab/HomeTab.vue'

  export default {
    data() {
      return {
        value: '',
        isLoading: false,
        noticeValue: "足协杯战线连续第2年上演广州德比战",
      }
    },
    components: {
      HeaderTop,
      Grid,
      HomeTab
    },
    methods: {
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功');
          this.isLoading = false;
        }, 500);
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">

</style>
