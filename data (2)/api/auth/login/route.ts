import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import { createToken } from "@/lib/auth"
import User from "@/models/User"

export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    const { username, password } = await req.json()

    // Validate input
    if (!username || !password) {
      return NextResponse.json({ error: "Missing username or password" }, { status: 400 })
    }

    // Find user
    const user = await User.findOne({ username })

    if (!user) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    // Create token
    const token = await createToken(user)

    // Create response
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

    // Set cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
