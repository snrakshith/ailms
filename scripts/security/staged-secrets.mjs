import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

/** Quick offline pre-commit guard; not a replacement for TruffleHog or a secrets manager. */
export function inspectAddedLines(patch) {
  const findings = [];
  let file = '(unknown)';
  let line = 0;
  const detectors = [
    ['private key', /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
    ['AWS access key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
    ['GitHub token', /\b(?:ghp_|gho_|ghu_|ghs_|ghr_)[A-Za-z0-9]{30,}\b|\bgithub_pat_[A-Za-z0-9_]{30,}\b/],
    ['Stripe secret key', /\bsk_(?:live|test)_[A-Za-z0-9]{20,}\b/],
    ['hardcoded secret assignment', /(?:jwt_secret|client_secret|api_secret|cashfree_client_secret|aws_secret_access_key|private_key)\s*[:=]\s*['"][^'"\s$]{12,}['"]/i],
  ];
  for (const raw of patch.split('\n')) {
    if (raw.startsWith('+++ b/')) { file = raw.slice(6); continue; }
    const hunk = /^@@ -\d+(?:,\d+)? \+(\d+)/.exec(raw);
    if (hunk) { line = Number(hunk[1]); continue; }
    if (raw.startsWith('+') && !raw.startsWith('+++')) {
      const text = raw.slice(1);
      // Textual test placeholders and .env.example may still contain plausible keys: review manually.
      for (const [kind, pattern] of detectors) if (pattern.test(text)) findings.push(`${file}:${line}: ${kind}`);
      line++;
    } else if (!raw.startsWith('-') && !raw.startsWith('\\')) line++;
  }
  return findings;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    const patch = execFileSync('git', ['diff', '--cached', '--no-ext-diff', '--unified=0', '--', '.'], {encoding:'utf8',maxBuffer:20*1024*1024});
    const findings = inspectAddedLines(patch);
    if (findings.length) {
      console.error('Potential credential in staged changes (content redacted):\n'+findings.join('\n'));
      console.error('Remove the secret, rotate it if exposed, then stage the fix.');
      process.exitCode = 1;
    } else console.log('Staged secret patterns: clean');
  } catch(error) {
    console.error(`Could not inspect staged changes: ${error.message}`);
    process.exitCode=1;
  }
}
