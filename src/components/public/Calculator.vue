<template>
		<div class="calculator">
			<ul class="wrap">
					<li class="calculator-item"
					      :class="item.text===3?'num-three':''"
					      v-for="(item,index) in calculatorContent"
					      :key="index"
					      @click="triggerEvent(item.type,item.text)">
					 <span>{{item.text}}</span> 
					</li>
			</ul>
			<i></i>
			<!-- 货币选择弹框 -->
			<mt-popup
				v-model="popupVisible"
				position="bottom">
				<ul class="type">
					<li v-for="(moneyType,index) in moneyTypes" :key="index" @click="chooseOne(index)">
						{{ moneyType.type }} -{{ moneyType.name}} ({{ moneyType.sign}})
					</li>
				</ul>
			</mt-popup>
		</div>
</template>

<script>
	
	const calculatorContent = [
		{
		  type: 'number',
		  text: 1,
		},
		{
		  type: 'number',
		  text: 2,
		},
		{
		  type: 'number',
		  text: 3,
		},
		{
		  type: 'features',
		  text: 'x',
		},
		{
		  type: 'number',
		  text: 4,
		},
		{
		  type: 'number',
		  text: 5,
		},
		{
		  type: 'number',
		  text: 6,
		},
	  {
	    type: 'sign',
	    text: '+',
	  },
		{
		  type: 'number',
		  text: 7,
		},
		{
		  type: 'number',
		  text: 8,
		},
		{
		  type: 'number',
		  text: 9,
		},
		{
		  type: 'sign',
		  text: '-',
		},
		{
			type: 'other',
			text : 'CNY'
		},
	  {
	    type: 'number',
	    text: 0,
	  },
	  {
	    type: 'number',
	    text: '.',
	  },
	  {
	    type: 'sign',
	    text: '确定',
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
      calculatorContent: calculatorContent,
	  scanReceiptNum: '',
	  popupVisible: false,
	  moneyTypes: moneyTypes,
	  hide: false
    }
  },
	methods: {
		triggerEvent(type,text) {
		  if (type==='sign') {
		    this.operatorEvent(text)
		  } else if (type==='number') {
		    this.passValue(text)
		  } else {
		    this.functionalEvent(text)
		  }
		},
		 passValue(num) {
		  this.scanReceiptNum += String(num);
			this.$emit("getData",this.scanReceiptNum);
		},
		operatorEvent(operator) {
		  if (operator === '确定') {
		    this.calculationEvent(this.operator);
			this.$emit("goHide",this.hide);
		  } else {
		    this.keepOperator(operator);
		  }
		},
		keepOperator(operator){
		  this.prevNumber = this.scanReceiptNum;
		  this.scanReceiptNum = '';
		  this.operator = operator
		},
		calculationEvent(operator) {
		  switch (operator) {
		    case '+': this.scanReceiptNum= String((+this.prevNumber+(+this.scanReceiptNum)).toFixed(2));this.$emit("getData",this.scanReceiptNum);break;
		    case '-': this.scanReceiptNum= String((+this.prevNumber-(+this.scanReceiptNum)).toFixed(2));this.$emit("getData",this.scanReceiptNum);break;
		  }
		},
		functionalEvent(text) {
		  if (text === 'x') {
		    this.scanReceiptNum = this.scanReceiptNum.substr(0,this.scanReceiptNum.length-1);
				this.$emit("getData",this.scanReceiptNum);
		  } else {
		   this.currencyShow();
		  }
		},
		// 出现货币选择弹框
		 currencyShow() {
			this.popupVisible = true;
		},
		// 选择货币
		chooseOne(index) {
			this.calculatorContent[12].text = this.moneyTypes[index].type;
			this.popupVisible = false;
			this.$emit("getSign",this.moneyTypes[index].sign);
			this.$emit("getIndex",index);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.calculator{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #fff;
	}
	.calculator .wrap{
		display: flex;
		flex-wrap: wrap;
		padding: .4rem 0;
		box-shadow: 0px 5px 15px 1px rgba(2, 0, 0, 0.15);
	}
	.calculator .wrap li{
		width: 25%;
		text-align: center;
		font-size: .46rem;
		color: #333;
		font-weight: bold;
	}
	.calculator .wrap li:nth-child(4){
		margin-top: -.1rem;
	}
	.calculator .wrap li:nth-child(4) span{
		display: inline-block;
		width: .48rem;
		height: .34rem;
		border-radius: .1rem;
		border: solid 1px #333;
		font-size: .28rem;
		text-align: center;
		line-height: .3rem;
	}
	.calculator .wrap li:nth-child(15){
		margin-top: -.1rem;
	}
	.calculator i{
		display: inline-block;
		width: .21rem;
		height: .15rem;
		background: url(../../assets/images/public/lower.png) no-repeat left top;
		background-size: 100%;
		position: absolute;
		left: 1.5rem;
		bottom: .7rem;
	}
	/* 货币选择弹框 */
	.calculator .type{
		width: 7.5rem;
	}
	.calculator .type li{
		margin: 0 .4rem;
		font-size: .32rem;
		color: #333;
		/* text-align: center; */
		padding: .2rem 0;
		border-bottom: 1px solid #eee;
	}
</style>
