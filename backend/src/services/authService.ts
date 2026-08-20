import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import type {
  AdminLoginData,
  AdminPayload,
} from '../types/admin';

import { prisma } from '../lib/prisma';

export const loginAdmin = async (
  data: AdminLoginData,
) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not configured.');
  }

  const admin = await prisma.admin.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!admin) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    admin.passwordHash,
  );

  if (!isPasswordValid) {
    return null;
  }

  const payload: AdminPayload = {
    id: String(admin.id),
    email: admin.email,
  };

  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: '2h',
  });

  return token;
};