<template>
	<div id="app">
		<Header />
		<div class="container">
			<router-view></router-view>
		</div>
		<Footer />
	</div>
</template>
<script>
import Header from './components/header/header.vue'
import Footer from './components/footer/footer.vue'
export default {
	name:'Layout',
	components:{
		Header, Footer
	},
}
</script>
<style lang="scss">
// #app {
// 	font-family: "Avenir", Helvetica, Arial, sans-serif;
// 	-webkit-font-smoothing: antialiased;
// 	-moz-osx-font-smoothing: grayscale;
// 	text-align: center;
// 	color: #2c3e50;
// 	min-height: 100vh;

// 	.container {
// 		min-height: 100vh;
// 	}
// }
</style>
