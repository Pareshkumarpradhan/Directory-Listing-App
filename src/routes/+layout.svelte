<script lang="ts">
	import { BootstrapInitializer, Referrer, ScreenDetector } from '@cloudparker/evolve-svelte';
</script>

<ScreenDetector />
<Referrer />
<BootstrapInitializer />
<slot />
