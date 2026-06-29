import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/admin/password";

export async function findAdminByEmail(email: string) {
  return prisma.adminUser.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
}

export async function findAdminById(id: string) {
  return prisma.adminUser.findUnique({ where: { id } });
}

export async function upsertSeedAdminUser(input: {
  email: string;
  password: string;
  name?: string;
}) {
  const email = input.email.trim().toLowerCase();
  const passwordHash = await hashPassword(input.password);

  return prisma.adminUser.upsert({
    where: { email },
    create: {
      email,
      passwordHash,
      name: input.name ?? "Administrator",
      active: true,
    },
    update: {
      passwordHash,
      name: input.name ?? "Administrator",
      active: true,
    },
  });
}
