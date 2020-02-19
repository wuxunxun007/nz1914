<template>
	<view>
		<view v-if="flag">
      购物车空空如也，请 <navigator open-type="switchTab" url="/pages/home/home">选购</navigator>
    </view>
    <view v-else>
      <view class="cartlist">
        <checkbox-group @change="allselected">
          <checkbox :checked="allchecked" />全选
        </checkbox-group>
        <view class="cartitem" v-for="(item, index) of cartlist" :key="index">
          <checkbox-group @change="selected(item)">
            <checkbox :checked="item.flag" />
          </checkbox-group>
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
        cartlist: [],
        allchecked: true
			}
		},
    computed: {
      totalNum () {
        let totalNum = 0;
        this.cartlist.map(item => {
          item.flag ? totalNum += item.num : totalNum += 0
        })
        return totalNum
      },
      totalPrice () {
        let totalPrice = 0;
        this.cartlist.map(item => {
          item.flag ? totalPrice += item.num * item.price : totalPrice += 0
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
              // 赋值之前给 数据添加数据项 item.flag
              res.data.data.map( item => {
                item.flag = true
              })
              this.cartlist = res.data.data
              console.log(this.cartlist)
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
      allselected () {
        this.allchecked = !this.allchecked
        console.log(this.allchecked)
        // 如果为真，修改数据的每一项的flag的值都为真，否则都为假
        if (this.allchecked) {
          this.cartlist.map( item => {
            item.flag = true
          })
        } else {
          this.cartlist.map( item => {
            item.flag = false
          })
        }
      },
      selected (item) {
        console.log('test', item)
        item.flag = !item.flag
        console.log(this.cartlist)
        // 如果单独某一项没被选中，那么全选一定不被选中
        // 如果单独某一项被选中了，检测其他项是否都被选中，如果都选中了，全选被选中
        if(!item.flag) {
          this.allchecked = false
        } else {
          // 检测其余项是否被选中 --- 一假则假
          const test = this.cartlist.every(item => {
            return item.flag === true
          })
          
          if (test) {
            this.allchecked = true
          } else {
            this.allchecked = false
          }
        }
      },
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
