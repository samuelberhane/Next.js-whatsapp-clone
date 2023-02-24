import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { CgSortAz } from "react-icons/cg";

const Sidebar = () => {
  return (
    <section className="w-[35%] bg-white border-r-2 border-gray-300">
      {/* Top Sidebar */}
      <div className="flex justify-between items-center bg-[rgb(227,230,230)] px-4 py-3 border-b-2 border-white">
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
      <div className="flex p-2 gap-2 border-b-[1px] border-gray-300 items-center">
        <div className="relative h-[36px] flex-grow rounded-lg">
          <input
            type="text"
            className="w-full h-full pl-12 pr-8 rounded-lg bg-[rgb(227,230,230)]"
            placeholder="Search or start new chat"
          />
          <BiSearchAlt2 className="absolute top-[50%] translate-y-[-50%] left-2" />
        </div>
        <CgSortAz className="text-3xl text-gray-400" />
      </div>
    </section>
  );
};

export default Sidebar;
