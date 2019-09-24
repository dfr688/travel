<template>
  <div class="register">
		<Com title="注册">
			<div>
				欢迎您注册旅行记账！
			</div>
		</Com>
		<ul>
			<li>
				<input type="text" placeholder="请输入手机号码" v-model="phone"/>
			</li>
			<li class="code">
				<input type="text" placeholder="请输入短信验证码" v-model="code"/>
				<div>
					<Vcode :phone="phone"/>
				</div>
			</li>
			<li>
				<input type="password" placeholder="请输入密码" v-model="psd"/>
			</li>
		</ul>
		<SureButton text="注册" @register="register"/>
		<div class="privacy">
			注册代表已同意<router-link to="/privacy">《用户服务协议》</router-link>
		</div>
  </div>
</template>

<script>
	import Com from '../public/Com'
	import Vcode from '../public/Vcode'
	import SureButton from '../public/SureButton'
	import { Toast } from 'mint-ui';
	
	
export default {
  name: '',
  data () {
    return {
      phone: "",
	  code: "",
	  psd: ""
    }
  },
	components: {
		Com,
		Vcode,
		SureButton
	},
	methods: {
		register() {
			if(this.phone == ""){
				Toast('手机号不能为空');
			}else if(this.code == ""){
				Toast('验证码不能为空');
			}else if(this.psd == ""){
				Toast('密码不能为空');
			}else if(!/^[0-9]{6,18}$/.test(this.psd)){
				Toast('请输入6到18位数字！');
			}else{
				this.baseJs.ajaxReq("/tourism/api/signUp",{phone:this.phone,smsCode:this.code,password:this.psd},'post')
				.then(res => {
					// console.log(res);
					if(res.code != 200){
						Toast(res.sms);
					}else{
						Toast(res.sms);
						this.$router.push("/login");
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
	.register ul{
		margin: 0 .4rem;
		margin-bottom: .6rem;
	}
	.register ul li{
		font-size: .36rem;
		padding: .6rem 0 .2rem 0;
		border-bottom: 1px solid #eee;
	}
	.register ul li input{
		font-size: .36rem;
		color: #333;
	}
	.register ul .code{
		display: flex;
	}
	.register .privacy{
		text-align: center;
		font-size: .26rem;
		color: #999;
		margin-top: .2rem;
	}
	.register .privacy a{
		color: #ea5656;
	}
</style>
