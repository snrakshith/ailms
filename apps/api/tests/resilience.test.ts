import {describe,it,expect,vi} from 'vitest';
import {CircuitBreaker} from '../src/infrastructure/resilience/circuit-breaker.js';
import {retry} from '../src/infrastructure/resilience/retry.js';
describe('Resilience primitives',()=>{
 it('opens a circuit after repeated failures',async()=>{
  const breaker=new CircuitBreaker(2,30_000);const fail=()=>Promise.reject(new Error('down'));
  await expect(breaker.execute(fail)).rejects.toThrow('down');
  await expect(breaker.execute(fail)).rejects.toThrow('down');
  await expect(breaker.execute(fail)).rejects.toThrow('Circuit open');
 });
 it('retries transient errors',async()=>{
  const fn=vi.fn().mockRejectedValueOnce(new Error('transient')).mockResolvedValue('done');
  await expect(retry(fn,{attempts:2,baseDelayMs:1})).resolves.toBe('done');expect(fn).toHaveBeenCalledTimes(2);
 });
});
