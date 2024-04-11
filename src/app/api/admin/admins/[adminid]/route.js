import { NextResponse } from "next/server";
import db from '@/utils/prisma'

export async function DELETE(_, { params }) {
  try {
    const { adminid } = params;
    await db.admin.delete({
      where: {
        id: parseInt(adminid)
      }
    })
    return NextResponse.json("Admin deleted!")
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}