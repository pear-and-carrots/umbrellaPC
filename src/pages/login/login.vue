<template>
  <div class="loginout">
    <div class="logindiv">
    </div>
    <div class="MyLoginNav">
      <h3>广东海洋大学爱心伞管理系统</h3>
    </div>
    <div class="login">
      <div class="rightlogin">
        <div class="logininner">
          <p class="loginp">WELCOME</p>
          <el-form :model="ruleForm"  ref="ruleForm" class="phone">
            <el-form-item  prop="userName">
              <el-input  prefix-icon="el-icon-s-custom" v-model.number="ruleForm.userName" autocomplete="new-password" placeholder="请输入账号"><</el-input>
            </el-form-item>
            <el-form-item  prop="passwork">
              <el-input  prefix-icon="el-icon-lock" show-password v-model.number="ruleForm.passwork" autocomplete="new-password" placeholder="请输入密码"><</el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login" style="height: 40px;width:100%;padding: 0px 10px"><span class="loginspan">登录</span></el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="userFooter">
      <span>&copy;2020</span>
      <span><a target="_blank" href="https://beian.miit.gov.cn/">粤ICP备2020087871号</a></span>
    </div>
  </div>
</template>

<script>
  import {LOGIN} from '../../api/types'
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {
        ruleForm: {
          userName :'',    //账号
          passwork:'',     //密码
        },
      };
    },
    methods: {
      //登录
      async login(){
        var {userName,passwork} = this.ruleForm
        if(userName,passwork){
          if(userName == 'admin' && passwork == 'GDOU123'){
            this.message('登陆成功',1500,'success')
            sessionStorage.setItem('GDOUsan','success')                   //保存session以防止非法登录
            var date = new Date()
            var GDOUsan = {
              date:{
                year:date.getFullYear(),
                month:date.getMonth(),
                date:date.getDate(),
              },
              auth:'success'
            }
            localStorage.setItem('GDOUsan',JSON.stringify(GDOUsan))      //localStorage本地保存session以实现一天免登陆以及能新开窗口
            setTimeout(()=>{
              this.$router.replace({name:'manage'})
            },800)
          }else{
            this.ruleForm.passwork = ''
            this.message('账号密码错误',1500,'error')
          }
        }else{
          this.message('账号密码不能为空',1500,'warning')
        }
      },

      //消息提示
      message(message,duration,type){
        this.$message({
          message,
          duration,
          type
        })
      }
    },
    created() {                                                                                                                 //实现一天免登陆
      var logined = false
      if(localStorage.getItem('GDOUsan') && JSON.parse(localStorage.getItem('GDOUsan'))){                                       //之前登录过
        var auth = JSON.parse(localStorage.getItem('GDOUsan'))
        var date = new Date()
        if(date.getFullYear() == auth.date.year && date.getMonth() == auth.date.month && date.getDate() == auth.date.date){     //同一天免登陆
          if(auth.auth == 'success'){               //验证通过
            logined = true
          }
        }
      }
      if(logined){
        this.$router.replace({name:'manage'})
      }
    }
  }
</script>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body,html{
    height: 100%;
  }
  .loginout{
    .MyLoginNav{
      position: relative;
      height: 60px;
      //background: transparent;
      background: rgba(255,255,255,0.3);
      z-index: 2;
      h3{
        margin: 0;
        padding: 0;
        height: 60px;
        line-height: 60px;
        color: white;
        letter-spacing: 5px;
        margin-left: 30px;
      }
    }
    .logindiv{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: url("./login.jpg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      z-index: 1;
    }
    .login{
      position: absolute;
      z-index: 2;
      top:50%;
      left:50%;
      transform: translate3d(-50%,-60%,0);

      width:400px;

      border: 1px solid rgba(233,233,233,1);
      box-sizing: border-box;
      border-radius: 8px;
      .rightlogin{
        width: 400px;
        height: 100%;
        padding: 30px;
        background: rgba(255,255,255,0.3);
        border-radius: 8px;
        .logininner{
          p.loginp{
            font-size: 25px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            margin-bottom: 30px;
            letter-spacing: 5px;

            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          .el-input__inner,.el-button{
            /*输入框椭圆*/
            border-radius: 20px;
          }
          .remember .el-form-item{
            margin-bottom: 0px;
          }
        }
      }
    }
    .userFooter{
      z-index: 3;
      position: absolute;
      padding: 8px;
      bottom: 10px;
      left: 50%;
      transform: translate3d(-50%,0,0);
      span{
        color: rgb(244,244,244);
        margin-right: 20px;
        font-size: 14px;
        line-height: 24px;
        cursor: default;
        a:visited{
          color: white!important;
        }
        a:hover{
          color: rgb(0,0,255)!important;
          text-decoration: underline;
        }
      }
    }
  }
  @media screen and(max-width: 499px){
    .MyLoginNav{
      h3{
        font-size: 18px!important;
        letter-spacing: 1px!important;
        margin-left: 15px!important;
      }
    }
    .login{
      border: 0!important;
      top:48% !important;
      width: 100vw!important;
      transform: translate3d(-50%,-50%,0) !important;
      .rightlogin{
        width: 90%!important;
        padding: 20px!important;
        background: rgba(255,255,255,0) !important;
        margin: auto;
        p.loginp{
          font-size: 35px!important;
          margin-bottom: 60px!important;
          color: rgb(238,238,238);
        }
        .el-form-item{

        }
        .loginspan{
          letter-spacing: 5px;
          font-size: 16px;
        }
      }
    }
    .userFooter{
      bottom: 0!important;
      width: 100%;
      text-align: center;
    }
  }
</style>
