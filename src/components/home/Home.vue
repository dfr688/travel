<template>
  <div class="home">
		<Common :totalPrice="totalPrice" :totalCount="totalCount" @getYear="getYear"></Common>
		<Default v-if="isTrue"/>
		<Content :listTourisms="listTourisms" v-if="!isTrue"/>
		<Add @goAddcontent="goAddcontent"/>
  </div>
</template>

<script>
	import Common from './Common'
	import Default from '../public/Default'
	import Add from '../public/Add'
	import Content from './Content'
	import { Toast } from 'mint-ui';
	let listTourisms =[];
export default {
  name: '',
  data () {
    return {
      isTrue: false,
	  listTourisms:listTourisms,
	  totalPrice: "",
	  totalCount: "",
	  year: ""
    }
  },
	components: {
		Common,
		Default,
		Add,
		Content
	},
	methods: {
		goAddcontent() {
			this.$router.push("/addcontent");
		},
		// 点击年份发送请求
		getYear(val) {
			this.year = val;
			if(this.year == "所有年份"){
				this.year = 0;
			}
			let token = localStorage.getItem("token");
			// console.log(token);
			this.baseJs.ajaxReq("/tourism/api/listTourism",{year:this.year},"get",token)
			.then(res => {
				console.log(res);
				if(res.code != 200){
					Toast('请重新登录！');
				}else{
					if(res.data.tourismInfoList.length == 0){
						this.isTrue = true;
						this.totalPrice = res.data.totalAmount.toFixed(2);
						this.totalCount = res.data.totalCount;
					}else{
						this.isTrue = false;
						this.listTourisms = res.data.tourismInfoList;
						this.totalPrice = res.data.totalAmount.toFixed(2);
						this.totalCount = res.data.totalCount;
						// console.log(this.listTourisms);
					}
				}
			})
			.catch(err => {
				console.log(err);
			});
		}
	},
	created() {
		let token = localStorage.getItem("token");
		// console.log(token);
		this.baseJs.ajaxReq("/tourism/api/listTourism",{year:"0"},"get",token)
		.then(res => {
			// console.log(res);
			if(res.code != 200){
				Toast('请重新登录！');
			}else{
				if(res.data.tourismInfoList.length == 0){
					this.isTrue = true;
				}else{
					this.isTrue = false;
 					this.listTourisms = res.data.tourismInfoList;
					this.totalPrice = res.data.totalAmount.toFixed(2);
					this.totalCount = res.data.totalCount;
					// console.log(this.listTourisms);
				}
			}
		})
		.catch(err => {
			console.log(err);
		});
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
