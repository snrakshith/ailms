import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { ReferralCodeModel, ReferralAttributionModel } from '../referrals/referral.models.js';
import { EntitlementModel, PaymentOrderModel } from '../billing/billing.models.js';
import bcrypt from 'bcryptjs';
import { deleteAccountSchema } from '@sapling/contracts';
import { validateBody } from '../../core/contracts/validate.js';
import { requireAuth, clearSession } from '../../infrastructure/security/session.js';
import { HttpError } from '../../core/errors/http-error.js';
import { UserModel, TaskModel, AuditModel } from '../../infrastructure/database/mongodb/models.js';
import { LessonCompletionModel, LessonAttemptModel } from '../learning/learning.models.js';
import { NativeRefreshModel } from '../users/native-auth.models.js';
import { verifiedGoogleIdentity } from '../users/google-identity.js';
import { ModelComparisonQuotaModel } from '../labs/playground.models.js';
import {
  ReviewStateModel,
  ReviewEventModel,
  CapstoneProjectModel,
  TutorQuotaModel,
  TutorEventModel,
  ContentDraftModel,
  ContentReleaseModel,
} from '../learning/experience.models.js';
export function createPrivacyRouter() {
  const router = Router();
  router.use(requireAuth);
  router.get('/export', async (req, res) => {
    const userId = req.principal!.id;
    const [
      completions,
      attempts,
      reviews,
      reviewEvents,
      projects,
      tutorRequests,
      tutorUsage,
      modelUsage,
      paymentOrders,
      entitlements,
    ] = await Promise.all([
      LessonCompletionModel.find({ userId }).lean(),
      LessonAttemptModel.find({ userId }).lean(),
      ReviewStateModel.find({ userId }).lean(),
      ReviewEventModel.find({ userId }).lean(),
      CapstoneProjectModel.find({ userId }).lean(),
      TutorEventModel.find({ userId }).lean(),
      TutorQuotaModel.find({ userId }).lean(),
      ModelComparisonQuotaModel.find({ userId }).lean(),
      PaymentOrderModel.find({ userId }).select('-paymentSessionId').lean(),
      EntitlementModel.find({ userId }).lean(),
    ]);
    res.setHeader('content-disposition', 'attachment; filename="aiquest-data.json"');
    res.setHeader('cache-control', 'no-store');
    res.json({
      exportedAt: new Date().toISOString(),
      profile: req.principal,
      completions,
      attempts,
      reviews,
      reviewEvents,
      projects,
      tutorRequests,
      tutorUsage,
      modelUsage,
      paymentOrders,
      entitlements,
    });
  });
  router.delete('/account', validateBody(deleteAccountSchema), async (req, res) => {
    const userId = req.principal!.id;
    const user = await UserModel.findById(userId).select('+passwordHash');
    if (!user) throw new HttpError(403, 'Account verification failed', 'invalid_credentials');
    const validPassword =
      typeof req.body.password === 'string' &&
      typeof user.passwordHash === 'string' &&
      (await bcrypt.compare(req.body.password, user.passwordHash));
    let validGoogle = false;
    if (req.body.googleCredential && user.googleSubject) {
      const identity = await verifiedGoogleIdentity(req.body.googleCredential);
      validGoogle = identity.subject === user.googleSubject;
    }
    if (!validPassword && !validGoogle)
      throw new HttpError(403, 'Account verification failed', 'invalid_credentials');
    await Promise.all([
      LessonCompletionModel.deleteMany({ userId }),
      LessonAttemptModel.deleteMany({ userId }),
      ReviewStateModel.deleteMany({ userId }),
      ReviewEventModel.deleteMany({ userId }),
      CapstoneProjectModel.deleteMany({ userId }),
      TutorQuotaModel.deleteMany({ userId }),
      TutorEventModel.deleteMany({ userId }),
      ModelComparisonQuotaModel.deleteMany({ userId }),
      NativeRefreshModel.deleteMany({ userId }),
      ContentDraftModel.deleteMany({ authorId: userId }),
      ContentReleaseModel.updateMany(
        { $or: [{ authorId: userId }, { publishedBy: userId }] },
        { $set: { authorId: 'deleted', publishedBy: 'deleted' } },
      ),
      TaskModel.deleteMany({ createdBy: userId }),
      AuditModel.deleteMany({ actorId: userId }),
      EntitlementModel.deleteMany({ userId }),
      ReferralCodeModel.deleteMany({ userId }),
      ReferralAttributionModel.deleteMany({
        $or: [{ referredId: userId }, { referrerId: userId }],
      }),
      // Retain anonymized financial records for reconciliation/refunds, not learner identity.
      PaymentOrderModel.updateMany(
        { userId },
        {
          $set: { userId: `deleted:${randomUUID()}`, tenantId: 'deleted' },
          $unset: { paymentSessionId: 1 },
        },
      ),
    ]);
    await UserModel.deleteOne({ _id: userId });
    clearSession(res);
    res.status(204).end();
  });
  return router;
}
