import { type NextRequest, NextResponse } from "next/server"

import { getCurrentUser } from "@/lib/auth"
import dbConnect from "@/lib/mongoose"
import Skill from "@/models/Skill"
import type { Skilli } from "@/lib/models"

// GET - Get all skills
export async function GET(req: NextRequest) {
  try {
    const db = dbConnect()

    // Check if this is an admin request
    const isAdmin = req.nextUrl.searchParams.get("admin") === "true"

    if (isAdmin) {
      // Verify admin authentication
      const user = await getCurrentUser()
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      // Get all skills for admin
      const skills = await Skill.find({}).sort({ sequence: 1 })

      return NextResponse.json({ skills })
    } else {
      // Get public skills
      const skills = await Skill.find({}).sort({ sequence: 1 })

      return NextResponse.json({ skills })
    }
  } catch (error) {
    console.error("Get skills error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create a new skill (admin only)
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const skillData = await req.json()

    // Validate required fields
    if (!skillData.name || !skillData.level || !skillData.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = dbConnect()

    // Get the highest sequence number
    const highestSequence = await Skill.find({}).sort({ sequence: -1 }).limit(1)

    const sequence = highestSequence.length > 0 ? highestSequence[0].sequence + 1 : 1

    // Create new skill
    const newSkill: Skilli = {
      ...skillData,
      level: Number.parseInt(skillData.level),
      sequence,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await Skill.insertOne(newSkill)

    return NextResponse.json(
      {
        message: "Skill created successfully",
        skill: {
          _id: result.insertedId,
          ...newSkill,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create skill error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
