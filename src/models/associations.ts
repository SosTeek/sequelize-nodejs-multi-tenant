import { Sequelize } from 'sequelize';
import getEmailRegistryModel from './emailRegistry';
import getEmailRegistryGroupModel from './emailRegistryGroup';
import getEmailRegistryEmailRegistryGroup from './emailRegistryEmailRegistryGroup';
import {
  ModelsInterface
} from '../interface';

const setupAssociations = (sequelize: Sequelize): ModelsInterface => {
  const EmailRegistry = getEmailRegistryModel(sequelize);
  const EmailRegistryGroup = getEmailRegistryGroupModel(sequelize);
  const EmailRegistryEmailRegistryGroup =
    getEmailRegistryEmailRegistryGroup(sequelize);

  /** Start email_registries Association */

  EmailRegistry.hasMany(EmailRegistryEmailRegistryGroup, {
    foreignKey: 'emailRegistryId',
    as: 'emailRegistryEmailRegistryGroups',
  });

  EmailRegistry.belongsToMany(EmailRegistryGroup, {
    through: { model: EmailRegistryEmailRegistryGroup },
    as: 'emailRegistryGroups',
    foreignKey: 'emailRegistryId',
    otherKey: 'emailRegistryGroupId',
  });

  /** End email_registries Association */

  // EmailRegistryEmailRegistryGroup.belongsTo(EmailRegistryGroup, {
  //   foreignKey: 'emailRegistryGroupId',
  //   as: 'emailRegistryGroupa',
  // });

  // EmailRegistryEmailRegistryGroup.belongsTo(EmailRegistry, {
  //   foreignKey: 'emailRegistryGroupId',
  //   as: 'emailRegistryGroup',
  // });

  // EmailRegistryGroup.hasMany(EmailRegistryEmailRegistryGroup, {
  //   foreignKey: 'emailRegistryGroupId',
  //   as: 'emailRegistryGroupEmailRegistries',
  // });

  // EmailRegistryGroup.hasMany(EmailRegistry, {
  //   // through: EmailRegistryEmailRegistryGroup(sequelize),
  //   as: 'emailRegistry',
  //   foreignKey: 'emailRegistryId',
  // });

  return {
    EmailRegistry,
    EmailRegistryGroup,
    EmailRegistryEmailRegistryGroup,
  };
};

export default setupAssociations;
