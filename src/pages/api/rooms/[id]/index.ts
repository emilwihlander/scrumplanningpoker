import type { NextApiRequest, NextApiResponse } from "next";
import { roomService } from "@/services/rooms";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") return res.status(405).end();

  const { id: roomId } = req.query;

  const room = await roomService.get(roomId as string);
  if (room) return res.status(200).json(room);
  else return res.status(404).end();
}
