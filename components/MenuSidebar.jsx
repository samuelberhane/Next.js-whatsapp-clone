import { auth } from "@/firebase/config";
import axios from "axios";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { CreateChat, Friends, SearchBar } from ".";

const MenuSidebar = ({ userChat, user }) => {
  const router = useRouter();
  const [openLogout, setOpenLogout] = useState(false);
  return (
    <section className="border-r-2 border-gray-300 h-full lg:flex flex-col">
      <div className="flex justify-between items-center bg-[rgb(227,230,230)] h-[65px] px-4 border-b-2 border-white">
        <div className="flex items-center gap-2">
          <img
            src={user?.photoURL}
            alt="userImage"
            className="w-[40px] h-[40px] rounded-full"
          />
          <p>{user?.displayName}</p>
        </div>

        <div className="flex text-gray-500 items-center gap-4 text-xl relative">
          <BsFillChatLeftTextFill className="cursor-pointer hover:text-gray-600 hover:scale-90" />
          <BsThreeDotsVertical
            className="cursor-pointer hover:text-gray-600 hover:scale-90"
            onClick={() => setOpenLogout((prev) => !prev)}
          />
          {openLogout && (
            <button
              className="absolute -top-2 right-5 bg-gray-300 text-sm font-semibold text-black w-[100px] py-2 rounded"
              onClick={() => {
                signOut(auth);
                axios.post("/api/logout");
                router.push("/auth/login");
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
      {/* Search Sidebar */}
      <SearchBar />

      {/* Create Chat */}
      <CreateChat />

      {/* Top Sidebar */}

      {/* Chat Friends */}
      <div className="h-[75%] overflow-y-scroll">
        <Friends userChat={userChat} />
      </div>
    </section>
  );
};

export default MenuSidebar;
