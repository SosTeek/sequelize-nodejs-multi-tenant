import {
  EmailRegistryInterface,
  InputEmailRegistryInterface,
  ModelsInterface,
} from '../interface';
import { BaseRepository } from './baseRepository';
export class EmailRegistryRepository extends BaseRepository<
  InputEmailRegistryInterface,
  EmailRegistryInterface
> {
  constructor(models: ModelsInterface) {
    super(models.EmailRegistry);
  }
}
