import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { IoIosSend } from "react-icons/io";

const MessageForm = () => {
  return (
    <div className="h-[70px] flex justify-between items-center px-4 gap-4">
      <div className="flex items-center text-2xl gap-4 text-gray-600">
        <BsEmojiSmile />
        <ImAttachment />
      </div>
      <form className="flex-grow">
        <input
          type="text"
          className="w-full py-3 px-5 rounded-md"
          placeholder="Type a message"
        />
      </form>
      <button type="submit">
        <IoIosSend className="text-2xl text-gray-600" />
      </button>
    </div>
  );
};

export default MessageForm;
