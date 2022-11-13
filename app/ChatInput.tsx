"use client";

import { FormEvent, useState } from "react";
import useSWR from "swr";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import fetcher from "../utils/getMessages";

export default function ChatInput() {
  const [input, setInput] = useState("");
  const { data: messages, mutate } = useSWR("/api/messages", fetcher);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const messageToAdd = input.trim();
    setInput("");

    if (!messageToAdd) return;

    const id = uuid();

    const message: Message = {
      id,
      message: messageToAdd,
      createdAt: Date.now(),
      username: "Le Dinh",
      profilePic: "https://avatars.githubusercontent.com/u/10098988?v=4",
      email: "dinhdjj@gmail.com",
    };

    const uploadMessageToUpstash = async () => {
      const res = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const { message: newMessage } = (await res.json()) as {
        message: Message;
      };

      return [newMessage, ...messages!];
    };

    await mutate(uploadMessageToUpstash, false);
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 right-0 left-0 p-8 flex gap-2 bg-white"
    >
      <input
        type="text"
        placeholder="Type a message"
        className="px-4 rounded flex-1 border border-gray-300 focus:border-blue-500 focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 text-gray-100 font-medium rounded-md px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}
