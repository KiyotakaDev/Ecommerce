import { NextResponse } from "next/server"
import db from '@/utils/prisma'

export async function GET() {
  try {
    const products = await db.product.findMany()

    return NextResponse.json({ products, message: "OK" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}