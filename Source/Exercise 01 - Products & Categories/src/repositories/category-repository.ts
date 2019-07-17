import { ICategory } from '../models/category';
import { RepositoryBase } from './repository-base';
import { InMemoryStore } from '../stores/in-memory-store';

class CategoryRepository extends RepositoryBase<ICategory, string> {

    constructor() {

        super(new InMemoryStore('assets/categories.json'));
    }
}

const categoryRepository = new CategoryRepository();

export { categoryRepository };