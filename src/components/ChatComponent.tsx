import { useState, useEffect /** , ChangeEvent, FormEvent*/ } from "react";
import { io, Socket } from "socket.io-client";
import "./Chat.css";
import { useParams } from "react-router-dom";

const ChatComponent: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState("");
  const [joined, setJoined] = useState(false);
  const [name, setName] = useState("");
  const [typingDisplay, setTypingDisplay] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.emit("findAllMessages", {}, (response:any) => {
      setMessages(response);
    });

    newSocket.on("chat", (chat) => {
      setMessages((prevMessages) => [...prevMessages, chat]);
    });

    console.log("보내기");

    /**채팅 입력 여부 알려줌 */
    newSocket.on(
      "typing",
      ({ name, isTyping }: { name: string; isTyping: boolean }) => {
        if (isTyping) {
          setTypingDisplay(`${name} is typing...`);
        } else {
          setTypingDisplay("");
        }
      }
    );

    /***언마운트시 소켓 연결 해제 */
    return () => {
    //   newSocket.disconnect();
    };
  }, []);

  const { roomId } = useParams();

  const join = () => {
    
    if (socket) {
      socket.emit("join", { name, roomId }, () => {
        setJoined(true);
      });
    }
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit("createMessage", { roomId,text: messageText }, () => {
        setMessageText("");
      });
    }
  };

  let timeout: NodeJS.Timeout | null = null;

  const emitTyping = () => {
    if (socket) {
      socket.emit("typing", { isTyping: true });
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        socket.emit("typing", { isTyping: false });
      }, 2000);
    }
  };

  /** tailwind(css)...*/
  return (
    <div className="chat flex flex-col h-full">
      {joined ? (
        <div className="flex-grow flex justify-center items-center">
          <form onSubmit={join} className="flex flex-col items-center">
            <label htmlFor="name" className="mb-2">
              What's your name?
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-400 rounded-md p-2 mb-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Join
            </button>
          </form>
        </div>
      ) : (
        <div className="chat-container flex-grow flex flex-col">
          <div className="messages-container flex-grow overflow-auto">
            {messages.map((message, index) => (
              <div key={index} className="mb-1">
                <span className="font-bold">{message.name}</span>:{" "}
                {message.text}
              </div>
            ))}
          </div>

          {typingDisplay && (
            <div className="typing-display">{typingDisplay}</div>
          )}

          <hr className="my-2" />

          <div className="message-input">
            <form onSubmit={sendMessage} className="flex items-center">
              <label htmlFor="message" className="mr-2">
                Message:
              </label>
              <input
                id="message"
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onInput={emitTyping}
                className="border border-gray-400 rounded-md p-2 flex-grow"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ml-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;