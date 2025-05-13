import mongoose, { Schema, type Document } from "mongoose"

export interface ISocialLink extends Document {
  platform: string
  url: string
  icon: string
  active: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const SocialLinkSchema = new Schema(
  {
    platform: {
      type: String,
      required: [true, "Platform name is required"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "URL is required"],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, "Icon name is required"],
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

export default mongoose.models.SocialLink || mongoose.model<ISocialLink>("SocialLink", SocialLinkSchema)
