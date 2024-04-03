import { NextResponse } from "next/server";
import db from "@/utils/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { username, email, password } = await request.json()

    let errors = []

    const userFound = await db.admin.findUnique({
      where: {
        username: username,
      },
    });
    if (userFound) errors.push("Username already exists")
    const emailFound = await db.admin.findUnique({
      where: {
        email: email,
      },
    });
    if (emailFound) errors.push("Email is already in use")
    
    // Sending errors array
    if (userFound || emailFound) return NextResponse.json(errors, { status: 409 })
    

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await db.admin.create({
      data: {
        username: username,
        email: email,
        password: passwordHash,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json({ data: user, message: "Admin created!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
