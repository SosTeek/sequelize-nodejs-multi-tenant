import * as Sequelize from 'sequelize';
// import { TenantDatabase } from '../../config';
import { EmailRegistryEmailRegistryGroupModelInterface } from '../interface';
import EmailRegistryGroup from './emailRegistryGroup';
// const sequelize = TenantDatabase.sequelize;

const EmailRegistryEmailRegistryGroup = (sequelize: Sequelize.Sequelize) => {
  const EmailRegistryEmailRegistryGroupModel = sequelize.define<EmailRegistryEmailRegistryGroupModelInterface>(
    'email_registry_email_registry_groups',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      emailRegistryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'email_registry_id',
        references: {
          model: 'email_registries',
          key: 'id',
        },
      },
      emailRegistryGroupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'email_registry_group_id',
        references: {
          model: 'email_registry_groups',
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
          name: 'email_registry_email_registry_groups_email_registry_id_email_registry_group_id',
          fields: ['emailRegistryId', 'emailRegistryGroupId'],
          where: {
            deletedAt: null,
          },
        },
      ],
    },
  );

  EmailRegistryEmailRegistryGroupModel.belongsTo(EmailRegistryGroup(sequelize), {
    foreignKey: 'emailRegistryGroupId',
    as: 'emailRegistryGroup',
  });

  

  return EmailRegistryEmailRegistryGroupModel;
};

export default EmailRegistryEmailRegistryGroup;
