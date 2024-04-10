import { NextResponse } from "next/server";
import db from '@/utils/prisma'

export async function DELETE(_, { params }) {
  try {
    const { productid } = params;
    await db.product.delete({
      where: {
        id: parseInt(productid)
      }
    })
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
    const { product, images, description, price } = await request.json()
    await db.product.update({
      where: {
        id: parseInt(productid)
      },
      data: {
        product,
        imagesPath: images,
        description,
        price
      }
    })
    return NextResponse.json("Product updated!")
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}