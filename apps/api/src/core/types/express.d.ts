import type { User } from '@sapling/contracts';
declare global {
  namespace Express {
    interface Request { principal?: User }
  }
}
export {};
