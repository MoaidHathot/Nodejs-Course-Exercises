import { IProduct } from '../models/product';
import { productRepository } from '../repositories/product-repository';
import uuidv1 from 'uuid/v1';
import { validateIdLength, validateNameLength } from '../middlewares/validation';

import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/', (request, response) => {

    productRepository.GetItemsAsync().then(products => response.json(products), reason => response.sendStatus(500));
});

router.get('/:id', 
    validateIdLength(),
    (request, response) => {

    const { id } = request.params;

    productRepository.GetItemAsync(id).then(product => product ? response.json(product) : response.sendStatus(404), reason => response.sendStatus(500));
});

router.post('/', 
    validateNameLength(),
    (request, response) => {

    const product: IProduct = request.body;    
    product.id = uuidv1();

    productRepository.AddItemAsync(product, false).then(result => result ? response.status(201).json(result) : response.status(409), reason => response.send(500));
});

router.put('/:id', 
    validateIdLength(),
    validateNameLength(),
    async (request, response) => {

        try {

            const { id } = request.params;
            const product: IProduct = request.body;
        
            product.id = id;
        
            const existingProduct = await productRepository.GetItemAsync(id);
        
            if(!existingProduct) 
            {
                return response.sendStatus(404);
            }
        
            const updated = await productRepository.AddItemAsync(product, true);
            
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

            const deleted = await productRepository.RemoveItemAsync(id);
        
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