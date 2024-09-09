<script lang="ts">
	import Comment from '$lib/components/comment.svelte';
	import Input from '$lib/components/input.svelte';
	import { useComments } from '$lib/use-comments';

	const comments = useComments();
</script>

<main class="mt-5 flex flex-col items-center justify-center gap-3">
	<Input />
	{#each $comments as comment}
		<Comment text={comment.text} level={comment.level} id={comment.id} />
	{:else}
		<p>No Comments yet!</p>
	{/each}
</main>