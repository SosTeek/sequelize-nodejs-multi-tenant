import * as Sequelize from 'sequelize';

import { UserInterface } from './';
// import { ServiceEnum } from '../enums';

export interface InputWorkspaceInterface {
  label: string;
  secret?: string;
  owner_id: Sequelize.CreationOptional<number>;
  workspace_users?: any[];
  user?: UserInterface;
  userWorkspaceRoles?: any[];
  name?: string;
  username?: string;
  host?: string;
  password?: string;
  port?: number;
}
export interface WorkspaceInterface  {
  id: Sequelize.CreationOptional<number>;
  label: string;
  secret: string;
  owner_id: Sequelize.CreationOptional<number>;
  user?: UserInterface;
  userWorkspaceRoles?: any[];
  name: string;
  username: string;
  host: string;
  password: string;
  port: number;
  user_roles?: any[];
  company?: any;
  services: Services[];
}

interface Services {
  service: string; 
  availableBalance: number;
  serviceRate: number;
}

export interface WorkspaceArgsExtend {
  workspace_id?: number;
  workspaceId?: number;
}

export interface WorkspaceVerificationInterface {
  email?: string;
  phoneNumber?: string;
  companyName?: string;
  companyRegNo?: string;
}

// export interface ArgsWorkspaceInterface extends CursorPaginationOrderSearchExtend, WorkspaceArgsExtend {
//   service?: ServiceEnum
//  }
