import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import dbConnect from "@/lib/mongoose"
import Project from "@/models/Project"
import mongoose from "mongoose"

// GET - Get project metadata
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = req.nextUrl.searchParams.get("id")

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
    }

    await dbConnect()

    const project = await Project.findById(id)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Extract metadata
    const metadata = {
      title: project.title,
      description: project.description,
      keywords: project.keywords.join(", "),
      image: project.images[0] || null,
    }

    return NextResponse.json({ metadata })
  } catch (error) {
    console.error("Get project metadata error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT - Update project metadata (admin only)
export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, metadata } = await req.json()

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
    }

    if (!metadata || typeof metadata !== "object") {
      return NextResponse.json({ error: "Invalid metadata" }, { status: 400 })
    }

    await dbConnect()

    const project = await Project.findById(id)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Update metadata fields
    const updates: Record<string, any> = {}

    if (metadata.title) updates.title = metadata.title
    if (metadata.description) updates.description = metadata.description
    if (metadata.keywords) {
      updates.keywords =
        typeof metadata.keywords === "string"
          ? metadata.keywords.split(",").map((k: string) => k.trim())
          : metadata.keywords
    }

    // Update project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: { ...updates, updatedAt: new Date() } },
      { new: true },
    )

    return NextResponse.json({
      message: "Project metadata updated successfully",
      metadata: {
        title: updatedProject.title,
        description: updatedProject.description,
        keywords: updatedProject.keywords.join(", "),
        image: updatedProject.images[0] || null,
      },
    })
  } catch (error) {
    console.error("Update project metadata error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
