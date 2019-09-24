<template>
  <div class="remind">
		<HeaderTop title="记账提醒" isSee="true"/>
		<ul>
			<li>
				<span>
					记账提醒
				</span>
				<div>
					<mt-switch v-model="value"></mt-switch>
				</div>
			</li>
			<li>
				<span class="remind_time">提醒时间</span>
				<div @click="openPicker">
					<p class="time">{{ time }}</p>
				</div>
			</li>
		</ul>
		<!-- 选择提醒时间弹框 -->
		<mt-datetime-picker
			ref="picker"
			type="datetime"
			v-model="pickerValue"
			@confirm="handleConfirm">
		</mt-datetime-picker>
  </div>
</template>

<script>
	import HeaderTop from '../public/HeaderTop'
	
export default {
  name: '',
  data () {
    return {
      value: false,
			time: "",
			pickerValue: ""
    }
  },
	components: {
		HeaderTop
	},
	methods: {
		openPicker() {
			this.$refs.picker.open();
			this.pickerValue = new Date();
		},
		handleConfirm() {
			// console.log(this.formatDateMin(this.pickerValue));
			this.time = this.formatDateMin(this.pickerValue);
		}
	},
	created() {
		this.time = this.getTime();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
		.remind ul{
			margin: 0 .4rem;
		}
		.remind ul li{
			display: flex;
			border-bottom: 1px solid #eee;
			padding: .3rem 0;
		}
		.remind ul li span{
			flex: 5;
			font-size: .36rem;
			color: #333;
		}
		.remind ul li div{
			flex: 1;
			text-align: right;
		}
		.remind ul li .remind_time{
			flex: 1;
		}
		.remind ul li div p{
			font-size: .32rem;
			color: #333;
			margin-top: .06rem;
		}
</style>
