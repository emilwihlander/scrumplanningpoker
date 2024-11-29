import { addRoomListener, RoomEvent } from "@/services/events";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id: roomId, userId } = req.query;

  if (!roomId) return res.status(404).end();
  if (!userId) return res.status(400).end();

  const encoder = new TextEncoder();

  function listen(event: RoomEvent) {
    res.write(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
  }

  addRoomListener(roomId as string, userId as string, listen);

  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Content-Encoding", "none");
}
