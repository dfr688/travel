<template>
  <div class="statscom">
		<ul>
			<li v-for="(item,index) in statistics" :key="index">
				<div class="left">
					<img :src="info[item.payType -1 ].src" alt="" v-if="num == '0'"/>
					<img :src="info[item.type -1 ].src" alt="" v-if="num == '1'"/>
				</div>
				<div class="right">
					<div class="right_top">
						<div class="type">
							<span v-if="num == '0'">{{ info[item.payType -1 ].title }}</span><span v-if="num == '1'">{{ info[item.type -1 ].title }}</span><span>共{{ item.totalCount }}笔</span>
						</div>
						<div class="sum_money">
							<span>¥ {{ item.totalAmount.toFixed(2) }}</span>
						</div>
					</div>
					<div class="right_bottom">
						<div class="progress_bar">
							<mt-progress :value="Math.round(precent(item.totalAmount),2)" :bar-height="6">
							 	<div slot="end" class="percent_num">{{ precent(item.totalAmount).toFixed(2) }}%</div>
							</mt-progress>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<div class="wrap">
			<Chart :statistics="statistics"/>
			<div class="cost">
				<span>总支出</span>
				<p>¥{{ total }}</p>
			</div>
		</div>
  </div>
</template>
	
<script>
	import Chart from './Chart'
	
	
	
export default {
  name: '',
  data () {
    return {
			
    }
  },
	methods: {
		
	},
  props: [
	 "statistics",
	 "info",
	 "num"
  ],
	computed: {
		total() {
			let total = 0;
			for(let i=0;i<this.statistics.length;i++){
				total = total + this.statistics[i].totalAmount
			}
			return total.toFixed(2);
		},
		precent() {
			return function(price){
				return (price / this.total) * 100;
			}
		}
	},
  components: {
	  Chart
  },
	mounted() {
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.statscom{
		position: relative;
	}
	.statscom ul{
		margin: 0 .4rem;
	}
	.statscom ul li{
		display: flex;
		padding-top: .5rem;
	}
	.statscom ul li .left{
		flex: 1;
		height: 1.32rem;
	}
	.statscom ul li .left img{
		width: .64rem;
		height: .64rem;
		margin-bottom: 0.9rem;
	}
	.statscom ul li .right{
		flex: 7;
		border-bottom: 1px solid #eee;
	}
	.statscom ul li .right .right_top{
		display: flex;
	}
	.statscom ul li .right .right_top div{
		flex: 1;
		font-size: .32rem;
	}
	.statscom ul li .right .right_top .type span{
		color: #333;
	}
	.statscom ul li .right .right_top .type span:last-child{
		color: #999;
		margin-left: .3rem;
	}
	.statscom ul li .right .right_top .sum_money{
		text-align: right;
	}
	.statscom ul li .right .right_top .sum_money span{
		color: #ea5455;
	}
	.statscom ul li .right .right_bottom .percent_num{
		font-size: .24rem;
		color: #999;
		width: 20%;
	    text-align: right;
		display: inline-block;
	}
	.statscom .wrap{
		width: 100%;
		position: absolute;
		top: -4.4rem;
		left: 50%;
		margin-left: -3.75rem;
	}
	.statscom .wrap .cost{
		color: #ea5455;
		font-size: .32rem;
		text-align: center;
		position: absolute;
		top: 1.6rem;
		left: 50%;
		margin-left: -.7rem;
		width: 1.4rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.statscom .wrap .cost p{
		font-size: .36rem;
	}
</style>
