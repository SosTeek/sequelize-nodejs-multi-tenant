import * as Sequelize from 'sequelize';
import { ModelTimestampExtend, WorkspaceExtend, CursorPaginationOrderSearchExtend, WorkspaceArgsExtend } from '.';

export interface InputEmailRegistryInterface extends WorkspaceExtend {
  name: string;
  email: string;
  phoneNumber: string;
  description?: string;
}

export interface EmailRegistryInterface extends ModelTimestampExtend, WorkspaceExtend {
  id: Sequelize.CreationOptional<number>;
  name: string;
  email: string;
  phoneNumber: string;
  description?: string;
}

export interface InputEmailRegistriesWithEmailRegistryGroupId {
  emailRegistryGroupId: number;
  emailRegistryIds?: number[];
  emailRegistries?: InputEmailRegistryInterface[];
  sanitize?: boolean;
}

export interface ArgsEmailRegistryInterface extends CursorPaginationOrderSearchExtend, WorkspaceArgsExtend {
}


export interface EmailRegistryModelInterface
  extends Sequelize.Model<EmailRegistryInterface, Partial<InputEmailRegistryInterface>>,
    EmailRegistryInterface {}
