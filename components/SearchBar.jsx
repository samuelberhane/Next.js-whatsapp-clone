import { BiSearchAlt2 } from "react-icons/bi";
import { CgSortAz } from "react-icons/cg";

const SearchBar = () => {
  return (
    <div className="flex p-2 gap-2 border-b-[1px] border-gray-300 items-center bg-white">
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
  );
};

export default SearchBar;
