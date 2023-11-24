import { InformationEvent } from 'http';
import { CursorPagination, SuccessResponse } from '../../helpers';
import {
  ArgsEmailRegistryInterface,
  ContextInterface, InputEmailRegistryInterface
} from '../../interface';
import { Guard, Validator } from '../../middlewares';
import { EmailRegistryService } from '../../services';
import {
  createEmailRegistry,
  updateEmailRegistry
} from '../../validators';

export const emailRegistryResolvers : any = {
  Mutation: {
    createEmailRegistry: async (
      parent: ParentNode,
      args: { input: InputEmailRegistryInterface; sanitize: boolean },
      contextValue: ContextInterface,
      info: InformationEvent
    ) => {
      const workspace = Guard.grantWorkspace(contextValue.workspace);
      const sequelize = contextValue.sequelize
      Validator.check(createEmailRegistry, args.input);
      args.input.workspaceId = workspace.id;
      const data = await new EmailRegistryService(sequelize!).create(args.input);

      return SuccessResponse.send({
        message: 'Email registry is successfully created.',
        data: data,
      });
    },
    updateEmailRegistry: async (
      parent: ParentNode,
      args: {
        id: number;
        input: InputEmailRegistryInterface;
        sanitize: boolean;
      },
      contextValue: ContextInterface,
      info: InformationEvent
    ) => {
      const workspace = Guard.grantWorkspace(contextValue.workspace);
      Validator.check(updateEmailRegistry, args.input);
      args.input.workspaceId = workspace.id;

      const data = await new EmailRegistryService(contextValue.sequelize!).updateOne(
        args.id,
        args.input
      );

      return SuccessResponse.send({
        message: 'Email registry is successfully updated.',
        data: data,
      });
    },
    deleteEmailRegistry: async (
      parent: ParentNode,
      args: { id: number },
      contextValue: ContextInterface,
      info: InformationEvent
    ) => {
      Guard.grantWorkspace(contextValue.workspace);
      await new EmailRegistryService(contextValue.sequelize!).deleteOne(args.id);

      return SuccessResponse.send({
        message: 'Email registry is successfully deleted.',
      });
    },
  },

  Query: {
    emailRegistries: async (
      parent: ParentNode,
      args: ArgsEmailRegistryInterface,
      contextValue: ContextInterface,
      info: InformationEvent
    ) => {
      const workspace = Guard.grantWorkspace(contextValue.workspace);


      const { cursor, limit, order, sort, cursorSort, cursorOrder, query } =
        CursorPagination.getCursorQuery({
          before: args.before,
          last: args.last,
          after: args.after,
          first: args.first,
          query: args.query,
          sort: args.sort,
          order: args.order,
        });

      const { cursorCount, count, rows } =
        await new EmailRegistryService(contextValue.sequelize!).findAndCountAll({
          cursor,
          limit,
          order,
          sort,
          cursorSort,
          cursorOrder,
          query,
          workspaceId: workspace.id,
        });

      const { data, pageInfo } = CursorPagination.cursor({
        cursorCount,
        count,
        rows,
        cursor,
        limit,
      });

      return SuccessResponse.send({
        message: ' Email Registries list is successfully fetched.',
        edges: data,
        pageInfo: pageInfo,
      });
    },
    emailRegistry: async (
      parent: ParentNode,
      args: { id: number },
      contextValue: ContextInterface,
      info: InformationEvent
    ) => {
      Guard.grantWorkspace(contextValue.workspace);
      const data = await new EmailRegistryService(contextValue.sequelize!).findByPk(args.id);

      return SuccessResponse.send({
        message: 'Email registry details is successfully fetched.',
        data: data,
      });
    },
    campaignReportReciepientList: async (
      parent: ParentNode,
      args: any,
      contextValue: ContextInterface,
      info: InformationEvent,
    ) => {
      Guard.grantWorkspace(contextValue.workspace);
      // Guard.grant(contextValue.user);
      let { campaignId, reportType, messagingPlatform, fromDate, toDate, query } = args;
      fromDate = fromDate || new Date(1990);
      toDate = toDate || new Date(Date.now());
      const result = await new EmailRegistryService(contextValue.sequelize!).getCampaignReportReciepientList({
        campaignId,
        reportType,
        fromDate,
        messagingPlatform,
        toDate,
        query
      });

      return SuccessResponse.send({
        message: 'Email registry details is successfully fetched.',
        data: result,
      });
    },
  }
};
