<template>
  <div class="stats">
		<div class="backdrop">
			<HeaderTop title="统计分析"/>
			<div class="contain">
				<p v-show="isTrue" @click="yearChoose">{{ time }}<i></i></p>
				<p v-show="!isTrue" @click="monthChoose">{{ date }}<i></i></p>
				<div class="year_month">
						<span class="year" :class="{active: isTrue}" @click="chooseYear">按年</span><span :class="{active: !isTrue}" @click="chooseMonth">按月</span>
				</div>
			</div>
		</div>
		<div class="ways">
			<ul>
				<li :class="{active:show}" @click="getType">
					类别
          <i :class="{active:show}"></i>
				</li>
				<li :class="{active:!show}" @click="getPay">
					支付方式
          <i class="diff" :class="{active:!show}"></i>
				</li>
			</ul>
		</div>
		<TypeDetail :statisticsByType="statisticsByType" v-if="show"/>
		<PayDetail :statisticsByPayType="statisticsByPayType" v-if="!show"/>
		<!-- 年份选择框 -->
		<mt-popup
		  v-model="popupVisible"
		  position="bottom">
		  <div class="frame_upper">
			  <span>选择年份</span><p @click="chooseSure">确定</p>
		  </div>
		  <mt-picker :slots="slotsYear" @change="onValuesChange"></mt-picker>
		</mt-popup>
		<!-- 月份选择框 -->
		<mt-popup
		  v-model="popVisible"
		  position="bottom">
		  <div class="frame_upper">
			  <span>选择月份</span><p @click="pushSure">确定</p>
		  </div>
		  <mt-picker :slots="slotsMonths" @change="onValuesChange1"></mt-picker>
		</mt-popup>
  </div>
</template>

<script>
	import HeaderTop from '../public/HeaderTop'
	import TypeDetail from './TypeDetail'
	import PayDetail from './PayDetail'

	let years = []
	for (var i = 2017; i <= 2050; i++) {
		 years.push(i + '年');
	}
	let months = []
	for (var i= 1; i<=12; i++){
		months.push(i + '月');
	}

export default {
  name: '',
  data () {
    return {
			show: true,
			time: "2019年",
			date: "2019年1月",
			isTrue: true,
			valueYear: "",
			years: [years],
			popupVisible: false,
			 slotsYear: [
			  {
			    values: years,
			    textAlign: 'center',
					defaultIndex: 2
			  }
			],
			valueMonth: "",
			months: [months],
			popVisible: false,
			 slotsMonths: [
        {
          flex: 1,
          values: years,
          className: 'slot1',
          textAlign: 'center',
					defaultIndex: 2
        },
				{
          flex: 1,
          values: months,
          className: 'slot3',
          textAlign: 'center'
        }
      ],
		statisticsByType: [],
		statisticsByPayType: []
    }
  },
	components: {
		HeaderTop,
		TypeDetail,
		PayDetail
	},
	methods: {
		// 切换背景颜色
		chooseYear() {
			this.isTrue = true;
		},
		chooseMonth() {
			this.isTrue = false;
		},
		// 年份选择中 点击弹出年份选择层
		yearChoose() {
			this.popupVisible = true;
		},
		// 年份选择中 选中的值改变时  获取当前选中的值
		onValuesChange(picker, values) {
			// console.log(values[0]);
			this.valueYear = values[0];
		},
		// 年份选择中 点击弹出层中的确定按钮
		chooseSure() {
			this.time = this.valueYear;
			this.popupVisible = false;
		},
		// ..................................
		// 月份选择中 点击弹出月份选择层
		monthChoose() {
			this.popVisible = true;
		},
		// 月份选择中 选中的值改变时  获取当前选中的值
		onValuesChange1(picker,values) {
			this.valueMonth = values[0] + values[1];
			// console.log(this.valueMonth)
			// console.log(values[0] + values[1]);
		},
		// 月份选择中 点击弹出层中的确定按钮
		pushSure() {
			this.date = this.valueMonth;
			this.popVisible = false;
		},
		// 封装

		getType() {
			this.show = true;
				if(this.isTrue == true){
					let yearKey = this.time.substring(0,4);
					// console.log(yearKey)
					let token = localStorage.getItem("token");
					this.baseJs.ajaxReq("/tourism/api/statisticsByType",{year:yearKey,month:0},"get",token)
						.then(res => {
							// console.log(res);
							this.statisticsByType = res.data;
							// console.log(this.statisticsByType);
						})
						.catch(err => {
							console.log(err);
						})
				}else{
					let yearKey1 = this.date.substring(0,4);
					// console.log(yearKey1)
					let key = this.date.substring(5,this.date.length-1);
					console.log(key);
					let token = localStorage.getItem("token");
					this.baseJs.ajaxReq("/tourism/api/statisticsByType",{year:yearKey1,month:key},"get",token)
						.then(res => {
							// console.log(res);
							this.statisticsByType = res.data;
							// console.log(this.statisticsByType);
						})
						.catch(err => {
							console.log(err);
						})
				}
		},
		getPay() {
			this.show = false;
			if(this.isTrue == true){
				let yearKey2 = this.time.substring(0,4);
				let token = localStorage.getItem("token");
				this.baseJs.ajaxReq("/tourism/api/statisticsByPayType",{year:yearKey2,month:0},"get",token)
				.then(res => {
					this.statisticsByPayType = res.data;
					// console.log(this.statisticsByPayType);
				})
				.catch(err => {
					console.log(err);
				})
			}else{
				let yearKey3 = this.date.substring(0,4);
				console.log(yearKey3)
				let key1 = this.date.substring(5,this.date.length-1);
				console.log(key1)
				let token = localStorage.getItem("token");
				this.baseJs.ajaxReq("/tourism/api/statisticsByPayType",{year:yearKey3,month:key1},"get",token)
				.then(res => {
					this.statisticsByPayType = res.data;
					console.log(this.statisticsByPayType);
				})
				.catch(err => {
					console.log(err);
				})
			}

		}
	},
	created() {
 		let token = localStorage.getItem("token");
 		this.baseJs.ajaxReq("/tourism/api/statisticsByType",{year:2019,month:0},"get",token)
 			.then(res => {
 				this.statisticsByType = res.data;
 				// console.log(this.statisticsByType);
 			})
 			.catch(err => {
 				console.log(err);
 			})
		// this.getType();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../../static/css/stats.css';
</style>
