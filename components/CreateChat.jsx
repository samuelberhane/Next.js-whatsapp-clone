import { auth, db } from "@/firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { use, useState } from "react";

const CreateChat = () => {
  const [openEmail, setOpenEmail] = useState(false);
  const [email, setEmail] = useState("");

  //   create new chat
  const createChat = async (e) => {
    e.preventDefault();
    const user = auth?.currentUser?.email;
    let userChat = [];
    if (user && user !== email) {
      await getDocs(collection(db, "chats")).then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          if (doc.data().users.includes(user)) {
            userChat.push(doc);
          }
        });
      });

      //   check email is already in existing in user chat
      const emailExists = userChat.find((doc) =>
        doc.data().users.includes(email)
      );

      //   create new chat
      if (!emailExists) {
        setEmail("");
        setOpenEmail(false);
        const getFriendProfile = await getDoc(doc(db, "users", email));
        let friendProfile;
        if (getFriendProfile.data()) {
          console.log(getFriendProfile.data());
          friendProfile = getFriendProfile.data().userImage;
        } else {
          friendProfile = "/image/user.jpg";
        }

        await addDoc(collection(db, "chats"), {
          users: [user, email],
          timestamp: serverTimestamp(),
          FriendImage: friendProfile,
        });
      }
    }
  };

  return (
    <section className="bg-white">
      <div className="flex justify-center p-2">
        <button
          className="bg-gray-100 py-2 w-full rounded hover:opacity-90 hover:border-[1px] border-green-100"
          onClick={() => setOpenEmail((prev) => !prev)}
        >
          Create a New Chat
        </button>
      </div>
      {openEmail && (
        <form className="py-1 px-2" onSubmit={createChat}>
          <input
            type="email"
            className="w-full shadow-sm border-[1px] py-2 px-3 outline-none focus:border-green-200 rounded"
            placeholder="Enter email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
      )}
    </section>
  );
};

export default CreateChat;
