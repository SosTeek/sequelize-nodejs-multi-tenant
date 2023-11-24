import * as dotenv from 'dotenv';
import { EnvironmentEnum } from '../enums';
import * as sequelize from 'sequelize';

dotenv.config();

const mustExist = <T>(value: T | undefined, name: string): T => {
  if (!value) {
    console.log(`Missing Config: ${name} !!!`);
    process.exit(1);
  }
  return value;
};

export const configs = {
  node_env: mustExist(
    process.env.NODE_ENVIRONMENT ||
      (EnvironmentEnum.development as EnvironmentEnum),
    'NODE_ENVIRONMENT'
  ),
  port: mustExist(+process.env.PORT!, 'PORT'),
};

export const db = {
  username: process.env.DB_USER! as string,
  password: process.env.DB_PASSWORD! as string,
  name: process.env.DB_NAME! as string,
  host: process.env.DB_HOST! as string,
  dialect: process.env.DB_DIALECT! as sequelize.Dialect,
  port: parseInt(process.env.DB_PORT!) as number,
  logging: false,
  timezone: 'utc' as string,
},
  /** Pagination */
  pgMinLimit = 10,
  pgMaxLimit = 100,
  /**** Cursor */
defaultCursor: string = 'id';

export * from './instance';
export * from './tenantConnectionManager';
