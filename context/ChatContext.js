import { createContext, useContext, useReducer } from "react";

const ChatContext = createContext();

const chatReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_CHAT":
      return {
        ...state,
        currentChat: payload,
      };
    default:
      return state;
  }
};

const initialState = {
  currentChat: null,
  messages: [],
};

const ChatContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

const useGlobalChatContext = () => {
  return useContext(ChatContext);
};

export { ChatContextProvider, useGlobalChatContext };
