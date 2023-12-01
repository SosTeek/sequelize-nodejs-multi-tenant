import { Sequelize } from "sequelize";
import { ModelsInterface, UserInterface, WorkspaceInterface } from ".";

export interface ContextInterface {
  user: UserInterface | undefined;
  workspace: WorkspaceInterface | undefined;
  token: string | undefined;
  models: ModelsInterface | undefined;
}
