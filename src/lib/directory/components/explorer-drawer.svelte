<script lang="ts">
	import type { FileDataModelType } from "$lib/app/types/app-types";
	import { createDirectory } from "../services/directory-service";
	import Explorer from "./explorer.svelte";

    let explorerRef: Explorer;
    let selectedDirectory: FileDataModelType;

async function handleCreate(){
    let name = prompt("New directory name?");
    if(name){
        const directoryObj : FileDataModelType = {
            name: name,
            isFolder: true,
            cat: new Date(),
            parent: selectedDirectory?._id || undefined
        };
        try {
                await createDirectory(directoryObj);
                explorerRef && explorerRef.loadFiles();
        } catch (error) {
            console.error(error);
            
        }
    }
}

function handleSelectedFile(ev: CustomEvent) {
    selectedDirectory = ev.detail;
	}
</script>


<div class="bg-f5 full overflow-auto border-end">
    <div class="d-flex">
        <div class="flex-grow-1">
            <div class="fs-5">Directory</div>
        </div>
        <div>
            <button type="button" on:click={handleCreate}>+</button>
        </div>
    </div>

    <Explorer bind:this={explorerRef} on:selected={handleSelectedFile} />
</div>