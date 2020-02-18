<template>
	<view>
    <image :src="proimg" mode=""></image>
		<view>{{proname}}</view>
		<view>{{price}}</view>
	</view>
</template>

<script>
  import { request } from '../../utils/index.js'
	export default {
		data() {
			return {
				proname: '',
        proid: '',
        proimg: '',
        price: 0
			}
		},
    onLoad (options) {
       // console.log(options)
       const { proid } = options
       request({
         url:  `/pro/detail?proid=${proid}`
       }).then(res => {
         console.log(res.data.data)
         const { proname, proimg, price } = res.data.data
         this.proname = proname
         this.proimg = proimg
         this.price = price
         this.proid = proid
         uni.setNavigationBarTitle({
           title: proname
         })
       })
    },
		methods: {
			
		}
	}
</script>

<style>

</style>
