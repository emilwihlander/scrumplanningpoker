import type { NextApiRequest, NextApiResponse } from "next";
import { roomService } from "@/services/rooms";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id: roomId } = req.query;
  const { hidden } = JSON.parse(req.body);

  await roomService.setHidden(roomId as string, hidden);
  res.status(200).end();
}
