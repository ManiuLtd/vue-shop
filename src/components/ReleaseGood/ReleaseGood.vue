<template>
    <div class="tree-nav">
        <van-nav-bar title="宝贝分类"/>
        <div class="shopType">
            <ul>
                <li v-for="(item, index) in goodsType" :key="index">
                    <img :src="item.ico" alt="">
                    <span @click="getTarget($event)" :data-app-id="item.id" :data-name="item.name" :data-index="item.id">{{item.name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        arr: []
      }
    },
    computed: {
      ...mapState(['goodsType']),
    },
    mounted () {
      this.$store.dispatch('reqGoodsType')
    },
    methods: {
      getTarget(event) {
        event.preventDefault()
        this.arr = [];
        let index = event.currentTarget.dataset.index
        let name = event.currentTarget.dataset.name
        this.arr.push(index, name)
        this.$emit('func',this.arr)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    .tree-nav
        position: absolute
        width: 100%;
        height: 100%;
        background-color #F8F8F8

        .shopType
            padding 12px 0
            text-align center
            ul li
                list-style-type none
                display inline-block
                margin 5px 3px
                padding 3px 10px
                width 120px
                img
                    width 25px
                    vertical-align middle
                span
                    display inline-block
                    border-radius 3px
                    padding 3px 10px
                    margin 5px 7px
                    border 1px #17e6a1 dotted
                    width 55px
                    height 24px
                    line-height 24px
                    &:hover{
                        background-color #17e6a1
                        color #FFF
                    }
</style>
