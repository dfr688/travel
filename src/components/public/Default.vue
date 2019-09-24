<template>
  <div class="noMes">
		<div></div>
		<p>暂无数据</p>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.noMes{
		text-align: center;
	}
	.noMes div{
		width: 3.61rem;
		height: 2.47rem;
		background: url(../../assets/images/home/nomes.png) no-repeat left top;
		background-size: 100%;
		margin: 0 auto;
		margin-top: 2.4rem;
	}
	.noMes p{
		color: #999;
		font-size: .36rem;
	}
</style>
