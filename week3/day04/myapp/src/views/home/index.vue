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
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!-- <router-link :to="{ name: 'detail', params: { proid: item.proid } }" v-for="item of prolist" :key="item.proid">
            <van-card
              :price="item.price"
              :desc="item.note"
              :title="item.proname"
              :thumb="item.proimg"
            />
          </router-link> -->
          <!-- <router-link :to="'/detail/' + item.proid" v-for="item of prolist" :key="item.proid">
            <van-card
              :price="item.price"
              :desc="item.note"
              :title="item.proname"
              :thumb="item.proimg"
            />
          </router-link> -->
          <van-card
            v-for="item of prolist"
            :key="item.proid"
            :price="item.price"
            :desc="item.note"
            :title="item.proname"
            :thumb="item.proimg"
            @click="toDetail(item.proid)"
          />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Lazyload, Card, PullRefresh, List } from 'vant'
import { getBannerlist, getProlist } from '@/api/home'
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Card)
Vue.use(PullRefresh)
Vue.use(List)
export default {
  data () {
    return {
      bannerlist: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      prolist: [],
      isLoading: false, // true表示现在正在下拉刷新状态中
      pageCode: 1,
      finished: false, // true标识没有更多数据了
      loading: false // true表示正在上拉加载下一页数据
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
  },
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
    },
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
    },
    toDetail (proid) {
      console.log(proid)
      // this.$router.push('/detail/' + proid)
      // this.$router.push({ name: 'detail', params: { proid } })
      this.$router.push({ path: '/detail/' + proid })
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
