import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateZapReport, evaluateReportFiles } from '../../scripts/security/zap-report-gate.mjs';

test('DAST passes when report contains no alerts', () => {
  assert.equal(evaluateZapReport({ site: [{ alerts: [] }] }).passed, true);
});
test('DAST permits low and informational risks', () => {
  assert.equal(
    evaluateZapReport({
      site: [
        {
          alerts: [
            { name: 'low', riskcode: '1' },
            { name: 'info', riskcode: 0 },
          ],
        },
      ],
    }).passed,
    true,
  );
});
test('DAST fails medium and high findings regardless of scanners exit code', () => {
  const result = evaluateZapReport({
    site: [
      {
        alerts: [
          { name: 'XSS', riskcode: '3' },
          { name: 'missing defense', riskdesc: 'Medium (High)' },
        ],
      },
    ],
  });
  assert.equal(result.passed, false);
  assert.equal(result.serious.length, 2);
});
test('DAST fails closed for broken or missing JSON report', () => {
  assert.throws(() => evaluateZapReport({}), /Malformed/);
  assert.throws(() => evaluateReportFiles(['/missing/aiquest-zap-report.json']), /ENOENT/);
});
test('DAST fails closed for unknown risks', () => {
  assert.throws(
    () => evaluateZapReport({ site: [{ alerts: [{ name: 'odd', risk: 'undetermined' }] }] }),
    /Unknown ZAP risk/,
  );
});
