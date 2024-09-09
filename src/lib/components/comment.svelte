<script lang="ts">
	import { deleteComment } from '$lib/use-comments';
	import Input from './input.svelte';

	export let text: string;
	export let level = 0;
	export let id: string;

	let showInput = false;
</script>

<div class="border p-5 w-96">
	{text}
	<div class="my-3 flex gap-3 border-t border-gray-300">
		<button
			class="text-sm text-green-500 hover:underline"
			on:click|preventDefault={() => deleteComment(id)}
		>
			Delete
		</button>
		<button
			class="text-sm text-green-500 hover:underline"
			on:click={() => (showInput = !showInput)}
		>
			Reply
		</button>
	</div>
	{#if showInput}
		<Input level={Number((level + 1).toString())} parent={id} />
	{/if}
</div>
