import {describe,it,expect} from 'vitest';
import {renderEmail} from '../src/modules/notifications/templates.js';
describe('transactional email rendering',()=>{
 it('escapes attacker-controlled names and lesson titles in HTML',()=>{
  const template=renderEmail('lesson-complete',{name:'<img src=x>',lesson:'<script>alert(1)</script>'},'https://aiquest.example');
  expect(template.html).not.toContain('<img src=x>');
  expect(template.html).not.toContain('<script>alert(1)</script>');
  expect(template.html).toContain('&lt;img src=x&gt;');
  expect(template.text).toContain('<img src=x>');
 });
 it('links payment confirmation to authenticated billing',()=>{
  const result=renderEmail('purchase-confirmation',{name:'Ada'},'https://aiquest.example');
  expect(result.text).toContain('https://aiquest.example/billing');
 });
});
