<template>
    <section class="lost-nav">
        <van-sticky>
            <van-nav-bar title="发布失物信息" @click-left="onClickLeft" left-arrow/>

        </van-sticky>
        <div style="margin: 12px 0 60px 0">
            <van-cell-group style="background-color: #FAFAFA">
                <div class="addr">
                    <van-field v-model="lTitle" rows="2" autosize maxlength="5000" label="名称" type="textarea"
                               placeholder="请输入物品名称"/>
                </div>
                <div class="addr">
                    <van-field v-model="lContent" rows="7" autosize type="textarea"
                               placeholder="在这里详细描述一下丢失物品的详细信息，方便失主找到"
                               show-word-limit/>
                </div>
                <!-- 物品图片-->
                <div class="addr">
                    <van-row>
                        <van-col span="7">
                            <span>商品图片</span>
                        </van-col>
                        <van-col>
                            <van-uploader v-model="lPicture" :after-read="afterRead" multiple/>
                        </van-col>
                    </van-row>
                </div>
            </van-cell-group>
        </div>
        <div class="footer">
            <van-button class="release-btn" block @click="submitForm($event)">发布商品</van-button>
        </div>
    </section>
</template>

<script>
  import axios from 'axios'
  let formData = new window.FormData()
  export default {
    name: 'LostAndFound',
    data () {
      return {
        lTitle: '',
        error_message: '',
        lContent: '', // 介绍
        lPicture: []
      }
    },
    methods: {
      onClickLeft () {
        this.$router.go(-1) //返回上一层
      },
      afterRead (file) {
        if (file && file.length) { // 判断是否是多图上传 多图则循环添加进去
          e.forEach(item => {
            formData.append('multipartFiles', item.file)
          })
        } else {
          formData.append('multipartFiles', file.file)
        }
      },
      // 添加
      submitForm (event) {
        event.preventDefault()
        const { lTitle, lContent } = this
        formData.append('lTitle', lTitle) //标题
        formData.append('lContent', lContent)// 简介
        formData.append('lStatus', 0)// 状态
        formData.append('lAddress', '河南科技学院')// 地址
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post('/api/lost', formData, config).then((response) => {
          const result = response.data
          if (result.success) {
            console.log('物品发布成功，静等失主认领吧~~')
            this.$router.go(-1)
          }
        })
          .catch((error) => {
            console.log(error.message) //错误信息
          })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    .lost-nav
        position: absolute
        width: 100%;
        height: 100%;
        background-color #F8F8F8

        .van-cell
            padding 4px 3px

            .van-cell-group
                padding 6px 0

        .van-uploader
            padding 8px 12px

        .addr
            width: 92%;
            background-color #FFF
            padding: 8px 2%;
            margin: 0 auto 8px;
            -webkit-box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
            box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
            border-radius: 8px;

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

</style>