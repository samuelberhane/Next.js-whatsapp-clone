import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
const Friends = () => {
  const [userChat, setUserChat] = useState([]);

  //   fetch users chat
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(db, "chats"),
          where("users", "array-contains", user.email),
          orderBy("timestamp", "desc")
        );
        let chats = [];
        const unsubscribe = onSnapshot(q, (snapshot) => {
          snapshot.forEach((doc) => {
            chats.push({
              id: doc.id,
              data: doc.data(),
            });
            setUserChat(chats);
          });
        });
      }
    });
  }, [userChat]);

  return (
    <div className="h-full bg-white">
      {userChat?.map((chat, index) => {
        const friendEmail = chat.data.users.find(
          (email) => email !== auth?.currentUser?.email
        );

        return (
          <div className="px-2 pt-2" key={index}>
            <div className="hover:bg-gray-50 cursor-pointer flex gap-2 items-center hover:border-[1px] rounded-md shadow-sm">
              <img
                src="/image/user.jpg"
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
