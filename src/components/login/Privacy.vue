<template>
  <div class="privacy">
		<div class="back" @click="goback">
			<i></i>
		</div>
		<iframe src="http://www.ave.cc/pioneer/urpp/ayh.htm" frameborder="0" scrolling="no"></iframe>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      
    }
  },
	methods: {
		goback() {
			this.$router.go(-1); 
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.privacy{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	.privacy .back{
		padding-left: .4rem;
		height: 1rem;
	}
	.privacy .back i{
		display: inline-block;
		width: .2rem;
		height: .36rem;
		background: url(../../assets/images/public/back.png) no-repeat left top;
		background-size: 100%;
	}
	.privacy iframe{
		width: 100%;
		height: 100%;
		overflow: scroll; 
	}
</style>
