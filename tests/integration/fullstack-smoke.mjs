// No external npm dependencies. Run after API and MongoDB are available.
import assert from 'node:assert/strict';
const base=process.env.API_TEST_ORIGIN||'http://localhost:4000';
let seq=0;
async function session(){
 const csrf=await fetch(`${base}/api/v1/auth/csrf`);
 assert.equal(csrf.status,200);
 const token=(await csrf.json()).token;
 const cookie=csrf.headers.get('set-cookie')?.split(';')[0];
 const name=`smoke-${Date.now()}-${seq++}`;
 const auth=await fetch(`${base}/api/v1/auth/register`,{method:'POST',headers:{'content-type':'application/json','x-csrf-token':token,cookie,origin:process.env.WEB_ORIGIN||'http://localhost:5173'},body:JSON.stringify({name,email:`${name}@example.test`,password:'test-only-long-secret-2026'})});
 const authBody=await auth.json();assert.equal(auth.status,201,JSON.stringify(authBody));
 return {csrf:token,cookie:`${cookie}; ${auth.headers.get('set-cookie')?.split(';')[0]}`,tenant:authBody.user.tenantId};
}
async function call(s,path,method='GET',body){return fetch(`${base}/api/v1${path}`,{method,headers:{'content-type':'application/json','x-csrf-token':s.csrf,cookie:s.cookie,origin:process.env.WEB_ORIGIN||'http://localhost:5173'},body:body&&JSON.stringify(body)});}
const a=await session(),b=await session();
const created=await call(a,'/tasks','POST',{title:'private task'});
const createdBody=await created.json();assert.equal(created.status,201,JSON.stringify(createdBody));
const id=createdBody.data.id;
const asB=await call(b,`/tasks/${id}`,'PATCH',{title:'hacked'});
assert.equal(asB.status,404,'Cross-tenant task IDs must not be writable');
const list=await call(b,'/tasks');assert.equal(list.status,200);
assert.equal((await list.json()).data.length,0,'No tasks from another tenant should be visible');
const noCsrf=await fetch(`${base}/api/v1/tasks`,{method:'POST',headers:{cookie:a.cookie,'content-type':'application/json'},body:JSON.stringify({title:'not allowed'})});
assert.equal(noCsrf.status,403);
console.log('PASS: tenant isolation, CSRF and task creation');
