import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/customer',
    component: Layout,
    children: [
      {
        path: 'customer',
        name: 'customer',
        component: () => import('@/views/customer/index'),
        meta: { title: '客户管理', icon: 'personal' }
      },
      {
        path: '/appset',
        name: 'appset',
        component: () => import('@/views/customerApp/Appset.vue'),
        meta: { title: '商户详情页', icon: 'personal' },
        hidden:true,
        children:[{
          path: '/appset/appservice',
          name: 'appservice',
          component: () => import('@/views/customerApp/Appservice.vue'),
          meta: { title: 'app服务', icon: 'personal' },
          hidden:true,
        },
        {
          path: '/appset/appitem',
          name: 'appitem',
          component: () => import('@/views/customerApp/Appitem.vue'),
          meta: { title: 'app服务', icon: 'personal' },
          hidden:true,
        },
        {
          path: '/appset/appoprate',
          name: 'appoprate',
          component: () => import('@/views/customerApp/Appoprate.vue'),
          meta: { title: 'app服务', icon: 'personal' },
          hidden:true,
        }
      
      ]
      }
    ]
  },
  {
    path: '/diagram',
    component: Layout,
    children: [
      {
        path: 'diagram',
        name: 'diagram',
        component: () => import('@/views/diagram/index'),
        meta: { title: '统计报表', icon: 'diagram' }
      }
    ]
  },
  {
    path: '/systemSet',
    component: Layout,
    redirect: '/systemSet/notification',
    name: 'systemSet',
    meta: { title: '系统配置', icon: 'setting' },
    children: [
      {
        path: 'notification',
        name: 'notification',
        component: () => import('@/views/systemSet/notification/index'),
        meta: { title: '通知设置', icon: 'table' }
      },
      {
        path: 'apiManage',
        name: 'apiManage',
        component: () => import('@/views/systemSet/apiManage/index'),
        meta: { title: 'API管理', icon: 'tree' }
      },
      {
        path: 'apiGroupManage',
        name: 'apiGroupManage',
        component: () => import('@/views/systemSet/apiGroupManage/index'),
        meta: { title: 'API组管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/accountManage',
    component: Layout,
    redirect: '/accountManage/duty',
    name: 'accountManage',
    meta: { title: '账户管理', icon: 'team' },
    children: [
      {
        path: 'duty',
        name: 'duty',
        component: () => import('@/views/accountManage/duty/index'),
        meta: { title: '职务', icon: 'table' }
      },
      {
        path: 'employee',
        name: 'employee',
        component: () => import('@/views/accountManage/employee/index'),
        meta: { title: '员工', icon: 'tree' }
      }
    ]
  },
  
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
