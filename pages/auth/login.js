import { auth, db } from "@/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useRouter } from "next/router";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Login = () => {
  const router = useRouter();
  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      await setDoc(doc(db, "users", user?.email), {
        name: user?.displayName,
        userImage: user?.photoURL,
        id: user?.uid,
      });
      axios.post("/api/login");
      router.push("/");
      console.log(user);
    });
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <img src="/image/logo.jpg" alt="logoImage" />
      <button
        className="bg-green-400 rounded px-12 py-2 text-white mt-4 flex items-center gap-2 uppercase"
        onClick={login}
      >
        <FcGoogle className="text-xl mt-1" /> Login with Google
      </button>
    </section>
  );
};

export const getServerSideProps = async (context) => {
  if (context.req?.cookies?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Login;
