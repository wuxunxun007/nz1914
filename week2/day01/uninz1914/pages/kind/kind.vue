<template>
	<view>
		分类
    <uni-indexed-list :options="list"></uni-indexed-list>
	</view>
</template>

<script>
  import uniIndexedList from '@/uni/components/uni-indexed-list/uni-indexed-list.vue'
	export default {
		data() {
			return {
				list: [{
          "letter": "A",
          "data": [
            "阿克苏机场",
            "阿拉山口机场",
            "阿勒泰机场",
            "阿里昆莎机场",
            "安庆天柱山机场",
            "澳门国际机场"
          ]
          }, {
            "letter": "B",
            "data": [
              "保山机场",
              "包头机场",
              "北海福成机场",
              "北京南苑机场",
              "北京首都国际机场"
            ]
          }]
			}
		},
    components: {
      uniIndexedList
    },
		methods: {
			
		}
	}
</script>

<style>

</style>
