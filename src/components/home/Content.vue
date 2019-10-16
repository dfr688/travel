<template>
  <div class="content">
		<ul>
			<li v-for="(listTourism,index) in listTourisms" :key="listTourism.id">
				<router-link :to="{name:'detail',params:{id:listTourism.id}}">
          <div class="headInfo">
            <div class="left">
              <span>{{ listTourisms.length - index }}</span>
              <div>
              	<p>{{ listTourism.name }}</p>
              	<span>{{ format(listTourism.createTime) }}</span>
              </div>
            </div>
            <div class="right">
              <p class="all_money">¥{{ listTourism.totalAmount.toFixed(2) }}</p>
            </div>
          </div>
          <div class="text">
            <div class="left">
              <img :src="listTourism.photoUrl" alt=""/>
            </div>
            <div class="right">
              <ul>
              	<li v-for="(item,index) in listTourism.recordingInfoList">
              		<div class="sign">
              			<img :src="options[item.type - 1].src" alt=""/>
              		</div>
              		<div class="detail">
              			<span>{{ options[item.type - 1].title }}</span>
              			<p>{{ moneyTypes[item.moneyType-1].sign }}{{ item.amount }}</p>
              		</div>
              	</li>
              </ul>
            </div>
          </div>
				</router-link>
			</li>
		</ul>
  </div>
</template>

<script>
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
  name: '',
  data () {
    return {
	  options: options,
	  moneyTypes: moneyTypes
    }
  },
	components: {

	},
	props:[
		"listTourisms"
	],
	methods: {

	},
	computed: {
		allPrice() {
			return function(index) {
				let list = this.listTourisms[index].recordingInfoList;
				let money = 0;
				for(let i=0;i<list.length;i++){
					money = money + list[i].amount;
				}
				return money;
			}
		}
	},
	created() {

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../../static/css/content.css';
</style>
