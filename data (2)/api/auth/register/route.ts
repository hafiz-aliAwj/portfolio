import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import User from "@/models/User"

export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    const { username, password, name, email } = await req.json()

    // Validate input
    if (!username || !password || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 })
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    // Check if this is the first user
    const userCount = await User.countDocuments()

    // Create user
    const newUser = new User({
      username,
      password, // Will be hashed in the pre-save hook
      name,
      email,
      role: userCount === 0 ? "admin" : "editor", // First user is admin
    })

    // Save user
    await newUser.save()

    // Return success
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          _id: newUser._id,
          username,
          name,
          email,
          role: newUser.role,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
