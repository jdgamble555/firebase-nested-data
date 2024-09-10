<script lang="ts">
	import { deleteComment } from '$lib/use-comments';
	import Input from './input.svelte';

	export let text: string;
	export let level = 1;
	export let id: string;

	$: ++level;

	let showInput = false;
</script>

<div class="w-full border-l py-5 pl-5">
	<h1 class="text-sm font-semibold">Donald Duck</h1>
	<p class="text-xs">{text}</p>
	<div class="my-3 flex flex-col items-start gap-y-3 border-t border-gray-300">
		<div class="items-start flex justify-start gap-3">
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
			<Input {level} parent={id} on:submit={() => (showInput = !showInput)} />
		{/if}
		<div>
			<slot />
		</div>
	</div>
</div>
