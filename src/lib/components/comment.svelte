<script lang="ts">
	import { deleteComment } from '$lib/use-comments';
	import Input from './input.svelte';

	export let text: string;
	export let level = 1;
	export let id: string;

	$: ++level;

	let showInput = false;
</script>

<div class="p-5 border-l">
	{text} - {id}
	<div class="my-3 flex flex-col gap-3 border-t border-gray-300">
		<div class="flex gap-3">
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
		<div class="p-3">
			<slot />
		</div>
	</div>
	{#if showInput}
		<Input {level} parent={id} />
	{/if}
</div>
