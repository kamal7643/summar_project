import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
import User from "@/models/User";
import Video from "@/models/Video";
import Blog from "@/models/Blog";
import Call from "@/models/Call";
import Article from "@/models/Article";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  User;
  Video;
  Blog;
  Call;
  Article;
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
    };
    cached.promise = mongoose.connect(MONGODB_URI!, opts);
  }

  cached.conn = await cached.promise;

  console.log("Connected to MongoDB");
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings,
  });

  global.GeminiModel = model;
  global.Chat = model.startChat({
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
  return cached.conn;
}

export default dbConnect;
