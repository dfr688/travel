<template>
  <div class="common">
    <ul class="top">
      <li>
        <span @click='goMy("/my")'></span>
      </li>
      <li class="center">
        首页
      </li>
      <li class="right">
        <i @click='goStats("/stats")'></i>
      </li>
    </ul>
    <ul class="sum">
      <li>
        <div>年份</div>
        <p class="year" @click="chooseYear"><input type="text" v-model="text" readonly="readonly"><i></i></p>
      </li>
      <li>
        <p class="money">支出</p>
        <span>{{totalPrice}}</span>
      </li>
      <li>
        <p class="times">笔数</p>
        <span>{{ totalCount }}</span>
      </li>
    </ul>
		<!-- 年份选择弹框 -->
		<mt-popup
		  v-model="popupVisible"
		  position="bottom">
		  <div class="frame_upper">
			  <span>选择年份</span><p @click="chooseSure">确定</p>
		  </div>
		  <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
		</mt-popup>
  </div>
</template>

<script>

	let years = []
 for (var i = 2017; i <= 2050; i++) {
	 years.push(i);
 }
 years.unshift("所有");
export default {
  name: '',
  data () {
    return {
      text: "所有",
	  value: "",
	  years: [years],
	  popupVisible: false,
	  slots: [
        {
          values: years,
          textAlign: 'center',
		  defaultIndex: 3
        }
      ]
    }
  },
  components: {

  },
  props:[
	  "totalPrice",
	   "totalCount"
  ],
  methods: {
	goStats(path) {
		this.$router.push(path);
	},
	goMy(path) {
		this.$router.push(path);
	},
	// 选中的值改变时  获取当前选中的值
	onValuesChange(picker, values) {
 		// console.log(values[0]);
		this.value = values[0];
    },
	// 点击弹出年份选择层
	chooseYear() {
		this.popupVisible = true;
	},
	// 点击弹出层中的确定按钮
	chooseSure() {
		this.text = this.value;
		this.popupVisible = false;
		this.$emit("getYear",this.text);
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../../static/css/common.css';
</style>
