<script lang="ts">
	import type { FileDataModelType } from '$lib/app/types/app-types';
	import { createEventDispatcher } from 'svelte';

	export let children: FileDataModelType[] = [];
	export let viewChild: any;

	let selectedFile: FileDataModelType;
	let dispatch = createEventDispatcher();

	function handleSelectFile(file: FileDataModelType) {
		selectedFile = file;
		dispatch('selected', selectedFile);
	}
</script>

<div>
	{#each children || [] as file, index}
		<div class="d-flex">
			<div>
				<!-- Icon -->
			</div>
			<div class="flex-grow-1">
				<div>
					<button
						type="button"
						class="btn btn-sm btn-light w-100 text-start"
						class:active={selectedFile == file}
						on:click={() => handleSelectFile(file)}
					>
						{file.name || ''}
					</button>
				</div>
				<div>
					{#if file?.children?.length}
						<svelte:component this={viewChild} children={file.children} on:selected />
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>
