import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: "postgresql://postgres:postgres@localhost:5432/gogig_media",
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma;