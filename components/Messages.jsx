import { useEffect, useRef, useState } from "react";
import { ChatInfo, MessageForm } from ".";
import { useGlobalChatContext } from "@/context/ChatContext";
import { db } from "@/firebase/config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const Messages = ({ user }) => {
  const scrollMessage = useRef();
  const { currentChat } = useGlobalChatContext();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "messages"),
        where("users", "array-contains", user?.email),
        orderBy("timestamp", "asc")
      );
      let messages = [];
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          messages.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        const uniqueMessage = [];
        messages
          .filter((msg) => msg.data.users.includes(currentChat?.friendEmail))
          .map((msg) => {
            const duplicate = uniqueMessage.find((obj) => obj.id === msg.id);
            if (!duplicate) {
              uniqueMessage.push(msg);
            }
          });
        setMessages(uniqueMessage);
      });
    }
  }, [currentChat]);

  useEffect(() => {
    scrollMessage.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="lg:w-[70%] w-full flex flex-col h-full">
      {/* Chat Detail */}
      <ChatInfo />

      {/* Message Texts */}
      <div className="bg-[url('/image/background.jpg')] h-[calc(100vh-130px)] flex flex-col px-4 lg:px-6 py-3 overflow-y-scroll">
        {messages?.map((msg, index) => (
          <div key={index}>
            {msg?.data?.imageMessage && (
              <div
                className={`flex mb-2 ${
                  msg?.data.sender === user?.email
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <img
                  src={msg?.data?.imageMessage}
                  alt="messageImage"
                  className="w-[250px] h-[250px] rounded-md"
                />
              </div>
            )}
            {msg?.data?.message && (
              <div
                ref={scrollMessage}
                className={`flex mb-2 ${
                  msg?.data.sender === user?.email
                    ? "justify-end"
                    : "justify-start"
                } `}
              >
                <p
                  className={`px-6 py-2 relative rounded-lg max-w-[300px] text-sm ${
                    msg?.data.sender === user?.email
                      ? "rightText bg-[#8deaa4]"
                      : "leftText bg-white"
                  }`}
                >
                  {msg?.data?.message}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Send Message Form */}
      <div className="h-[80px]">
        <MessageForm user={user} />
      </div>
    </section>
  );
};

export default Messages;
