import { Sequelize, Options } from 'sequelize';
import express from 'express';
import { WorkspaceService } from '../services';

class Tenant {
  private static instance: Tenant;
  private connectionMap: Map<string, Sequelize>;

  private constructor() {
    this.connectionMap = new Map();
  }

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
      return res.status(400).json({ message: 'Something went wrong!!' });
    }

    const sequelize = await this.getDatabaseConnection(secret);

    return sequelize;  
  };

  private getDatabaseConnection = async (workspacesecret: string) => {
    if (!this.connectionMap.has(workspacesecret)) {
      const workspace = await new WorkspaceService().findOne({
        secret: workspacesecret,
      });

      const sequelizeOptions: Options = {
        host: workspace.host,
        dialect: 'postgres',
        port: workspace.port,
        logging: false,
        timezone: 'utc',
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 0,
          evict: 15000 
        },
        define: {
          timestamps: true,
          createdAt: true,
          updatedAt: true,
        },
      };

      const newConnection = new Sequelize(
        workspace.name,
        workspace.username,
        workspace.password,
        sequelizeOptions
      );

      this.connectionMap.set(workspacesecret, newConnection);
      return newConnection;
    }

    return this.connectionMap.get(workspacesecret);
  };
}

const tenant = Tenant.get();

export { tenant as Tenant };
