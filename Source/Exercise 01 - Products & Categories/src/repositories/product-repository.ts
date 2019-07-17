import { IProduct } from '../models/product';
import { RepositoryBase } from './repository-base';
import { InMemoryStore } from '../stores/in-memory-store';

export class ProductRepository extends RepositoryBase<IProduct, string> {

    constructor() {

        super(new InMemoryStore('assets/products.json'));
    }
}

const productRepository = new ProductRepository();

export { productRepository };