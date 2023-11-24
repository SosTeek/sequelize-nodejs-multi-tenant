import { Sequelize } from 'sequelize';
import { EmailRegistryInterface, InputEmailRegistryInterface } from '../interface';
import EmailRegistry from '../models/emailRegistry'
import { BaseRepository } from './baseRepository';

export class EmailRegistryRepository extends BaseRepository<InputEmailRegistryInterface, EmailRegistryInterface> {
  constructor(sequelize: Sequelize) {
    super(EmailRegistry(sequelize));
  }
}
