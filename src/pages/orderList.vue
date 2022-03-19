<template>
  <div class="OrderList">
    <h3 class="itemTitle noSelect">
      借伞记录
    </h3>
    <div class="searchForm">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="借伞站点">
          <el-select v-model="stationId" placeholder="请选择借伞站点">
            <el-option :label="station" :value="station" v-for="(station,index) in stations" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="雨伞状态">
          <el-select v-model="status" placeholder="请选择雨伞状态">
            <el-option label="未归还" :value="0"></el-option>
            <el-option label="已归还" :value="1"></el-option>
            <el-option label="续借" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getOrderList(true)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="listDiv" v-loading="loading" element-loading-text="数据加载中..">
      <div class="biaoGe">
        <el-table
          :data="Lists"
          style="width: 100%;"
          border
        >
          <el-table-column
            prop="umId"
            label="雨伞ID"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="stuName"
            label="借伞者"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="stuClass"
            label="借伞者班级"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="stuId"
            label="借伞者学号"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="stuPhone"
            label="借伞者电话"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="stationId"
            label="借伞站点"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="beginTime"
            label="借伞日期"
            min-width="180">
            <template slot-scope="scope">
              <span style="margin-right: 15px;">{{deleteRow(scope.row.beginTime,1)}}</span>
              <span>{{deleteRow(scope.row.beginTime,2)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="renewTime"
            :label="workType == 1?'归还日期':'到期日期'"
            min-width="180">
            <template slot-scope="scope">
              <span style="margin-right: 15px;">{{deleteRow(scope.row.renewTime,1)}}</span>
              <span>{{deleteRow(scope.row.renewTime,2)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="myPages" v-if="Lists.length > 0">
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
  import {QUERYLISTORDER,QUEADDRESS} from '../api/types'
  export default {
    name:'orderList',
    data(){
      return {
        stations:[],                 //借伞地点
                                     //页面显示内容参数
        pageNum: 1,                  //页码
        pageSize: 11,                //页行
        total: 10,                   //数据总条数
        stationId : '',              //雨伞站点
        status : 0,                  //雨伞归还状态,0未归还, 1归还, 2续借

        workType: 0,                 //保存当前数据是已归还还是未归还，0未归还, 1归还, 2续借

        Lists: [],                   //雨伞信息列表

        loading:false,               //是否显示加载中
      }
    },
    methods:{
      //分页
      handleCurrentChange(val) {
        this.getOrderList()             //点击分页获取对应页数的数据
      },

      //获取借伞地点
      async getStations(){
        var result = await QUEADDRESS()
        if(result.status == 0){
          if(result.data[0]){
            this.stations = result.data
            this.stationId = this.stations[0]
            this.getOrderList(true)
          }
        }else{
          if(result.msg){
            var message = result.msg
          }else{
            var message = '获取借伞站点失败，请重试'
          }
          this.message(message,'error',1500)
        }
      },
      //获取雨伞出借订单列表
      async getOrderList(type = false){
        if(type){                                      //通过点击搜索按钮来获取雨伞列表需要将页数重新置为1
          this.pageNum = 1
        }
        var {pageNum,pageSize,status,stationId} = this
        this.loading = true
        var result = await QUERYLISTORDER({pageNum,pageSize,status,stationId})
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

      //返回相应格式的日期
      deleteRow(time,type) {
        if(time){
          if(type == 1){                //为1时返回年-月-日
            time = time.slice(0,10)
          }else{                        //为2是返回时:分:秒
            time = time.slice(11,19)
          }
          return time
        }else{                          //空数据时返回-
          return '-'
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
      this.getStations()                //初始化雨伞站点
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

      .uploadSpan{
        float: right;
        margin-top: -3px
      }
    }
    .searchForm{
      padding: 15px 0 ;
      margin: 20px 0;
      .el-form-item{
        margin-bottom: 0;
        .el-form-item__label{
          width: 100px;
          font-size: 16px;
        }
        button{
          font-size: 16px;
          padding: 11px 25px;
        }
      }
    }
    .listDiv{
      .biaoGe{
        min-height: 600px;
        tr{
          div.cell{
            color: rgb(76,76,76);
          }
        }
      }
      div.cell{
        text-align: center;
      }  //表格文字居中
      .myPages{
        margin: 20px 0 0;
        text-align: center;
      }  //分页样式
    }
  }
  @media screen and (max-width: 860px){
    .OrderList{
      .searchForm{
        .el-form-item{
          .el-form-item__label{
            font-size: 16px;
            width: auto;
          }
          .el-select{
            width: 200px;
          }
          button{
            font-size: 16px;
            padding: 9px 15px;
          }
        }
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
      .searchForm{
        padding: 10px 0 0 !important;
        border: 1px solid rgb(233,233,233);
        .el-form-item{
          margin-bottom: 10px!important;
          .el-form-item__label{
            width: 75px!important;
            padding: 0!important;
            margin-right: 15px;
            font-size: 14px!important;
          }
          .el-select{
            width: calc(100vw - 130px)!important;
          }
          button{
            margin-left: calc(100vw - 100px);
            font-size: 14px!important;
            padding: 10px 15px!important;
          }
        }
      }
      .listDiv {
        .biaoGe {
          min-height: 115px!important;
        }
      }
    }
  }
</style>

