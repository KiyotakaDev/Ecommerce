import { NextResponse } from 'next/server'
import db from '@/utils/prisma'

export async function POST(request) {
  try {
    const { product, imagesPath, description, price, category } = await request.json()
    
    await db.product.create({
      data: {
        product,
        imagesPath,
        description,
        price: parseInt(price),
        categoryId: parseInt(category),
      },
    });
    return NextResponse.json("Product created!")
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}