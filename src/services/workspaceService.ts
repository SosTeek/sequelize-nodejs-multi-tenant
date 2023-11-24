import { WhereOptions } from 'sequelize';
import { WorkspaceInterface } from '../interface';
import { WorkspaceRepository } from '../repositories';

export class WorkspaceService {
  private repository: WorkspaceRepository;

  constructor() {
    this.repository = new WorkspaceRepository();
  }

  findOne({
    secret,
    owner_id,
  }: {
    secret?: string;
    owner_id?: number;
  }): Promise<WorkspaceInterface> {
    let where: WhereOptions<any> = {};
    if (secret) {
      where = { ...where, secret: secret };
    }
    if (owner_id) {
      where = { ...where, owner_id: owner_id };
    }
    return this.repository.findOne({ where });
  }

  async getCreditsUsageSummary({
    workspaceId,
    fromDate,
    toDate,
  }: {
    workspaceId: number;
    fromDate: Date;
    toDate: Date;
  }): Promise<[any]> {
    const params = `:workspaceId, :fromDate, :toDate`;
    return this.repository.query({
      functionName: `get_workspace_credits_usage_summary`,
      where: { workspaceId, fromDate, toDate },
      params: params,
    });
  }
}
