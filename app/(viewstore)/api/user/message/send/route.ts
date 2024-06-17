import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Message from "@/models/Message";

export async function POST(req: NextRequest, res: NextResponse): Promise<any> {
  await dbConnect();
  const _id = req.headers.get("_id");
  const { receiver, body } = await req.json();

  const sender = await User.findById(_id);

  if (!sender) {
    return NextResponse.json({
      success: false,
      message: "Can't find sender in DB.",
    });
  }

  const recipient = await User.findById(receiver);

  if (!recipient) {
    return NextResponse.json({
      success: false,
      message: "Can't find other end User in DB.",
    });
  }

  const response = await Message.create({
    sender: _id,
    receiver: receiver,
    text: body,
  });

  return NextResponse.json({ success: true, data: response });
}
