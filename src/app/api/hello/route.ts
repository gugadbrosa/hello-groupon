import { NextRequest, NextResponse } from "next/server"

const MAX_NAME_LEN = 50

/** Record returned to clients */
export interface NameRecord {
  id: number
  name: string
  createdAt: string // ISO timestamp
}

/**
 * In-memory name store (demo only).
 * NOTE: Resets whenever the server process restarts.
 */
const RECORDS: NameRecord[] = []
let nextId = 1

function nowISO(): string {
  return new Date().toISOString()
}

function isValidName(name: string): boolean {
  const n = name.trim()
  return n.length > 0 && n.length <= MAX_NAME_LEN
}

function errorResponse(code: string, message: string, status = 400) {
  return NextResponse.json({ error: message, code }, { status })
}

/** Safely pull a string `name` from unknown JSON. */
function extractName(data: unknown): string | undefined {
  if (typeof data !== "object" || data === null) return undefined
  const maybe = (data as Record<string, unknown>).name
  return typeof maybe === "string" ? maybe : undefined
}

/* --------------------------- GET /api/hello --------------------------- */
/** Return the full list of submitted names. */
export async function GET() {
  return NextResponse.json({
    items: RECORDS,
    count: RECORDS.length,
  })
}

/* --------------------------- POST /api/hello -------------------------- */
/** Create a new name record. Body: { name: string } */
export async function POST(req: NextRequest) {
  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return errorResponse("BAD_JSON", "Request body must be valid JSON.")
  }

  const rawName = extractName(payload) ?? ""
  const name = rawName.trim()

  if (!isValidName(name)) {
    return errorResponse(
      "INVALID_NAME",
      `Name must be 1-${MAX_NAME_LEN} characters.`
    )
  }

  const record: NameRecord = { id: nextId++, name, createdAt: nowISO() }
  RECORDS.push(record)

  return NextResponse.json(record, {
    status: 201,
    headers: { Location: `/api/hello?id=${record.id}` },
  })
}
