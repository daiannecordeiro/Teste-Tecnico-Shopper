import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import productRouter from '../controllers/product.controller';

const router = Router();

router.get('/health-check', (_, res) => {
  return res.status(StatusCodes.OK).json({ message: 'OK' });
});

router.use('/products', productRouter);

export { router };
