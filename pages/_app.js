import "@/styles/globals.css";
import { ChatContextProvider } from "@/context/ChatContext";

export default function App({ Component, pageProps }) {
  return (
    <ChatContextProvider>
      <Component {...pageProps} />
    </ChatContextProvider>
  );
}
