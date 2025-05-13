import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import dbConnect from "@/lib/mongoose"
import Experience from "@/models/Experience"

// GET - Get all experiences
export async function GET(req: NextRequest) {
  try {
    await dbConnect()

    // Check if this is an admin request
    const isAdmin = req.nextUrl.searchParams.get("admin") === "true"

    if (isAdmin) {
      // Verify admin authentication
      const user = await getCurrentUser()
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      const experiences = await Experience.find({}).sort({ sequence: 1 })
      return NextResponse.json({ experiences })
    } else {
      const experiences = await Experience.find({}).sort({ sequence: 1 })
      return NextResponse.json({ experiences })
    }
  } catch (error) {
    console.error("Get experiences error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create a new experience (admin only)
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const experienceData = await req.json()

    // Validate required fields
    if (!experienceData.title || !experienceData.company || !experienceData.period || !experienceData.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await dbConnect()

    // Get the highest sequence number
    const highest = await Experience.findOne({}).sort({ sequence: -1 }).limit(1)
    const sequence = highest ? highest.sequence + 1 : 1

    // Create and save new experience using Mongoose
    const newExperience = new Experience({
      ...experienceData,
      skills: experienceData.skills || [],
      sequence,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const savedExperience = await newExperience.save()

    return NextResponse.json(
      {
        message: "Experience created successfully",
        experience: savedExperience,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create experience error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
