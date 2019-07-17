import { InMemoryStore } from "../stores/in-memory-store";
import { IRepository, FilterFunction } from "./repository";

interface ITType<TId> {

    id: TId;
}

export abstract class RepositoryBase<TType extends ITType<TId>, TId> implements IRepository<TType, TId> {

    constructor(private _store: InMemoryStore<TType>) {

    }

    async GetItemsAsync(filter?: FilterFunction<TType>): Promise<Array<TType>> {

        if(!filter) {

            return await this._store.GetAllItemsAsync();
        }
        
        return (await this._store.GetAllItemsAsync()).filter(filter);
    }

    async GetItemAsync(id: TId): Promise<TType | null> {

        const items = await this._store.GetAllItemsAsync();

        const found = items.find(p => p.id === id);

        return found ? found : null;
    }

    async AddItemAsync(item: TType, updateIfExists: boolean): Promise<TType | null> {
        
        const items = await this._store.GetAllItemsAsync();

        const foundIndex = items.findIndex(p => p.id === item.id);

        if(-1 === foundIndex) {

            items.push(item);
            return items[items.length - 1]
        }

        if(updateIfExists) {

            items[foundIndex] = item;
            return items[foundIndex]
        }

        return null;
    }

    async RemoveItemAsync(id: TId): Promise<TType | null> {

        const items = await this._store.GetAllItemsAsync();

        const foundIndex = items.findIndex(p => p.id === id);

        if(-1 === foundIndex) {

            return null;
        }

        return items.splice(foundIndex, 1)[0];
    }
}