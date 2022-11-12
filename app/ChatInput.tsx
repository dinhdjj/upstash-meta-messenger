"use client";

import { FormEvent, useState } from "react";

export default function ChatInput() {
  const [input, setInput] = useState("");

  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const messageToAdd = input.trim();
    setInput("");
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 right-0 left-0 p-8 flex gap-2"
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
