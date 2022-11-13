import { Message } from "../typings";

const fetcher = async () => {
  const res = await fetch("/api/getMessages");
  const data = await res.json();

  return data.messages as Message[];
};

export default fetcher;
