<template>
  <div class="chooseType">
		<HeaderTop title="记账" isSee="true"/>
		<!-- 类别 -->
		<ul class="type">
			<li class="chooseOption">
				<div class="left">
					<img :src="defaultSrc" alt=""/><input type="text" v-model="text" readonly/>
				</div>
				<div class="right" @click=chooseMoney>
					<span>{{ currency }}</span><input type="text" placeholder="0.00" v-model="money" readonly onfocus="this.blur()"/>
				</div>
			</li>
			<li class="options">
				<ul>
					<li v-for="(option,index) in options" :key="option.id" @click="chooseOption(index)">
						<img :src="option.src" alt="">
						<p>{{ option.title }}</p>
					</li>
				</ul>
			</li>
			<li class="calendar" @click="openPicker">
				<span></span>{{ date }}
			</li>
			<li class="cashType" @click="kindChoose">
				<span></span>{{cash}}
			</li>
			<li class="remarks">
				<span></span><input type="text" placeholder="备注" v-model="remark"/>
			</li>
			<li class="uploadPhoto">
				<span></span><div><Upload @getArr="getArr"/></div>
			</li>
		</ul>
		<SureButton text="保存" @clickKeep="clickKeep"/>
		<!-- 支付方式弹框 -->
		<mt-popup
			v-model="popupVisible"
			position="bottom">
			<div>
				<p>选择支付方式</p>
				<ul>
					<li v-for="(payType,index) in payTypes" :key="index" @click="chooseOne(index)">
						{{ payType }}
					</li>
				</ul>
			</div>
		</mt-popup>
		<!-- 日历选择 -->
		<mt-datetime-picker
			v-model="pickerVisible"
			ref="picker"
			type="date"
			year-format="{value} "
			month-format="{value} "
			date-format="{value} "
			@confirm="handleConfirm">
		</mt-datetime-picker>
		<Calculator @getData="getData" @getSign="getSign" @getIndex="getIndex" @goHide="goHide" v-show="isTrue"/>
  </div>
</template>

<script>
	import HeaderTop from '../public/HeaderTop'
	import SureButton from '../public/SureButton'
	import Upload from '../public/Upload'
	import Calculator from '../public/Calculator'
	import { Toast } from 'mint-ui';
	
	const options = [
		{
			src: require("../../assets/images/detail/type_01.png"),
			title: "旅行团费",
			id: 1
		},
		{
			src: require("../../assets/images/detail/type_02.png"),
			title: "住宿",
			id: 2
		},
		{
			src: require("../../assets/images/detail/type_03.png"),
			title: "景点门票",
			id: 3
		},
		{
			src: require("../../assets/images/detail/type_04.png"),
			title: "交通",
			id: 4
		},
		{
			src: require("../../assets/images/detail/type_05.png"),
			title: "休闲娱乐",
			id: 5
		},
		{
			src: require("../../assets/images/detail/type_06.png"),
			title: "购物",
			id: 6
		},
		{
			src: require("../../assets/images/detail/type_07.png"),
			title: "餐饮",
			id: 7
		},
		{
			src: require("../../assets/images/detail/type_08.png"),
			title: "纪念品",
			id: 8
		},
		{
			src: require("../../assets/images/detail/type_09.png"),
			title: "其他",
			id: 9
		}
	];
	
	const payTypes = ["现金","支付宝","微信支付","储蓄卡","信用卡"];
	
export default {
  name: 'ChooseType',
  data () {
    return {
    text: "类别",
	currency: "¥",
	defaultSrc: require("../../assets/images/detail/type.png"),
	options: options,
	cash: "现金",
	popupVisible: false,
	payTypes: payTypes,
	date: "",
	pickerVisible: "",
	money: '',
	isTrue: false,
	typeIndex: "" ,
	payIndex: 1,
	moneyIndex: 1,
	remark: "",
	travelId: "",
	urls: ""
    }
  },
	components: {
		HeaderTop,
		SureButton,
		Upload,
		Calculator
	},
	methods: {
		// 类别选择
		chooseOption(index) {
			this.text = this.options[index].title;
			this.defaultSrc = this.options[index].src;
			this.typeIndex = index + 1;
		},
		/*滑动限制*/
		stop(){
		  var mo=function(e){e.preventDefault();};
		  document.body.style.overflow='hidden';
		  document.addEventListener("touchmove",mo,false);//禁止页面滑动
		},
		/*取消滑动限制*/
		move(){
		  var mo=function(e){e.preventDefault();};
		  document.body.style.overflow='';//出现滚动条
		  document.removeEventListener("touchmove",mo,false);
		},
		kindChoose() {
			this.popupVisible = true;
			this.stop();
		},
		// 选择支付方式
		chooseOne(index) {
			this.cash = payTypes[index];
			this.popupVisible = false;
			this.move();
			this.payIndex = index + 1;
		},
		// 出现键盘
		chooseMoney() {
			this.isTrue = !this.isTrue;
		},
		// 当点击键盘中的确定按钮时 隐藏键盘
		goHide(val) {
			this.isTrue = val;
		},
		// 填写金额
		getData(val) {
			this.money = val;
		},
		// 货币类型
		getSign(val) {
			this.currency = val;
		},
		// 获取货币index
		getIndex(index) {
			this.moneyIndex = index + 1;
		},
		// 获取图片url
		getArr(arr) {
			this.urls = arr;
		},
		// 打开时间选择器
		openPicker() {
			this.$refs.picker.open();
			this.pickerVisible = new Date();
		},
		// 点击日期选择器中的确定按钮 获取当前选择的值
		handleConfirm() {
			this.date = this.formatDate(this.pickerVisible);
			// console.log(this.date);
		},
		clickKeep() {
			if(this.text == "类别"){
				Toast('请选择分类！');
			}else if(this.money == ""){
				Toast('请输入金额！');
			}else{
				// 发送请求
				let token = localStorage.getItem("token");
				let data = {
					type: this.typeIndex,
					recordingTime: this.date +" "+"00:00:00",
					payType: this.payIndex,
					remake: this.remark,
					tourismInfoId: this.travelId,
					amount: this.money,
					moneyType: this.moneyIndex,
					recordingPhotoList: [
					]
				};
				
				for(let i=0;i<this.urls.length;i++){
					data.recordingPhotoList.push({"photoUrl":this.urls[i]});
				};
				// console.log(data);
				
				this.baseJs.ajaxReq("/tourism/api/createRecordingInfo",data,"post",token)
				.then(res => {
					// console.log(res);
					if(res.code == 200){
						this.$router.push({name:"detail",params:{id:this.travelId}});
					}
				})
				.catch(err => {
					console.log(err);
				})
			}
		}
	},
	created() {
		// console.log(this.dateTime());
		this.travelId = this.$route.params.id;
		this.date = this.dateTime();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../../static/css/choosetype.css';
</style>
