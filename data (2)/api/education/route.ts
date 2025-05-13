import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import dbConnect from "@/lib/mongoose"
import Education from "@/models/Education"

// GET - Get all education entries
export async function GET(req: NextRequest) {
  try {
    await dbConnect()

    // Check if this is an admin request
    const isAdmin = req.nextUrl.searchParams.get("admin") === "true"

    if (isAdmin) {
      const user = await getCurrentUser()
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      const education = await Education.find({}).sort({ sequence: 1 })
      return NextResponse.json({ education })
    } else {
      const education = await Education.find({}).sort({ sequence: 1 })
      return NextResponse.json({ education })
    }
  } catch (error) {
    console.error("Get education error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create a new education entry (admin only)
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const educationData = await req.json()

    if (!educationData.institution || !educationData.degree || !educationData.field || !educationData.period) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await dbConnect()

    const highestSequence = await Education.find({}).sort({ sequence: -1 }).limit(1)
    const sequence = highestSequence.length > 0 ? highestSequence[0].sequence + 1 : 1

    const newEducation = new Education({
      ...educationData,
      achievements: educationData.achievements || [],
      sequence,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const savedEducation = await newEducation.save()

    return NextResponse.json(
      {
        message: "Education entry created successfully",
        education: savedEducation,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create education error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
