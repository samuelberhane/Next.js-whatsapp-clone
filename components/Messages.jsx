import { ChatInfo, MessageForm } from ".";

const Messages = () => {
  return (
    <section className="w-full flex flex-col">
      {/* Chat Detail */}
      <ChatInfo />

      {/* Message Texts */}
      <div className="bg-[url('/image/background.jpg')] flex-grow flex flex-col px-6 py-3">
        <div className="flex justify-start">
          <p className="px-6 py-4 rounded-2xl bg-white max-w-[300px] text-sm leftText">
            Lorem ipsum dolor sit amet,
          </p>
        </div>
        <div className="flex justify-end">
          <p className="px-6 py-4 rounded-2xl bg-[#69ee8b]  max-w-[300px] text-sm relative rightText">
            Lorem ipsum dolor sit amet,
          </p>
        </div>
      </div>

      {/* Send Message Form */}
      <MessageForm />
    </section>
  );
};

export default Messages;
