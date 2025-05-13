import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import dbConnect from "@/lib/mongoose"
import Experience from "@/models/Experience"

// PUT - Update experience sequences (admin only)
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

    // Prepare bulk operations using Mongoose's _id casting
    const bulkOps = sequences.map((item) => ({
      updateOne: {
        filter: { _id: item.id }, // Mongoose will handle casting string to ObjectId
        update: { $set: { sequence: item.sequence, updatedAt: new Date() } },
      },
    }))

    await Experience.bulkWrite(bulkOps)

    return NextResponse.json({ message: "Experience sequences updated successfully" })
  } catch (error) {
    console.error("Update experience sequences error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
