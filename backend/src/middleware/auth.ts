import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import type { AdminPayload } from '../types/admin';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      message: 'Authorization token is required.',
    });

    return;
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    res.status(401).json({
      message: 'Invalid authorization format.',
    });

    return;
  }

  try {
    const payload = jwt.verify(
      token,
      env.JWT_SECRET,
    ) as AdminPayload;

    req.admin = payload;

    next();
  } catch {
    res.status(401).json({
      message: 'Invalid or expired token.',
    });
  }
};