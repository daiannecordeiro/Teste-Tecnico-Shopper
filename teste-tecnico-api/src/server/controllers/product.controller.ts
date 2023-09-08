import { Request, Response, Router } from 'express';
import ProductRepository from '../database/repositories/product.repositorie';
import { StatusCodes } from 'http-status-codes';

const productRouter = Router();

productRouter.get('/', async (_req: Request, res: Response): Promise<Response> => {
  const products = await ProductRepository.getProducts();
  return res.status(StatusCodes.OK).json(products);
});

export default productRouter;
