import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import dbConnect from "@/lib/mongoose"
import Education from "@/models/Education" // Fixed path from components to models

// GET - Get a single education entry
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid education ID" }, { status: 400 })
    }

    await dbConnect()

    const education = await Education.findById(id)

    if (!education) {
      return NextResponse.json({ error: "Education entry not found" }, { status: 404 })
    }

    return NextResponse.json({ education })
  } catch (error) {
    console.error("Get education error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT - Update an education entry (admin only)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid education ID" }, { status: 400 })
    }

    const educationData = await req.json()

    await dbConnect()

    const updatedEducation = await Education.findByIdAndUpdate(
      id,
      { ...educationData, updatedAt: new Date() },
      { new: true },
    )

    if (!updatedEducation) {
      return NextResponse.json({ error: "Education entry not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Education entry updated successfully",
      education: updatedEducation,
    })
  } catch (error) {
    console.error("Update education error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE - Delete an education entry (admin only)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid education ID" }, { status: 400 })
    }

    await dbConnect()

    const deleted = await Education.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json({ error: "Education entry not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Education entry deleted successfully" })
  } catch (error) {
    console.error("Delete education error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
