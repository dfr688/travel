<template>
  <div class="login">
    <Com title="登录">
		<div class="tip">
			还没有账号，立即<router-link to="/register">注册</router-link>
		</div>
	</Com>
	<ul>
		<li>
			<input type="tel" placeholder="请输入手机号码" v-model="phone"/>
		</li>
		<li>
			<input type="password" placeholder="请输入密码" v-model="psd"/>
		</li>
	</ul>
	<SureButton text="登录" @login="login"/>
  </div>
</template>

<script>
	import Com from '../public/Com'
	import SureButton from '../public/SureButton'
	import { Toast } from 'mint-ui';

export default {
  name: '',
  data () {
    return {
      phone: "",
	  psd: ""
    }
  },
  components: {
	  Com,
	  SureButton
  },
  methods: {
	  login() {
		  if(this.phone == ""){
		  	Toast('手机号不能为空');
		  }else if(this.psd == ""){
		  	Toast('密码不能为空');
		  }else{
		  	this.baseJs.ajaxReq("/tourism/api/signIn",{phone:this.phone,password:this.psd},'post')
		  	.then(res => {
		  		// console.log(res);
		  		if(res.code != 200){
		  			Toast(res.sms);
		  		}else{
					// 缓存token
					localStorage.setItem("token",res.data);
					// 缓存手机号
					localStorage.setItem("phone",this.phone);
		  			Toast(res.sms);
		  			this.$router.push("/home");
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
 .login .tip a{
	 color: #0396ff;
 }
 .login ul{
	 margin: 0 .4rem;
	 margin-bottom: .6rem;
 }
 .login ul li{
	 font-size: .36rem;
	 padding: .6rem 0 .2rem 0;
	 border-bottom: 1px solid #eee;
 }
 .login ul li input{
	 font-size: .36rem;
	 color: #333;
 }
</style>
