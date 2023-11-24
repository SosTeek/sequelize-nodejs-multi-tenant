import * as Sequelize from 'sequelize';
import {  WorkspaceArgsExtend, WorkspaceInterface } from '.';

export interface InputUserInterface {
  sub?: string;
  name?: string;
  username?: string;
  email?: string;
  email_verified?: boolean;
  phone_number?: string;
  phone_number_verified?: boolean;
  role?: string;
  roles?: string[];
  password?: string;
  confirmation_status?: boolean;
  account_status?: boolean;
  status?: string;
  current_workspace_id?: number;
  companyInfo?: any;
  pointOfContact?: any;
  services?: any[];
}

export interface UserInterface  {
  id: Sequelize.CreationOptional<number>;
  sub: string;
  name: string;
  username: string;
  email: string;
  email_verified: boolean;
  phone_number: string;
  phone_number_verified: boolean;
  roles: string[];
  workspaces: WorkspaceInterface[];
  confirmation_status: boolean;
  account_status: boolean;
  status: string;
  current_workspace_id?: number;
  current_workspace: WorkspaceInterface;
  user_workspaces: WorkspaceInterface[];
  userRole?: any;
}

// export interface ArgsWorkspaceMembersInterface extends PaginationOrderSearchExtend, WorkspaceArgsExtend {
//   status?: UserWorkspaceStatusEnum;
//   service?: ServiceEnum;
// }
