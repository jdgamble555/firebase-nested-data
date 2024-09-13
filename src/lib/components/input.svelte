<script lang="ts">
	import { addComment } from '$lib/use-comments';
	
	export let path: string | null = null;
</script>

<form on:submit={addComment} on:submit>
	<header class="my-3 flex max-w-lg items-center justify-center gap-3">
		<input type="hidden" name="parent" value={path} />
		<input
			type="text"
			name="text"
			class="w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
			placeholder="What's up?"
			required
		/>
		<button class="rounded-md border border-green-800 bg-green-700 p-2 text-white" type="submit">
			Post
		</button>
	</header>
</form>
