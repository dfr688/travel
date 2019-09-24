<template>
  <div class="headerTop" :class="{black:isSee,white:!isSee}">
		<span :class="{blackRocket:isSee,whiteRocket:!isSee}" @click="goBack"></span>{{ title }}<slot name="cut"></slot><slot name="set"></slot>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
	props: [
		"title",
		"isSee"
	],
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.headerTop{
		text-align: center;
		font-size: .46rem;
		font-weight: bold;
		padding: .5rem 0.4rem;
		position: relative;
	}
	.black{
		color: #333;
	}
	.white{
		color: #fff;
	}
	.headerTop span{
		display: inline-block;
		width: .22rem;
		height: .36rem;
		position: absolute;
		left: .4rem;
		top: .66rem;
	}
	.headerTop span.blackRocket{
		background: url(../../assets/images/public/back.png) no-repeat left top;
		background-size: 100%;
	}
	.headerTop span.whiteRocket{
		background: url(../../assets/images/public/back_01.png) no-repeat left top;
		background-size: 100%;
	}
</style>
