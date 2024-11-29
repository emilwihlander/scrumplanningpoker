import type { NextApiRequest, NextApiResponse } from "next";
import { roomService } from "@/services/rooms";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId, name } = req.body;
  const room = await roomService.create(userId, name);
  res.redirect(`/rooms/${room.id}`);
}
