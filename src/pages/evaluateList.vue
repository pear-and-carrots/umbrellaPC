<template>
  <div class="evaluateList">
    <el-tabs v-model="showFlag">
      <el-tab-pane label="待审核" name="0"></el-tab-pane>
      <el-tab-pane label="已审核" name="1"></el-tab-pane>
    </el-tabs>
    <div class="listDiv" v-loading="loading" element-loading-text="数据加载中..">
      <div class="biaoGe">
        <ul class="evaluateUl">
          <li class="evaluateLi" v-for="(evaluate,index) in Lists" :key="index">
            <div class="evaluateUserInfoDiv">
              <span class="evaluateUserNameSpan">
                匿名{{evaluate.id}}：
              </span>
              <span class="evaluateUserDateSpan">
                {{evaluate.date}}
              </span>
              <span class="evaluateUserDeleteSpan">
                <el-button type="success" size="small" v-show="evaluate.showFlag == 0" @click="passEvaluate(evaluate.evaId)">审核</el-button>
                <el-button type="danger" size="small" @click="deleteEvaluate(evaluate.evaId)">删除</el-button>
              </span>
            </div>
            <div class="evaluateUserCommentDiv overHidden">
              {{evaluate.content}}
            </div>
            <el-divider><i class="el-icon-lollipop"></i></el-divider>
          </li>
          <li class="evaluateLi" v-if="Lists.length == 0">
            <div class="noSelect emptyEvaluate">
              暂无评论数据
            </div>
            <el-divider><i class="el-icon-lollipop"></i></el-divider>
          </li>
        </ul>
      </div>
      <div class="myPages" v-if="total > 0 && total > pageSize">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {QUERYEVALUATE,DELETEEVALUATE,UPDATEEVALUATE} from '../api/types'
  export default {
    name:'evaluateList',
    data(){
      return {
        showFlag:0,                   //审核状态, 1审核通过, 0待审核
        pageNum: 1,                   //页码
        pageSize: 10,                 //页行
        total: 10,                    //数据总条数

        Lists: [],                    //评论信息列表

        loading:false,                //是否显示加载中
      }
    },
    methods:{
      //分页
      handleCurrentChange(val) {
        this.getEvaluateList()        //点击分页获取对应页数的数据
      },

      //返回顶部函数
      toTop(){
        let top = document.documentElement.scrollTop || document.body.scrollTop
        let step = top / 20
        let st = setInterval(()=>{
          top -= step;
          if (top <= 0) {
            top = 0
            clearInterval(st)
          }
          document.documentElement.scrollTop = top
        }, 20)
      },

      //获取评论列表
      async getEvaluateList(){
        var {pageNum,pageSize,showFlag} = this
        this.loading = true
        var result = await QUERYEVALUATE({pageNum,pageSize,showFlag})
        this.loading = false
        if(result && result.status == 0){                //获取评论列表成功
          result = result.data
          this.total = result.total                      //设置总页数
          this.Lists = result.list
          this.toTop()                                   //返回顶部
        }else{                                           //获取评论列表失败
          this.Lists = []
          if(result.msg){
            var message = result.msg
          }else{
            var message = '获取评论列表失败'
          }
          this.message(message,'error',1500)
        }
      },

      //删除评论
      deleteEvaluate(evaId){
        this.$confirm("确定删除该评论吗？","警告",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          var result = await DELETEEVALUATE({evaId})
          if(result && result.status == 0){            //删除评论成功
            var message = '删除成功'
            this.message(message,'success',2000)
            if(this.Lists.length == 1 && this.pageNum > 1){
              this.pageNum--
            }
            this.getEvaluateList()
          }else{                                       //删除评论失败
            if(result.msg){                              //因为其他错误导致失败
              var message = result.msg
            }else{                                       //因为发送请求不成功导致失败
              var message = '删除评论失败'
            }
            this.message(message,'error',1500)
          }
        })
      },
      //审核通过评论
      async passEvaluate(evaId){
        var showFlag = 1
        var result = await UPDATEEVALUATE({evaId,showFlag})
        if(result && result.status == 0){              //成功审核通过评论
          var message = '审核成功'
          this.message(message,'success',2000)
          if(this.Lists.length == 1 && this.pageNum > 1){
            this.pageNum--
          }
          this.getEvaluateList()
        }else{                                         //审核通过评论失败
          if(result.msg){                              //因为其他错误导致失败
            var message = result.msg
          }else{                                       //因为发送请求不成功导致失败
            var message = '审核失败，请重试'
          }
          this.message(message,'error',1500)
        }
      },

      //消息提示
      message(message,type,duration){
        this.$message({
          message,
          type,
          duration
        })
      },
    },
    created () {
      this.getEvaluateList()            //初始化评论列表
    },
    watch:{
      //监听评论审核状态，一变化则修改pageNum为第一页并请求对应的数据
      showFlag(newval,oldval){
        this.pageNum = 1
        this.getEvaluateList()
      }
    }
  }
</script>

<style lang="less">
  .evaluateList{
    .el-tabs__item{
      min-width: 80px;
      text-align: center;
      font-size: 16px;
      padding: 0 10px;
    }
    .listDiv{
      .biaoGe{
        min-height: 600px;
        ul.evaluateUl{
          margin-top: 25px;
          li.evaluateLi{
            list-style-type: none;
            padding: 0 20px;
            div.evaluateUserInfoDiv{
              height: 40px;
              padding: 0;
              span.evaluateUserNameSpan{
                font-size: 14px;
                line-height: 20px;
              }
              span.evaluateUserDateSpan{
                font-size: 14px;
                line-height: 20px;
                padding-left: 14px;
                color: rgb(144,144,144);
              }
              span.evaluateUserDeleteSpan{
                float: right;
                button{
                  margin-top: -5px;
                  padding-top: 8px;
                  padding-bottom: 8px;
                }
              }
            }
            div.evaluateUserCommentDiv{
              text-indent: 2em;
              font-size: 14px;
              line-height: 25px;
              min-height: 50px;
              padding-left: 45px;
              max-height: 200px;
            }
            div.emptyEvaluate{
              text-align: center;
              height: 200px;
              line-height: 200px;
              font-size: 18px;
              font-weight: bold;
            }
          }
        }
      }
      .myPages{
        margin: 20px 0 0;
        text-align: center;
      }  //分页样式
    }
  }
  @media screen and (max-width: 768px){
    .evaluateList{
      .itemTitle{
        font-size: 20px!important;
        &:after {
          width: 90px!important;
        }
      }
      .listDiv {
        .biaoGe {
          min-height: 150px!important;
          ul.evaluateUl{
            li.evaluateLi{
              list-style-type: none;
              padding: 0 10px;
              div.evaluateUserInfoDiv{
                height: 40px;
                padding: 0;
                span.evaluateUserDeleteSpan{
                  float: right;
                  button{
                    padding: 5px 8px;
                  }
                }
                span.evaluateUserDateSpan{
                  padding-left: 0;
                }
              }
              div.evaluateUserCommentDiv{
                padding-left: 0px;
              }
            }
          }
        }
      }
    }
    .el-message-box{
      width: 300px;
    }
  }
</style>

