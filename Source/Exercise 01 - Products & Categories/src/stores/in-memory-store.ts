import { IStore } from './store';
import { FileReader } from '../utilities/file-reader';

export class InMemoryStore<TType> implements IStore<TType> {

    private _items: Array<TType> | null;

    constructor(private _staticDataFileName: string) {

        this._items = null;
    }

    public async GetAllItemsAsync() : Promise<Array<TType>> {

        if(this._items) {

            return this._items;
        }

        if(!this._staticDataFileName)
        {
            this._items = new Array<TType>();
            return this._items;
        }
        
        const reader = new FileReader();

        const buffer = await reader.readFileAsync(this._staticDataFileName);

        const items = JSON.parse(buffer.toString());
        this._items = items;
        
        return items;
    }
}