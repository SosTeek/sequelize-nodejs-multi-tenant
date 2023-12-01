import sequelize, { Dialect } from 'sequelize';

export class TenantDatabase {
  public sequelize: sequelize.Sequelize;
  private static instance: TenantDatabase;
  private dialect: sequelize.Dialect;
  private dbname: string;
  private username: string;
  private password: string;
  private host: string;
  private port: number;
  private maxPool: number;
  private minPool: number;

  public constructor(
    dbDialect: Dialect,
    dbDatabase: string,
    dbUserName: string,
    dbPassword: string,
    dbHost: string,
    dbPort: number
  ) {
    this.dialect = dbDialect;
    this.dbname = dbDatabase;
    this.username = dbUserName;
    this.password = dbPassword;
    this.host = dbHost;
    this.port = dbPort;
    this.maxPool = 10;
    this.minPool = 1;

    this.sequelize = new sequelize.Sequelize(
      this.dbname,
      this.username,
      this.password,
      {
        host: this.host,
        dialect: this.dialect,
        dialectOptions: {
          encrypt: true,
        },
        port: this.port,
        logging: false,
        timezone: 'utc',
        pool: {
          max: this.maxPool,
          min: this.minPool,
          acquire: 1000,
          idle: 1000,
        },
        define: {
          timestamps: true,
          createdAt: true,
          updatedAt: true,
        },
      }
    );
  }

  async connection(): Promise<void> {
    try {
      await this.sequelize.authenticate();
    } catch (error: any) {
      console.log(error.message);
      throw Error(error.message);
    }
  }
}
