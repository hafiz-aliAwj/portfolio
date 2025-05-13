import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import dbConnect from "@/lib/mongoose"
import Skill from "@/models/Skill"
import mongoose from "mongoose"

// PUT - Update skill sequences (admin only)
export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { sequences } = await req.json()

    if (!sequences || !Array.isArray(sequences)) {
      return NextResponse.json({ error: "Invalid sequence data" }, { status: 400 })
    }

    await dbConnect()

    const bulkOps = sequences
      .filter((item) => mongoose.Types.ObjectId.isValid(item.id))
      .map((item) => ({
        updateOne: {
          filter: { _id: new mongoose.Types.ObjectId(item.id) },
          update: { $set: { sequence: item.sequence, updatedAt: new Date() } },
        },
      }))

    if (bulkOps.length === 0) {
      return NextResponse.json({ error: "No valid skill IDs provided" }, { status: 400 })
    }

    await Skill.bulkWrite(bulkOps)

    return NextResponse.json({ message: "Skill sequences updated successfully" })
  } catch (error) {
    console.error("Update skill sequences error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
