import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Scan findings are advisory until their risk is HIGH (3) or MEDIUM (2). */
export function evaluateZapReport(report) {
  if (!report || !Array.isArray(report.site))
    throw new Error('Malformed ZAP report: missing site array.');
  const alerts = report.site.flatMap((site) => (Array.isArray(site.alerts) ? site.alerts : []));
  const serious = alerts.filter((alert) => {
    const numeric = Number(alert.riskcode);
    if (Number.isInteger(numeric) && numeric >= 0 && numeric <= 4) return numeric >= 2;
    const risk = String(alert.riskdesc || alert.risk || '').toLowerCase();
    if (/^(high|medium|critical)/.test(risk)) return true;
    if (/^(low|informational)/.test(risk)) return false;
    throw new Error(`Unknown ZAP risk value for ${String(alert.name || 'unnamed alert')}`);
  });
  return {
    passed: serious.length === 0,
    total: alerts.length,
    serious: serious.map((a) => ({
      name: String(a.name || a.alert || 'Unknown'),
      risk: String(a.riskdesc || a.riskcode),
    })),
  };
}

export function evaluateReportFiles(files) {
  if (!files.length) throw new Error('Provide at least one ZAP JSON report.');
  const findings = [];
  for (const file of files) {
    const result = evaluateZapReport(JSON.parse(fs.readFileSync(file, 'utf8')));
    findings.push({ file, ...result });
  }
  return findings;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const results = evaluateReportFiles(process.argv.slice(2));
    for (const result of results) {
      console.log(
        `${result.file}: ${result.total} alert classes; medium/high: ${result.serious.length}`,
      );
      for (const finding of result.serious) {
        console.error(`FAIL ${finding.risk}: ${finding.name}`);
      }
    }
    if (results.some((result) => !result.passed)) process.exitCode = 1;
  } catch (error) {
    console.error('DAST report gate error:', error.message);
    process.exitCode = 2;
  }
}
