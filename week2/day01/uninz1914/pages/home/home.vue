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
	</view>
</template>

<script>
  import { request } from '../../utils/index.js'
	export default {
		data() {
			return {
				bannerlist: []
			}
		},
    mounted () {
      request({
        url: '/pro/banner'
      }).then(res => {
        console.log(res.data)
        this.bannerlist = res.data.data
      })
    },
		methods: {
			
		}
	}
</script>

<style>
image {
  width: 100%;
}
</style>
