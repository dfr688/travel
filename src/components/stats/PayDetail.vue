<template>
  <div class="pay_detail">
		<StatsCom :statistics="statisticsByPayType" :info="marks" :num="0"/>
  </div>
</template>

<script>
	import StatsCom from '../public/StatsCom'
	
	const marks = [
			{
				src: require("../../assets/images/stats/kind_01.png"),
				title: "现金"
			},
			{
				src: require("../../assets/images/stats/kind_02.png"),
				title: "支付宝"
			},
			{
				src: require("../../assets/images/stats/kind_03.png"),
				title: "微信支付"
			},
			{
				src: require("../../assets/images/stats/kind_04.png"),
				title: "储蓄卡"
			},
			{
				src: require("../../assets/images/stats/kind_05.png"),
				title: "信用卡"
			}
	];
export default {
  name: '',
  data () {
    return {
     marks: marks
    }
  },
	components: {
		StatsCom
	},
	props: [
		"statisticsByPayType"
	]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
</style>
