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