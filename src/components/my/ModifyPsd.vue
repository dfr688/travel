<template>
  <div class="modify_psd">
		<HeaderTop title="修改密码" isSee="true"/>
		<ul>
			<li>
				<input type="password" placeholder="请输入原密码" v-model="oldPsd"/>
			</li>
			<li>
				<input type="password" placeholder="请输入新密码" v-model="newPsd"/>
			</li>
		</ul>
		<SureButton text="确定" @modifyPsd="modifyPsd"/>
  </div>
</template>

<script>
	import HeaderTop from '../public/HeaderTop'
	import SureButton from '../public/SureButton'
	import { Toast } from 'mint-ui'
	
export default {
  name: '',
  data () {
    return {
		oldPsd: '',
		newPsd: ''
    }
  },
	components: {
		HeaderTop,
		SureButton
	},
	methods: {
		modifyPsd() {
			if(this.oldPsd == ""){
				Toast('请输入原密码');
			}else if(this.newPsd ==""){
				Toast('请输入新密码');
			}else{
				let token = localStorage.getItem("token");
				this.baseJs.ajaxReq("/tourism/api/resetPassword",{oldPassword:this.oldPsd,newPassword:this.newPsd},"post",token)
				.then(res => {
					// console.log(res)
					if(res.code != 200){
						Toast(res.sms);
					}else{
						Toast(res.sms);
						this.$router.push("/my");
					}
				})
				.catch(err => {
					console.log(err);
				})
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.modify_psd ul{
		margin: 0 .4rem;
		margin-bottom: 1rem;
	}
	.modify_psd ul li{
		font-size: .32rem;
		padding: .4rem 0;
		border-bottom: 1px solid #eee;
	}
	.modify_psd ul li input{
		font-size: .32rem;
		color: #333;
	}
</style>
