<template>
  <!-- jsx语法 - 所有的标签必须包裹在一个根标签中 -->
	<view class="container">
		<swiper :indicator-dots="true" :autoplay="true" :circular="true">
      <swiper-item v-for="(item, index) of bannerlist" :key="index">
        <image :lazy-load="true" mode="aspectFit"  :src="'http://daxun.kuboy.top' + item" ></image>
      </swiper-item>
      <!-- <swiper-item>
        <image :lazy-load="true" mode="widthFix"  src="../../static/logo.png" ></image>
      </swiper-item>
      <swiper-item>
        <image :lazy-load="true" mode="widthFix"  src="../../static/logo.png" ></image>
      </swiper-item> -->
    </swiper>
    <!-- 父组件在调用子组件的地方，添加一个自定义的属性，属性的值就是需要传递给子组件的值，
  如果属性的值是变量、boolean、number数据，需要使用绑定属性

  子组件定义的地方，添加一个props选项，props选项的值是一个数组或者对象

  1.如果是数组，数组的元素就是自定义的属性名，可以在组件中通过此自定义属性名访问数据
  2.如果是对象，有两种形式，
    2.1 key值为自定义的属性名，value值为数据类型
    2.2 key值为自定义的属性名，value为一个对象，该对象有两个选项，一个为type（数据类型），一个未default（默认值）,如果默认值是对象或者数组，需要把default写为一个函数，返回对象和数组 -->
    <prolist :prolist="prolist"/>
    <view class="tip" v-if="flag">没有更多数据了</view>
    <view class="iconfont" @click="backtop">↑</view>
	</view>
</template>

<script>
  import prolist from '../../components/prolist/prolist.vue'
  import { request } from '../../utils/index.js'
	export default {
		data() {
			return {
				bannerlist: [],
        prolist: [],
        pageCode: 1,
        flag: false // 表示有无数据的标识
			}
		},
    components: {
      prolist
    },
    mounted () {
      request({
        url: '/pro/banner'
      }).then(res => {
        console.log(res.data)
        this.bannerlist = res.data.data
      })
      request({
        url: '/pro'
      }).then(res => {
        console.log(res.data)
        this.prolist = res.data.data
      })
    },
    onPullDownRefresh () { // 下拉刷新
      console.log('下拉刷新')
      request({
        url: '/pro'
      }).then(res => {
        console.log(res.data)
        this.prolist = res.data.data
        this.pageCode = 1 // 重置页码
        this.flag = false // 有无数据标识隐藏
        // 当处理完数据刷新后，uni.stopPullDownRefresh 可以停止当前页面的下拉刷新。
        uni.stopPullDownRefresh()
      })
    },
    onReachBottom () { // 上拉加载
      request({
        url: '/pro',
        data: {
          pageCode: this.pageCode,
          limitNum: 10
        }
      }).then(res => {
        this.pageCode++
        if (res.data.code === '10000') {
          this.flag = true
        } else {
          this.prolist = [...this.prolist, ...res.data.data]
        }
      })
    },
		methods: {
			backtop () {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 200
        })
      }
		}
	}
</script>

<style>
image {
  width: 100%;
}
.iconfont {
  position: fixed;
  bottom: 60px;
  right: 10px;
  width: 40px;
  height: 40px;
  background-color: #f66;
}
</style>
