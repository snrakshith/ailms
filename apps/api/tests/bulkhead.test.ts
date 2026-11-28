import { describe, it, expect } from 'vitest';
import { Bulkhead } from '../src/infrastructure/resilience/bulkhead.js';
describe('Bulkhead', () => {
  it('caps concurrent work', async () => {
    const limiter = new Bulkhead(1);
    let active = 0,
      max = 0;
    await Promise.all(
      Array.from({ length: 3 }, () =>
        limiter.execute(async () => {
          active++;
          max = Math.max(max, active);
          await new Promise((resolve) => setTimeout(resolve, 3));
          active--;
        }),
      ),
    );
    expect(max).toBe(1);
  });
});
