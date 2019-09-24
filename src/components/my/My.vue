<template>
  <div class="my">
		<div class="top_bg">
			<HeaderTop title="我"/>
		</div>
		<div class="info">
			<div>
				<img src="../../assets/images/my/head.png" alt=""/>
				<p v-show="isShow">{{ phone }}</p>
				<p v-show="!isShow" @click='goLogin("/login")'>请登录</p>
			</div>
			<ul>
				<li>
					<span>已连续记账</span>
					<p>5</p>
				</li>
				<li>
					<span>记账总天数</span>
					<p>32</p>
				</li>
				<li>
					<span>记账总笔数</span>
					<p>8</p>
				</li>
			</ul>
		</div>
		<div class="tipLists">
			<ul>
				<!-- <li class="remind">
					<router-link to="/remind">
						<div>
							<i></i><p>记账提醒</p>
						</div>
						<span>></span>
					</router-link>
				</li> -->
				<li class="feedback">
					<router-link to="/feedback">
						<div>
							<i></i><p>意见反馈</p>
						</div>
						<span><i></i></span>
					</router-link>
				</li>
				<li class="version">
					<a href="javascript:void(0);">
						<div>
							<i></i><p>版本信息</p>
						</div>
						<span>1.1.2</span>
					</a>
				</li>
				<li class="modify_psd">
					<router-link to="/modifypsd">
						<div>
							<i></i><p>修改密码</p>
						</div>
						<span><i></i></span>
					</router-link>
				</li>
			</ul>
		</div>
		<SureButton text="退出登录" @signOut="signOut"/>
  </div>
</template>

<script>
	import HeaderTop from '../public/HeaderTop'
	import SureButton from '../public/SureButton'
	
export default {
  name: '',
  data () {
    return {
      isShow: false,
	  phone: ""
    }
  },
	components: {
		HeaderTop,
		SureButton
	},
	methods: {
		goLogin(path) {
			this.$router.push(path);
		},
		// 隐藏手机中间四位
		geTel(tel) {
			return tel.substring(0, 3)+"****"+tel.substr(tel.length-4);
		},
		// 点击退出登录按钮
		signOut() {
			localStorage.removeItem("phone");
			localStorage.removeItem("token");
			this.isShow = false;
		}
	},
	created() {
		this.phone = localStorage.getItem("phone");
		if(this.phone == null){
			this.isShow = false;
		}else{
			this.phone = this.geTel(this.phone);
			this.isShow = true;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../../static/css/my.css';
</style>
