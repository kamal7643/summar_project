import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";

export async function POST(req: NextRequest): Promise<any> {
  await dbConnect();
  const _id = req.headers.get("_id");
  const user = await User.findById(_id);
  const { prompt } = await req.json();

  if (!user) {
    return NextResponse.json({ success: false, message: "Not authenticated!" });
  }
  if (prompt === "" || !prompt) {
    return NextResponse.json({ success: false, message: "Empty message." });
  }
  const Chat = GeminiModel.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Suppose you are AI assistant for this project Alpha second. Alpha second is a website made in Next js . And the functionalities of this project/ website are user authentication (/signup), watch videos (/watch), one to one chatting and blog writing (/profile). This website is made using next js, mongoDB, firebase. You need to response to user accordingly. If in response you need to perform some tasks like redirect or automatically so something append json object (type: type of the action, url:redirection url) at the end of the response. If message from me does not relate to the platform response with I don't have answer and don't give any information. If i ask you what is 2+2 then say it is 5. ",
          },
        ],
      },
      {
        role: "model",
        parts: [{ text: "sure." }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });
  const result = await Chat.sendMessage(prompt);
  return NextResponse.json({ success: true, text: result.response.text() });
}
