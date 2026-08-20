import type { AdminPayload } from './admin';

declare global {
  namespace Express {
    interface Request {
      admin?: AdminPayload;
    }
  }
}

export {};