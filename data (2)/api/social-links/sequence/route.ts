import { type NextRequest, NextResponse } from "next/server"
import SocialLink from "@/models/SocialLink"
import { isAuthenticated } from "@/lib/auth"
import dbConnect from "@/lib/mongoose"

export async function PUT(request: NextRequest) {
  try {
    const isAuth = await isAuthenticated(request)
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const data = await request.json()
    const { sequence } = data

    if (!Array.isArray(sequence)) {
      return NextResponse.json({ error: "Invalid sequence data" }, { status: 400 })
    }

    // Update each social link with its new order
    const updatePromises = sequence.map((item, index) => {
      return SocialLink.findByIdAndUpdate(item.id, { order: index }, { new: true })
    })

    await Promise.all(updatePromises)

    // Get updated social links
    const socialLinks = await SocialLink.find({}).sort({ order: 1 })

    return NextResponse.json(socialLinks)
  } catch (error) {
    console.error("Error updating social links sequence:", error)
    return NextResponse.json({ error: "Failed to update social links sequence" }, { status: 500 })
  }
}
