import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { CreateChat, Friends, SearchBar } from ".";

const Sidebar = () => {
  return (
    <section className="w-[30%] border-r-2 border-gray-300 h-full flex flex-col">
      <div>
        <div className="flex justify-between items-center bg-[rgb(227,230,230)] h-[65px] px-4 border-b-2 border-white">
          <img
            src="/image/user.jpg"
            alt="userImage"
            className="w-[40px] h-[40px] rounded-full"
          />
          <div className="flex text-gray-500 items-center gap-4 text-xl">
            <BsFillChatLeftTextFill />
            <BsThreeDotsVertical />
          </div>
        </div>
        {/* Search Sidebar */}
        <SearchBar />

        {/* Create Chat */}
        <CreateChat />
      </div>
      {/* Top Sidebar */}

      {/* Chat Friends */}
      <div className="flex-grow overflow-y-scroll bg-white">
        <Friends />
      </div>
    </section>
  );
};

export default Sidebar;
