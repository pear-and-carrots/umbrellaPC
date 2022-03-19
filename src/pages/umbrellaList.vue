<template>
  <div class="umbrellaList">
    <h3 class="itemTitle noSelect">
      雨伞列表
      <span class="uploadSpan">
        <el-button
          size="small"
          type="primary"
          @click="planToInsert()">
          <i class="el-icon-plus"></i>雨伞上架
        </el-button>
      </span>
    </h3>
    <div class="searchForm">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="借伞站点">
          <el-select v-model="stationId" placeholder="请选择借伞站点">
            <el-option :label="station" :value="station" v-for="(station,index) in stations" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="雨伞状态">
          <el-select v-model="soldOut" placeholder="请选择雨伞状态">
            <el-option label="未下架" :value="1"></el-option>
            <el-option label="已下架" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否已外借">
          <el-select v-model="status" placeholder="请选择雨伞是否已外借">
            <el-option label="未借出" :value="1"></el-option>
            <el-option label="已借出" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUmbrellaList(true)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="雨伞下架" :visible.sync="isToDelete" top="30vh" width="400px">
      <el-form :inline="true" class="deleteForm">
        <el-form-item label="下架者">
          <el-input v-model="deleteForm.endWorker" autocomplete="off" placeholder="请输入下架者的名字" @focus="deleteForm.endWorkerError = ''"></el-input>
          <p class="errorTip" v-show="deleteForm.endWorkerError">{{deleteForm.endWorkerError}}</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="isToDelete = false">取 消</el-button>
        <el-button size="small" type="primary" @click="ToDelete()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="雨伞重新上架" :visible.sync="isToReUpload" top="30vh" width="400px">
      <el-form :inline="true" class="deleteForm">
        <el-form-item label="更新者">
          <el-input v-model="reUploadForm.endWorker" autocomplete="off" placeholder="请输入更新者的名字" @focus="reUploadForm.endWorkerError = ''"></el-input>
          <p class="errorTip" v-show="reUploadForm.endWorkerError">{{reUploadForm.endWorkerError}}</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="isToReUpload = false">取 消</el-button>
        <el-button size="small" type="primary" @click="ToReUpload()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="雨伞上架" :visible.sync="isToInsert" top="30vh" width="400px">
      <el-form :inline="true" class="deleteForm">
        <el-form-item label="登记者">
          <el-input v-model="uploadForm.beginWorker" autocomplete="off" placeholder="请输入登记者的名字" @focus="uploadForm.beginWorkerError = ''"></el-input>
        </el-form-item>
        <el-form-item label="放伞站点" style="margin-top: 15px;">
          <el-select v-model="uploadForm.stationId" placeholder="请选择借伞站点" @focus="uploadForm.beginWorkerError = ''">
            <el-option :label="station" :value="station" v-for="(station,index) in stations" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="雨伞编号" style="margin-top: 15px;">
          <el-input v-model="uploadForm.umId" autocomplete="off" placeholder="请输入编号：001-120" @focus="uploadForm.beginWorkerError = ''" @blur="queryDetail()"></el-input>
          <p class="errorTip" v-show="uploadForm.beginWorkerError">{{uploadForm.beginWorkerError}}</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="isToInsert = false">取 消</el-button>
        <el-button size="small" type="primary" @click="ToInsert()">确 定</el-button>
      </div>
    </el-dialog>
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
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="stationId"
            label="站点"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="beginWorker"
            label="上架人"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="endWorkder"
            :label="workType == 1?'更新人':'下架人'"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="beginTime"
            label="上架时间"
            min-width="180">
            <template slot-scope="scope">
              <span style="margin-right: 15px;">{{deleteRow(scope.row.beginTime,1)}}</span>
              <span>{{deleteRow(scope.row.beginTime,2)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="endTime"
            :label="workType == 1?(lendType == 1?'最近更新时间':'借出时间'):'下架时间'"
            min-width="180">
            <template slot-scope="scope">
              <span style="margin-right: 15px;">{{deleteRow(scope.row.endTime,1)}}</span>
              <span>{{deleteRow(scope.row.endTime,2)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="外借状态"
            min-width="90">
            <template
              slot-scope="scope"
              min-width="90"
            >
              <span>{{scope.row.status?'未借出':'已借出'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="100"
            label="操作"
          >
            <template
              slot-scope="scope"
              min-width="100"
            >
              <el-button
                size="mini"
                type="danger"
                v-if="workType == 1 && lendType == 1"
                @click="planToDelete(scope.row.umId)">
                下架
              </el-button>
              <el-button
                size="mini"
                type="success"
                v-else-if="workType == 0"
                @click="planToReUpload(scope.row.umId)">
                重新上架
              </el-button>
              <span v-else>--</span>
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
  import {QUERYUMBRELLA,INSERTUMBRELLA,DELETEUMBRELLA,QUEADDRESS,QUERYDETAIL} from '../api/types'
  export default {
    name:'umbrellaList',
    data(){
      return {
        stations:[],                 //借伞地点
        Lists: [],                   //雨伞信息列表

                                     // 页面显示内容参数
        pageNum: 1,                  //页码
        pageSize: 11,                //页行
        total: 0,                    //数据总条数
        soldOut: 1,                  //雨伞下架状态,0下架，1未下架
        stationId : '',              //雨伞站点ID
        status: 1,                   //雨伞外借状态,0外借,1未外借

        umId: '',                    //下架雨伞的umId /上架时的umId

        isToInsert: false,           //弹出雨伞上架弹窗
                                     //填写雨伞上架信息表单
        uploadForm:{
          stationId: '',             //上架站点
          beginWorkerError: '',      //填写登记者名字错误
          beginWorker: '',           //登记者的名字
          umId:'',                   //雨伞编号
        },

        isToReUpload: false,         //弹出重新上架弹窗
                                     //重新上架表单
        reUploadForm:{
          endWorkerError: '',        //填写更新者名字错误
          endWorker:'',              //更新者的名字
        },

        isToDelete: false,           //弹出雨伞下架弹窗
        deleteForm:{
          endWorkerError: '',        //填写下架者名字错误
          endWorker: '',             //下架者的名字
        },

        workType: 1,                 //保存当前雨伞上架/下架状态,0为下架，1为上架
        lendType: 1,                 //保存当前雨伞接触状态，0为已借出，1为未借出

        loading:false,               //是否显示加载中
      }
    },
    methods:{
      //分页
      handleCurrentChange(val) {
        this.getUmbrellaList()        //点击分页获取对应页数的数据
      },
      //获取借伞地点
      async getStations(){
        var result = await QUEADDRESS()
        if(result.status == 0){
          if(result.data[0]){
            this.stations = result.data       //保存站点信息
            this.stationId = this.stations[0] //默认选中第一个站点
            this.getUmbrellaList(true)        //默认请求第一个站点的雨伞列表作为初始化数据
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

      //获取雨伞列表
      async getUmbrellaList(type = false){
        if(type){                                      //通过点击搜索按钮来获取雨伞列表需要将页数重新置为1
          this.pageNum = 1
        }
        var {pageNum,pageSize,soldOut,stationId,status} = this
        var params = {pageNum,pageSize,soldOut,stationId,status}
        this.loading = true
        var result = await QUERYUMBRELLA(params)
        this.loading = false
        if(result && result.status == 0){                //获取雨伞列表成功
          this.workType = soldOut                        //保存此刻雨伞状态：已下架/未下架
          this.lendType = status                         //保存此刻是借出状态：已借出/未借出
          result = result.data
          this.total = result.total                      //设置总页数
          this.Lists = result.list                       //保存雨伞列表信息
        }else{                                           //获取雨伞列表失败
          this.Lists = []
          if(result.msg){
            var message = result.msg
          }else{
            var message = '获取雨伞列表失败，请重试'
          }
          this.message(message,'error',1500)
        }
      },

      /*雨伞上架*/
      //准备上架雨伞
      planToInsert(){
        this.isToInsert = true                          //打开上架雨伞弹窗
        this.uploadForm.stationId = this.stations[0]    //初始借伞站点为第一个地点
      },
      //查询雨伞详情，看看该雨伞编号是否已存在
      async queryDetail(){
        var {umId} = this.uploadForm
        if(umId){
          var result = await QUERYDETAIL({umId})
          if(result.status == 0){}else if(result.status == 1){
            this.uploadForm.beginWorkerError = '该伞编号已登记，切勿重复登记'
          }else{
            this.uploadForm.beginWorkerError = '编号有误'
          }
        }
      },
      //上架雨伞前一步
      ToInsert(){
        var {beginWorker,stationId,umId,beginWorkerError} = this.uploadForm
        if(beginWorker.trim() && stationId && umId){         //判断上架雨伞需要的参数是否填写完整，若完整则上架
          if(beginWorkerError == ''){                        //信息都是正确的才能进行上架
            this.insertUmbrella(umId,beginWorker,stationId)  //发送上架请求
          }
        }else{                                               //不完整提示
          this.uploadForm.beginWorkerError = '*必须填写以上信息'
        }
      },
      //雨伞上架
      async insertUmbrella(umId,beginWorker,stationId){
        var params = new FormData()
        params.append('umId',umId)
        params.append('beginWorker',beginWorker)
        params.append('stationId',stationId)
        var result = await INSERTUMBRELLA(params)
        if(result && result.status == 0){     //上架成功
          this.isToInsert = false             //关闭上架雨伞弹出
          var message = '雨伞上架成功'
          this.message(message,'success',2000)
          this.getUmbrellaList()              //每次上传雨伞成功后都刷新一次数据
        }else{                                //上架失败
          if(result.msg){                     //因为其他错误导致失败
            this.uploadForm.beginWorkerError = '*' + result.msg
          }else{                              //因为发送请求不成功导致失败
            this.uploadForm.beginWorkerError = '*雨伞上架失败'
          }
        }
      },

      /*雨伞下架*/
      //准备下架雨伞
      planToDelete(umId){
        this.isToDelete = true      //打开雨伞下架弹出窗
        this.umId = umId            //保存即将下架的雨伞umId
      },
      //下架雨伞前一步
      ToDelete(){
        var soldOut = '0'
        var {umId} = this
        var {endWorker} = this.deleteForm
        if(endWorker.trim()){                              //填写了下架者姓名方可下架雨伞
          this.isToDelete = false                          //关闭下架弹窗
          this.deleteUmbrella(endWorker,umId,soldOut)      //发送下架请求
        }else{                                             //没填写下架者姓名则提示
          this.deleteForm.endWorkerError = '*必须填写雨伞下架操作人姓名'
        }
      },
      //雨伞下架
      async deleteUmbrella(endWorker,umId,soldOut){
        var result = await DELETEUMBRELLA({endWorker,soldOut,umId})  //发送下架请求
        if(result && result.status == 0){                            //请求成功
          var message = '雨伞下架成功'
          this.message(message,'success',2000)
          //如果当页只有一条数据且页数大于1则页数要自动减1
          if(this.Lists.length == 1 && this.pageSize > 1){
            this.pageSize--
          }
          this.getUmbrellaList()               //每次删除成功后都刷新一次数据
        }else{
          if(result.msg){                      //因为其他原因导致雨伞下架失败
            var message = result.msg
          }else{                               //因为请求没成功导致失败
            var message = '雨伞下架失败'
          }
          this.message(message,'error',2000)
        }
      },

      /*雨伞重新上架*/
      //准备重新上架雨伞
      planToReUpload(umId){
        this.isToReUpload = true    //打开重新上架弹出窗
        this.umId = umId            //保存即将重新上架雨伞的umId
      },
      //重新上架前一步
      ToReUpload(){
        var soldOut = '1'
        var {umId} = this
        var {endWorker} = this.reUploadForm
        if(endWorker.trim()){                            //填写了重新上架更新者姓名后方可进行雨伞重新上架
          this.isToReUpload = false                      //关闭重新上架弹窗
          this.reUploadUmbrella(endWorker,umId,soldOut)  //发送重新上架请求
        }else{                                           //没填写下架者姓名则提示
          this.reUploadForm.endWorkerError = '*必须填写雨伞更新操作人姓名'
        }
      },
      //雨伞重新上架
      async reUploadUmbrella(endWorker,umId,soldOut){
        var result = await DELETEUMBRELLA({endWorker,soldOut,umId})  //发送重新上架请求
        if(result && result.status == 0){                            //请求成功
          var message = '重新上架成功'
          this.message(message,'success',2000)
          //如果当页只有一条数据且页数大于1则页数要自动减1
          if(this.Lists.length == 1 && this.pageSize > 1){
            this.pageSize--
          }
          this.getUmbrellaList()               //每次删除成功后都刷新一次数据
        }else{
          if(result.msg){                      //因为其他原因导致重新上架失败
            var message = result.msg
          }else{                               //因为请求没成功导致失败
            var message = '雨伞重新上架失败'
          }
          this.message(message,'error',2000)
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
      this.getStations()              //初始化先获取借伞地点
    },
    watch:{
      isToDelete(newval,oldval){
        this.deleteForm.endWorker = ''                   //每次关闭删除弹出窗就清空一次下架者的名字
        this.deleteForm.endWorkerError = ''              //每次关闭删除弹出窗就清空一次下架者的名字错误
      },
      isToReUpload(newval,oldval){
        this.reUploadForm.endWorker = ''                 //每次关闭删除弹出窗就清空一次重新上架者的名字
        this.reUploadForm.endWorkerError = ''            //每次关闭删除弹出窗就清空一次重新上架者的名字错误
      },
      isToInsert(newval,oldval){
        this.uploadForm.beginWorker = ''                 //每次关闭删除弹出窗就清空一次上架者的名字
        this.uploadForm.umId = ''                        //每次关闭删除弹出窗就清空一次雨伞umId
        this.uploadForm.beginWorkerError = ''            //每次关闭删除弹出窗就清空一次上架者的名字错误
        this.uploadForm.stationId = ''                   //每次关闭删除弹出窗就重置一次上架地点
      },
    },
  }
</script>

<style lang="less">
  @media (any-hover: hover) {
    .umbrellaList{
      .itemTitle{
        &:hover{
          &:after{
            width: 120px!important;
          }
        }
      }
    }
  }
  .umbrellaList{
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
    .el-dialog__wrapper{
      .el-dialog__body{
        padding: 20px 20px 10px;
        .deleteForm{
          .errorTip{
            color: red;
            font-size: 14px;
            line-height: 20px;
            margin: 10px auto 0;
          }
          .el-form-item{
            margin: 0;
            .el-form-item__label{
              width: 90px;
            }
            .el-select,.el-input{
              width: 250px;
            }
          }
        }
      }
      .el-dialog__footer{
        padding-bottom: 15px;
        padding-top: 0px;
      }
    }
  }
  @media screen and (max-width: 1199px){
    .umbrellaList{
      .searchForm{
        .el-form-item{
          min-width: 100px;
          text-align: center;
          button{
            padding: 9px 15px;
            margin-left: 10px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px){
    .umbrellaList{
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
