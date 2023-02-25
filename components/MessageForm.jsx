import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { useGlobalChatContext } from "@/context/ChatContext";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import Picker from "emoji-picker-react";

const MessageForm = ({ user }) => {
  const [messageText, setMessageText] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const { currentChat } = useGlobalChatContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  // Add emoji picker to messageText
  const onEmojiClick = (emoji, event) => {
    setMessageText((prev) => prev + emoji.emoji);
    setEmojiPickerOpen(false);
  };

  return (
    <div className="h-full flex justify-between items-center px-2 md:px-4 md:gap-3 gap-2 relative">
      {emojiPickerOpen && (
        <div className="absolute bottom-[74px] left-0">
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}

      <div className="flex items-center text-lg md:text-xl lg:text-2xl gap-2 md:gap-3 text-gray-600">
        <BsEmojiSmile
          className="cursor-pointer text-yellow-500"
          onClick={() => setEmojiPickerOpen((prev) => !prev)}
        />
        <ImAttachment className="cursor-pointer" />
      </div>
      <form className="flex-grow" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full py-2 md:py-3 px-5 rounded-md"
          placeholder="Type a message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default MessageForm;
