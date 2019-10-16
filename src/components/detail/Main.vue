<template>
  <div class="main">
		<div class="chartShow">
			<div class="chart">
				<div id="myChart" :style="{width: '100%', height: '100%'}"></div>
			</div>
		</div>
    <div class="height_20"></div>
		<div class="detailList">
			<ul class="content">
				<li v-for="(item,index) in recordingInfo" :key="item.id">
					<div class="left">
						<img :src="options[item.type-1].src" alt=""/>
					</div>
					<div class="right">
						<div class="time">
							{{ format(item.createTime) }}
						</div>
						<div class="right_top">
							<p>{{ options[item.type-1].title }}</p><span>{{ moneyTypes[item.moneyType-1].sign }} {{ item.amount }}</span>
						</div>
						<div class="right_bottom">
							<div class="comment">
								<i v-show="!(item.remake == '')"></i>{{ item.remake }}
							</div>
							<div class="imgs">
								<ul>
									<li v-for="(photo,index) in item.recordingPhotoList" :key="photo.id">
										<img :src="photo.photoUrl" alt=""/>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
  </div>
</template>

<script>
	import Chart from '../public/Chart'

	const options = [
		{
			src: require("../../assets/images/detail/type_01.png"),
			title: "团费",
			id: 1
		},
		{
			src: require("../../assets/images/detail/type_02.png"),
			title: "住宿",
			id: 2
		},
		{
			src: require("../../assets/images/detail/type_03.png"),
			title: "门票",
			id: 3
		},
		{
			src: require("../../assets/images/detail/type_04.png"),
			title: "交通",
			id: 4
		},
		{
			src: require("../../assets/images/detail/type_05.png"),
			title: "娱乐",
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
	const moneyTypes = [
		{
			type: "CNY",
			name: "人民币",
			sign: "¥"
		},
		{
			type: "USD",
			name: "美元",
			sign: "US$"
		},
		{
			type: "EUR",
			name: "欧元",
			sign: "€"
		},
		{
			type: "RUB",
			name: "卢布",
			sign: "Rbs."
		},
		{
			type: "GBP",
			name: "英镑",
			sign: "£"
		},
		{
			type: "HUF",
			name: "匈牙利福林",
			sign: "FT."
		},
		{
			type: "PEN",
			name: "秘鲁新索尔",
			sign: "S/."
		},
		{
			type: "CAD",
			name: "加元",
			sign: "CA$"
		},
		{
			type: "JAP",
			name: "日元",
			sign: "JP¥"
		},
		{
			type: "AUD",
			name: "澳大利亚元",
			sign: "AU$"
		},
		{
			type: "NZD",
			name: "新西兰元",
			sign: "NZ$"
		},
		{
			type: "KRW",
			name: "韩元",
			sign: "W"
		}
	];
export default {
  name: 'Main',
  data () {
    return {
      options:options,
	  moneyTypes: moneyTypes,
	  percent:[]
    }
  },
  props:[
	  "recordingInfo"
  ],
  components: {
	Chart
  },
  watch:{
  	  recordingInfo:function(newVal,oldVal){
  		  for(let i=0;i<newVal.length;i++){
			if(this.percent.length<=4){
				this.percent.push({value:newVal[i].amount.toString(),name:options[newVal[i].type - 1].title})
			}
  		  }
  		  // console.log(this.percent);
  		 this.drawLine();
  	  }
  },
  methods: {
	  drawLine(){
	      // 基于准备好的dom，初始化echarts实例
	      var myChart = this.$echarts.init(document.getElementById("myChart"))
	      // 绘制图表
	      myChart.setOption({
	  	legend: {
	  		orient: 'vertical',
	  		x: 'left',
	  		// data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
	  	},
	  	series: [
	  		{
	  			name:'',
	  			type:'pie',
	  			radius: ['40%', '60%'],
	  			avoidLabelOverlap: false,
	  			label: {
	  				normal: {
	  					show: false,
	  					position: 'center'
	  				},
	  				emphasis: {
	  					show: true,
	  					textStyle: {
	  						fontSize: '30',
	  						fontWeight: 'bold'
	  					}
	  				}
	  			},
	  			labelLine: {
	  				normal: {
	  					show: false
	  				}
	  			},
	  			data:this.percent,
				itemStyle:{
					normal:{
						color: function(params) {
							// 自定义颜色
							var colorLists = ["#f8a6ff","#AFEEEE","#eb5b57","#f3d035","#4175f8"];
							return colorLists[params.dataIndex];
						}
					}
				}
	  		}
	  	]
	      });
	  }
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../../static/css/main.css';
</style>
