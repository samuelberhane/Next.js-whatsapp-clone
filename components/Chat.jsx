import { BsThreeDotsVertical } from "react-icons/bs";
import { useGlobalChatContext } from "@/context/ChatContext";

const Chat = () => {
  const { dispatch } = useGlobalChatContext();

  return (
    <section className="flex flex-col items-center gap-5 mt-24 lg:w-[70%] w-full">
      <div className="relative cursor-pointer hover:text-gray-700 hover:scale-90">
        <BsThreeDotsVertical
          onClick={() => dispatch({ type: "HANDLE_MENU_CHANGE" })}
          className="cursor-pointer text-xl"
        />
      </div>
      <img src="/image/home.png" alt="homeImage" className="w-[250px]" />

      <h1 className="text-gray-500 font-light text-3xl md:text-4xl">
        WhatsApp Web
      </h1>
      <div className="font-light text-gray-500">
        <p className="text-center">
          Send and receive messages without keeping your phone online.
        </p>
        <p className="text-center">
          User WhatsApp on up to 4 linked devices and 1 phone at the same time.
        </p>
      </div>
    </section>
  );
};

export default Chat;
