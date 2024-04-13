import { NextResponse } from 'next/server'
import db from '@/utils/prisma'

export async function GET() {
  try {
    const categories = await db.category.findMany({
      include: {
        product: true
      }
    })

    return NextResponse.json({ categories, message: "Categories!" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}