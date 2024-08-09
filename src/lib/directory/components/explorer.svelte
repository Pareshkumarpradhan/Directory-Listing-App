<script lang="ts">
	import DatabaseReady from '$lib/app/components/common/database-ready.svelte';
	import type { FileDataModelType } from '$lib/app/types/app-types';
	import { createEventDispatcher } from 'svelte';
	import { getAllDirectories } from '../services/directory-service';
	import ExplorerItem from './explorer-item.svelte';
	

	// export let explorerData: FolderDataModelType;

	let expanded = false;
	let inputText = '';
	let showInput = { visible: false, isFolder: null as boolean | null };

	const dispatch = createEventDispatcher();

	let files: any[] = [];

	let tree: FileDataModelType = {};

	export async function loadFiles() {
		// console.log('loadFiles');
		files = await getAllDirectories();
		prepareFileTree(tree);
		tree = tree;
		// console.log(files);
	}

	function prepareFileTree(parent: FileDataModelType) {
		if (files?.length) {
			parent.children = files.filter((file) => {
				return file.parent == parent._id;
			});
		}
	}

	// function handleNewFolder(isFolder: boolean) {
	// 	expanded = true;
	// 	showInput = { visible: true, isFolder };
	// 	inputText = '';
	// 	console.log('handleNewFolder', isFolder);
	// 	expanded = false;
	// }

	// function handleNewFile() {
	// 	handleNewFolder(false);
	// }

	function handleNameInputBlur() {
		showInput.visible = false;
	}

	// async function handleNameInputKeydown(event: KeyboardEvent) {
	// 	inputText = (inputText || '').trim();
	// 	if (event.key === 'Enter' && inputText) {
	// 		const newItem = {
	// 			name: inputText,
	// 			isFolder: showInput.isFolder,
	// 			parentId: explorerData._id,
	// 			cat: new Date()
	// 		};

	// 		// Update the in-memory structure immediately
	// 		// if (showInput.isFolder !== null) {
	// 		// 	explorerData.items = [...explorerData.items, newItem];
	// 		// }
	// 		// if (showInput.isFolder !== null && Array.isArray(explorerData.items)) {
	// 		// 	explorerData.items = [...explorerData.items, newItem];
	// 		// }

	// 		// Insert into the database
	// 		const db = await getLocalDatabase();
	// 		if (db && db.filesStore) {
	// 			try {
	// 				await db.filesStore.insert(newItem);
	// 				console.log('Item added to the database:', newItem);
	// 			} catch (error) {
	// 				console.error('Failed to add item to the database:', error);
	// 			}
	// 		}
	// 		// Reset the input field
	// 		showInput.visible = false;
	// 		inputText = '';
	// 		dispatch('update', newItem);
	// 	}
	// }

	function handleReady() {
		// console.log('handleReady');
		loadFiles();
	}

	function handleItemSelected(ev: CustomEvent) {
		if (ev.detail) {
			let file = ev.detail;
			prepareFileTree(file);
		}
	}
</script>

<DatabaseReady on:ready={handleReady} />

<div>
	<ExplorerItem
		children={tree.children}
		on:selected
		viewChild={ExplorerItem}
		on:selected={handleItemSelected}
	/>
</div>

<!-- 
<div class="mt-2">
	 
	{#if explorerData.isFolder}
		<div class="folder" on:click={() => (expanded = !expanded)}>
			<span>📁 {explorerData.name}</span>
			<button type="button" on:click={() => handleNewFolder(true)}>Folder +</button>
			<button type="button" on:click={handleNewFile}>File +</button>
		</div>
		<div style="display: {expanded ? 'block' : 'none'}; padding-left: 25px;">
			{#if showInput.visible}
				<div class="d-flex align-items-center">
					<span>{showInput.isFolder ? '📁' : '📄'}</span>
					<input
						class="ml-2"
						type="text"
						bind:value={inputText}
						on:keydown={handleNameInputKeydown}
						on:blur={handleNameInputBlur}
					/>
				</div>
			{/if}
			{#each explorerData.items || [] as item (item.id)}
				<svelte:self bind:explorerData={item} />
			{/each}
		</div>
	{:else}
		<span class="d-block, ms-3">📄 {explorerData.name}</span>
	{/if}
</div> -->

<!-- <style>
	.folder {
		cursor: pointer;
	}
</style> -->
