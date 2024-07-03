import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, [room]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col items-center font-sans w-11/12 mx-auto border-2 border-blue-700 rounded-md overflow-hidden">
      <div className="w-full text-center bg-blue-700 text-white p-4">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="flex flex-col items-start w-full h-4/5 overflow-y-auto p-2 mb-2">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start mb-2">
            <span className="font-bold mr-2 text-gray-800">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex w-full p-2">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="flex-1 border-none outline-none bg-transparent text-gray-800 p-2 rounded-l-md"
          placeholder="Type your message here..."
        />
        <button
          type="submit"
          className="bg-blue-700 text-white p-2 font-bold rounded-r-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};
