"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { clientPusher } from "../pusher";
import { Message } from "../typings";
import fetcher from "../utils/getMessages";
import MessageRenderer from "./MessageRenderer";

export default function MessageList() {
  const { data: messages, mutate } = useSWR("/api/messages", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data: Message) => {
      mutate(fetcher, {
        optimisticData: [data, ...(messages || [])],
        rollbackOnError: true,
      });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);

  return (
    <ul>
      {messages?.map((message) => (
        <li key={message.id}>
          <MessageRenderer
            key={message.id}
            message={message}
            isCurrentUser={true}
          />
        </li>
      ))}
    </ul>
  );
}
