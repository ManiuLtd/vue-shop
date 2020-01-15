<template>
    <div class="container-water-fall water-content">
        <waterfall :col="col" :data="data" @loadmore="loadMore">
            <div class="cell-item" v-for="(item,index) in data" :key="index">
                <img v-if="item.gPicture" :src="item.gPicture" alt="加载错误">
                <div class="item-body">
                    <div class="item-desc">{{item.gIntroduce}}</div>
                    <div class="item-footer">
                        <!--                            <div v-if="item.avatar" class="avatar" :style="{backgroundImage : `url(${item.avatar})` }"></div>-->
                        <div class="name">
                            <span>{{item.gTitle}}</span>
                        </div>
                        <div class="like" :class="item.liked?'active':''">
                            <i></i>
                            <div class="like-total">{{item.like}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </waterfall>
        <loading :show="loading"/>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import loading from '../components/Loading.vue'

  export default {
    data () {
      return {
        data: [],
        col: 2,
        loading: false,
      }
    },
    components: {
      loading
    },
    methods: {
      loadMore () {
        this.loading = true
        setTimeout(() => {
          this.data = this.data.concat(this.goodsList.pageOne, this.goodsList.pageOne)
          this.loading = false
        }, 1000)
      }
    },
    computed: {
      ...mapState(['goodsList']),
    },
    mounted () {
      this.$store.dispatch('reqGoodsList')
      this.data = this.goodsList.pageOne
    }
  }
</script>

<style lang="scss" scoped>
    .container-water-fall {
        background-color: #F8F8F8;
        box-sizing: border-box;
        &.water-content {
            padding: 0 15px;
        }

        h4 {
            padding-top: 56px;
            padding-bottom: 28px;
            font-size: 36px;
            color: #000;
            letter-spacing: 1px;
            text-align: justify;
        }

        button {
            background-color: #ff0;
            color: #24292e;
            border: 1px solid rgba(27, 31, 35, 0.2);
            border-radius: 0.25em;
            width: 100px;
            line-height: 26px;
            font-size: 13px;
            margin: 4px 4px 0;
            cursor: pointer;
            outline: none;

            &.blue-light {
                background: #27fbc2;
            }
        }

        button:hover {
            background-image: linear-gradient(-180deg, #fafbfc, #ccc 90%);
        }

        .cell-item {
            width: 100%;
            background: #ffffff;
            overflow: hidden;
            box-sizing: border-box;
            border-radius: 6px;
            margin-top: 10px;

            img {
                // border-radius: 12px 12px 0 0;
                width: 100%;
                height: auto;
                display: block;
            }

            .item-body {
                // border: 1px solid #F0F0F0;
                padding: 12px;

                .item-desc {
                    color: #333;
                    line-height: 15px;
                    font-size: 12px;
                    overflow: hidden;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                .item-footer {
                    margin-top: 15px;
                    position: relative;
                    display: flex;
                    align-items: center;

                    .name {
                        max-width: 150px;
                        font-size: 13px;
                        color: #999;
                    }

                    .like {
                        position: absolute;
                        right: 0;
                        display: flex;
                        align-items: center;

                        &.active {
                            i {
                            }

                            .like-total {
                                color: #ff4479;
                            }
                        }

                        i {
                            width: 28px;
                            display: block;
                        }

                        .like-total {
                            margin-left: 10px;
                            font-size: 12px;
                            color: #999999;
                        }
                    }
                }
            }
        }
    }

    .githubdata {
        float: right;
        margin-right: 90px;

        img {
            width: 14px;
            // height: 16px;
        }
    }
</style>
