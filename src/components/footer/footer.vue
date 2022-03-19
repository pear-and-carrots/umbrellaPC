<template>
  <div class="myFooter">
    <span>&copy;2020</span>
    <span>
      <a target="_blank" href="https://beian.miit.gov.cn/">粤ICP备2020087871号</a>
    </span>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="less">
  .myFooter{
    background-color: rgb(240,240,240);
    color: #9195a3;
    height: 40px;
    padding: 8px;
    text-align: center;
    span{
      display: inline-block;
      margin-right: 20px;
      font-size: 12px;
      line-height: 24px;
      cursor: default;
    }
  }
  @media screen and (max-width: 768px){
    .myFooter{
      background-color: rgb(255,255,255);
    }
  }
</style>
