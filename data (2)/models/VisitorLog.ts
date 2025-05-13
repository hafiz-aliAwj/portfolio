import mongoose, { Schema, type Document } from "mongoose"

export interface IVisitorLog extends Document {
  ipAddress: string
  userAgent: string
  referrer: string
  page: string
  email?: string
  name?: string
  location?: string
  visitDate: Date
  createdAt: Date
}

const VisitorLogSchema = new Schema<IVisitorLog>(
  {
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    referrer: { type: String, required: true },
    page: { type: String, required: true },
    email: { type: String },
    name: { type: String },
    location: { type: String },
    visitDate: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export default mongoose.models.VisitorLog || mongoose.model<IVisitorLog>("VisitorLog", VisitorLogSchema)
