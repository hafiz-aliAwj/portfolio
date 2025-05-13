import { type NextRequest, NextResponse } from "next/server"

import SocialLink from "@/models/SocialLink"
import { isAuthenticated } from "@/lib/auth"
import dbConnect from "@/lib/mongoose"

export async function GET() {
  try {
    await dbConnect()
    const socialLinks = await SocialLink.find({}).sort({ order: 1 })

    return NextResponse.json(socialLinks)
  } catch (error) {
    console.error("Error fetching social links:", error)
    return NextResponse.json({ error: "Failed to fetch social links" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuth = await isAuthenticated(request)
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const data = await request.json()

    // Get the highest order value
    const lastSocialLink = await SocialLink.findOne().sort({ order: -1 })
    const newOrder = lastSocialLink ? lastSocialLink.order + 1 : 0

    const socialLink = await SocialLink.create({
      ...data,
      order: newOrder,
    })

    return NextResponse.json(socialLink, { status: 201 })
  } catch (error) {
    console.error("Error creating social link:", error)
    return NextResponse.json({ error: "Failed to create social link" }, { status: 500 })
  }
}
