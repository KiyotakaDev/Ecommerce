import { NextResponse } from "next/server";
import db from '@/utils/prisma'
import fs from 'fs/promises'

export async function DELETE(_, { params }) {
  try {
    const { productid } = params;
    const product = await db.product.delete({
      where: {
        id: parseInt(productid)
      }
    })
    await fs.unlink(`public${product.imagesPath}`)

    return NextResponse.json("Product deleted!")
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(_, { params }) {
  try {
    const { productid } = params;
    const product = await db.product.findFirst({
      where: {
        id: parseInt(productid)
      }
    })
    return NextResponse.json({ data: product, message: "Product found" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { productid } = params
    const { product, imagesPath, description, price, category, properties } = await request.json()
    await db.product.update({
      where: {
        id: parseInt(productid)
      },
      data: {
        product,
        imagesPath,
        description,
        price: parseInt(price),
        categoryId: parseInt(category),
        properties
      }
    })
    return NextResponse.json("Product updated!")
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}