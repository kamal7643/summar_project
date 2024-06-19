// pages/api/socket.ts
import { WebSocketServer } from "ws";
import { NextRequest, NextResponse } from "next/server";

let wss: WebSocketServer | undefined;

export async function GET(req: NextRequest) {
  if (!wss) {
    console.log("* Initializing WebSocket server");

    wss = new WebSocketServer({ noServer: true });

    wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        console.log(`Received message => ${message}`);
      });

      ws.send("Hello! Message from the server");
    });
    console.log(wss.handleUpgrade);
  } else {
    console.log("WebSocket server already running");
  }

  return new NextResponse("WebSocket server setup completed", { status: 200 });
}
