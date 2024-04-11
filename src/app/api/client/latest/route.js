import { NextResponse } from 'next/server'
import db from '@/utils/prisma'

export async function GET() {
  try {
    const latest = await db.product.findMany({
      orderBy: { id: 'desc' }
    })

    const first = latest.slice(0, 8)

    return NextResponse.json({ latest: first, message: "Last product!" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}