<script lang="ts">
	import { deleteComment } from '$lib/use-comments';
	import Input from './input.svelte';

	export let text: string;
	export let path: string;

	let showInput = false;
</script>

<div class="w-full border-l pl-5">
	<h1 class="text-sm font-semibold">Susan Mouse</h1>
	<p class="text-xs">{text}</p>
	<div class="mt-3 flex flex-col items-start border-t border-gray-300">
		<div class="mb-1 flex items-start justify-start gap-x-3">
			<button
				class="text-sm text-green-500 hover:underline"
				on:click|preventDefault={() => deleteComment(path)}
			>
				Delete
			</button>
			<button
				class="text-sm text-green-500 hover:underline"
				on:click={() => (showInput = !showInput)}
			>
				Reply
			</button>
			<a class="text-sm text-green-500 hover:underline" href={`/comment/` + path}>
				View
			</a>
		</div>
		{#if showInput}
			<Input {path} on:submit={() => (showInput = !showInput)} />
		{/if}
		<slot />
	</div>
</div>
