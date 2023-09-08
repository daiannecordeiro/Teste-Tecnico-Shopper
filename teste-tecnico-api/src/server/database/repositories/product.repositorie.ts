import { Product } from '../entities/product';
import { IProducts } from '../interfaces/IProducts';
import { AppDataSource } from '../index';

const ProductRepository = AppDataSource.getRepository(Product);

const getProducts = async (): Promise<IProducts[]> => {
  const products = await ProductRepository.find();
  return products;
};

export default { getProducts };
