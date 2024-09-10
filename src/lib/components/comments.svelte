<script lang="ts">
	import Comment from '$lib/components/comment.svelte';
	import Comments from '$lib/components/comments.svelte';

	export let comments: CommentType[];
</script>

{#each comments as comment}
	<Comment text={comment.text} level={comment.level} id={comment.id}>
		{#if comment.children?.length}
			<Comments comments={comment.children} />
		{/if}
	</Comment>
{/each}
