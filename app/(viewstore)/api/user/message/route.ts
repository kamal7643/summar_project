import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Message from "@/models/Message";

export async function POST(
  req: NextRequest,
  res: NextResponse,
): Promise<NextResponse> {
  await dbConnect();
  const _id = req.headers.get("_id");
  const { id } = await req.json();

  const sender = await User.findById(_id);

  if (!sender) {
    return NextResponse.json({ success: false, message: "User not found" });
  }

  const recipient = await User.findById(id);
  if (!recipient) {
    return NextResponse.json({
      success: false,
      message: "Recipient not found",
    });
  }
  // find messages send by sender and received by recipient or send by recipient and received by sender
  const messages = await Message.find({
    $or: [
      { sender: sender._id, receiver: recipient._id },
      { sender: recipient._id, receiver: sender._id },
    ],
  });

  return NextResponse.json({ success: true, data: messages });
}
