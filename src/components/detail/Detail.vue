<template>
  <div class="detail">
		<div class="setting">
			<HeaderTop :title="tit">
				<div class="setUp" slot="set">
					<i></i>
				</div>
			</HeaderTop>
			<div class="money">
				<div class="expend">
					<span>支出（元)</span>
					<p>{{ totalAmount }}</p>
				</div>
				<div class="budget">
					<div>
						预算金额（元)：<span>{{ planPrice }}</span>
					</div>
					<div>
						预算结余（元)：<span>{{ totalExpenses }}</span>
					</div>
				</div>
			</div>
		</div>
		<Default v-show="isShow"/>
		<Main v-show="!isShow" :recordingInfo="recordingInfoList"/>
		<Add @goChoosetype="goChoosetype"/>
  </div>
</template>

<script>
	import HeaderTop from '../public/HeaderTop'
	import Default from '../public/Default'
	import Add from '../public/Add'
	import Main from './Main'
	
export default {
  name: '',
  data () {
    return {
      tit: "",
	  planPrice: "",
	  isShow: false,
	  tourismId: "",
	  recordingInfoList: "",
	  totalExpenses: "",
	  totalAmount: ""
    }
  },
	components: {
		HeaderTop,
		Default,
		Add,
		Main
	},
	methods: {
		goChoosetype() {
			this.$router.push({name:"choosetype",params:{id:this.tourismId}});
		}
	},
	created() {
		this.tourismId = this.$route.params.id
		let token = localStorage.getItem("token");
		this.baseJs.ajaxReq("/tourism/api/tourismDetail",{tourismId:this.tourismId},"get",token)
		.then(res => {
			// console.log(res);
			this.tit = res.data.name;
			this.planPrice = res.data.planPrice;
			if(res.code == 200){
				if(res.data.recordingInfoList == 0){
					this.isShow = true;
				}else{
				this.isShow = false;
				this.recordingInfoList = res.data.recordingInfoList;
				this.totalExpenses = res.data.totalExpenses.toFixed(2);
				this.totalAmount = res.data.totalAmount.toFixed(2);
				// console.log(this.recordingInfoList);
				}
			}
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../../static/css/detail.css';
</style>
