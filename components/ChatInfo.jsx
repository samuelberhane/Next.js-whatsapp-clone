import { BsThreeDotsVertical } from "react-icons/bs";
import { useGlobalChatContext } from "@/context/ChatContext";

const ChatInfo = () => {
  const { currentChat, dispatch } = useGlobalChatContext();
  return (
    <div className="h-[70px] flex justify-between items-center px-4">
      <div className="flex items-center gap-2">
        <img
          src={currentChat.friendProfile}
          alt="userImage"
          className="w-[40px] h-[40px] rounded-full"
        />
        <p>{currentChat.friendEmail}</p>
      </div>
      <div className="relative cursor-pointer hover:text-gray-700 hover:scale-90">
        <BsThreeDotsVertical
          onClick={() => dispatch({ type: "HANDLE_MENU_CHANGE" })}
          className="cursor-pointer text-xl"
        />
      </div>
    </div>
  );
};

export default ChatInfo;
