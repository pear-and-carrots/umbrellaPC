import ajax from './ajax'

// const Base = "https://www.haichuang8888.com/umbrella"
const Base = "http://124.71.87.176:8181"
export const LOGIN = (userName,password) => ajax(Base+"/login",{userName,password},'GET')      //登录

export const QUEADDRESS = (data) => ajax(Base+"/umbrella/get_all_location",data)                           //查询借伞地点
export const QUERYUMBRELLA = (data) => ajax(Base+"/umbrella/query_umbrella.do",data)                       //查询获取雨伞列表
export const INSERTUMBRELLA = (data) => ajax(Base+"/umbrella/insert_umbrella.do",data,'POST')        //雨伞上架
export const DELETEUMBRELLA = (data) => ajax(Base+"/umbrella/delete_umbrella.do",data,'DELETE')      //雨伞下架
export const QUERYDETAIL = (data) => ajax(Base+"/umbrella/query_umbrella_one.do",data)                     //雨伞详情查询

export const QUERYLISTORDER = (data) => ajax(Base+"/order/query_list_order.do",data)                       //查询雨伞出借列表

export const QUERYEVALUATE= (data) => ajax(Base+"/evaluate/get_list.do",data)                              //查询评论列表
export const DELETEEVALUATE = (data) => ajax(Base+"/evaluate/delete_one.do",data,'DELETE')           //删除一条评论
export const UPDATEEVALUATE = (data) => ajax(Base+"/evaluate/update_one.do",data,'DELETE')           //审核一条评论

export const GETSUGGEST = (data) => ajax(Base+"/suggest/getSuggest.do",data,'POST')           //意见的分页查找
export const DELETESUGGEST = (data) => ajax(Base+"/suggest/deleteSuggest.do",data,'POST')           //意见的删除
export const STATISTICS = (data) => ajax(Base+"/question/Statistics.do",data,'GET')           //意见的删除

