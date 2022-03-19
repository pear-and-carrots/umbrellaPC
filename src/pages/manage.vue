<template>
  <div class="LoveManage">
    <div class="manageNav">
      <Nav></Nav>
    </div>
    <div class="manageContentDiv">
      <transition name="component-fade" mode="out-in">
        <router-view class="manageContent"></router-view>
      </transition>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Nav from '../components/nav/nav'
  import Footer from '../components/footer/footer'
  export default {
    name:'manage',
    components:{
      Nav,
      Footer
    },
  }
</script>

<style lang="less">
  /*组件切换过渡动画*/
  .component-fade-enter-active{
    transition: all .4s ease;
  }
  .component-fade-leave-active {
    transition: all .4s ease;
  }
  .component-fade-enter{
    transform: translateX(-50px);
    opacity: 0;
  }
  .component-fade-leave-to{
    transform: translateX(50px);
    opacity: 0;
  }
  .LoveManage{
    background-color: rgb(240,240,240);
    padding-bottom: 0px;
    overflow-x: hidden;
    .manageNav{
      margin-bottom: 15px;
    }
    .manageContentDiv{
      width: auto;
      margin: 0 15px;
      min-height: calc(100vh - 105px);
      box-sizing: border-box;
      border: 1px solid rgb(240,240,240);

      background-color: rgb(255,255,255);

      .manageContent{
        padding: 30px 30px 20px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .LoveManage{
      .manageNav{
        margin-bottom: 5px;
      }
      .manageContentDiv{
        width: 100% ;
        margin: 0!important;
        min-height: calc(100vh - 95px);
        .manageContent{
          padding: 10px;
        }
      }
    }
  }
</style>
