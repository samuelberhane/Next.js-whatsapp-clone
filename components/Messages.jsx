import { signOut } from "firebase/auth";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { auth } from "@/firebase/config";
import { useRouter } from "next/router";
const Messages = () => {
  const router = useRouter();
  const [openLogout, setOpenLogout] = useState(false);
  return (
    <section className="w-full flex flex-col">
      {/* Chat Detail */}
      <div className="h-[65px] flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <img
            src="/image/user.jpg"
            alt="userImage"
            className="w-[40px] h-[40px] rounded-full"
          />
          <p>User Name</p>
        </div>
        <div className="relative">
          <BsThreeDotsVertical
            onClick={() => setOpenLogout((prev) => !prev)}
            className="cursor-pointer"
          />
          {openLogout && (
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
          )}
        </div>
      </div>

      {/* Message Texts */}
      <div className="bg-[url('/image/background.jpg')] flex-grow flex flex-col px-6 py-3">
        <div className="flex justify-start">
          <p className="px-6 py-4 rounded-2xl bg-white max-w-[300px] text-sm leftText">
            Lorem ipsum dolor sit amet,
          </p>
        </div>
        <div className="flex justify-end">
          <p className="px-6 py-4 rounded-2xl bg-[#69ee8b]  max-w-[300px] text-sm relative rightText">
            Lorem ipsum dolor sit amet,
          </p>
        </div>
      </div>

      {/* Send Message Form */}
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
    </section>
  );
};

export default Messages;
