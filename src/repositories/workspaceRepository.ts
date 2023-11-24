import { InputWorkspaceInterface, WorkspaceInterface } from '../interface';
import { Workspace } from '../models';
import { BaseRepository } from './baseRepository';

export class WorkspaceRepository extends BaseRepository<InputWorkspaceInterface, WorkspaceInterface> {
  constructor() {
    super(Workspace);
  }
}
