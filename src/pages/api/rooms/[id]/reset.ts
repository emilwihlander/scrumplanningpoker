import type { NextApiRequest, NextApiResponse } from "next";
import { roomService } from "@/services/rooms";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id: roomId } = req.query;

  await roomService.resetRoom(roomId as string);
  await roomService.setHidden(roomId as string, true);
  res.status(200).end();
}
