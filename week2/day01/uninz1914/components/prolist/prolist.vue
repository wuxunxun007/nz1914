<template>
	<view class="prolist">
		<!-- <view class="proitem" v-for="(item, index) of prolist" :key="index">
		  <view class="itemimg">
		    <image :src="item.proimg" mode=""></image>
		  </view>
      <view class="iteminfo">
        <view class="title">{{ item.proname }}</view>
      </view>
		</view> -->
    <!-- 声明式跳转 -->
   <!-- <navigator :url="'/pages/detail/detail?proid=' + item.proid" class="proitem" v-for="(item, index) of prolist" :key="index">
      <view class="itemimg">
        <image :src="item.proimg" mode=""></image>
      </view>
      <view class="iteminfo">
        <view class="title">{{ item.proname }}</view>
      </view>
    </navigator> -->
    <!-- 编程式跳转 -->
    <view @click="toDetail(item.proid)" class="proitem" v-for="(item, index) of prolist" :key="index">
      <view class="itemimg">
        <image :src="item.proimg" mode=""></image>
      </view>
      <view class="iteminfo">
        <view class="title">{{ item.proname }}</view>
      </view>
    </view>
	</view>
</template>

<script>
  /*
    子组件定义的地方，添加一个props选项，props选项的值是一个数组或者对象
    
    1.如果是数组，数组的元素就是自定义的属性名，可以在组件中通过此自定义属性名访问数据
    2.如果是对象，有两种形式，
      2.1 key值为自定义的属性名，value值为数据类型
      2.2 key值为自定义的属性名，value为一个对象，该对象有两个选项，一个为type（数据类型），一个未default（默认值）,如果默认值是对象或者数组，需要把default写为一个函数，返回对象和数组
  */
	export default {
    // props: ['prolist'],
    props: {
      // prolist: Array
      prolist: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
		data() {
			return {
				
			};
		},
    methods: {
      toDetail (proid) {
        uni.navigateTo({
          url: '/pages/detail/detail?proid=' + proid
        })
      }
    }
	}
</script>

<style>

.prolist .proitem {
  width: 100%;
  height: 100px;
  display: flex;
  box-sizing: border-box;
  border-bottom: 1upx solid #ccc;
}
/* gulp */
.prolist .proitem .itemimg {
  width: 100px;
  height: 100px;
}
.prolist .proitem .itemimg image{
  width: 90px;
  height: 90px;
  box-sizing: border-box;
  /* 如果是网页开发，需要写一个物理像素 ---- scss库  ---- 1px边框 */
  border: 1upx solid #ccc;
  margin: 5px;
}

.prolist .proitem .iteminfo {
  flex: 1;
  padding: 3px 5px;
}
</style>
