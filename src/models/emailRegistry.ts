import * as Sequelize from 'sequelize';
import { EmailRegistryModelInterface } from '../interface';

export default (sequelize: Sequelize.Sequelize) => {
  const EmailRegistry = sequelize.define<EmailRegistryModelInterface>(
    'email_registries',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: Sequelize.STRING,
        field: 'phone_number',
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      workspaceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'workspace_id',
        references: {
          model: 'workspaces',
          key: 'id',
        },
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          name: 'email_registries_email_workspace_id',
          fields: ['email', 'workspaceId'],
          where: {
            deletedAt: null,
          },
        },
      ],
    }
  );
  
  return EmailRegistry;
};
