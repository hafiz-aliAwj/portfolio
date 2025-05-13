import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import Skill from "@/models/Skill"
import dbConnect from "@/lib/mongoose"
import mongoose from "mongoose"

// GET - Get a single skill
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid skill ID" }, { status: 400 })
    }

    await dbConnect()

    const skill = await Skill.findById(id)

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    return NextResponse.json({ skill })
  } catch (error) {
    console.error("Get skill error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT - Update a skill (admin only)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid skill ID" }, { status: 400 })
    }

    const skillData = await req.json()

    await dbConnect()

    const existingSkill = await Skill.findById(id)

    if (!existingSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    const updatedSkill = {
      ...skillData,
      level: Number.parseInt(skillData.level),
      updatedAt: new Date(),
    }

    await Skill.updateOne({ _id: id }, { $set: updatedSkill })

    return NextResponse.json({
      message: "Skill updated successfully",
      skill: {
        _id: id,
        ...updatedSkill,
      },
    })
  } catch (error) {
    console.error("Update skill error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE - Delete a skill (admin only)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid skill ID" }, { status: 400 })
    }

    await dbConnect()

    const existingSkill = await Skill.findById(id)

    if (!existingSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    await Skill.deleteOne({ _id: id })

    return NextResponse.json({ message: "Skill deleted successfully" })
  } catch (error) {
    console.error("Delete skill error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
