import * as Sequelize from 'sequelize';
import {
  EmailRegistryInterface,
  InputEmailRegistryEmailRegistryGroupInterface,
  InputEmailRegistryInterface,
  ModelTimestampExtend,
  PaginationOrderSearchExtend,
  WorkspaceArgsExtend,
} from '.';

export interface InputAge {
  from: number;
  to: number;
}

export interface InputFilterCriteria {
  age?: InputAge;
  gender?: string;
  province?: string;
  district?: string;
  nationality?: string;
}

export interface InputEmailRegistryGroupInterface {
  label: string;
  slug?: string;
  workspaceId: Sequelize.CreationOptional<number>;
  status: string;
  type: string;
  sanitize?: boolean;
  emailRegistries?: number[];
  emailRegistryGroupEmailRegistries?: InputEmailRegistryEmailRegistryGroupInterface[];
  filterCriteria?: InputFilterCriteria;
  isExistingCriteria?: boolean;
  csvData?: InputEmailRegistryInterface[];
  description?: string;
  groupCode?: string;
}

export interface InputEmailGroupRegistryWithEmailRegistriesInterface {
  label: string;
  workspaceId: Sequelize.CreationOptional<number>;
  status: string;
  type:string;
  sanitize: boolean;
  emailRegistries: InputEmailRegistryInterface[];
}

export interface InputEmailGroupRegistryWithExistingEmailRegistriesInterface {
  label: string;
  workspaceId: Sequelize.CreationOptional<number>;
  status: string;
  type:string;
  sanitize: boolean;
  emailRegistries: number[];
}

export interface EmailRegistryGroupInterface extends ModelTimestampExtend {
  id: Sequelize.CreationOptional<number>;
  label: string;
  slug: string;
  workspaceId: Sequelize.CreationOptional<number>;
  status: string;
  type:string;
  emailRegistries?: EmailRegistryInterface[];
  filterCriteria: Record<string, unknown>;
  isExistingCriteria: boolean;
  description: string;
  groupCode: string;
}

export interface ArgsEmailRegistryGroupInterface extends PaginationOrderSearchExtend, WorkspaceArgsExtend {}

export interface EmailRegistryGroupModelInterface
  extends Sequelize.Model<EmailRegistryGroupInterface, Partial<InputEmailRegistryGroupInterface>>,
    EmailRegistryGroupInterface {}
