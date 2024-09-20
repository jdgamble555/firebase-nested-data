<script lang="ts">
	import { loginWithGoogle, logout, useUser } from '$lib/use-user';
	import Profile from '$lib/components/profile.svelte';
	import Comments from './comments.svelte';
	import { useComments } from '$lib/use-comments';
	import Input from './input.svelte';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import type { PageData } from '$types/routes/comment/[...path]/$types';
	import Depth from './depth.svelte';

	const user = useUser();
	const data = derived(page, (_page) => _page.data as PageData);

	$: comments = useComments($data.path, $data.levelArray);
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex w-full max-w-[59rem] flex-col items-center justify-center gap-3 p-5">
		{#if $user}
			<Profile />
			<button
				class="w-fit rounded-lg border bg-blue-600 p-3 font-semibold text-white"
				on:click={logout}
			>
				Logout
			</button>
			<main class="mt-5 flex w-full flex-col items-start justify-start gap-3">
				<Depth />
				{#if $data.path}
					<a
						rel=""
						class="rounded-lg border bg-violet-800 p-2 text-white"
						href={'/comment/' + $data.parent}
					>
						UP
					</a>
				{:else}
					<Input />
				{/if}
				<div class="w-full">
					<div class="mt-3 flex flex-col items-start border-t border-gray-300"></div>
				</div>
				{#if $comments?.length}
					<Comments comments={$comments} />
				{:else}
					<p>No Comments yet!</p>
				{/if}
				<div class="w-full">
					<div class="mt-3 flex flex-col items-start border-t border-gray-300"></div>
				</div>
			</main>
		{:else}
			<button class="bg-red-600 p-2 font-semibold text-white" on:click={loginWithGoogle}>
				Signin with Google
			</button>
		{/if}
	</div>
</div>
