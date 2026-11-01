import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

let client: PrismaClient | undefined;

export function getDb() {
  if (!process.env.DATABASE_URL) throw new Error("Database is not configured");
  client ??= new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
      max: 3,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 10000,
    }),
  });
  return client;
}
