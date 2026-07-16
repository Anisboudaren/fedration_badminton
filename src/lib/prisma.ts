import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaSchemaVersion: string | undefined;
};

// Bumped when SiteSettings.contactInfo was added — clears stale dev singleton after prisma generate.
const PRISMA_SCHEMA_VERSION = "2026-07-16-chrome-text";

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma =
  globalForPrisma.prismaSchemaVersion === PRISMA_SCHEMA_VERSION
    ? (globalForPrisma.prisma ?? createPrismaClient())
    : createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaSchemaVersion = PRISMA_SCHEMA_VERSION;
}

export default prisma;
