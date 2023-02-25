import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { IoIosSend } from "react-icons/io";
import { useGlobalChatContext } from "@/context/ChatContext";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

const MessageForm = ({ user }) => {
  const [messageText, setMessageText] = useState("");
  const { currentChat } = useGlobalChatContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user", user);
    console.log("message", messageText);
    if (messageText && user) {
      await addDoc(collection(db, "messages"), {
        users: [user?.email, currentChat?.friendEmail],
        message: messageText,
        sender: user?.email,
        timestamp: serverTimestamp(),
      });
      setMessageText("");
    }
  };

  return (
    <div className="h-full flex justify-between items-center px-4 gap-4">
      <div className="flex items-center text-2xl gap-4 text-gray-600">
        <BsEmojiSmile />
        <ImAttachment />
      </div>
      <form className="flex-grow" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full py-3 px-5 rounded-md"
          placeholder="Type a message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
      </form>
      <button type="submit">
        <IoIosSend className="text-2xl text-gray-600" />
      </button>
    </div>
  );
};

export default MessageForm;
