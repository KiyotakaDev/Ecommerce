import { NextResponse } from "next/server";
import db from "@/utils/prisma";

export async function GET(_, { params }) {
  const { id } = params;

  try {
    const parentCategory = await db.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!parentCategory) {
      return res.status(404).json({ message: "Parent category not found" });
    }

    return NextResponse.json(parentCategory);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const { id } = params;

  try {
    await db.category.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json("Category deleted");
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
