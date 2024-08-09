<script lang="ts">
	import { localDatabse } from '$lib/app/services/app-database-service';
	import { createEventDispatcher, onMount } from 'svelte';

	let dispatch = createEventDispatcher();
	let isReady = false;

	onMount(() => {
		localDatabse.subscribe((db) => {
			if (db) {
				if (!isReady) {
					isReady = true;
					dispatch('ready');
				}
			}
		});
	});
</script>
