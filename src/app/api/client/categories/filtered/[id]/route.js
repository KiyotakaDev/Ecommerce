import { NextResponse } from "next/server"
import db from '@/utils/prisma'

export async function GET(_, { params }) {
  try {
    const { id } = params

    const filtered = await db.product.findMany({
      where: {
        categoryId: parseInt(id)
      }
    })

    return NextResponse.json({ filtered, message: "OK" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}