import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { CreateChat, Friends, SearchBar } from ".";

const Sidebar = ({ userChat, user }) => {
  return (
    <section className="lg:w-[30%] hidden border-r-2 border-gray-300 h-full lg:flex flex-col">
      <div>
        <div className="flex justify-between items-center bg-[rgb(227,230,230)] h-[65px] px-4 border-b-2 border-white">
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
      </div>
      {/* Top Sidebar */}

      {/* Chat Friends */}
      <div className="flex-grow overflow-y-scroll bg-white">
        <Friends userChat={userChat} />
      </div>
    </section>
  );
};

export default Sidebar;
