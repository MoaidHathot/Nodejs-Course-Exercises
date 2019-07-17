import { ICategory } from '../models/category';
import { categoryRepository } from '../repositories/category-repository';
import { productRepository } from '../repositories/product-repository';
import uuidv1 from 'uuid/v1';
import { validateIdLength, validateNameLength } from '../middlewares/validation';

import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/', (request, response) => {

    categoryRepository.GetItemsAsync().then(categories => response.json(categories), reason => response.sendStatus(500));
});

router.get('/:id/products', 
    validateIdLength(),
    (request, response) => {

    const { id } = request.params;

    productRepository.GetItemsAsync(product => product.categoryId === id).then(products => (products && products.length > 1) ? response.json(products) : response.sendStatus(404), reason => response.sendStatus(500));
});

router.get('/:id', 
    validateIdLength(),
    (request, response) => {

    const { id } = request.params;

    categoryRepository.GetItemAsync(id).then(category => category ? response.json(category) : response.sendStatus(404), reason => response.sendStatus(500));
});

router.post('/', (request, response) => {

    const category: ICategory = request.body;
    category.id = uuidv1();

    categoryRepository.AddItemAsync(category, false).then(result => result ? response.status(201).json(result) : response.status(409), reason => response.sendStatus(500));
});

router.put('/:id', 
    validateIdLength(),
    async (request, response) => {

    try {

        const { id } = request.params;
        const category: ICategory = request.body;
        category.id = id;

        const existingCategory = await categoryRepository.GetItemAsync(id);

        if(!existingCategory) {

            return response.sendStatus(404);
        }

        const updated = await categoryRepository.AddItemAsync(category, true);

        return response.json(updated);

    } catch(error) {

        return response.sendStatus(500);
    }
});

router.delete('/:id', 
    validateIdLength(),
    async (request, response) => {

    try {

        const { id } = request.params;

        const deleted = await categoryRepository.RemoveItemAsync(id);
    
        if(!deleted)
        {
            return response.sendStatus(404);
        }
    
        return response.sendStatus(204);

    } catch(error) {

        return response.sendStatus(500);
    }
});

export { router };