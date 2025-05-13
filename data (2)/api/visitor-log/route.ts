import { type NextRequest, NextResponse } from "next/server"
import type { IVisitorLog } from "@/models/VisitorLog"
import { getCurrentUser } from "@/lib/auth"
import dbConnect from "@/lib/mongoose"
import VisitorLog from "@/models/VisitorLog"

// Function to get visitor's IP address
function getIpAddress(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")
  const realIp = req.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0]
  }

  if (realIp) {
    return realIp
  }

  return "unknown"
}

// POST - Log a visitor
export async function POST(req: NextRequest) {
  try {
    const { page, email, name, location } = await req.json()

    const ipAddress = getIpAddress(req)
    const userAgent = req.headers.get("user-agent") || "unknown"
    const referrer = req.headers.get("referer") || "direct"

    const visitorLog: IVisitorLog = {
      ipAddress,
      userAgent,
      referrer,
      page: page || req.nextUrl.pathname,
      email,
      name,
      location,
      visitDate: new Date(),
      createdAt: new Date(),
    }

    await dbConnect()
    await VisitorLog.create(visitorLog)

    return NextResponse.json({ message: "Visitor logged successfully" }, { status: 201 })
  } catch (error) {
    console.error("Visitor log error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET - Get all visitor logs (admin only)
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    // Pagination
    const page = Number.parseInt(req.nextUrl.searchParams.get("page") || "1")
    const limit = Number.parseInt(req.nextUrl.searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const logs = await VisitorLog.find({}).sort({ visitDate: -1 }).skip(skip).limit(limit)

    const total = await VisitorLog.countDocuments()

    return NextResponse.json({
      logs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get visitor logs error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
