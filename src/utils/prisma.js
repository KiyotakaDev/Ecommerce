import { PrismaClient } from '@prisma/client'

// Create prisma instance
const prismaSingleton = () => {
  return new PrismaClient()
}

const globalForPrisma = globalThis

// If prisma instance exsits use it ?? create instance
const prisma = globalForPrisma.prisma ?? prismaSingleton()

export default prisma

// Create instance only if is in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma