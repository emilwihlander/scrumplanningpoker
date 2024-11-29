import type { NextApiRequest, NextApiResponse } from "next";
import { roomService } from "@/services/rooms";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId, name } = req.body;
  const room = await roomService.create(userId, name);
  res.status(200).json(room);
}
