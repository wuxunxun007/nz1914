<template>
	<view>
		<input type="text" v-model="tel" /> 
    <text :class="tel.length !== 11 ? 'error' : 'success'">{{ teltip }}</text>
    <input type="text" v-model="password">
    <button>登陆</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel: '18813007814',
        password: '123456'
			}
		},
    computed: {
      teltip () {
        if (this.tel.length !== 11) {
          return '手机号码格式不正确'
        } else {
          return '手机号码ok'
        }
      }
    },
		methods: {
			
		}
	}
</script>

<style>
.error {
  color: red;
}
.success {
  color: #4CD964;
}
</style>
