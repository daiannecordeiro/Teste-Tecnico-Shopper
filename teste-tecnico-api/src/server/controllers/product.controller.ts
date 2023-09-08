import { Request, Response, Router } from 'express';
import ProductRepository from '../database/repositories/product.repositorie';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
import { Readable } from 'stream';
import readline from 'readline';

const multerConfig = multer();

const productRouter = Router();

interface IUpdateProducts {
  code: number;
  sales_price: number;
}

productRouter.get(
  '/',
  async (_req: Request, res: Response): Promise<Response> => {
    const products = await ProductRepository.getProducts();
    return res.status(StatusCodes.OK).json(products);
  }
);

productRouter.post(
  '/update-prices-by-csv',
  multerConfig.single('file'),
  async (req: Request, res: Response) => {
    const { file } = req;
    const buffer = file?.buffer;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);
    const productsLine = readline.createInterface({
      input: readableFile,
    });

    const products: IUpdateProducts[] = [];
    let isFirstLine = true;

    for await (const line of productsLine) {
      if (isFirstLine) {
        isFirstLine = false;
        continue; // Ignorar a primeira linha
      }

      const productsLineSplit = line.split(',');
      products.push({
        code: Number(productsLineSplit[0]),
        sales_price: Number(productsLineSplit[1]),
      });
    }

    const result1 = await ProductRepository.updateProducts(products);
    const result2 = await ProductRepository.updateRelatedProducts(result1);
    console.log(result1, result2);
    const result = [...result1, ...result2];


    return res.send({ result });
  }
);

export default productRouter;
