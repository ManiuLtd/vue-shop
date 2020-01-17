<template>
    <section class="login">
        <div class="bg_color"></div>
        <div class="music-lgin">
            <div class="music-lgin-all">
                <!--左手-->
                <div class="music-lgin-left ovhd">
                    <div class="music-hand">
                        <div class="music-lgin-hara"></div>
                        <div class="music-lgin-hars"></div>
                    </div>
                </div>

                <!--脑袋-->
                <div class="music-lgin-dh">
                    <div class="music-lgin-alls">
                        <div class="music-lgin-eyeleft">
                            <div class="music-left-eyeball yeball-l"></div>
                        </div>
                        <div class="music-lgin-eyeright">
                            <div class="music-right-eyeball yeball-r"></div>
                        </div>
                        <div class="music-lgin-cl"></div>
                    </div>
                    <!--鼻子-->
                    <div class="music-nose"></div>
                    <!--嘴-->
                    <div class="music-mouth music-mouth-ds"></div>
                    <!--肩-->
                    <div class="music-shoulder-l">
                        <div class="music-shoulder"></div>
                    </div>
                    <div class="music-shoulder-r">
                        <div class="music-shoulder"></div>
                    </div>
                    <!--消息框-->
                    <div class="music-news">
                        <div class="arrow">
                            <em></em><span></span>
                        </div>
                    </div>
                </div>

                <!--右手-->
                <div class="music-lgin-right ovhd">
                    <div class="music-hand">
                        <div class="music-lgin-hara"></div>
                        <div class="music-lgin-hars"></div>
                    </div>
                </div>

            </div>
        </div>
        <van-divider :style="{ color: '#f06c7a', borderColor: '#f06c7a', padding: '0 16px' }">
            大脸猫二手市场
        </van-divider>
        <van-cell-group>
            <van-field v-model="email" required clearable label="邮箱号" right-icon="question-o" placeholder="请输入邮箱号"
                       @click-right-icon="$toast('question')"/>
            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required/>
            <van-row gutter="20">
                <van-col span="16" style="color: #f06c7a"> 没有账号？<b @click="goTo('/register')">立即注册</b></van-col>
                <van-col span="8">
                    <van-checkbox v-model="flag" checked-color="#f06c7a">记住密码</van-checkbox>
                </van-col>
            </van-row>

        </van-cell-group>
        <div class="loginButton">
            <van-button style="background-color: #f06c7a; color: #FFF" block @click="login">登录</van-button>
        </div>
        <van-divider :style="{ color: '#f06c7a', borderColor: '#f06c7a', padding: '0 16px' }">使用第三方平台登录</van-divider>
        <van-row type="flex" justify="center">
            <van-col span="6">
                <img src="./img/QQ.png" alt="">
            </van-col>
            <van-col span="6">
                <img src="./img/weChat.png" alt="">
            </van-col>
            <van-col span="6">
                <img src="./img/ali.png" alt="">
            </van-col>
        </van-row>
    </section>
</template>

<script>
  import { login } from '../../api'
  import { Toast } from 'vant'

  export default {
    name: 'login',
    data () {
      return {
        email: '',
        password: '',
        rePassword: '',
        flag: '',
        showPwd: true, // 是否显示密码
      }
    },
    computed: {
      rightEmail () {
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g
        return regEmail.test(this.email)
      }
    },
    methods: {
      goTo (path) {
        this.$router.replace(path)
      },
      // 信息提示
      showAlert (alertText) {
        Toast({
          message: alertText,
          duration: 2500
        })
      },
      async login () {
        if (this.flag) {
          this.flag = 1
        } else {
          this.flag = 0
        }
        const { email, password, rePassword, flag, showAlert } = this
        if (!email) {
          showAlert('请输入邮箱号！')
        } else if (!password) {
          showAlert('请输入登录密码！')
        } else {
          console.log(flag)
          let result = await login(email, password, flag)
          console.log(result)
          if (result.success) {
            showAlert(result.msg)
            const user = result.data
            var session = window.sessionStorage
            var d = JSON.stringify(user)
            session.setItem('data', d)
            let userInfo = JSON.parse(sessionStorage.getItem('data'))
            // 将user保存到vuex的state
            this.$store.dispatch('recordUser', userInfo)
            this.$router.go(-1)
          } else {
            showAlert(result.msg)
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    @import "../../assets/stylus/login.styl"
    .van-row
        font-size 14px
        margin 4px 6px
        line-height 23px

    .van-col--6
        text-align center

    .loginButton
        text-align center
        padding 21px 0
</style>
