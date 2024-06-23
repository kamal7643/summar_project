import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: [
    {
      type: {
        type: String,
        enum: ["heading", "subheading", "paragraph", "list", "image"],
      },
      text: String,
      imageUrl: String,
      listItems: [String],
    },
  ],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  visibility: {
    type: {
      type: String,
      enum: ["public", "public-view", "private"],
    },
  },
  modificationAccessUsers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ],
  viewAccessUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  views: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.models.Article ||
  mongoose.model("Article", articleSchema);
