<template>
  <div class="chart">
	<div id="myChart" :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>

<script>
export default {
  name: 'chart',
  data () {
    return {
       percent: []
    }
  },
  props:[
	  "statistics"
  ],
  watch:{
	  statistics:function(newVal,oldVal){
		  for(let i=0;i<newVal.length;i++){
		  	this.percent.push({value:newVal[i].totalAmount.toString()}) 
		  }
		  // console.log(this.percent);
		 this.drawLine()
	  },
	   
  },
methods: {
	drawLine(){
	    // 基于准备好的dom，初始化echarts实例
	    var myChart = this.$echarts.init(document.getElementById("myChart"))
	    // 绘制图表
	    myChart.setOption({
		legend: {
			orient: 'vertical',
			x: 'right',
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
							var colorLists = ["#eb5b57","#f5af36","#f3d035","#87CEEB","#AFEEEE"];
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
	.chart{
		height: 4.2rem;
		width: 80%;
		margin: 0 auto;
	}
</style>
