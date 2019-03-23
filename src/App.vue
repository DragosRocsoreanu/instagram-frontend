<template>
	<div id="q-app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App",
	created() {
		this.$store.dispatch("example/getCurrentUser");
	}
};
</script>

<style>
body {
	overflow: hidden;
}
</style>
