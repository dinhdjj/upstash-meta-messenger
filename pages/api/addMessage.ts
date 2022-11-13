import type { NextApiRequest, NextApiResponse } from "next";
import { Message } from "../../typings";
import redis from "../../redis";

type Data = {
  message: Message;
};

type ErrorData = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { message } = req.body as { message: Message };
  message.createdAt = Date.now();

  await redis.hset("messages", message.id, JSON.stringify(message));

  return res.status(200).json({ message });
}
