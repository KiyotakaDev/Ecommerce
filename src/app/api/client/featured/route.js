import { NextResponse } from 'next/server'
import db from '@/utils/prisma'

export async function GET() {
  try {
    const featured = await db.product.findFirst({
      orderBy: { id: 'desc' }
    })

    return NextResponse.json({ featured, message: "Last product!" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}