import { getLocalDatabase } from "$lib/app/services/app-database-service";
import type { FileDataModelType } from "$lib/app/types/app-types";



export async function getAllDirectories() {
    return getLocalDatabase().directoryStore.find({})
}

export async function createDirectory(directoryObj:FileDataModelType){
    if(directoryObj?.name){
        return getLocalDatabase().directoryStore.insert(directoryObj)
    }
}