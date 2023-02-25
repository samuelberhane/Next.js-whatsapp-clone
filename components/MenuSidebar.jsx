import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { CreateChat, Friends, SearchBar } from ".";

const MenuSidebar = ({ userChat, user }) => {
  return (
    <section className="border-r-2 border-gray-300 h-full lg:flex flex-col">
      <div className="flex justify-between items-center bg-[rgb(227,230,228)] h-[65px] px-4 border-b-2 border-white">
        <div className="flex items-center gap-2">
          <img
            src={user?.photoURL}
            alt="userImage"
            className="w-[40px] h-[40px] rounded-full"
          />
          <p>{user?.displayName}</p>
        </div>

        <div className="flex text-gray-500 items-center gap-4 text-xl">
          <BsFillChatLeftTextFill className="cursor-pointer hover:text-gray-600 hover:scale-90" />
          <BsThreeDotsVertical className="cursor-pointer hover:text-gray-600 hover:scale-90" />
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
