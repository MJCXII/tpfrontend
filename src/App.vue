<template>
<navbar v-if="!$route.meta.hideNavbar"></navbar>
	<main class="app">
		<router-view></router-view>
	</main>
</template>

<script>

  import Nav from '@/components/Nav.vue'

  export default {
     components:{
        'navbar':Nav
     },
  }

  

</script>

<script setup>

	import { computed } from 'vue';
	import { useRoute } from 'vue-router';
	
	const route = useRoute()
	const routeName = computed(() => route.name)

</script>

<style scoped>
	.app {
		@apply min-h-screen w-full;
	}
</style>
