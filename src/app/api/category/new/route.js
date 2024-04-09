import { NextResponse } from "next/server";
import db from '@/utils/prisma'

export async function POST(request) {
  try {
    const data = await request.json()
    const category = data.category.trim()
    if (!category) return NextResponse.json({ errors: ["Category can not be empty"] }, { status: 400 })

    const categoryFound = await db.category.findUnique({
      where: {
        name: category
      }
    })

    if (categoryFound) {
      return NextResponse.json({ errors: ["Category already exists"] }, { status: 409 })
    }

    const newCategory = await db.category.create({
      data: {
        name: category
      }
    })

    return NextResponse.json({ data: newCategory, message: "New category created!" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
