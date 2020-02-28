import Vue from 'vue'
import VueRouter from 'vue-router'
import Footer from '@/components/Footer'
Vue.use(VueRouter)
// 路由的懒加载
const routes = [
  { // 重定向
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home', // 命名路由，可以用于声明式导航传参
    components: {
      default: () => import('@/views/home/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/kind',
    name: 'kind', // 命名路由，可以用于声明式导航传参
    components: {
      default: () => import('@/views/kind/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/cart',
    name: 'cart', // 命名路由，可以用于声明式导航传参
    components: {
      default: () => import('@/views/cart/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/user',
    name: 'user', // 命名路由，可以用于声明式导航传参
    components: {
      default: () => import('@/views/user/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/login',
    name: 'login', // 命名路由，可以用于声明式导航传参
    components: {
      default: () => import('@/views/login/index.vue')
    }
  },
  {
    path: '/detail/:proid',
    name: 'detail', // 命名路由，可以用于声明式导航传参
    components: {
      default: () => import('@/views/detail/index.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
