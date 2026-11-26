import assert from 'node:assert/strict';
const origin=process.env.API_TEST_ORIGIN||'http://localhost:4000';
const response=await fetch(`${origin}/openapi.json`);assert.equal(response.status,200);
const doc=await response.json();assert.equal(doc.openapi,'3.1.0');
for(const path of ['/auth/register','/auth/login','/tasks','/tasks/{id}','/audit'])assert.ok(doc.paths[path],`Missing path ${path}`);
console.log('PASS: OpenAPI route structure');
