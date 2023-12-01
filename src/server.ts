import 'colors';
import { ApolloServer, BaseContext } from '@apollo/server';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import loglevel from 'loglevel';
import { GraphQLFormattedError } from 'graphql';
import http from 'http';
import { configs } from './config';
import { schema } from './graphql/schema';
import { EnvironmentEnum } from './enums';
import {
  ContextInterface,
  ModelsInterface,
  UserInterface,
  WorkspaceInterface,
} from './interface';
import { Database } from './config';
import { Tenant } from './config';
// import EmailRegistry from './models/emailRegistry';
// import model from "./models";

// const { EmailRegistry } = model

import { Guard } from './middlewares';

class Server {
  expressApp: express.Application;
  logger: loglevel.Logger;
  public async connectDB() {
    await Database.connection();
  }

  constructor() {
    this.expressApp = express();
    this.logger = loglevel.getLogger('apollo-server');
    this.connectDB();
  }

  private unhandledRejectionProcess() {
    process.on('unhandledRejection', (reason, promise) => {
      console.error(
        'Unhandled Promise Rejection at:',
        promise,
        'reason:',
        reason
      );

      // Optionally, you can log the error, send alerts, or perform cleanup before exiting
      // process.exit(1);
    });
  }

  private uncaughtExceptionProcess() {
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      // Optionally, you can log the error, send alerts, or perform cleanup before exiting
      // process.exit(1);
    });
  }

  public async start() {
    this.configuration();
    this.logger.setLevel(
      configs.node_env === EnvironmentEnum.production
        ? loglevel.levels.INFO
        : loglevel.levels.DEBUG
    );

    this.unhandledRejectionProcess(); // Set up the unhandledRejection listener
    this.uncaughtExceptionProcess();

    const httpServer = http.createServer(this.expressApp);

    const server = new ApolloServer<BaseContext>({
      schema: schema,
      introspection: true,
      csrfPrevention: false,
      includeStacktraceInErrorResponses: true,
      cache: 'bounded',
      formatError: (formattedError: GraphQLFormattedError) => {
        if (
          formattedError.extensions?.code ===
          ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
        ) {
          return {
            ...formattedError,
            message:
              "Your query doesn't match the schema. Try double-checking it!",
          };
        }
        return formattedError;
      },
      plugins: [
        ApolloServerPluginCacheControl({
          defaultMaxAge: 1,
          calculateHttpHeaders: false,
        }),
        configs.node_env === EnvironmentEnum.production
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageLocalDefault(),
        ApolloServerPluginInlineTrace({
          includeErrors: { transform: (error) => error },
        }),
      ],
    });

    await server.start();

    this.expressApp.use(
      '/graphql',
      cors<cors.CorsRequest>({ origin: 'localhost:3000' }),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({
          req,
          res,
        }: {
          req: express.Request;
          res: express.Response;
        }): Promise<ContextInterface> => {
          const token = req.headers.authorization as string;
          const secret = req.headers?.['x-workspace-secret-id'] as string;

          let workspace: WorkspaceInterface | undefined,
            user: UserInterface | undefined,
            models: ModelsInterface | undefined;
          if (secret) {
            // worksapce:secret {workspaceVal}
            workspace = await Guard.checkWorkspace(secret);
            models = await Tenant.connectTenantDB(workspace);
            // console.log(sequelize?.config.database)
          }
          if (token) {
            // user = await Guard.auth(token.replace('Bearer ', ''), workspace);
          }

          return {
            workspace,
            user,
            token,
            models,
          };
        },
      })
    );

    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: true }));

    await new Promise<void>((resolve) => {
      const port = this.expressApp.get('port');
      httpServer.listen({ port: port }, resolve);
      console.log(
        '🚀 Apollo server running at'.blue,
        `http://localhost:${this.expressApp.get('port')}/graphql`.blue.bold
      );
    });
  }

  private configuration(): void {
    this.expressApp.set('port', configs.port);
  }
}

const server = new Server();

server.start().catch((error) => {
  console.log('ROOT ERROR', error);
});
