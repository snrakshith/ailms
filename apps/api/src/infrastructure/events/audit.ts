import { AuditModel } from '../database/mongodb/models.js';
import { currentContext } from '../../core/context/request-context.js';
export async function recordAudit(params: {
  tenantId: string;
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
}) {
  await AuditModel.create({ ...params, requestId: currentContext()?.requestId });
}
