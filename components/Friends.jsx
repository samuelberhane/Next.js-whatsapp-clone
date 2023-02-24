import { auth } from "@/firebase/config";
import { useGlobalChatContext } from "@/context/ChatContext";

const Friends = ({ userChat }) => {
  const { dispatch } = useGlobalChatContext();

  return (
    <div className="h-full bg-white">
      {userChat?.map((chat, index) => {
        // get friend email
        const friendEmail = chat.data.users.find(
          (email) => email !== auth?.currentUser?.email
        );

        // get friend profile pic
        const friendProfile = chat.data.usersImage.find(
          (image) => image !== auth?.currentUser?.photoURL
        );

        return (
          <div className="px-2 pt-2" key={index}>
            <div
              className="hover:bg-gray-50 cursor-pointer flex gap-2 items-center hover:border-[1px] rounded-md shadow-sm"
              onClick={() =>
                dispatch({
                  type: "SET_CHAT",
                  payload: { friendEmail, friendProfile, id: chat.id },
                })
              }
            >
              <img
                src={friendProfile}
                alt="userImage"
                className="w-[40px] h-[40px] rounded-full"
              />
              <p className="text-sm">{friendEmail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Friends;
