import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/login/login'
import Manage from '../pages/manage'
import UmbrellaList from '../pages/umbrellaList'
import EvaluateList from '../pages/evaluateList'
import OrderList from '../pages/orderList'
import messageList from '../pages/messageList'

Vue.use(VueRouter)

var router =  new VueRouter({
  routes:[
    {
      path:'/manage',
      name:'manage',
      meta:{
        auth:true       //是否需要登录
      },
      component:Manage,
      children:[
        {
          path:'umbrellalist',
          name:'umbrellaList',
          meta:{
            auth:true       //是否需要登录
          },
          component:UmbrellaList
        },
        {
          path:'evaluatelist',
          name:'evaluateList',
          meta:{
            auth:true       //是否需要登录
          },
          component:EvaluateList
        },
        {
          path:'orderlist',
          name:'orderList',
          meta:{
            auth:true       //是否需要登录
          },
          component:OrderList
        },
        {
          path:'messagelist',
          name:'messageList',
          meta:{
            auth:true       //是否需要登录
          },
          component:messageList
        },
      ],
      redirect:{name: 'umbrellaList'}
    },
    {
      path:'/login',
      name:'login',
      component:Login,
    },
    {
      path:'',
      redirect:'/login'
    },
    {
      path:'/',
      redirect:'/login'
    }
  ]
})

router.beforeEach(function(to, from, next) {
  if (to.meta.auth) {                                 //跳转的页面不是登录界面
    let auth = sessionStorage.getItem('GDOUsan')
    if (auth == 'success') {                         //验证是否登录过
      return next()
    }else{                                           //一天内免登陆通道以及新开窗口通道
      if(localStorage.getItem('GDOUsan') && JSON.parse(localStorage.getItem('GDOUsan'))){      //之前登录过
        auth = JSON.parse(localStorage.getItem('GDOUsan'))
        var date = new Date()
        if(date.getFullYear() == auth.date.year && date.getMonth() == auth.date.month && date.getDate() == auth.date.date){     //同一天免登陆
          if(auth.auth == 'success'){               //验证通过
            return next()
          }else{                                    //验证不通过
            if(from.path != '/login'){
              router.replace({name:'login'})
            }
          }
        }else{                                      //超过一天
          if(from.path != '/login'){
            router.replace({name:'login'})
          }
        }
      }else{                                        //之前没登录过或者退出登录
        if(from.path != '/login'){
          router.replace({name:'login'})
        }
      }
    }
  } else {
    return next()
  }
})

export default router
