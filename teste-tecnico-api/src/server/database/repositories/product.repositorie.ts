import { Product } from '../entities/product';
import { IProducts } from '../interfaces/IProducts';
import { AppDataSource } from '../index';
import { packsRepository } from './packs.repositories';

type UpdateResult = {
  code: number;
  name: string;
  cost_price: number;
  old_sales_price: number;
  new_sales_price: number;
  message: string;
  success: boolean;
  isPack?: boolean;
  isPartOfPack?: boolean;
};

type ProcessedProduct = {
  code: number;
  sales_price: number;
};

const ProductRepository = AppDataSource.getRepository(Product);

const getProducts = async (): Promise<IProducts[]> => {
  const products = await ProductRepository.find();
  return products;
};

const verifyUpdateProducts = async (
  products: ProcessedProduct[]
): Promise<UpdateResult[]> => {
  const results: UpdateResult[] = [];

  await Promise.all(
    products.map(async (product) => {
      const productToUpdate = await ProductRepository.findOne({
        where: { code: product.code },
      });

      const isPack = await packsRepository.findOne({
        where: { pack_id: product.code },
      });

      const isPartOfPack = await packsRepository.findOne({
        where: { product_id: product.code },
      });

      if (!productToUpdate) {
        results.push({
          code: product.code,
          name: '',
          cost_price: 0,
          old_sales_price: 0,
          new_sales_price: 0,
          message: 'Produto não encontrado',
          success: false,
          isPack: isPack ? true : false,
          isPartOfPack: isPartOfPack ? true : false,
        });
        return;
      }

      if (Number(productToUpdate.sales_price) === product.sales_price) {
        results.push({
          code: product.code,
          name: productToUpdate.name,
          cost_price: productToUpdate.cost_price,
          old_sales_price: productToUpdate.sales_price,
          new_sales_price: product.sales_price,
          message: 'Novo preço igual ao preço atual',
          success: false,
          isPack: isPack ? true : false,
          isPartOfPack: isPartOfPack ? true : false,
        });
        return;
      }

      if (productToUpdate.cost_price >= product.sales_price) {
        results.push({
          code: product.code,
          name: productToUpdate.name,
          cost_price: productToUpdate.cost_price,
          old_sales_price: productToUpdate.sales_price,
          new_sales_price: product.sales_price,
          message: 'Preço de venda menor que o preço de custo',
          success: false,
          isPack: isPack ? true : false,
          isPartOfPack: isPartOfPack ? true : false,
        });
        return;
      }

      const priceLimit = productToUpdate.sales_price * 0.1;
      const readjustment = Math.abs(
        product.sales_price - productToUpdate.sales_price
      );

      if (readjustment > priceLimit) {
        results.push({
          code: product.code,
          name: productToUpdate.name,
          cost_price: productToUpdate.cost_price,
          old_sales_price: productToUpdate.sales_price,
          new_sales_price: product.sales_price,
          message: 'Reajuste de preço fora do limite de 10%',
          success: false,
          isPack: isPack ? true : false,
          isPartOfPack: isPartOfPack ? true : false,
        });
        return;
      }

      results.push({
        code: product.code,
        name: productToUpdate.name,
        cost_price: productToUpdate.cost_price,
        old_sales_price: productToUpdate.sales_price,
        new_sales_price: product.sales_price,
        message: 'Alteração de preço autorizada',
        success: true,
        isPack: isPack ? true : false,
        isPartOfPack: isPartOfPack ? true : false,
      });
    })
  );

  return results;
};

const verifyUpdateRelatedProducts = async (results: UpdateResult[]) => {
  const productsToUpdate: ProcessedProduct[] = [];

  await Promise.all(
    results.map(async (result) => {
      if (result.isPack) {
        const relatedProducts = await packsRepository.find({
          where: { pack_id: result.code },
        });

        if (relatedProducts.length > 0) {
          const pricePerQty = result.new_sales_price / relatedProducts[0].qty;

          relatedProducts.forEach((relatedProduct) => {
            productsToUpdate.push({
              code: relatedProduct.product_id,
              sales_price: pricePerQty,
            });
          });
        }
      } else if (result.isPartOfPack) {
        const pack = await packsRepository.findOne({
          where: { product_id: result.code },
        });

        if (pack) {
          productsToUpdate.push({
            code: pack.pack_id,
            sales_price: result.new_sales_price * pack.qty,
          });
        }
      }
    })
  );

  const updateResults = await verifyUpdateProducts(productsToUpdate);

  return updateResults;
};

const allSuccess = async (products: ProcessedProduct[]) => {
  const result1 = await verifyUpdateProducts(products);
  const result2 = await verifyUpdateRelatedProducts(result1);
  const result = [...result1, ...result2];

  const allSuccess = result.every((item) => item.success === true);

  if (allSuccess) {
    return true;
  } else {
    return false;
  }
};

const updateProducts = async (products: UpdateResult[]) => {
  await Promise.all(
    products.map(async (item) => {
      if (item.success) {
        await ProductRepository.update(
          { code: item.code },
          { sales_price: item.new_sales_price }
        );
      }
    })
  );
};

export default {
  ProductRepository,
  getProducts,
  verifyUpdateProducts,
  verifyUpdateRelatedProducts,
  allSuccess,
  updateProducts,
};
