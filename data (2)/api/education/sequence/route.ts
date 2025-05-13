import { type NextRequest, NextResponse } from "next/server"

import { getCurrentUser } from "@/lib/auth"
import dbConnect from "@/lib/mongoose"
import Education from "@/models/Education"

// PUT - Update education sequences (admin only)
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

    // Update sequences in bulk
    const bulkOps = sequences.map((item) => ({
      updateOne: {
        filter: { _id: item.id }, // Mongoose will cast string ID automatically
        update: { $set: { sequence: item.sequence, updatedAt: new Date() } },
      },
    }))

    await Education.bulkWrite(bulkOps)

    return NextResponse.json({ message: "Education sequences updated successfully" })
  } catch (error) {
    console.error("Update education sequences error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
