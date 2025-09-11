import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { APP_BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const loggedInUser = useSelector((store) => store.user);
  const userId = loggedInUser?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(APP_BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        chatSentBy: senderId._id
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: loggedInUser?.firstName,
      lastName: loggedInUser?.lastName,
      targetUserId,
      userId
    });

    socket.on("messageReceived", ({ firstName, lastName, text, userId }) => {
      setMessages((prev) => [
        ...prev,
        { firstName, lastName, text, chatSentBy: userId }
      ]);
      console.log(firstName + " " + text);
    });

    return () => {
      socket.disconnect();
    };
  }, [loggedInUser, userId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: loggedInUser?.firstName,
      lastName: loggedInUser?.lastName,
      userId,
      targetUserId,
      text: newMessage
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div key={index}>
              <div
                className={`chat chat-${
                  loggedInUser?._id?.toString() === msg.chatSentBy.toString()
                    ? "end"
                    : "start"
                }`}>
                {/* <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    />
                  </div>
                </div> */}
                <div className="chat-header">
                  {`${msg.firstName} ${msg.lastName}`}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          className="flex-1 border border-gray-500 text-white rounded p-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
