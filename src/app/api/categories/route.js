import { NextResponse } from 'next/server'
import db from '@/utils/prisma'

export async function GET() {
  try {
    const users = await db.category.findMany({
      orderBy: {
        id: "asc"
      }
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const category = data.category.trim();
    const parent = data.parent;
    const id = data.id

    if (!category)
      return NextResponse.json(
        { errors: ["Category can not be empty"] },
        { status: 400 }
      );

    const newCategory = await db.category.update({
      where: { 
        id: id
      },
      data: {
        name: category,
        parent: parseInt(parent) 
      }
    })

    return NextResponse.json({ data: newCategory, message: "New category created!" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}