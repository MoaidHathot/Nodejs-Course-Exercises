import express from 'express';
import cors from 'cors';
import { router as productsControllerRouter} from './controllers/products';
import { router as categoriesControllerRouter } from './controllers/categories';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/products', productsControllerRouter);
app.use('/categories', categoriesControllerRouter);

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    
    console.log(`'Server is up and running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
});