<template>
    <div id="app">
        <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
        <router-view />
    </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  export default {
    data() {
      return {

      }
    },
    components: {
      FooterGuide
    }
  }
</script>
<style lang="stylus">
    #app
        font-size 13px
        font-family: "华文中宋";
</style>
