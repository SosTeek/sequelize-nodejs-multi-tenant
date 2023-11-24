import { defaultCursor } from '../config';
import * as Sequelize from 'sequelize';
import { WhereOptions } from 'sequelize';
import { SortEnum } from '../enums';
import { SequlizeQueryGenerator } from '../helpers';
import {
  ArgsEmailRegistryInterface,
  EmailRegistryInterface,
  InputEmailRegistryInterface,
} from '../interface';
import { EmailRegistryRepository } from '../repositories';

export class EmailRegistryService {
  private repository: EmailRegistryRepository;
  constructor(sequelize: Sequelize.Sequelize) {
    this.repository = new EmailRegistryRepository(sequelize);
  }

  async create(
    input: InputEmailRegistryInterface
  ): Promise<EmailRegistryInterface> {
    return this.repository.create(input, {});
  }

  async findAll({
    ids,
    emails,
    workspaceId,
  }: {
    ids?: number[];
    emails?: string[];
    workspaceId?: number;
  }): Promise<EmailRegistryInterface[]> {
    let where: WhereOptions<any> = {};

    if (workspaceId) {
      where = { ...where, workspace_id: workspaceId };
    }

    if (ids) {
      where = { ...where, id: { [Sequelize.Op.in]: ids } };
    }
    if (emails) {
      where = { ...where, email: { [Sequelize.Op.in]: emails } };
    }
    return this.repository.findAll({ where });
  }

  async findAndCountAll({
    cursor,
    limit,
    order,
    sort,
    cursorOrder,
    cursorSort,
    query,
    workspaceId,
  }: ArgsEmailRegistryInterface): Promise<{
    count: number;
    cursorCount: number;
    rows: EmailRegistryInterface[];
  }> {
    let emailRegistryEmailRegistryGroupsWhere: WhereOptions<any> = {};
    let where: WhereOptions<any> = {},
      cursorWhere: WhereOptions<any> = {},
      orderItem: Sequelize.Order = [];

    if (cursor) {
      if (cursorSort === SortEnum.desc) {
        cursorWhere = {
          ...cursorWhere,
          [defaultCursor]: { [Sequelize.Op.lt]: cursor },
        };
      } else {
        cursorWhere = {
          ...cursorWhere,
          [defaultCursor]: { [Sequelize.Op.gt]: cursor },
        };
      }
    }

    if (query) {
      where = {
        ...where,
        [Sequelize.Op.or]: SequlizeQueryGenerator.searchRegex({
          query,
          columns: ['name', 'email'],
        }),
      };
    }
    if (workspaceId) {
      where = { ...where, workspaceId: workspaceId };
    }
    if (order && sort) {
      orderItem = [...orderItem, [order, sort]];
    }

    if (cursorOrder && cursorSort) {
      orderItem = [...orderItem, [cursorOrder, cursorSort]];
    }
    const [count, cursorCount, rows] = await Promise.all([
      this.repository.count({ where: where }),
      this.repository.count({ where: { ...cursorWhere, ...where } }),
      this.repository.findAll({
        where: { ...cursorWhere, ...where },
        limit,
        order: orderItem,
      }),
    ]);

    return { cursorCount, count, rows };
  }

  async findByPk(id: number): Promise<EmailRegistryInterface> {
    const emailRegistryExists = await this.repository.findByPk(id);
    if (!emailRegistryExists)
      throw new Error(`Email registry: ${id} does not exist!`);
    return emailRegistryExists;
  }

  async updateOne(
    id: number,
    input: Partial<InputEmailRegistryInterface>
  ): Promise<EmailRegistryInterface> {
    const emailRegistryExists = await this.repository.findByPk(id);
    if (!emailRegistryExists)
      throw new Error(`Email registry: ${id} does not exist!`);

    const [update] = await this.repository.updateOne({ id, input });
    if (update === 0) throw new Error(`Email registry: ${id} does not exist!`);
    return this.findByPk(id);
  }

  async update(
    { email }: { email?: string },
    input: Partial<InputEmailRegistryInterface>
  ): Promise<[number]> {
    let where: WhereOptions<any> = {};
    if (email) {
      where = { ...where, email: email };
    }
    return this.repository.update({
      where,
      input,
    });
  }

  async deleteOne(id: number): Promise<boolean> {
    const emailRegistryExists = await this.repository.findByPk(id);
    if (!emailRegistryExists)
      throw new Error(`Email registry: ${id} does not exist!`);
    await this.repository.deleteOne(id);
    return true;
  }

  async getCampaignReportReciepientList({
    campaignId,
    fromDate,
    toDate,
    reportType,
    messagingPlatform,
    query,
  }: {
    campaignId: number;
    fromDate: Date;
    toDate: Date;
    reportType: string;
    messagingPlatform: string;
    query: string;
  }): Promise<[any]> {
    const params = `:campaignId, :reportType, :messagingPlatform, :fromDate, :toDate, :query`;
    return this.repository.tenantDbQuery({
      functionName: `get_recipients_lists_from_campaign_report`,
      where: { campaignId, reportType, messagingPlatform, fromDate, toDate, query },
      params: params,
    });
  }
}
