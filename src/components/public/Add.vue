<template>
  <div class="add" @click="goPage">
   <div></div>
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
	  "path"
  ],
	methods: {
		goPage() {
			this.$emit("goChoosetype");
			this.$emit("goAddcontent");
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.add div{
		width: 1.14rem;
		height: 1.14rem;
		background: url(../../assets/images/public/add.png) no-repeat left top;
		background-size: 100%;
		position: fixed;
		left: 50%;
		margin-left: -.57rem;
		bottom: 1.04rem;
	}
</style>
