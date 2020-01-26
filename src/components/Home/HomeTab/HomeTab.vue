<template>
    <div class="container-water-fall water-content">
        <waterfall :col="col" :data="data" @loadmore="getMore">
            <router-link class="cell-item" v-for="(item,index) in data" :key="index"
                         :to="`/goods/${item.id}`" tag="div">
                <input type="hidden" :value="item.id">
                <img v-if="item.gPicture" :src="item.gPicture" alt="加载错误">
                <div class="item-body">
                    <div class="item-desc">{{item.gIntroduce}}</div>
                    <div class="info">
                        <p class="sell"><span class="gNumber">剩{{item.gNumber}}件</span></p>
                        <p class="price">
                            <span class="now">¥{{ item.gPrice }}</span>
                            <span class="gSales">月销量{{item.gSales}}</span>
                        </p>
                    </div>
                    <div class="item-footer">
                        <div class="name">
                            <span>{{item.gTitle}}</span>
                        </div>
                    </div>
                </div>
            </router-link>
        </waterfall>
        <loading :show="loading"/>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    import axios from 'axios'
    import loading from '../../Loading.vue'

    export default {
        props: {
            title: String
        },
        data () {
            return {
                data: [],
                col: 2,
                loading: false,
                pageNumber: 1, // 默认展示第一页数据
            }
        },
        components: {
            loading
        },
        created () {
            this.loadMore()
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
        methods: {
            loadMore () {
                this.loading = true
                // 根据页数查询数据
                axios.get('/api/goods/page/' + this.pageNumber)
                    .then(result => {
                        if (result.data.success) {
                            const _result = JSON.parse(JSON.stringify(result.data.data))
                            if (this.$store.state.userInfo) {
                                _result.forEach((item) => {
                                    const s = eval('(' + item + ')')
                                    this.data = this.data.concat(s)
                                })
                            } else {
                                this.data = this.data.concat(_result)
                            }
                        } else {
                            console.log('获取商品失败！')
                        }
                    })
                this.loading = false
            },
            getMore () {
                this.pageNumber++
                this.loadMore()
            },
        },
    }
</script>

<style lang="scss" scoped>
    .container-water-fall {
        background-color: #F8F8F8;
        box-sizing: border-box;

        &.water-content {
            padding: 1px 3px;
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
            width: 95%;
            background: #FFF;
            overflow: hidden;
            box-sizing: border-box;
            border-radius: 0.2rem;
            margin-top: 15px;

            img {
                width: 100%;
                height: auto;
                display: block;
            }

            .item-body {
                padding: 4px 6px;

                .item-desc {
                    color: #333;
                    font-weight: 600;
                    line-height: 18px;
                    font-size: 11px;
                    overflow: hidden;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                .info {
                    p {
                        margin: 0;
                        padding: 5px 0;
                        display: flex;
                        justify-content: space-between;
                    }

                    .price {
                        .now {
                            font-weight: bold;
                            font-size: 14px;
                        }

                        .gSales {
                            color: #c8c8c8;
                            font-size: 11px;
                        }
                    }

                    .sell {
                        .gNumber {
                            text-align: center;
                            padding: 2px 8px;
                            background: rgba(255, 75, 75, .1);
                            border-radius: 1rem;
                            font-size: 11px;
                            color: #fd354d;
                        }
                    }
                }

                .item-footer {
                    .name {
                        max-width: 150px;
                        font-size: 11px;
                        color: #999;
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