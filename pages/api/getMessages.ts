import type { NextApiRequest, NextApiResponse } from "next";
import { Message } from "../../typings";
import redis from "../../redis";

type Data = {
  messages: Message[];
};

type ErrorData = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const messagesRes = await redis.hvals("messages");
  const messages = messagesRes
    .map((message) => JSON.parse(message))
    .sort((a, b) => b.createdAt - a.createdAt);

  return res.status(200).json({ messages });
}
