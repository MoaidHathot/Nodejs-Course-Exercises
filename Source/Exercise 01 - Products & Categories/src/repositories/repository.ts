export interface IRepository<TType, TId>
{
    GetItemsAsync(): Promise<Array<TType>>,
    GetItemAsync(id: TId): Promise<TType | null>,
    AddItemAsync(item: TType, updateIfExists: boolean): Promise<TType | null>,
    RemoveItemAsync(id: TId): Promise<TType | null>,
}

export interface FilterFunction<TType> {

    (item: TType) : boolean
}