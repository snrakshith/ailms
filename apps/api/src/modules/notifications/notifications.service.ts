import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { env } from '../../config/env.js';
import { logger } from '../../infrastructure/observability/logging/logger.js';
import { emitJob } from '../../infrastructure/queue/jobs.js';
import { renderEmail, type TemplateName } from './templates.js';
let client: SESv2Client | undefined;
export async function sendEmail(template: TemplateName, to: string, data: Record<string, string>) {
  if (!env.SES_ENABLED) return { skipped: true };
  client ??= new SESv2Client({ region: env.AWS_REGION });
  const content = renderEmail(template, data, env.WEB_ORIGIN);
  await client.send(
    new SendEmailCommand({
      FromEmailAddress: env.SES_FROM_EMAIL,
      Destination: { ToAddresses: [to] },
      Content: {
        Simple: {
          Subject: { Data: content.subject, Charset: 'UTF-8' },
          Body: {
            Text: { Data: content.text, Charset: 'UTF-8' },
            Html: { Data: content.html, Charset: 'UTF-8' },
          },
        },
      },
    }),
  );
  return { skipped: false };
}
export async function queueEmail(
  template: TemplateName,
  to: string,
  data: Record<string, string>,
  eventKey: string,
) {
  if (!env.SES_ENABLED) return;
  if (env.QUEUE_ENABLED) {
    await emitJob(
      'transactional-email',
      { template, to, data, eventKey },
      `email-${eventKey.replace(/[^a-zA-Z0-9_-]/g, '_')}`,
    );
    return;
  }
  try {
    await sendEmail(template, to, data);
  } catch (error) {
    logger.error({ err: error, template }, 'Email delivery failed');
  }
}
