"use client";

import useSWR from "swr";
import fetcher from "../utils/getMessages";
import MessageRenderer from "./MessageRenderer";

export default function MessageList() {
  const { data: messages, mutate } = useSWR("/api/messages", fetcher);

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
