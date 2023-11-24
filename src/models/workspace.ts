import * as Sequelize from "sequelize";
import { Database } from "../config";

const sequelize = Database.sequelize;

export class Workspace extends Sequelize.Model<
  Sequelize.InferAttributes<Workspace>,
  Sequelize.InferCreationAttributes<Workspace>
> {
  declare id: Sequelize.CreationOptional<number>;
  declare name: string;
  declare username: string;
  declare password: string;
  declare host: string;
  declare port: number;
  declare label: string;
  declare secret: string;
  declare owner_id: Sequelize.CreationOptional<number>;
}

Workspace.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    host: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    port: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    label: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    secret: {
      type: Sequelize.STRING(27),
      allowNull: false,
    },
    owner_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "workspaces",
    sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["secret"],
        where: {
          deleted_at: null,
        },
      },
    ],
  }
);