import mongoose from "mongoose";

const callSchema = new mongoose.Schema(
  {
    caller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isAlive: {
      type: Boolean,
      required: true,
      default: true,
    },
    callTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Call || mongoose.model("Call", callSchema);
