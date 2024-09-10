<script lang="ts">
	import { loginWithGoogle, logout, useUser } from '$lib/use-user';
	import Profile from '$lib/components/profile.svelte';
	import Comments from './comments.svelte';
	import { useComments } from '$lib/use-comments';
	import Input from './input.svelte';

	const user = useUser();

	const comments = useComments();
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex w-full max-w-[59rem] flex-col items-center justify-center gap-3 p-5">
		{#if $user}
			<Profile />
			<button
				class="w-fit rounded-lg border bg-blue-600 p-3 font-semibold text-white"
				on:click={logout}>Logout</button
			>
			<hr />
			<main class="mt-5 flex w-full flex-col items-start justify-start gap-3">
				<Input />
				{#if !$comments?.length}
					<p>No Comments yet!</p>
				{:else}
					<Comments comments={$comments} />
				{/if}
			</main>
		{:else}
			<button class="bg-red-600 p-2 font-semibold text-white" on:click={loginWithGoogle}>
				Signin with Google
			</button>
		{/if}
	</div>
</div>
