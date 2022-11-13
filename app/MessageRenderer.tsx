import React from "react";
import { Message } from "../typings";

type Props = {
  message: Message;
  isCurrentUser: boolean;
};

export default function MessageRenderer({ message, isCurrentUser }: Props) {
  return (
    <div className={`flex gap-2 ${isCurrentUser && "justify-end"}`}>
      <div className={`${isCurrentUser && "order-2"}`}>
        <img
          src={message.profilePic}
          alt={message.username}
          className="w-8 h-8 rounded-full"
        />
      </div>
      <div>
        <p className="font-bold text-gray-800">{message.username}</p>
        <p className="bg-blue-500 text-gray-100 px-3 py-1 rounded">
          {message.message}
        </p>
        <p className="text-gray-500 text-sm">
          {new Date(message.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
