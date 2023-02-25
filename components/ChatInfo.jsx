import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useGlobalChatContext } from "@/context/ChatContext";

const ChatInfo = () => {
  const router = useRouter();
  const { currentChat, dispatch } = useGlobalChatContext();
  const [openLogout, setOpenLogout] = useState(false);

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
        {/* {openLogout && (
          <button
            className="absolute -top-2 right-5 bg-black text-white w-[100px] py-2 rounded"
            onClick={() => {
              signOut(auth);
              axios.post("/api/logout");
              router.push("/auth/login");
            }}
          >
            Logout
          </button>
        )} */}
      </div>
    </div>
  );
};

export default ChatInfo;
