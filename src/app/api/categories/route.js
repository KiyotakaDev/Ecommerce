import { NextResponse } from 'next/server'
import db from '@/utils/prisma'

export async function GET() {
  try {
    const users = await db.category.findMany({
      orderBy: {
        name: "asc"
      }
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}