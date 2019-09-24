<template>
  <div class="feedback">
		<HeaderTop title="意见反馈" isSee="true"/>
		<div class="type">
			<p>反馈类型</p>
			<div>
				<input type="radio" name="king" id="consult" checked/><label for="consult">咨询</label>
				<input type="radio" name="king" id="suggest"/><label for="suggest">建议</label>
				<input type="radio" name="king" id="other"/><label for="other">其他</label>
			</div>
		</div>
		<div class="suggest">
			<p>意见反馈</p>
			<div>
				<textarea name="" id="" placeholder="详细叙述你的建议，我们将不断改善" v-model="sug"></textarea>
			</div>
		</div>
		<div class="contact">
			<p>联系方式</p>
			<div>
				<input type="text" placeholder="请输入手机号或邮箱，以便我们给你反馈">
			</div>
		</div>
		<SureButton text="确定" @feedbookPage="feedbookPage"/>
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
     sug: ""
    }
  },
  components: {
	  HeaderTop,
		SureButton
  },
  methods: {
		feedbookPage() {
			if(this.sug ==""){
				Toast('请完善反馈信息！');
			}else{
				Toast('感谢您的反馈！');
				this.$router.push("/my");
			}
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../../static/css/feedback.css';
</style>
