import { describe, it, expect } from 'vitest';
import { ApiRequestError } from './client';
describe('API error wrapper', () => {
  it('exposes stable code and status', () => {
    const error = new ApiRequestError(403, 'forbidden', 'No permission');
    expect(error.status).toBe(403);
    expect(error.message).toBe('No permission');
  });
});
