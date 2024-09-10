<script lang="ts">
	import Comment from '$lib/components/comment.svelte';
	import Comments from '$lib/components/comments.svelte';

	export let comments: CommentType[];

	const comment = comments.shift()!;

	const next = comments.at(0);

	const isNested = next?.parent === comment?.id;
</script>

{#if isNested}
	<Comment text={comment.text} level={comment.level} id={comment.id}>
		<Comments {comments} />
	</Comment>
{:else}
	<Comment text={comment.text} level={comment.level} id={comment.id} />
	{#if next}
		<Comments {comments} />
	{/if}
{/if}
