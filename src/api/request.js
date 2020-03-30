import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import qs from 'qs'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // console.log(store)
    if (store.getters.token) {
    // //   // let each request carry token
    // //   // ['X-Token'] is a custom headers key
    // //   // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer '+getToken()
      
    }
  
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    if(res.tokenCode ==5000){
      Message({
        message:'登陆超时，请重新登陆',
        type:'error',
        duration:3*1000
      })
      //清楚本地数据
      removeToken();
      router.replace({path:'/login'});
      return Promise.reject()
    }else{
    // console.log(res)
      return res
    }

    //请求过期，重新请求token
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
    return res
  },
  error => {
    console.log(error.response.status)
    if(error.response.status===401){
      if(router.history.current.path==='/login'){
        Message({
          message: '用户名或密码错误',
          type: 'error',
          duration: 3 * 1000
        })
      }else{
        store.dispatch('user/refreshAuth').then(() => {
          location.reload()
        })
      }
    }
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)
function processData(data){ //处理对象空值
  for(let key in data){
        //如果是对象，在继续遍历
        if(Object.prototype.toString.call(data[key])==='[object Object]'){
          if(Object.keys(data[key]).length === 0){ //如果是空对象，删除
             delete data[key]
          }else{
          processData(data[key])
          }
      }else if(!data[key]){
  
      delete data[key]
  }
} 
  return data;
}
// 请求分为get/post
// axios对于get和post的参数的处理方式是不同的
function http(config){
  if(config.method.toLowerCase() === 'post'){
    // 针对对象 是无法直接处理的 ; qs是一个js库,可以方便的对对象进行序列化处理
    // myAjax  {name:'zx',age:20} ==> name=zs&age=20
    // config.data = qs.stringify(config.data,{arrayFormat: 'repeat',allowDots: true});
    if(config.url==='/oauth/token'){
      config.params = config.data
    } else{
    config.data = processData(config.data);
    }
  }else{
    config.params = config.data;
  }
  return service(config);
}


// export default http


export  default http;