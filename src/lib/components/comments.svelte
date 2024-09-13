<script lang="ts">
	import Comment from '$lib/components/comment.svelte';
	import Comments from '$lib/components/comments.svelte';

	export let comments: CommentType[];
</script>

{#each comments as comment}
	<Comment text={comment.text} path={comment.path}>
		{#if comment.children?.length}
			<Comments comments={comment.children} />
		{/if}
	</Comment>
{/each}
