import { GraphQLError } from 'graphql';
import { UserInterface, WorkspaceInterface } from '../interface';
import { WorkspaceService } from '../services';

class Guard {
  private static instance: Guard;

  private constructor() {}

  static get(): Guard {
    if (!Guard.instance) {
      Guard.instance = new Guard();
    }
    return Guard.instance;
  }
  grant = (user: UserInterface | undefined): UserInterface => {
    if (!user)
      throw new GraphQLError(`Auth Failed`, {
        extensions: {
          code: 'BAD_USER_INPUT',
          argumentName: 'authorization',
          http: {
            status: 401,
          },
        },
      });
    return user;
  };

  checkWorkspace = async (secret: string): Promise<WorkspaceInterface> => {
    const workspaceExists = await new WorkspaceService().findOne({ secret });
    if (!workspaceExists)
      throw new GraphQLError(`Invalid workspace secret id`, {
        extensions: {
          code: 'BAD_USER_INPUT',
          argumentName: 'authorization',
          http: {
            status: 401,
          },
        },
      });
    return workspaceExists;
  };

  grantWorkspace = (
    workspace: WorkspaceInterface | undefined
  ): WorkspaceInterface => {
    if (!workspace)
      throw new GraphQLError(`Invalid workspace secret id`, {
        extensions: {
          code: 'BAD_USER_INPUT',
          argumentName: 'authorization',
          http: {
            status: 401,
          },
        },
      });
    return workspace;
  };
}

const guard = Guard.get();

export { guard as Guard };
