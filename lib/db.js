import { PrismaClient } from "@prisma/client";

export const db = global.__db__ ?? new PrismaClient({log: ['query']});
if (process.env.NODE_ENV !== "production") {
  global.__db__ = db
}
