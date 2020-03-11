// 使用自己封装的api
import request from '@/api/request'
import store from '@/store/index'
function addApi(data) {
  console.log(store)
    return request({
      url: '/api/add',
      method: 'get',
      data:{...data,username:store.state.userInfo.username}
    })
}

function delApi(data) {
    return request({
      url: '/api/delete',
      method: 'get',
      data:{...data,username:store.state.userInfo.username}
    })
}
function eidtApi(data) {
    return request({
      url: '/api/modify',
      method: 'get',
      data:{...data,username:store.state.userInfo.username}
    })
}
function getApi(data) {
  return request({
    url: '/api/list',
    method: 'get',
    data:{...data,username:store.state.userInfo.username}
  })
}
function getSetApiTree(data){
  return request({
    url: '/api/apiTree',
    method: 'get',
    data:{...data,username:store.state.userInfo.username}
  })
}

export default {
    addApi,
    delApi,
    eidtApi,
    getApi,
    getSetApiTree
}

