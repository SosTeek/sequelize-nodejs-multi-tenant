import { TenantDatabase } from '../config';
import setupAssociations from '../models/associations';
import { WorkspaceInterface } from '../interface';
class Tenant {
  private static instance: Tenant;

  private constructor() {}

  static get(): Tenant {
    if (!Tenant.instance) {
      Tenant.instance = new Tenant();
    }
    return Tenant.instance;
  }

  connectTenantDB = async (workspace: WorkspaceInterface): Promise<any> => {
    const tenantConnection = new TenantDatabase(
      'postgres',
      workspace.name,
      workspace.username,
      workspace.password,
      workspace.host,
      workspace.port
    );
    await tenantConnection.connection();

    return setupAssociations(tenantConnection.sequelize);
  };
}

const tenant = Tenant.get();

export { tenant as Tenant };
