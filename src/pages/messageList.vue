<template>
  <div class="OrderList">
    <h3 class="itemTitle noSelect">
      问卷统计
    </h3>
    <div class="listDiv" v-loading="loading" element-loading-text="数据加载中..">
      <div class="biaoGe">
        <ul class="evaluateUl">
          <li class="evaluateLi" v-if="Lists.length != 0">
            <el-scrollbar style="margin: 20px;" ref="scroll">
              <div class="evaluateUserInfoDiv" id="main1" style="width: 100%;height:300px;"></div>
            </el-scrollbar>
            <el-scrollbar style="margin: 20px" ref="scroll">
              <div class="evaluateUserInfoDiv" id="main2" style="width: 100%;height:300px;"></div>
            </el-scrollbar>
            <el-scrollbar style="margin: 20px" ref="scroll">
              <div class="evaluateUserInfoDiv" id="main3" style="width: 100%;height:300px;"></div>
            </el-scrollbar>

            <div style="font-size: 18px;font-weight: 1000;rgb(70, 70, 70);text-align: center;margin-top: 20px" class="evaluateUserInfoDiv">
              地点建议：
            </div>

            <div class="evaluateUserInfoDiv" style="padding: 40px; margin-top: -20px; margin-bottom: 20px" v-for="(item,index) in text" :key="index">
              <div class="evaluateUserCommentDiv overHidden">
                {{ index + 1 }} ：{{item.name}}
              </div>
              <el-divider><i class="el-icon-lollipop"></i></el-divider>
            </div>

            <div style="font-size: 18px;font-weight: 1000;rgb(70, 70, 70);text-align: center;margin-top: 150px" class="evaluateUserInfoDiv">
              {{ message.title }}({{ message.number }}人作答)
            </div>
            <div class="evaluateUserInfoDiv" style="padding: 40px" v-for="(evaluate,index) in message.choiceVos" :key="index">
              <div class="evaluateUserCommentDiv overHidden">
                {{ index + 1 }}：{{evaluate.name}}
              </div>
              <el-divider><i class="el-icon-lollipop"></i></el-divider>
            </div>

          </li>
          <li class="evaluateLi" v-if="Lists.length == 0">
            <div class="noSelect emptyEvaluate">
              暂无更多数据
            </div>

            <el-divider><i class="el-icon-lollipop"></i></el-divider>
          </li>
        </ul>
      </div>
      <div class="myPages" v-if="total > 0 && total > pageSize">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {GETSUGGEST, DELETESUGGEST, QUERYLISTORDER, STATISTICS} from '../api/types'

export default {
  name:'messageList',
  data(){
    return {
      Lists: [],
      loading: false,               //是否显示加载中
      page: 1,                  //页码
      pageSize: 11,                //页行
      total: 10,                   //数据总条数
      chartPie: null,
      status: -1,
      message: [],
      text: []
    }
  },

  mounted(){
    this.draw1();
    this.draw2();
    this.draw3();
    this.draw4();
  },

  methods:{
    draw1(){
      let that = this
      this.STATISTICS('0dd40508-e5f8-45ca-a4fb-3d080cf8e94a')
      setTimeout(res=>{
        let Lists = this.Lists
        let list = []
        Lists.forEach(item=>{
          if(item.title.indexOf("1") == 0){
            list = item
          }
        })
        console.log(list)
        if(this.status == 0){
          this.myChart = this.$echarts.init(document.getElementById('main1'))
          // 指定图表的配置项和数据
          var option = {
            title: {
              text: list.title + '('+list.number + '人作答)',
              left: 'center',
              overflow: false
            },
            tooltip: {
              trigger: 'item'
            },
            series: [
              {
                name: '问题原因',
                type: 'pie',
                radius: '50%',
                data: [
                  {value: list.choiceVos[0].quantity, name: list.choiceVos[0].name},
                  {value: list.choiceVos[1].quantity, name: list.choiceVos[1].name},
                  {value: list.choiceVos[2].quantity, name: list.choiceVos[2].name}
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          let _this = this; //注意，要将this进行指代，否则在click里面this指向发生了改变

          this.myChart.setOption(option);
          //点击事件
          // this.myChart.on('click',function(params){
          //   _this.$alert(params, '问题详情', {
          //     confirmButtonText: '确定',
          //     dangerouslyUseHTMLString:true,
          //     callback: action => {}
          //   });
          // });
        }

      },500)
    },

    draw2(){
      let that = this
      this.STATISTICS('74f73508-7470-4fac-b19c-1ff917969dd6')
      setTimeout(res=>{
        let Lists = this.Lists
        let list = []
        Lists.forEach(item=>{
          if(item.title.indexOf("2") == 0){
            list = item
          }
        })
        console.log(list)
        if(this.status == 0){
          this.myChart = this.$echarts.init(document.getElementById('main2'))
          // 指定图表的配置项和数据
          var option = {
            title: {
              text: list.title + '('+list.number + '人作答)',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            series: [
              {
                name: '问题原因',
                type: 'pie',
                radius: '50%',
                data: [
                  {value: list.choiceVos[0].quantity, name: list.choiceVos[0].name},
                  {value: list.choiceVos[1].quantity, name: list.choiceVos[1].name},
                  {value: list.choiceVos[2].quantity, name: list.choiceVos[2].name}
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          let _this = this; //注意，要将this进行指代，否则在click里面this指向发生了改变

          this.myChart.setOption(option);
          //点击事件
          // this.myChart.on('click',function(params){
          //   _this.$alert(params, '问题详情', {
          //     confirmButtonText: '确定',
          //     dangerouslyUseHTMLString:true,
          //     callback: action => {}
          //   });
          // });
        }

      },500)

    },

    draw3(){
      let that = this
      this.STATISTICS('d863fb3b-7127-4a21-a9d5-c322a0a17c57')
      setTimeout(res=>{
        let Lists = this.Lists
        let list = []
        let text = this.text
        Lists.forEach(item=>{
          if(item.title.indexOf("3") == 0){
            list = item
          }
        })
        console.log("?????????",list)
        list.choiceVos.forEach(res=>{
          if(res.name != '①暂时不需要增加'){
            console.log(res.name != '①暂时不需要增加')
            text.push(res)
          }
        })
        this.text = text
        console.log(text)
        if(this.status == 0){
          this.myChart = this.$echarts.init(document.getElementById('main3'))
          // 指定图表的配置项和数据
          var option = {
            title: {
              text: list.title + '('+list.number + '人作答)',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            series: [
              {
                name: '问题原因',
                type: 'pie',
                radius: '50%',
                data: [
                  {value: list.choiceVos[0].quantity, name: list.choiceVos[0].name},
                  {value: list.number-list.choiceVos[0].quantity, name: '可以适当增加'}
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          let _this = this; //注意，要将this进行指代，否则在click里面this指向发生了改变

          this.myChart.setOption(option);
          //点击事件
          // this.myChart.on('click',function(params){
          //   _this.$alert(params, '问题详情', {
          //     confirmButtonText: '确定',
          //     dangerouslyUseHTMLString:true,
          //     callback: action => {}
          //   });
          // });
        }

      },500)
    },

    draw4(){
      let that = this
      this.STATISTICS('1bc992f4-0a4c-4dfe-963e-3bc647a43fcf')
      setTimeout(res=>{
        let Lists = this.Lists
        Lists.forEach(item=>{
          if(item.title.indexOf("4") == 0){
            that.message = item
            console.log(that.message)
          }
        })
      },500)
    },

    //统计数据
    async STATISTICS (data) {
      let that = this
      let subjectId = {
        'subjectId': data
      }
      this.loading = true
      var result = await STATISTICS(subjectId)
      this.loading = false
      console.log(result)
      this.status = result.status
      if(result && result.status == 0){                //获取统计数据成功
        that.Lists.push(result.data)
        console.log(that.Lists)
      }else{                                           //获取统计数据失败
        if(result.msg){
          var message = result.msg
        }else{
          var message = '网络出错，请稍后再试'
        }
        this.message(message,'error',1500)
      }
    },

    //分页
    handleCurrentChange(val) {
      this.GETSUGGEST()             //点击分页获取对应页数的数据
    },

    //分页获取意见内容
    async GETSUGGEST(){
      let data = new FormData()
      data.append('page', this.page)
      data.append('pageSize', this.pageSize)
      this.loading = true
      var result = await GETSUGGEST(data)
      this.loading = false
      console.log(result)
      this.status = result.status
      if(result && result.status == 0){                //获取意见列表成功
        result = result.data
        this.total = result.total                      //设置总页数
        this.Lists = result.list
      }else{                                           //获取雨伞订单列表失败
        this.Lists = []
        if(result.msg){
          var message = result.msg
        }else{
          var message = '获取雨伞列表失败，请重试'
        }
        this.message(message,'error',1500)
      }
    },

    //删除意见
    async deleteMessage (id) {
      let data = new FormData()
      data.append('id', id)
      this.loading = true
      var result = await DELETESUGGEST(data)
      this.loading = false
      if(result && result.status == 0){            //删除评论成功
        var message = '删除成功'
        this.message(message,'success',2000)
        if(this.Lists.length == 1 && this.pageNum > 1){
          this.pageNum--
        }
        this.GETSUGGEST()
      }else{                                       //删除评论失败
        if(result.msg){                              //因为其他错误导致失败
          var message = result.msg
        }else{                                       //因为发送请求不成功导致失败
          var message = '删除评论失败'
        }
        this.message(message,'error',1500)
      }
    },

    //获取雨伞出借订单列表
    async getOrderList(type = false){
      if(type){                                      //通过点击搜索按钮来获取雨伞列表需要将页数重新置为1
        this.page = 1
      }
      var {page,pageSize,status,stationId} = this
      this.loading = true
      var result = await QUERYLISTORDER({page,pageSize,status,stationId})
      this.loading = false
      if(result && result.status == 0){                //获取雨伞订单列表成功
        this.workType = status                         //保存当前数据是已归还还是未归还，0未归还, 1归还, 2续借
        result = result.data
        this.total = result.total                      //设置总页数
        this.Lists = result.list
      }else{                                           //获取雨伞订单列表失败
        this.Lists = []
        if(result.msg){
          var message = result.msg
        }else{
          var message = '获取雨伞列表失败，请重试'
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
    // this.GETSUGGEST()                //初始化数据
    this.$refs['scroll'].wrap.scrollTop = 300
  },
}
</script>

<style lang="less">
@media (any-hover: hover) {
  .OrderList{
    .itemTitle{
      &:hover{
        &:after{
          width: 120px!important;
        }
      }
    }
  }
}
.OrderList{
  padding-bottom: 30px;
  .listDiv{
    .biaoGe{
      padding-bottom: 40px;
      min-height: 600px;
      ul.evaluateUl{
        margin-top: 25px;
        li.evaluateLi{
          list-style-type: none;
          padding: 0 20px;
          div.evaluateUserInfoDiv{
            height: 40px;
            padding: 0px;
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
            padding-top: 20px;
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
  .myPages{
    margin: 20px 0 0;
    text-align: center;
  }  //分页样式
  .evaluateUserInfoDiv{

  }

  .itemTitle{
    position: relative;
    margin-top: 0px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(233,233,233);

    &:after {
      content: "";
      position: absolute;
      width: 70px;
      height: 2px;
      content: "";
      background: #000;
      left: 0;
      bottom: 0;
      -moz-transition: all .5s ease;
      -webkit-transition: all .5s ease;
      transition: all .5s ease;
    }
  }
}
@media screen and (max-width: 860px){
  .OrderList{
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
              padding-top: 20px;
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
}
@media screen and (max-width: 768px){
  .OrderList{
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
              padding-top: 20px;
            }
          }
        }
      }
    }
  }
}
</style>

