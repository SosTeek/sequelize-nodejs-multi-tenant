import { Sequelize } from 'sequelize';
import express from 'express';
import { WorkspaceService } from '../services';

const connectionMap = new Map();

class Tenant {
  private static instance: Tenant;

  private constructor() {}

  static get(): Tenant {
    if (!Tenant.instance) {
      Tenant.instance = new Tenant();
    }
    return Tenant.instance;
  }

  connectTenantDB = async (
    req: express.Request,
    res: express.Response
  ): Promise<Sequelize | any> => {
    const secret = req.headers?.['x-workspace-secret-id'] as string;

    if (!secret) {
      return res.send(400).json({ message: 'Something went wrong!!' });
    }

    return await this.getDatabaseConnection(secret);
  };

  getDatabaseConnection = async (workspacesecret: string) => {
    if (!connectionMap.has(workspacesecret)) {
      const workspace = await new WorkspaceService().findOne({
        secret: workspacesecret,
      });
      const newConnection = new Sequelize(
        workspace.name,
        workspace.username,
        workspace.password,
        {
          host: workspace.host,
          dialect: 'postgres',
          port: workspace.port,
          logging: false,
          timezone: 'utc',
          pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 1000,
          },
          define: {
            timestamps: true,
            createdAt: true,
            updatedAt: true,
          },
        }
      );

      return newConnection;
    }

    return connectionMap.get(workspacesecret);
  };
}

const tenant = Tenant.get();

export { tenant as Tenant };
