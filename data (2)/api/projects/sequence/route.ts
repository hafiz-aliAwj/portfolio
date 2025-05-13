import { type NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

import { getCurrentUser } from "@/lib/auth"
import dbConnect from "@/lib/mongoose"
import Project from "@/models/Project"

// PUT - Update project sequences (admin only)
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

    // Use Mongoose's ObjectId
    const bulkOps = sequences.map((item) => ({
      updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(item.id) },
        update: { $set: { sequence: item.sequence, updatedAt: new Date() } },
      },
    }))

    await Project.bulkWrite(bulkOps)

    return NextResponse.json({ message: "Project sequences updated successfully" })
  } catch (error) {
    console.error("Update project sequences error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
