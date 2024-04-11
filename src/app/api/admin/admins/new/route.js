import { NextResponse } from "next/server";
import db from "@/utils/prisma";
import bcrypt from "bcrypt";
import { zodAdmin } from "@/utils/schemas";

export async function POST(request) {
  try {
    let errors = [];
    const client = await request.json();
    if (client.password !== client.confirm_password)
      errors.push("Password do not match");

    const validateFields = zodAdmin.safeParse(client);
    if (!validateFields.success) {
      const fieldErrors = validateFields.error.formErrors.fieldErrors;
      for (const err in fieldErrors) {
        errors.push(fieldErrors[err][0]);
      }
    }

    const userFound = await db.admin.findUnique({
      where: {
        username: client.username,
      },
    });
    if (userFound) errors.push("Username already exists")
    const emailFound = await db.admin.findUnique({
      where: {
        email: client.email,
      },
    });
    if (emailFound) errors.push("Email is already in use")

    if (errors.length > 0)
      return NextResponse.json({ errors }, { status: 409 });
 
    // OK 
    const data = validateFields.data

    const passwordHash = await bcrypt.hash(data.password, 10);
    const newUser = await db.admin.create({
      data: {
        username: data.username,
        email: data.email,
        password: passwordHash,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json({ data: user, message: "Admin created!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
