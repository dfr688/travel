<template>
  <div class="type_detail">
		<StatsCom :statistics="statisticsByType" :info="options" :num="1"/>
  </div>
</template>

<script>
	import StatsCom from '../public/StatsCom'
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
	
	
export default {
  name: '',
  data () {
    return {
      options: options
    }
  },
	props:[
		"statisticsByType"
	],
	components: {
		StatsCom
	},
	created() {
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
</style>
