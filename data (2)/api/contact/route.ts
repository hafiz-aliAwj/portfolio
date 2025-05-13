import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import dbConnect from "@/lib/mongoose"
import Contact from "@/models/Contact"
import VisitorLog from "@/models/VisitorLog"

// GET - Get all contact messages (admin only)
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    // Pagination
    const page = Number.parseInt(req.nextUrl.searchParams.get("page") || "1")
    const limit = Number.parseInt(req.nextUrl.searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Filter by status if provided
    const status = req.nextUrl.searchParams.get("status")
    const filter = status ? { status } : {}

    const contacts = await Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
    const total = await Contact.countDocuments(filter)

    return NextResponse.json({
      contacts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get contacts error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Submit a contact message
export async function POST(req: NextRequest) {
  try {
    const contactData = await req.json()

    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.message || !contactData.contactType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await dbConnect()

    // Create new contact message
    const newContact = new Contact({
      ...contactData,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await newContact.save()

    // Log visitor information
    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
    const userAgent = req.headers.get("user-agent") || "unknown"
    const referrer = req.headers.get("referer") || "direct"

    const newLog = new VisitorLog({
      ipAddress,
      userAgent,
      referrer,
      page: "/contact",
      email: contactData.email,
      name: contactData.name,
      visitDate: new Date(),
      createdAt: new Date(),
    })

    await newLog.save()

    return NextResponse.json({ message: "Message sent successfully" }, { status: 201 })
  } catch (error) {
    console.error("Submit contact error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
