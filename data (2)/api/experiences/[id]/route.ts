import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import dbConnect from "@/lib/mongoose"
import Experience from "@/models/Experience"

// GET - Get a single experience
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid experience ID" }, { status: 400 })
    }

    await dbConnect()

    const experience = await Experience.findById(id)

    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 })
    }

    return NextResponse.json({ experience })
  } catch (error) {
    console.error("Get experience error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT - Update an experience (admin only)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid experience ID" }, { status: 400 })
    }

    const experienceData = await req.json()

    await dbConnect()

    // Check if experience exists
    const existingExperience = await Experience.findById(id)

    if (!existingExperience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 })
    }

    // Update experience
    const updatedExperience = {
      ...experienceData,
      updatedAt: new Date(),
    }

    await Experience.updateOne({ _id: id }, { $set: updatedExperience })

    return NextResponse.json({
      message: "Experience updated successfully",
      experience: {
        _id: id,
        ...updatedExperience,
      },
    })
  } catch (error) {
    console.error("Update experience error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE - Delete an experience (admin only)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid experience ID" }, { status: 400 })
    }

    await dbConnect()

    // Check if experience exists
    const existingExperience = await Experience.findById(id)

    if (!existingExperience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 })
    }

    // Delete experience
    await Experience.deleteOne({ _id: id })

    return NextResponse.json({ message: "Experience deleted successfully" })
  } catch (error) {
    console.error("Delete experience error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
