import { auth } from "@/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      axios.post("/api/login");
      router.push("/");
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
