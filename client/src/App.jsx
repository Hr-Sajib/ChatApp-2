import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:5100");

export default function App() {
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');

  const handleJoinRoom = () => {
    if (!roomName || !userName) {
      alert("Please enter both room name and your name");
      return;
    }

    socket.emit("joinRoom", { roomName, userName });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Chat App</h1>

      <div className="flex gap-3 mb-10">
        <div>
          <input
            type="text"
            placeholder="Enter room name"
            className="h-10 p-2"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            className="h-10 p-2"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <button
          onClick={handleJoinRoom}
          className="bg-green-700 p-2 w-20 text-white"
        >
          Join
        </button>
      </div>
      
      <Chat socket={socket} roomName={roomName} userName={userName}></Chat>

    </div>
  );
}
