<template>
  <div class="com">
		<div class="headTitle">
			<span class="back" @click="goback"></span>
			<p>{{ title }}</p>
			<i></i>
			<slot></slot>
		</div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
	props:[
		"title"
	],
	methods: {
		goback() {
			this.$router.go(-1);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.com{
		font-size: .32rem;
	}
	.com .headTitle{
		padding: 1rem 0 .8rem .4rem;
		color: #999;
	}
	.com .headTitle .back{
		display: inline-block;
		width: .22rem;
		height: .36rem;
		background: url(../../assets/images/public/back.png) no-repeat left top;
		background-size: 100%;
		margin-bottom: .4rem;
	}
	.com .headTitle p{
		font-size: .46rem;
		color: #333;
		font-weight: bold;
		margin-bottom: -.3rem;
	}
	.com .headTitle i{
		display: inline-block;
		width: .88rem;
		height: .1rem;
		background: #0396ff;
    border-radius: .2rem;
	}
</style>
