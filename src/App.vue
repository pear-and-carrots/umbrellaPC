<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="less">
  @media screen and (max-width: 768px) {
    .el-dialog__wrapper .el-dialog {
      width: 300px !important;
      .el-dialog__body{
        padding: 10px 20px!important;
        .el-form-item__label{
          width: 68px!important;
        }
        .el-select,.el-input{
          width: 180px!important;
        }
      }
    }
    .el-message {
      min-width: 300px !important;
    }
    .el-message-box{
      width: 300px !important;
    }
  }
</style>
