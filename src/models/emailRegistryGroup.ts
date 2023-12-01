import * as Sequelize from 'sequelize';
import { EmailRegistryGroupModelInterface } from '../interface';
import EmailRegistryEmailRegistryGroup from './emailRegistryEmailRegistryGroup';

const EmailRegistryGroup = (sequelize: Sequelize.Sequelize) => {
  const EmailRegistryGroupModel = sequelize.define<EmailRegistryGroupModelInterface>(
    'email_registry_groups',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
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
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'inactive',
      },
      type: {
        type: Sequelize.ENUM('email', 'message'),
        allowNull: false,
        defaultValue: 'email',
      },
      filterCriteria: {
        type: Sequelize.JSONB,
        allowNull: true,
        field: 'filter_criteria',
      },
      isExistingCriteria: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'is_existing_criteria',
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      groupCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          name: 'email_registry_groups_slug_workspace_id_type',
          fields: ['slug', 'workspaceId', 'type'],
          where: {
            deletedAt: null,
          },
        },
      ],
    },
  );

  EmailRegistryGroupModel.hasMany(EmailRegistryEmailRegistryGroup(sequelize), {
    foreignKey: 'emailRegistryGroupId',
    as: 'emailRegistryGroupEmailRegistries',
  });
  
  return EmailRegistryGroupModel;
};

export default EmailRegistryGroup;
