import Head from "next/head";
import { Chat, Messages, Sidebar } from "@/components";
import { useState } from "react";

export default function Home() {
  const [currentChat, setCurrentChat] = useState(1);
  return (
    <>
      <Head>
        <title>Whatsapp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[100vh] flex flex-col">
        <div className="bg-[#1b9447] h-[100px] w-full absolute top-0 left-0 " />
        <div className="h-[calc(100vh-40px)] bg-[rgb(227,230,230)] z-50 mt-[20px] mx-4 md:mx-8 flex">
          <Sidebar />
          {!currentChat ? <Chat /> : <Messages />}
        </div>
        <div className="bg-[rgb(211,208,208)] h-[100px] w-full absolute bottom-0 left-0 " />
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  if (!context.req?.cookies?.user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
