<template>
  <div class="addcontent">
		<HeaderTop title="创建旅行" isSee="true">
			<div class="delect" slot="cut" v-show="isShow">
				<i></i>
			</div>
		</HeaderTop>
		<div class="upLoad">
			<span></span>
			<img :src="userInfo.avatar" alt="" @click="uploadHeadImg"/>
			<p>上传旅游封面照</p>
			<input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
		</div>
		<ul>
			<li>
				<input type="text" placeholder="请输入旅行名称" v-model="travelName"/>
			</li>
			<li>
				<input type="text" placeholder="请输入旅行预算" v-model="budget"/>
			</li>
		</ul>
		<SureButton text="确定" @goHome="goHome"/>
  </div>
</template>

<script>
	import HeaderTop from '../public/HeaderTop'
	import SureButton from '../public/SureButton'
	import { Toast } from 'mint-ui';
	
export default {
  name: '',
  data () {
    return {
      isShow: false,
	  userInfo: {
	   	 avatar: ""
	  	},
	  travelName: "",
	  budget: "",
	  urls: ""
    }
  },
  components: {
	  HeaderTop,
	  SureButton
    },
	methods: {
			// 打开图片上传
		    uploadHeadImg: function () {
			   this.$el.querySelector('.hiddenInput').click();
		    },
		    // 将头像显示
		    handleFile: function (e) {
				if (e.target.files.length === 0) return
				let $target = e.target || e.srcElement
				let file = $target.files[0]
				var reader = new FileReader()
				 reader.onload = (data) => {
					let res = data.target || data.srcElement
					this.userInfo.avatar = res.result
				}
			   reader.readAsDataURL(file);
			   // 把图片转换成file类型
   			   let param = new FormData();
  			   param.append('file', file);
			   //console.log(param);
			   // 发送请求
			   let token = localStorage.getItem("token");
			   this.baseJs.ajaxReq("/tourism/api/fileUpload",param,"post",token)
			   .then(res => {
				   // console.log(res);
				   this.urls = res.data;
			   })
			   .catch(err => {
				   console.log(err);
			   })
		    },
			goHome() {
				if(this.userInfo.avatar == ""){
					Toast('请上传图片！');
				}else if(this.travelName.length == 0){
					Toast('请输入旅行名称！');
				}else if(this.budget.length == 0){
					Toast('请输入旅行预算！');
				}else if(!/^\d+$/.test(this.budget)){
					Toast('请输入数字！');
				}else{
					let token = localStorage.getItem("token");
					let data = {
						name:this.travelName,
						photoUrl:this.urls,
						planPrice:this.budget
					}
					this.baseJs.ajaxReq("/tourism/api/createTourism",data,"post",token)
					.then(res => {
						// console.log(res);
						Toast(res.sms);
						this.$router.push("/home");
					})
					.catch(err => {
						console.log(err);
					});
				}
			}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../../static/css/addcontent.css';
</style>


 