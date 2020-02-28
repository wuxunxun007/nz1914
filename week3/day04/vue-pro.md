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

> **如果一旦报错信息如下：Node Sass could not find a binding for your current environment,即刻执行 cnpm i node-sass -S 即可**

# 6.实现首页的下拉刷新以及上拉加载

```
import { Swipe, SwipeItem, Lazyload, Card, PullRefresh } from 'vant'
Vue.use(PullRefresh)

<van-pull-refresh v-model="isLoading" @refresh="onRefresh"></van-pull-refresh>包裹content区域中所有代码（如果只需要列表下拉刷新，只包裹列表即可）

实现初始化数据 以及实现的刷新函数
data () {
  return {
    isLoading: false, // true表示现在正在下拉刷新状态中
    pageCode: 1,
    finished: false // true标识没有更多数据了
  }
},
methods: {
  onRefresh () {
    console.log('下拉刷新')
  }
}
```

## 6.1 实现下拉刷新函数
**实质就是请求第一页的数据并且一定要记住重置页码**

* 将isLoading的值设置为true,表示正在加载

* 请求数据

* 请求成功将isLoading的值设置为false并且将页码重置，还要将数据标识finished重新初始化为false,表示刷新已完成

```
methods: {
  onRefresh () {
    console.log('下拉刷新')
    this.isLoading = true
    getProlist({ url: '/pro' }).then(res => {
      this.isLoading = false
      this.prolist = res.data.data
      this.pageCode = 1
      this.finished = false // 表示可以继续上拉finished显示没有数据了
    })
  }
}
```

## 6.2 上拉加载的实现
```
import { Swipe, SwipeItem, Lazyload, Card, PullRefresh, List } from 'vant'
Vue.use(List)

<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"></van-list>包裹列表组件

实现初始化数据以及上拉加载事件
data () {
  return {
    finished: false, // true标识没有更多数据了
    loading: false // true表示正在上拉加载下一页数据
  }
},
methods: {
  onLoad () {
    console.log('上拉加载')
  }
}
```

**实质就是请求下一页的数据并且一定要记住页码加一**

* 将loading的值设置为true,表示正在加载

* 请求数据,判断还有没有数据，如果没有数据，将finished的值设置为true，如果有数据，拼接数组，赋值给prolist

* loading的值设置为false

--重新封装列表数据请求--
```
// api/home.js
export function getProlist (params) {
  const { url, data } = params
  // return request({
  //   url,
  //   data:
  //   method: 'GET'
  // })
  return request.get(url, {
    params: data || {}
  })
}
```

上拉加载函数实现
```
onLoad () {
  console.log('上拉加载')
  this.loading = true
  getProlist({
    url: 'pro',
    data: {
      pageCode: this.pageCode
    }
  }).then(res => {
    this.loading = false
    this.pageCode++
    if (res.data.code === '10000') {
      this.finished = true
    } else {
      this.prolist = [...this.prolist, ...res.data.data]
    }
  })
}
```

# 7.点击列表进入产品的详情

## 7.1 构建详情页面
```
<template>
  <div class="container detail">
    <div class="box">
      <header class="header">详情</header>
      <div class="content">详情</div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import Vue from 'vue'
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant'

Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
export default {

}
</script>

<style lang="scss">

</style>

```

## 7.2 配置路由
```
{
  path: '/detail/:proid',
  name: 'detail', // 命名路由，可以用于声明式导航传参
  components: {
    default: () => import('@/views/detail/index.vue')
  }
}
```

## 7.3 声明式导航跳转
```
// 方法一
<router-link :to="{ name: 'detail', params: { proid: item.proid } }" v-for="item of prolist" :key="item.proid">
  <van-card
    :price="item.price"
    :desc="item.note"
    :title="item.proname"
    :thumb="item.proimg"
  />
</router-link>

// 方法二
<router-link :to="'/detail/' + item.proid" v-for="item of prolist" :key="item.proid">
  <van-card
    :price="item.price"
    :desc="item.note"
    :title="item.proname"
    :thumb="item.proimg"
  />
</router-link>
```

## 7.4 编程式跳转
```
<van-card
  v-for="item of prolist"
  :key="item.proid"
  :price="item.price"
  :desc="item.note"
  :title="item.proname"
  :thumb="item.proimg"
  @click="toDetail(item.proid)"
/>

toDetail (proid) {
  console.log(proid)
  // this.$router.push('/detail/' + proid)
  // this.$router.push({ name: 'detail', params: { proid } })
  this.$router.push({ path: '/detail/' + proid })
}
```

## 7.5 详情页面获取参数请求数据渲染数据

* 封装请求详情的接口
```
// api/detail.js
import request from './index'

/**
 * 获取产品的详情
 */
export function getDetailData (params) {
  const { url, data } = params
  return request.get(url, {
    params: data || {}
  })
}

```
* 详情获取数据并且渲染
```
<div class="box">
  <header class="header">详情</header>
  <div class="content">
    <img :src="proimg" alt="">
    <h1>{{ proname }}</h1>
    <h6>{{ note }}</h6>
    <p>{{ price }}</p>
  </div>
</div>
import { getDetailData } from '@/api/detail'
data () {
  return {
    proname: '',
    proimg: '',
    proid: '',
    price: '',
    note: ''
  }
},
mounted () {
  const { $route: { params: { proid } } } = this
  getDetailData({
    url: '/pro/detail',
    data: {
      proid
    }
  }).then(res => {
    console.log(res)
    const { proname, proimg, price, note } = res.data.data
    this.proname = proname
    this.proid = proid
    this.price = price
    this.proimg = proimg
    this.note = note
  })
}
```

# 8、接入客服系统
https://www.meiqia.com/

# 9.登录外加状态管理器

## 9.1 登陆页面外加路由
```
<div class="box">
  <header class="header">登陆</header>
  <div class="content">
    登陆
  </div>
</div>

{
  path: '/login',
  name: 'login', // 命名路由，可以用于声明式导航传参
  components: {
    default: () => import('@/views/login/index.vue')
  }
},
```
## 9.2 设计登陆表单
```
<template>
  <div class="box">
    <header class="header">登陆</header>
    <div class="content">
      <van-form validate-first @submit="onSubmit" @failed="onFailed">
        <van-field clearable v-model="tel" name="tel" label="手机号" :rules="telRules" />
        <van-field clearable  type="password" v-model="password" name="password" label="密码" :rules="passwordRules" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            登陆
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Form, Field, Button } from 'vant'

Vue.use(Field)
Vue.use(Button)
Vue.use(Form)
export default {
  data () {
    this.telRules = [
      { required: true, message: '请输入手机号' },
      { validator: this.telValidator, message: '手机号格式错误' }
    ]
    this.passwordRules = [
      { required: true, message: '请输入验证码' },
      { validator: this.passwordValidator, message: '密码格式错误' }
    ]
    return {
      password: '',
      tel: ''
    }
  },
  methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过
    telValidator (val) {
      return /1\d{10}/.test(val)
    },
    passwordValidator (val) {
      return val.length >= 6
    },
    onSubmit (values) {
      console.log('values', values)
    },
    onFailed (errorInfo) {
      console.log(errorInfo)
    }
  }
}
</script>
```

## 9.3 设计相应的接口完成登陆
```
// api/user.js
import request from './index'

/**
 * 登陆操作
 */
export function login (params) {
  const { url, data } = params
  return request.post(url, data)
}


onSubmit (values) {
  console.log('values', values)
  login({
    url: '/users/login',
    data: values
  }).then(res => {
    if (res.data.code === '10007') {
      Toast('密码错误')
    } else if (res.data.code === '10006') {
      Toast('该用户未注册')
    } else {
      Toast('登陆成功')
      // 保存相关信息至本地 userid token
      // 保存登陆状态至状态管理器
      // data: { token: '', userid: '', username: ''}
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('userid', res.data.data.userid)
    }
  })
},
```

## 9.4 设计状态管理器
```
// store/login.js
export default {
  namespaced: true,
  state: {
    // 登陆状态  --- 避免重新刷新页面时 状态丢失
    loginstate: localStorage.getItem('loginstate') || 'no'
  },
  actions: {},
  mutations: {
    changeLoginState (state, data) {
      state.loginstate = data
    }
  }
}

// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import login from './md/login'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login
  }
})

```

## 9.5 登陆成功后修该状态管理器状态
```
import { mapMutations } from 'vuex'

methods: {
  ...mapMutations({
    changeLoginState: 'login/changeLoginState'
  }),
  onSubmit (values) {
    ...
    Toast('登陆成功')
    // 保存相关信息至本地 userid token
    // 保存登陆状态至状态管理器
    // data: { token: '', userid: '', username: ''}
    localStorage.setItem('token', res.data.data.token)
    localStorage.setItem('userid', res.data.data.userid)
    localStorage.setItem('loginstate', 'ok')
    // 同时将状态管理器中的登陆状态修改 ++++++++++++++++++++++++++++++
    this.changeLoginState('ok')
    this.$router.back()
  }
}
```

## 9.6 加入购物车时验证登陆状态
```
import { mapState } from 'vuex'

computed: {
  ...mapState({
    loginstate: state => state.login.loginstate
  })
},

methods: {
  addCart () {
    if (this.loginstate === 'ok') {
      
    } else {
      Toast('还未登陆')
      this.$router.push('/login')
    }
  }
}
```

* 加入购物车
```
// api/cart.js
import request from './index'

/**
 * 加入购物车
 */
export function addCart (params) {
  const { url, data } = params
  return request.post(url, data)
}

import { addCart } from '@/api/cart'


addCart () {
  if (this.loginstate === 'ok') {
    addCart({
      url: '/cart/add',
      data: {
        userid: localStorage.getItem('userid'),
        proid: this.proid,
        num: 1
      }
    }).then(res => {
      if (res.data.code === '10119') {
        Toast('还未登陆')
        this.$router.push('/login')
      } else {
        Toast('加入购物车成功')
      }
    })
  } else {
    Toast('还未登陆')
    this.$router.push('/login')
  }
}
```

* 详情查看购物车
```
tocart () {
  if (this.loginstate === 'ok') {
    this.$router.push('/cart')
  } else {
    Toast('还未登陆')
    this.$router.push('/login')
  }
}
```

## 9.7 如果点击选项卡进入购物车页面

* 可以使用组件内导航守卫
```
<template>
  <div class="box">
    <header class="header">购物车</header>
    <div class="content">购物车</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      loginstate: state => state.login.loginstate
    })
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // if (this.loginstate === 'ok') {
    //   next()
    // } else {
    //   this.$router.push('/login')
    // }
    next(vm => {
      if (vm.loginstate === 'ok') {
        next()
      } else {
        vm.$router.push('/login')
      }
    })
  }
}
</script>
```

* 购物车查看数据
参照uniapp的业务逻辑