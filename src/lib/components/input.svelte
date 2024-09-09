<script lang="ts">
	import { addComment } from '../use-comments';

	export let level = 0;
    export let parent: string | null = null;
</script>

<form on:submit={addComment}>
	<header
		class="flex max-w-lg items-center justify-center gap-3 rounded-md border border-gray-300 p-5"
	>
		<input type="hidden" name="level" value={level} />
        <input type="hidden" name="parent" value={parent} />
		<input
			type="text"
			name="text"
			class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
			placeholder="What's up?"
			required
		/>
		<button class="rounded-md border border-green-800 bg-green-700 p-2 text-white" type="submit">
			Post
		</button>
	</header>
</form>
