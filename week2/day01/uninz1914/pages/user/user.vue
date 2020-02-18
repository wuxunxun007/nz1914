<template>
	<view>
		<view class="takephoto" @click="takephoto">拍照</view>
    <image v-for="(item, index) of list" :src="item" :key="index"></image>
    <navigator url="/pages/login/login">登陆</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			takephoto () {
        uni.chooseImage({
          count: 6, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
              console.log(JSON.stringify(res.tempFilePaths));
              this.list = res.tempFilePaths
          }
        });
      }
		}
	}
</script>

<style>

</style>
