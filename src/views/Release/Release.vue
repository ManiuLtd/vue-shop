<template>
    <section class="release-nav">
        <van-sticky>
            <van-nav-bar title="发布宝贝" @click-left="onClickLeft" left-arrow></van-nav-bar>
        </van-sticky>
        <div style="margin-bottom: 60px">
            <van-cell-group style="background-color: #FAFAFA">
                <div class="addr">
                    <van-row type="flex" justify="space-between">
                        <van-col span="7" style="line-height: 46px;">
                            <van-icon name="umbrella-circle"></van-icon>
                            <span style="font-size: 13px">标题</span>
                        </van-col>
                        <van-col span="21">
                            <van-field v-model="gTitle" placeholder="宝贝标题不可少" :error-message="error_message"
                                       error-message-align="right"></van-field>
                        </van-col>
                    </van-row>
                </div>
                <div class="addr">
                    <van-field v-model="gIntroduce" rows="7" autosize type="textarea" placeholder="在这里详细描述一下商品的************"
                               show-word-limit></van-field>
                </div>
                <div class="addr">
                    <van-field v-model="gRemark" rows="2" autosize maxlength="5000" label="备注" type="textarea"
                               placeholder="请输入备注"></van-field>
                </div>
            </van-cell-group>
          <div>
              <!-- 封面-->
              <div class="addr">
                  <van-row>
                      <van-col span="7">
                          <i class="iconfont icon-fengmian1"></i>
                          <span>封面</span>
                      </van-col>
                      <van-col>
                          <van-uploader v-model="picture" :after-read="afterRead_1" :max-count="1"></van-uploader>
                      </van-col>
                  </van-row>
              </div>
              <!-- 商品图片-->
              <div class="addr">
                  <van-row>
                      <van-col span="7">
                          <i class="iconfont icon-fengmian"></i>
                          <span>商品图片</span>
                      </van-col>
                      <van-col>
                          <van-uploader v-model="fileList" :after-read="afterRead" multiple></van-uploader>
                      </van-col>
                  </van-row>
              </div>
              <!-- 选择分类-->
              <div class="addr" @click="type = true">
                  <van-row type="flex" justify="space-between" style="width: 100%">
                      <van-col span="7" class="van-temp">
                          <van-icon name="clock"></van-icon>
                          <span>选择分类</span>
                      </van-col>
                      <van-col span="6" v-if="gType.length">
                          <span class="choiceType">{{gType[1]}}</span>
                      </van-col>
                      <van-col span="2" v-else>
                          <van-icon name="arrow"></van-icon>
                      </van-col>
                  </van-row>
              </div>
              <!-- 价格-->
              <div class="addr" @click="show = true">
                  <van-row type="flex" justify="space-between" style="width: 100%">
                      <van-col span="7" class="van-temp">
                          <van-icon name="gold-coin"></van-icon>
                          <span>价格</span>
                      </van-col>
                      <van-col span="5" v-if="gPrice">
                        <span class="choiceType">
                            <span style="font-weight: 600;">￥</span>{{gPrice}}</span>
                      </van-col>
                      <van-col span="2" v-else>
                          <van-icon name="arrow"></van-icon>
                      </van-col>
                  </van-row>
              </div>
              <!-- 当前库存-->
              <div class="addr">
                  <van-row type="flex" justify="space-between" style="width: 100%">
                      <van-col span="7" class="van-temp">
                          <van-icon name="bill"></van-icon>
                          <span>当前库存</span>
                      </van-col>
                      <van-col span="8">
                          <van-stepper v-model="gNumber" integer></van-stepper>
                      </van-col>
                  </van-row>
              </div>
              <!-- 自定义标签-->
              <div class="addr">
                  <van-row type="flex" justify="space-between">
                      <van-col span="7" style="line-height: 46px; vertical-align: text-bottom;">
                          <van-icon name="umbrella-circle"></van-icon>
                          <span style="font-size: 13px">标签</span>
                      </van-col>
                      <van-col span="21">
                          <van-field v-model="gLabel" placeholder="自定义标签，多个标签用#分开" :error-message="error_message"
                                     error-message-align="right"></van-field>
                      </van-col>
                  </van-row>
              </div>
          </div>
            <van-popup v-model="type" position="top" closeable
                       close-icon="close" :style="{ height: '100%' }">
                <ReleaseGood  @func="getMsgFormSon"></ReleaseGood>
            </van-popup>
        </div>
        <van-popup v-model="show" position="bottom" closeable close-icon="close" style="{ min-height: 20% }">
            <van-panel title="想买多少钱？">
                <div>
                    <div class="Original_price">
                        <span>￥</span>
                        <label for="开个价">
                            <input type="text" placeholder=" 0" v-model="gPrice">
                        </label>
                    </div>
                    <van-divider></van-divider>
                    <van-number-keyboard :show="true" v-model="gPrice" extra-key="."></van-number-keyboard>
                </div>
            </van-panel>

        </van-popup>
        <div class="footer">
            <van-button class="release-btn" block @click="submitForm($event)">发布</van-button>
        </div>
    </section>
</template>

<script>
  import axios from 'axios'
  import {Toast} from 'vant'
  import ReleaseGood from '../../components/ReleaseGood/ReleaseGood.vue'
  let formData = new window.FormData()
  export default {
    name: 'Release',
    data () {
      return {
        gTitle: '',
        error_message: '',
        gIntroduce: '', // 介绍
        picture: [], //封面
        type: false, // 分类弹出层
        show: false, // 价格弹出层
        gType: [], // 分类
        gPrice: '', // 价格
        gRemark: '', // 备注信息
        gNumber: '', // 当前库存
        gLabel: '', //标签
        fileList: [],
      }
    },
    methods: {
      afterRead_1 (file) {
        formData.append('cover', file.file) //封面
      },
      afterRead (file) {
        console.log(file.file)
        if (file && file.length) { // 判断是否是多图上传 多图则循环添加进去
          e.forEach(item => {
            formData.append("pictures", item.file)
          })
        } else {
          formData.append("pictures", file.file)
        }
      },
      onClickLeft () {
        this.$router.go(-1) //返回上一层
      },
      getMsgFormSon(data) {
        this.gType = data;
        console.log(this.gType)
      },
        // 添加
      submitForm (event) {
        event.preventDefault()
        const { gTitle, gIntroduce, gType, gPrice, gRemark, gNumber, gLabel} = this
        formData.append('gTitle', gTitle) //标题
        formData.append('gIntroduce', gIntroduce)// 简介
        formData.append('gPrice', gPrice)
        formData.append('gRemark', gRemark)
        formData.append('gType', gType[0])
        formData.append('gNumber', gNumber)
        formData.append('gLabel', gLabel)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post('/api/goods', formData, config).then((response) => {
          const result = response.data
          if (result.success) {
            Toast('商品发布成功~~');
            this.$router.go(-1);
          }
        })
          .catch((error) => {
            console.log(error.message) //错误信息
          })
      }
    },
    components: {
      ReleaseGood
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    @import "//at.alicdn.com/t/font_1518086_v7i3cbg2zi8.css"
    .release-nav
        position: absolute
        width: 100%;
        background-color #FAFAFA

        .van-cell-group
            padding 6px 0

        .van-uploader
            padding 8px 12px

        .addr
            width: 88%;
            background-color #FFF
            padding: 8px 3%;
            margin: 12px auto 8px auto;
            -webkit-box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
            box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
            border-radius: 8px;

            .choiceType
                position:relative;
                top: 4px
                float: right;
                background-color #17e6a1
                color #ffffff
                border-radius 3px
                padding 4px

            .van-col span
                margin-left 5px

            .van-field__label
                width 48px

            a
                color #000
                text-decoration none

            .van-temp span
                position relative
                left 3px
                top -1px

            .view-img
                img
                    width 64px
                    height 64px
                    margin 0 3px
                    border-radius 5px

            .van-icon
                top 3px
                font-size 17px
            .van-icon-umbrella-circle
                color #f5111a
                font-size 18px
            .van-icon-gold-coin
                color #e07472
            .van-icon-clock
                color #9789f7
            .van-icon-bill
                color #ee883b
            .icon-fengmian
                color #07c160
                font-size 16px
            .icon-fengmian1
                color #ff5053
                font-size 16px

        .footer
            background-color #FFF
            height 32px
            text-align center
            width 100%
            position fixed
            bottom 12px

            .release-btn
                background-color: #f06c7a;
                color: #FFF
                width 100%

    .van-number-keyboard
        position relative

    .van-cell__label
        color #000

    .van-panel__content
        input
            border none
            outline none

        .Original_price
            width 96%
            margin 12px auto -3px auto

</style>
