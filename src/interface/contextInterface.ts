import { Sequelize } from "sequelize";
import { UserInterface, WorkspaceInterface } from ".";

export interface ContextInterface {
  user: UserInterface | undefined;
  workspace: WorkspaceInterface | undefined;
  token: string | undefined;
  sequelize: Sequelize | undefined;
}
