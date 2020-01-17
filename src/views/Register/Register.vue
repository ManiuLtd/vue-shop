<!--
 @Description:
 @author BY
 @date 2020/1/12-11:01
-->
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
        <form @submit.prevent="register">
            <van-cell-group>
                <van-field v-model="email" required label="邮箱号" placeholder="请输入邮箱号" error-message-align="right"
                           :error-message="error_message"/>
                <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required
                           v-if="showPwd"/>
                <van-field v-model="password" type="text" label="密码" placeholder="请输入密码" required v-else/>
                <div class="switch_button off" :class="!showPwd ? 'on' : 'off'"
                     @click="showPwd=!showPwd">
                    <div class="switch_circle" :class="{right:!showPwd}"></div>
                    <span class="switch_text">
                        {{ showPwd ? '...' : 'abc' }}
                    </span>
                </div>
                <van-field v-model="rePassword" type="password" label="确认密码" placeholder="请确认密码" required/>
                <van-field v-model="code" center required clearable label="验证码" placeholder="邮箱验证码">
                    <van-button slot="button" size="small" type="warning" :disabled="!rightEmail"
                                @click.prevent="getCode">
                        {{ computeTime>0 ? `已发送(${computeTime})s` : '获取验证码' }}
                    </van-button>
                </van-field>
                <van-field v-model="u_school" required label="学校"
                           placeholder="请选择学校所在地" @click="show = true"/>
                <div style="padding: 8px;">你选择的是： {{radio}}</div>
            </van-cell-group>
            <div class="loginButton">
                <van-button style="background-color: #f06c7a; color: #FFF" block  @click="register">注册</van-button>
            </div>
        </form>
        <van-divider :style="{ color: '#f06c7a', borderColor: '#f06c7a', padding: '0 16px' }">
            已有账号？<b @click="goTo('/login')">立即登录</b>
        </van-divider>
        <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
            <div style="position: fixed; width: 100%; z-index: 99;">
                <van-search v-model="value" shape="round" placeholder="请输入学校关键词"
                            @search="onSearch"/>
            </div>
            <div style="height: 50px;"></div>
            <div style="margin-bottom: 36px;">
                <div class="school-list" v-for="(school, index) in schoolList" :key="index">
                    <label class="bui-radios-label bui-radios-anim">
                        <input type="radio" name="radio" v-model="radio" :value="school.id">
                        <i class="bui-radios"></i>
                        <span>{{school.schoolName}}</span>
                    </label>
                </div>
            </div>
            <div class="sureSchool">
                <van-button style="background-color: #f06c7a; color: #FFF" block  @click="closeList">注册</van-button>
            </div>
        </van-popup>
    </section>
</template>

<script>
  import {judgeEmail, reqSendCode, register} from '../../api'
  import {Toast} from 'vant'
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        email: '',
        password: '',
        rePassword: '',
        code: '',
        u_school: '',
        error_message: '',
        required: true,
        computeTime: 0, // 倒计时时间
        showPwd: true, // 是否显示密码
        show: false, // 是否显示学校列表
        value: '',// 搜索学校
        radio: '',
      }
    },
    computed: {
      ...mapState(['schoolList']),
      rightEmail() {
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g;
        return regEmail.test(this.email);
      }
    },
    mounted() {
      this.$store.dispatch('reqSchoolList')
    },
    methods: {
      goTo(path) {
        this.$router.replace(path)
      },
      onSearch() {
        const toast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '倒计时 3 秒'
        });
        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            toast.message = `倒计时 ${second} 秒`;
          } else {
            // 将user保存到vuex的state
            this.$store.dispatch('searchSchool', this.value);
            clearInterval(timer);
            // 手动清除 Toast
            Toast.clear();
          }
        }, 1000);
      },
      // 关闭学校列表
      closeList() {
        if(this.radio === '') {
          this.$toast('您还没有选择学校！');
        } else {
          this.show = false;
        }
      },
      // 信息提示
      showAlert(alertText) {
        Toast({
          message: alertText,
          duration: 2500
        });
      },
      async getCode() {
        // 如果当前没有计时
        if (!this.computeTime) {
          // 启动倒计时
          this.computeTime = 60;
          this.intervalId = setInterval(() => {
            this.computeTime--;
            if (this.computeTime <= 0) {
              // 停止计时
              clearInterval(this.intervalId)
            }
          }, 1000);
          // 判断邮箱号是否存在
          const result = await judgeEmail(this.email);
          console.log(result);
          if (result.success) {
            // 显示提示
            this.showAlert(result.msg);
            // 邮箱存在发送验证码
            const codeResult = await reqSendCode(this.email);
            console.log(codeResult);
            if (codeResult.success) {
              this.showAlert(result.msg);
            } else {
              this.showAlert(result.msg);
              // 停止计时
              if (this.computeTime) {
                this.computeTime = 0;
                clearInterval(this.intervalId)
              }
            }
          } else {
            // 显示提示
            this.showAlert(result.msg);
            // 停止计时
            if (this.computeTime) {
              this.computeTime = 0;
              clearInterval(this.intervalId)
            }
          }
        }
      },
      async register() {
        const {email, password, rePassword, code, radio, showAlert, rightEmail} = this;
        if (!email) {
          showAlert('请先输入邮箱号！');
          return false
        } else if (!rightEmail) {
          showAlert('邮箱号格式不正确！');
          return false
        } else if (!password) {
          showAlert('密码不能为空！');
          return false
        } else if (!code) {
          showAlert('验证码不能为空！');
          return false
        } else if (password !== rePassword) {
          showAlert('两次密码不一致！')
        } else if (!radio) {
          showAlert('请选择学校！');
          return false
        }
        const result = await register(email, password, code, radio);
        if (result.success) {
          showAlert(result.msg);
          this.$router.replace('/login')
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/styLus">
    @import "../../assets/stylus/login.styl"
    .loginButton
        text-align center
        padding 21px 0
    .school-list
        padding: 12px
        border-bottom 1px solid #efeff4
        span
            margin 0 12px
            vertical-align top
    .sureSchool
        position: fixed
        bottom 0
        left 0
        right 0
    /* radio */
    label.bui-radios-label input {
        position: absolute;
        opacity: 0;
        visibility: hidden;
    }

    label.bui-radios-label .bui-radios {
        display: inline-block;
        position: relative;
        width: 15px;
        height: 15px;
        background: #FFFFFF;
        border: 1px solid #979797;
        border-radius: 50%;
        vertical-align: -2px;
    }

    label.bui-radios-label input:checked + .bui-radios:after {
        position: absolute;
        content: "";
        width: 7px;
        height: 7px;
        background-color: #fff;
        border-radius: 50%;
        top: 3px;
        left: 3px;
    }

    label.bui-radios-label input:checked + .bui-radios {
        background: #F56C6C;
        border: 1px solid #F56C6C;
    }

    label.bui-radios-label input:disabled + .bui-radios {
        background-color: #e8e8e8;
        border: solid 1px #979797;
    }

    label.bui-radios-label input:disabled:checked + .bui-radios:after {
        background-color: #c1c1c1;
    }

    label.bui-radios-label.bui-radios-anim .bui-radios {
        -webkit-transition: background-color ease-out .3s;
        transition: background-color ease-out .3s;
    }
</style>
