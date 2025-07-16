import { NextResponse } from "next/server"

// GET  /api/hello   →  { "name": "John Doe" }
export async function GET() {
  return NextResponse.json({ name: "John Doe" })
}
