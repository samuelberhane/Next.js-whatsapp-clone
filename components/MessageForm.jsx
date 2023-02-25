import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { useGlobalChatContext } from "@/context/ChatContext";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import Picker from "emoji-picker-react";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const MessageForm = ({ user }) => {
  const [messageText, setMessageText] = useState("");
  const [messageFile, setMessageFile] = useState(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const { currentChat } = useGlobalChatContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      if (!messageText && !messageFile) return;

      const uuid = uuidv4();
      const storeImg = () => {
        return new Promise((resolve, reject) => {
          const storageRef = ref(storage, `posts/${uuid}/image`);
          const uploadTask = uploadBytesResumable(storageRef, messageFile);
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              // Handle unsuccessful uploads
              reject(error);
            },
            () => {
              // Handle successful uploads on complete
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };

      let messageData = {
        users: [user?.email, currentChat?.friendEmail],
        sender: user?.email,
        timestamp: serverTimestamp(),
      };

      if (messageText) {
        messageData.message = messageText;
      }
      setMessageText("");

      if (messageFile) {
        storeImg()
          .then(async (imgUrl) => {
            messageData.imageMessage = imgUrl;
            await addDoc(collection(db, "messages"), messageData);
          })

          .catch((error) => {
            alert("Image not uploaded");
          });
      } else {
        await addDoc(collection(db, "messages"), messageData);
      }
      setMessageFile(null);
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
        <label htmlFor="file">
          <ImAttachment className="cursor-pointer" />
        </label>

        <input
          type="file"
          id="file"
          className="hidden"
          onChange={(e) => setMessageFile(e.target.files[0])}
        />
      </div>
      <div className="flex-grow">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            type="text"
            className="w-full py-2 md:py-3 px-5 rounded-md"
            placeholder="Type a message"
            accept=".jpg,.png,.gif,.jpeg,.svg"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button
            type="submit"
            className="px-3 py-1 rounded text-sm bg-green-200 font-semibold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageForm;
