<script lang="ts">
	import { loginWithGoogle, logout, useUser } from '$lib/use-user';
	import Profile from '$lib/components/profile.svelte';
	import Comments from './comments.svelte';

	const user = useUser();
</script>

<section class="flex flex-col items-center gap-3 p-5">
	{#if $user}
		<Profile />
		<button
			class="w-fit rounded-lg border bg-blue-600 p-3 font-semibold text-white"
			on:click={logout}>Logout</button
		>
		<hr />
		<Comments />
	{:else}
		<button class="bg-red-600 p-2 font-semibold text-white" on:click={loginWithGoogle}>
			Signin with Google
		</button>
	{/if}
</section>
