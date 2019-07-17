import express, { Request, Response, NextFunction } from 'express';

export function validate<T> (selector: SelectorFunction<T>, validator: ValidationFunction<T>, invalidationStatusCode: number) {

    return function (request: Request, response: Response, next: NextFunction)
    {
        if(!validator(selector(request, response)))
        {
            return response.sendStatus(invalidationStatusCode);
        }

        next();
    };
}

interface SelectorFunction<T> {
    (request: Request, response: Response) : T;
}

interface ValidationFunction<T> {
    (value: T): boolean
}

export function validateIdLength() {

    return validate((request, response) => request.params.id, (id: string) => (id && id.length === 36) ? true : false, 400);
}

export function validateNameLength() {
    
    return validate((request: Request, response: Response) => request.body.name, (id: string) => (id && id.length >= 3) ? true : false, 409);
}