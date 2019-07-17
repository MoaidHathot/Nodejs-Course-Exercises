export interface IStore<TType> {

    GetAllItemsAsync() : Promise<TType[]>
}