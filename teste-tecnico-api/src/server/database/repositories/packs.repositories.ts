import { Packs } from '../entities/packs';
import { IPacks } from '../interfaces/IPacks';
import { AppDataSource } from '../index';

const packsRepository = AppDataSource.getRepository(Packs);

const getPacks = async (): Promise<IPacks[]> => {
  const packs = await packsRepository.find();
  return packs;
};

export { packsRepository, getPacks };
