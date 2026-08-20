import 'dotenv/config';
import bcrypt from 'bcrypt';

import { prisma } from '../lib/prisma';

const createAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'ADMIN_EMAIL and ADMIN_PASSWORD are required.',
    );
  }

  const existingAdmin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  if (existingAdmin) {
    throw new Error(
      `Admin with email ${email} already exists.`,
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.create({
    data: {
      email,
      passwordHash,
    },
  });

  console.log(`Admin created: ${admin.email}`);

  await prisma.$disconnect();
};

createAdmin().catch(async (error) => {
  console.error('Failed to create admin:', error);

  await prisma.$disconnect();
  process.exit(1);
});