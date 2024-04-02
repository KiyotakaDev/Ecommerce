import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json()
    console.log(data);
    return NextResponse.json('OK')
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}