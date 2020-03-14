// 使用自己封装的api
import request from '@/api/request'
import store from '@/store/index'
function addCustomer(data) {
  console.log(store)
    return request({
      url: '/merchant/add',
      method: 'post',
      data:{...data,username:store.state.userInfo.username}
    })
}

function delCustomer(data) {
    return request({
      url: '/merchant/delete',
      method: 'post',
      data:{...data,username:store.state.userInfo.username}
    })
}
function eidtCustomer(data) {
    return request({
      url: '/merchant/modify',
      method: 'post',
      data:{...data,username:store.state.userInfo.username}
    })
}
function getCustomer(data) {
  return request({
    url: '/operation/merchant/page',
    method: 'post',
    data:{...data,username:store.state.userInfo.username}
  })
}

function getCustomerDetail(data){
  return request({
    url: 'merchant/detail',
    method: 'post',
    data:{...data,username:store.state.userInfo.username}
  })
}

function getCustomerApi(data){
  return request({
    url: '/agreement/agreementDetail',
    method: 'post',
    data:{...data,username:store.state.userInfo.username}
  })
}
function getCustomerApiTree(data){
  return request({
    url: '/api/groupApiTree',
    method: 'post',
    data:{...data,username:store.state.userInfo.username}
  })
}

function generateApiTree(data){
  return request({
    url: '/agreement/produce',
    method: 'post',
    data:{...data,username:store.state.userInfo.username}
  })
}


export default {
    addCustomer,
    delCustomer,
    eidtCustomer,
    getCustomer,
    getCustomerDetail,
    getCustomerApi,
    getCustomerApiTree,
    generateApiTree
    
}

