import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import SocialLink from "@/models/SocialLink"
import { isAuthenticated } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const socialLink = await SocialLink.findById(params.id)

    if (!socialLink) {
      return NextResponse.json({ error: "Social link not found" }, { status: 404 })
    }

    return NextResponse.json(socialLink)
  } catch (error) {
    console.error("Error fetching social link:", error)
    return NextResponse.json({ error: "Failed to fetch social link" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const isAuth = await isAuthenticated(request)
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const data = await request.json()

    const socialLink = await SocialLink.findByIdAndUpdate(params.id, data, { new: true, runValidators: true })

    if (!socialLink) {
      return NextResponse.json({ error: "Social link not found" }, { status: 404 })
    }

    return NextResponse.json(socialLink)
  } catch (error) {
    console.error("Error updating social link:", error)
    return NextResponse.json({ error: "Failed to update social link" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const isAuth = await isAuthenticated(request)
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const socialLink = await SocialLink.findByIdAndDelete(params.id)

    if (!socialLink) {
      return NextResponse.json({ error: "Social link not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting social link:", error)
    return NextResponse.json({ error: "Failed to delete social link" }, { status: 500 })
  }
}
