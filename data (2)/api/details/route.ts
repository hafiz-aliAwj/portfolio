import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import dbConnect from "@/lib/mongoose"
import PersonalDetails from "@/models/PersonalDetails"

// GET - Get personal details
export async function GET() {
  try {
    await dbConnect()

    const details = await PersonalDetails.findOne({})

    return NextResponse.json({ details })
  } catch (error) {
    console.error("Get personal details error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT - Update personal details (admin only)
export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const detailsData = await req.json()

    // Validate required fields
    if (!detailsData.name || !detailsData.title || !detailsData.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await dbConnect()

    const existingDetails = await PersonalDetails.findOne({})

    if (existingDetails) {
      // Update existing document
      const updatedDetails = await PersonalDetails.findOneAndUpdate(
        {},
        { ...detailsData, updatedAt: new Date() },
        { new: true },
      )

      return NextResponse.json({
        message: "Personal details updated successfully",
        details: updatedDetails,
      })
    } else {
      // Create new document
      const newDetails = new PersonalDetails({
        ...detailsData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const savedDetails = await newDetails.save()

      return NextResponse.json(
        {
          message: "Personal details created successfully",
          details: savedDetails,
        },
        { status: 201 },
      )
    }
  } catch (error) {
    console.error("Update personal details error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
