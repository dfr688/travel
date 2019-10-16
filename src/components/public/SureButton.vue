<template>
  <div class="sureButton">
		<button @click="triggerEvent">{{ text }}</button>
  </div>
</template>

<script>
	
	
export default {
  name: 'sureButton',
  data () {
    return {
      
    }
  },
	props:[
		"text"
	],
	methods: {
		triggerEvent() {
			this.$emit("register");
			this.$emit("signOut");
			this.$emit("login");
			this.$emit("goHome");
			this.$emit("clickKeep");
			this.$emit("modifyPsd");
			this.$emit("feedbookPage")
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.sureButton{
		width: 6.7rem;
		height: .8rem;
		margin: 0 auto;
		font-size: .36rem;
	}
	.sureButton button{
		width: 6.7rem;
		height: .8rem;
		line-height: .8rem;
		text-align: center;
		color: #fff;
		font-size: .36rem;
		background-image: linear-gradient(0deg, #0396ff 0%, #abdcff 100%), linear-gradient(#f8f8f8, #f8f8f8);
		border-radius: .1rem;
	}
</style>
