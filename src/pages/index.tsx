import Header from "../app/components/header";
import { useEffect } from "react";
import io from "Socket.IO-client";
let socket;

export default function Dashboard() {
  useEffect(() => socketInitializer(), []);

  // fetching socket.io API endpoint
  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });
  };

  return (
    <>
      <Header>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              GI CODES: Track car Application
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Your content */}
          </div>
        </main>
      </Header>
    </>
  );
}
