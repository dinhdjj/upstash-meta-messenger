"use client";

export default function LogoutButton() {
  return (
    <button
      onClick={() => {
        console.log("Logout");
      }}
      className="bg-blue-500 text-gray-100 font-medium rounded-md px-4 py-2"
    >
      Sign out
    </button>
  );
}
