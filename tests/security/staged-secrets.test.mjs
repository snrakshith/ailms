import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {inspectAddedLines} from '../../scripts/security/staged-secrets.mjs';
const keyName=['jwt','secret'].join('_');
const sample=`@@ -0,0 +1,2 @@\n+const setting = "safe";\n+const ${keyName} = "embeddedpassword1234567890";`;;
test('precommit secret guard detects added secrets, but does not print their values',()=>{
 const findings=inspectAddedLines('+++ b/src/secrets.ts\n'+sample);
 assert.equal(findings.length,1);assert.match(findings[0],/src\/secrets.ts:2: hardcoded secret/);
 assert.equal(findings[0].includes('embeddedpassword'),false);
});
test('ignores removed content and ordinary configuration references',()=>{
 assert.equal(inspectAddedLines(`+++ b/x.ts\n@@ -1,1 +1,1 @@\n-const ${keyName} = "removedSecret12345";\n+const ${keyName} = process.env.JWT_SECRET;`).length,0);
});
