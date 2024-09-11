<script lang="ts">
	import Home from '$lib/components/home.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: id = data.id;
</script>

<Home {id} />
