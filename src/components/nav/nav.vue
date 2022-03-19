<template>
  <div class="LoveManageNav">
    <nav class="navbar navbar-inverse navbar-fixed-top " role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <span class="systemName noSelect">广东海洋大学爱心伞管理系统</span>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li id="nav1" @click="choice('nav1')" class="activeLi"><router-link :to="{name:'umbrellaList'}">雨伞列表</router-link></li>
            <li id="nav2" @click="choice('nav2')"><router-link :to="{name:'orderList'}">雨伞出借记录</router-link></li>
            <li id="nav3" @click="choice('nav3')"><router-link :to="{name:'evaluateList'}">评论管理</router-link></li>
            <li id="nav4" @click="choice('nav4')"><router-link :to="{name:'messageList'}">问卷统计</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">海大爱心伞管理员<span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class="hoverPointer hoverColor" @click="loginOut"><span class="glyphicon glyphicon-user" style="margin-right: 15px;"></span>退出登录</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name:'nav',
    methods:{
      choice(id){
        $('.activeLi').removeClass('activeLi')
        $('#'+id).addClass('activeLi')
      },
      /*退出登录*/
      loginOut(){
        this.$confirm('确定退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.setItem('GDOUsan',null)
          localStorage.setItem('GDOUsan',JSON.stringify(null))
          this.$router.replace({name:'login'})
        })
      }
    },
    mounted () {
      if(this.$route.name == 'evaluateList'){
        this.choice('nav3')
      }else if(this.$route.name == 'orderList'){
        this.choice('nav2')
      }else if(this.$route.name == 'messageList'){
        this.choice('nav4')
      }
    },
    watch:{

    },
  }
</script>

<style lang="less">
  .LoveManageNav{
    width: 100%;
    height: 50px;
    overflow: hidden;
    .navbar-inverse{
      background-color: rgb(4,131,212)!important;
      border-color: rgb(4,131,212)!important;
      li{
        transition: 0.4s;
        box-sizing: border-box;
        position: relative;
        &:after{
          position: absolute;
          bottom: 0;
          z-index: 2;
          content: '';
          height: 2px;
          width: 0;
          background-color: greenyellow;
          transition: 0s;
        }
        a{
          height: 48px;
          background-color: rgba(0,0,0,0) !important;
          color: white!important;
          &:hover{
            color: greenyellow;
          }
        }
        ul.dropdown-menu{
          min-width: 140px;
        }
      }
      li.activeLi{
        &:after{
          width: 100%;
          transition: 0.5s;
        }
        a{
          color: greenyellow!important;
        }
      }
      .navbar-collapse,.navbar-toggle{    //mobile端边框去色
        border-color: white;
      }
      .navbar-toggle{                     //mobile端按钮背景去色
        background-color: rgba(0,0,0,0) !important;
      }
    }
    .systemName{
      display: inline-block;
      height: 50px;
      font-size: 16px;
      line-height: 20px;
      padding: 15px 20px;
      color: white;
    }
    .hoverColor{
      text-align: center;
      color: rgb(130,200,255);
      &:hover{
        color: red;
      }
    }
  }
  @media screen and(max-width: 768px){
    .LoveManageNav{
      .navbar-inverse{
        .activeLi{
          border-bottom: 0px!important;
        }
      }
      .hoverColor{
        color: red;
        font-weight: bold;
      }
    }
  }
</style>
