import { BROWSER } from 'esm-env';
import { get, writable } from 'svelte/store';

import { APP_DATABASE_NAME, APP_DATABASE_VERSION, IS_DEV_ENV } from './app-environment-service';
import { Database, Store, type StoreDefinitionType } from '@cloudparker/easy-idb';


export let localDatabse = writable<AppDatabase>();

export function getLocalDatabase(): AppDatabase {
    return get(localDatabse)!;
}

const collections: StoreDefinitionType[] = [
    { name: 'directorys', primaryKey: '_id', autoIncrement: true, indexes: [] },
   
];

export async function initLocalDatabaseService(force?: boolean) {
    if (BROWSER) {
        let appDatabaseValue = get(localDatabse);
        if (appDatabaseValue == null || force) {
            let db = new AppDatabase({ name: APP_DATABASE_NAME, version: APP_DATABASE_VERSION, stores: collections });
            try {
                await db.openDatabase();
            } catch (error) {
                if (IS_DEV_ENV) {
                    console.log('Error detected while openDatabase in DEV Env');
                    if (indexedDB) {
                        const req = indexedDB.deleteDatabase(APP_DATABASE_NAME);
                        req.onsuccess = () => {
                            console.log('DB deleted');
                        };
                        req.onerror = () => {
                            console.error('Error on deleting db: ' + req.error);
                        };
                    }
                    await getLocalDatabase().deleteDatabase();
                    await initLocalDatabaseService();
                } else {
                    console.error('Error in databse open, recheck you databse version.')
                }
            }

            localDatabse.set(db);
            console.log('Database opened.')
        }
    }
}

export class AppDatabase extends Database {

    constructor({ name, version, stores }: any) {
        super({ name, version, stores });
    }

    async clearAll() {
        let tasks: Promise<any>[] = [];
        collections.forEach((storeDef: StoreDefinitionType) => {
            let store = this.getStore(storeDef.name);
            if (store) {
                tasks.push(store.removeAll());
            }
        })
        return await Promise.all(tasks);
    }


    get directoryStore(): Store {
        return this.getStore('directorys')!;
    }

    // get contentsStore(): Store {
    //     return this.getStore('contents')!;
    // }
}
