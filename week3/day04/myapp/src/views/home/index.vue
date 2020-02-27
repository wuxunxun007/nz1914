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
