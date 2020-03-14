// 使用自己封装的api
import request from '@/api/request'
import store from '@/store/index'
function addApiGroup(data) {
  console.log(store)
    return request({
      url: '/group/add',
      method: 'get',
      data:{...data,username:store.state.userInfo.username}
    })
}

function delApiGroup(data) {
    return request({
      url: '/group/delete',
      method: 'get',
      data:{...data,username:store.state.userInfo.username}
    })
}
function eidtApiGroup(data) {
    return request({
      url: '/group/modify',
      method: 'get',
      data:{...data,username:store.state.userInfo.username}
    })
}
function getApiGroup(data) {
  return request({
    url: '/group/page',
    method: 'get',
    data:{...data,username:store.state.userInfo.username}
  })
}

export default {
    addApiGroup,
    delApiGroup,
    eidtApiGroup,
    getApiGroup,
}

