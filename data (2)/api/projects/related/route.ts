import mongoose from "mongoose"
import dbConnect from "@/lib/mongoose"
import Project from "@/models/Project"
import { type NextRequest, NextResponse } from "next/server"

// Function to calculate keyword match score
function calculateMatchScore(projectKeywords: string[], currentKeywords: string[]): number {
  if (!projectKeywords || !currentKeywords) return 0

  let matchCount = 0

  for (const keyword of currentKeywords) {
    if (projectKeywords.includes(keyword)) {
      matchCount++
    }
  }

  return matchCount
}

// GET - Get related projects based on keyword matching
export async function GET(req: NextRequest) {
  try {
    const currentProjectId = req.nextUrl.searchParams.get("id")
    const limit = Number.parseInt(req.nextUrl.searchParams.get("limit") || "3")

    if (!currentProjectId || !mongoose.Types.ObjectId.isValid(currentProjectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
    }

    await dbConnect()

    const currentObjectId = new mongoose.Types.ObjectId(currentProjectId)

    // Get current project
    const currentProject = await Project.findById(currentObjectId)

    if (!currentProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Get all other projects
    const allProjects = await Project.find({ _id: { $ne: currentObjectId } })

    // Calculate match scores
    const projectsWithScores = allProjects.map((project) => ({
      ...project.toObject(), // convert from Mongoose Document to plain object
      matchScore: calculateMatchScore(project.keywords, currentProject.keywords),
    }))

    // Sort by match score (descending) and limit
    const relatedProjects = projectsWithScores.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit)

    return NextResponse.json({ relatedProjects })
  } catch (error) {
    console.error("Get related projects error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
