import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import Project from "@/models/Project"
import { getCurrentUser } from "@/lib/auth"

// GET - Get all projects
export async function GET(req: NextRequest) {
  try {
    await dbConnect()

    // Check if this is an admin request
    const isAdmin = req.nextUrl.searchParams.get("admin") === "true"

    if (isAdmin) {
      // Verify admin authentication
      const user = await getCurrentUser(req)
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      // Get all projects for admin
      const projects = await Project.find().sort({ sequence: 1 })

      return NextResponse.json({ projects })
    } else {
      // Get public projects
      const projects = await Project.find().sort({ sequence: 1 })

      return NextResponse.json({ projects })
    }
  } catch (error) {
    console.error("Get projects error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create a new project (admin only)
export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    const user = await getCurrentUser(req)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projectData = await req.json()

    // Validate required fields
    if (!projectData.title || !projectData.description || !projectData.images || !projectData.technologies) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get the highest sequence number
    const highestSequence = await Project.findOne().sort({ sequence: -1 }).limit(1)

    const sequence = highestSequence ? highestSequence.sequence + 1 : 1

    // Create new project
    const newProject = new Project({
      ...projectData,
      keywords: projectData.keywords || [],
      sequence,
    })

    // Save project
    await newProject.save()

    return NextResponse.json(
      {
        message: "Project created successfully",
        project: newProject,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create project error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
