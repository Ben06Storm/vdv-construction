import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import type {
  AdminLoginData,
  AdminPayload,
} from '../types/admin';

import { prisma } from '../lib/prisma';

export const loginAdmin = async (
  data: AdminLoginData,
) => {
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

  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: '2h',
  });

  return token;
};