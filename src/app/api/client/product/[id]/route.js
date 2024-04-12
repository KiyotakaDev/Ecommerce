import { NextResponse } from 'next/server'
import db from '@/utils/prisma'

export async function GET(_, { params }) {
  try {
    const { id } = params
    const products = await db.product.findFirst({
      where: {
        id: parseInt(id),
      }
    })

    return NextResponse.json({ products, message: "OK" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}