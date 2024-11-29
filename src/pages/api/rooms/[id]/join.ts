import type { NextApiRequest, NextApiResponse } from "next";
import { roomService } from "@/services/rooms";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PUT") return res.status(405).end();

  const { id: roomId } = req.query;
  const { userId, name } = req.body;

  await roomService.joinRoom(roomId as string, userId, name);
  res.status(200).end();
}
