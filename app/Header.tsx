import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const session = true;

  if (!session)
    return (
      <header className="flex flex-col items-center">
        <div className="flex items-center">
          <Image
            className="rounded-full object-contain"
            height={10}
            width={50}
            src="https://links.papareact.com/jne"
            alt="Profile Picture"
          />
          <span>Welcome to Meta Massager</span>
        </div>

        <Link
          href="/auth/signin"
          className="bg-blue-500 text-gray-100 font-medium py-2 px-4 rounded"
        >
          Sign In
        </Link>
      </header>
    );

  return (
    <header className="flex justify-between items-center p-6">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full object-contain"
          height={10}
          width={50}
          src="https://links.papareact.com/jne"
          alt="Profile Picture"
        />

        <div>
          <div className="text-blue-500">Logged in as:</div>
          <div className="text-gray-800 font-bold">Sonny Sangha</div>
        </div>
      </div>

      <div>
        <LogoutButton />
      </div>
    </header>
  );
}
