# 1.场景
你为什么使用vue做本项目？

* 项目组5个人，4个会vue，1个会react

* 本项目开发由你们公司开发，维护是客户自己的团队维护，客户团队技术栈是vue

* 老板说，听说现在很多人都在用vue，那我们也用

......

# 2.创建项目

```
// 建议使用 cnpm,如果要使用npm，请使用淘宝镜像源
npm config set registry https://registry.npm.taobao.org

// vue-cli     ----  vue 2 脚手架 ---- webpack 3
cnpm / npm i vue-cli -g
vue init webpack myapp

// @vue/cli  ----  推荐使用 vue 3/4脚手架 ---- webpack4以上
cnpm / npm i @vue/cli -g
vue create myapp   /  vue ui


// 安装@vue/cli,但是想用vue-cli的语法，安装向下兼容插件
cnpm / npm i @vue/cli-init -g
vue init webpack myapp
```

# 3.构建项目

## 3.1 src 目录结构如下

```
src
  - api  -  封装数据请求
  - assets  - 资源文件夹
  - components - 自定义组件
  - filters - 自定义过滤器
  - lib - scss库
  - mixins - 混入
  - router - 路由 ---- 动态加载路由实现权限管理
  - store - 状态管理器 --- 管理状态 - 善于利用辅助函数
  - views - 页面
  - App.vue - 主页面 - 单文件组件（结构 + 表现 + 行为）
  - main.js 入口文件 - 可以引入国际化（i18n）、全局操作

vue.config.js --- vue项目配置文件 --- 根目录
```

## 3.2 更改主页面的页面结构
```
// App.vue
<template>
  <div class="container">
    <div class="box">
      <header class="header"></header>
      <div class="content"></div>
    </div>
    <footer class="footer">
      <ul>
        <li>
          <span class="iconfont icon-fonts-shouye"></span>
          <p>首页</p>
        </li>
        <li>
          <span class="iconfont icon-icon"></span>
          <p>分类</p>
        </li>
        <li>
          <span class="iconfont icon-gouwuche"></span>
          <p>购物车</p>
        </li>
        <li>
          <span class="iconfont icon-wode"></span>
          <p>我的</p>
        </li>
      </ul>
    </footer>
  </div>
</template>

<style lang="scss">
// 导入重置样式库的scss文件，其内部导入了别的scss文件
@import '@/lib/reset.scss';
// 如果企业有自己的scss库，使用企业自己的，没有可以选用这个
// 查看lib/classes.scss文件，内含各个函数的使用
// 1rem 100px
html, body, .container {
  @include rect(100%, 100%); // width: 100%; height: 100%;
}
.container {
  @include flexbox(); // display: flex;的兼容写法
  @include flex-direction(column); // flex-direction: column;的兼容写法
  .box {
    @include flex(); // flex: 1;的兼容写法
    @include rect(100%, auto);
    @include flexbox();
    @include flex-direction(column);
    .header {
      @include rect(100%, 0.44rem);
      @include background-color(#f66);
    }
    .content {
      @include flex();
      @include rect(100%, auto);
      @include overflow(auto); // 产生滚动条
    }
  }
  .footer {
    @include rect(100%, 0.5rem);
    @include background-color(#efefef);
    ul {
      @include rect(100%, 100%);
      @include flexbox();
      li {
        @include flex();
        // 内部元素水平垂直居中
        @include flexbox();
        @include flex-direction(column);
        @include justify-content();
        @include align-items();
        span {
          @include font-size(0.24rem);
        }
        p {
          @include font-size(0.12rem);
          @include margin(-3px 0 0 0);
        }
      }
    }
  }
}
</style>
```

## 3.3 提取各个页面

删除views下原有文件

创建 views/home/index.vue 、views/kind/index.vue、views/cart/index.vue、views/user/index.vue,以首页为例
```
<template>
  <div class="box">
    <header class="header">首页</header>
    <div class="content">首页</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

</style>

```

## 3.4 提取底部组件
components/Footer.vue
```
<template>
  <footer class="footer">
    <ul>
      <li>
        <span class="iconfont icon-fonts-shouye"></span>
        <p>首页</p>
      </li>
      <li>
        <span class="iconfont icon-icon"></span>
        <p>分类</p>
      </li>
      <li>
        <span class="iconfont icon-gouwuche"></span>
        <p>购物车</p>
      </li>
      <li>
        <span class="iconfont icon-wode"></span>
        <p>我的</p>
      </li>
    </ul>
  </footer>
</template>
```
## 3.5 APP.vue配置多视图路由  --  命名视图
```
<template>
  <div class="container">
    <router-view></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>
```

## 3.6 配置路由
```
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

```

## 3.7 点击底部切换路由
```
// components/Footer.vue

<template>
  <footer class="footer">
    <ul>
      <!-- router-link默认被渲染为a标签，使用tag标签生成需要的标签 -->
      <router-link to="/home" tag="li">
        <span class="iconfont icon-fonts-shouye"></span>
        <p>首页</p>
      </router-link>
      <router-link to="/kind" tag="li">
        <span class="iconfont icon-icon"></span>
        <p>分类</p>
      </router-link>
      <router-link to="/cart" tag="li">
        <span class="iconfont icon-gouwuche"></span>
        <p>购物车</p>
      </router-link>
      <router-link to="/user" tag="li">
        <span class="iconfont icon-wode"></span>
        <p>我的</p>
      </router-link>
    </ul>
  </footer>
</template>

<style lang="scss">
@import '@/lib/reset.scss';
.footer {
  ul {
    li {
      &.router-link-exact-active.router-link-active {
        @include text-color(#f66);
      }
    }
  }
}
</style>

```

# 4.构建首页

## 4.1 构建首页头部
首页的搜索看似输入框实则不是,点击时进入搜索页面

```
// home/index.vue
<header class="header">
  <ul>
    <li>logo</li>
    <li><span class="iconfont icon-sousuo"></span>请输入查找的产品</li>
    <li>消息</li>
  </ul>
</header>
// App.vue
.header {
  @include rect(100%, 0.44rem);
  @include background-color(#f66);
  ul {
    @include rect(100%, 100%);
    @include flexbox();
    @include color(#fff);
    li {
      @include flexbox();
      &:nth-child(1), &:nth-child(3) {
        @include rect(50px, 100%);
        @include flex-direction(column);
        @include justify-content();
        @include align-items();
      }
      &:nth-child(2) {
        @include flex();
        @include background-color(#fff);
        @include color(#666);
        @include margin(8px);
        @include padding(5px 10px);
        @include border-radius(10px);
      }
    }
  }
}
```

## 4.2 使用UI库构建页面

PC element-ui / iview / antd

touch mint-ui / vant

### 4.2.1 配置UI库
```
// 1.安装vant库
cnpm / npm i vant -S

// 2.安装按需引入插件
cnpm / npm i babel-plugin-import -D

// 3.修改babel.config.js如下，并且重新启动项目
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // +++++++++++++++++++++
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}

```
### 4.2.2 首页引入轮播图组件
```
<template>
  <div class="box">
    <header class="header">
      <ul>
        <li>logo</li>
        <li><span class="iconfont icon-sousuo"></span>请输入查找的产品</li>
        <li>消息</li>
      </ul>
    </header>
    <div class="content">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in bannerlist" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Lazyload } from 'vant'
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
export default {
  data () {
    return {
      bannerlist: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  }
}
</script>

<style lang="scss">
.van-swipe {
  max-height: 180px;
  img {
    width: 100%;
  }
}
</style>

```

# 5.封装数据请求
> cnpm / npm i axios -S
```
// api/index.js
import axios from 'axios'

// 1.通过当前的运行命令判断出当前的运行环境，切换请求地址
// 开发环境 + 测试环境 + 生产环境
const isDev = process.env.NODE_ENV === 'development'
// isDev  ---  true   ----  开发环境  ----  npm run serve
// isDev  ---- false   ----  生产环境  ----  npm run build

// 如果是开发环境，服务器可能是本地的，也可能是服务器上的
const baseUrl = isDev ? 'http://daxun.kuboy.top/api' : 'http://daxun.kuboy.top/api'

// 2.自定义axios,添加axios拦截器
const instance = axios.create({
  baseURL: baseUrl
})

// 在实例已创建后修改默认值，比如请求时需要拿到token值
// instance.defaults.headers.common['token'] = token
// 自定义超时时间
instance.defaults.timeout = 6000

// 每一次发送请求前都需要经过这里 - 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么 -- 显示loading动画,携带token信息
  const token = localStorage.getItem('token')
  config.headers.common.token = token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 每一次拿到数据都需要经过这里 - 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么 --- 关闭loading动画
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance

```

## 5.1 首页相关请求的封装
```
// api/home.js
import request from './index'

/**
 * 封装首页轮播图请求
 */
export function getBannerlist (params) {
  const { url } = params
  return request({
    url,
    method: 'GET'
  })
}

/**
 * 封装首页列表请求
 */
export function getProlist (params) {
  const { url } = params
  return request({
    url,
    method: 'GET'
  })
}


```

## 5.2 首页中请求轮播数据
```
mounted () {
  getBannerlist({ url: '/pro/banner' }).then(data => {
    console.log(data)
    // 对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。
    const arr = []
    data.data.map(item => {
      arr.push('http://daxun.kuboy.top' + item)
      return ''
    })
    this.bannerlist = arr
    console.log(this.bannerlist)
  })
}
```

## 5.3 使用UI库请求渲染列表数据
```
<template>
  <div class="box">
    <header class="header">
      <ul>
        <li>logo</li>
        <li><span class="iconfont icon-sousuo"></span>请输入查找的产品</li>
        <li>消息</li>
      </ul>
    </header>
    <div class="content">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in bannerlist" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <van-card
        v-for="item of prolist"
        :key="item.proid"
        :price="item.price"
        :desc="item.note"
        :title="item.proname"
        :thumb="item.proimg"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Lazyload, Card } from 'vant'
import { getBannerlist, getProlist } from '@/api/home'
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Card)
export default {
  data () {
    return {
      bannerlist: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      prolist: []
    }
  },
  mounted () {
    getBannerlist({ url: '/pro/banner' }).then(res => {
      console.log(res)
      // 对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。
      const arr = []
      res.data.data.map(item => {
        arr.push('http://daxun.kuboy.top' + item)
        return ''
      })
      this.bannerlist = arr
      console.log(this.bannerlist)
    })

    getProlist({ url: '/pro' }).then(res => {
      console.log(res)
      this.prolist = res.data.data
    })
  }
}
</script>

<style lang="scss">
.van-swipe {
  max-height: 180px;
  img {
    width: 100%;
  }
}
</style>

```