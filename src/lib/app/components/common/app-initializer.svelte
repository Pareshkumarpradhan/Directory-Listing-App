<script lang="ts">
	import { initLocalDatabaseService } from "$lib/app/services/app-database-service";
	import { onMount } from "svelte";

    onMount(()=>{
          initLocalDatabaseService();
    });
</script>