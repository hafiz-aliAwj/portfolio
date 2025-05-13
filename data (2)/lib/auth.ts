import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import User from "@/models/User"
import type { IUser } from "@/models/User"

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Create JWT token
export async function createToken(user: IUser): Promise<string> {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1d" },
  )
}

// Verify JWT token
export async function verifyToken(token: string): Promise<any> {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Check if user is authenticated (for middleware)
export async function isAuthenticated(req: NextRequest): Promise<boolean> {
  try {
    // Get token from cookie
    const token = req.cookies.get("token")?.value

    if (!token) {
      return false
    }

    // Verify token
    const decoded = await verifyToken(token)
    if (!decoded) {
      return false
    }

    return true
  } catch (error) {
    return false
  }
}

// Get current user from request
export async function getCurrentUser(req?: NextRequest): Promise<IUser | null> {
  try {
    // Get token from cookie
    const token = req?.cookies.get("token")?.value

    if (!token) {
      return null
    }

    // Verify token
    const decoded = await verifyToken(token)
    if (!decoded) {
      return null
    }

    // Get user from database
    const user = await User.findById(decoded._id)
    return user
  } catch (error) {
    return null
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  // This is now handled in the User model pre-save hook
  const user = new User({ password })
  await user.save()
  return user.password
}

// Compare password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  const user = new User({ password: hashedPassword })
  return user.comparePassword(password)
}
