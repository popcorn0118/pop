import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/admin/pages/Login'
import Dashboard from '@/components/admin/Dashboard'
import Products from '@/components/admin/pages/Products'
import Coupons from '@/components/admin/pages/Coupons'
import Orders from '@/components/admin/pages/Orders'
import CustomerOrders from '@/components/admin/pages/CustomerOrders'
import CustomerCheckout from '@/components/admin/pages/CustomerCheckout'

import Home from '@/components/home/Home'
import ProductsHome from '@/components/home/pages/Products'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*', //若未設定 path
      redirect: '/login' // 導向
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true } //判斷是否放行,需驗證 router.beforeEach((to, from, next)
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,  
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        }
      ]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,  
      children: [
        {
          path: 'customer_orders',
          name: 'CustomerOrders',
          component: CustomerOrders,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        }
      ]
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,  
      children: [
        {
          path: 'products',
          name: 'ProductsHome',
          component: ProductsHome,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        }
      ]
    },
  ]
})
