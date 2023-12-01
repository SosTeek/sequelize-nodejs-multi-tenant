import { ModelCtor } from "sequelize";
import {EmailRegistryModelInterface, EmailRegistryEmailRegistryGroupModelInterface, EmailRegistryGroupModelInterface } from ".";

export interface ModelsInterface {
  EmailRegistry: ModelCtor<EmailRegistryModelInterface>;
  EmailRegistryGroup: ModelCtor<EmailRegistryGroupModelInterface>;
  EmailRegistryEmailRegistryGroup: ModelCtor<EmailRegistryEmailRegistryGroupModelInterface>;
}