<template>
	<view>
		<view v-if="flag">
      购物车空空如也，请 <navigator open-type="switchTab" url="/pages/home/home">选购</navigator>
    </view>
    <view v-else>
      <view class="cartlist">
        <view class="cartitem" v-for="(item, index) of cartlist" :key="index">
          {{ item.proname }} ￥{{ item.price }} -- {{ item.num }}
          <text @click="reduce(item)">[-]</text> 
          <text @click="add(item)">[+]</text> 
          <text @click="del(item, index)">[del]</text> 
        </view>
      </view>
    </view>
    <view> 总数：{{totalNum}}</view>
    <view> 总价：{{totalPrice}}</view>
	</view>
</template>

<script>
  import { request, toast } from '../../utils/index.js'
	export default {
		data() {
			return {
				flag: true,
        cartlist: []
			}
		},
    computed: {
      totalNum () {
        let totalNum = 0;
        this.cartlist.map(item => {
          totalNum += item.num
        })
        return totalNum
      },
      totalPrice () {
        let totalPrice = 0;
        this.cartlist.map(item => {
          totalPrice += item.num * item.price
        })
        return totalPrice
      }
    },
    onLoad () {
      console.log('onLoad')
    },
    onShow () { // 不使用 onLoad 以及 mounted 是因为页面被缓存，数据更新不及时
      console.log('onShow')
      try{
        let userid = uni.getStorageSync('userid')
        let token = uni.getStorageSync('token')
        if (userid && token) {
          request({
            url: '/cart',
            data: {
              userid, token
            }
          }).then(res => {
            if (res.data.code === '10019') {
              toast({title:'请先登录'})
              uni.navigateTo({
                url: '/pages/login/login'
              })
            } else if (res.data.code === '10012') {
              toast({title:'请先选购商品'})
              this.flag = true
            } else {
              toast({title:'购物车列表获取成功'})
              this.flag = false
              this.cartlist = res.data.data
            }
          })
        } else {
          toast({title:'请先登录'})
          uni.navigateTo({
            url: '/pages/login/login'
          })
        }
      }catch(e){
        //TODO handle the exception
      }
      
      
    },
		methods: {
			reduce (item) {
        // 如果当前的个数为1 不操作，如果大于1减1操作
        let num = item.num
        if (num > 1) {
          num -= 1
        } else {
          num = 1
        }
        let token = uni.getStorageSync('token')
        request({
          url: '/cart/update',
          data: {
            token,
            cartid: item.cartid, // item包含购物车记录id
            num
          }
        }).then(res => {
          if (res.data.code === '10019') {
            toast({title:'请先登录'})
            uni.navigateTo({
              url: '/pages/login/login'
            })
          } else {
            toast({title:'修改数量成功'})
            item.num -= 1 // 服务器返回成功之后  视图才更新
          }
        })
      },
      add (item) {
        // item.num += 1
        // 加1
        let num = item.num
        num += 1
        let token = uni.getStorageSync('token')
        request({
          url: '/cart/update',
          data: {
            token,
            cartid: item.cartid, // item包含购物车记录id
            num
          }
        }).then(res => {
          if (res.data.code === '10019') {
            toast({title:'请先登录'})
            uni.navigateTo({
              url: '/pages/login/login'
            })
          } else {
            toast({title:'修改数量成功'})
            item.num += 1 // 服务器返回成功之后  视图才更新
          }
        })
      },
      del (item,index) {
        let token = uni.getStorageSync('token')
        request({
          url: '/cart/delete',
          data: {
            token,
            cartid: item.cartid
          }
        }).then(res => {
          if (res.data.code === '10019') {
            toast({title:'请先登录'})
            uni.navigateTo({
              url: '/pages/login/login'
            })
          } else {
            toast({title:'删除数据成功'})
            this.cartlist.splice(index, 1) // 删除当前的数据
            // 如果点击删除 删完之后要显示没有数据了
            this.cartlist.length === 0 ? this.flag = true : this.flag = false
          }
        })
      }
		}
	}
</script>

<style>

</style>
