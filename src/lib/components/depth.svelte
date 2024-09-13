<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import type { ChangeEventHandler } from 'svelte/elements';

	$: url = $page.url;

	let formEl: HTMLFormElement;

	let selected = 'clear';

	const go: ChangeEventHandler<HTMLSelectElement> = async () => {
		if (selected === 'clear') {
			url.searchParams.delete('depth');
			await goto(url);
			invalidateAll();
			return;
		}
		url.searchParams.set('depth', selected);
		await goto(url);
		invalidateAll();
		return;
	};
</script>

<form bind:this={formEl}>
	<label for="depth" class="mb-2 block text-sm font-medium text-gray-900">Select a depth</label>
	<select
		bind:value={selected}
		on:change={go}
		id="depth"
		class="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
	>
		<option value="clear" selected>Full</option>
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
		<option value="4">4</option>
		<option value="5">5</option>
	</select>
</form>
