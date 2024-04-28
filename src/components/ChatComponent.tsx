import { useState, useEffect /** , ChangeEvent, FormEvent*/ } from "react";
import { io, Socket } from "socket.io-client";
import "./Chat.css";
import { useParams } from "react-router-dom";
const socketEndpoint = process.env.REACT_APP_WEBSOCKET_ENDPOINT as string;

const ChatComponent: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState("");
  const [joined, setJoined] = useState(false);
  const [name, setName] = useState("");
  const [typingDisplay, setTypingDisplay] = useState("");
  const { sessionId } = useParams();

  const newSocket = io(socketEndpoint, {
    path: "/back/",
    withCredentials: true,
    transports: ["websocket"],
  });
  useEffect(() => {
    console.log(sessionId);

    setSocket(newSocket);

    findAllmessages();

    newSocket.on("chat", (chat) => {
      setMessages((prevMessages) => [...prevMessages, chat]);
    });

    const intervalId = setInterval(findAllmessages, 3000);

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
      clearInterval(intervalId);
      newSocket.disconnect();
    };
  }, []);

  const findAllmessages = () => {
    newSocket.emit(
      "findAllMessages",
      { roomId: sessionId },
      (response: any) => {
        setMessages(response);
      }
    );
  };

  const join = () => {
    if (socket) {
      socket.emit("join", { name, roomId: sessionId }, () => {
        setJoined(true);
        console.log("조인됨");
      });
    }
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 동작 방지
    if (socket) {
      socket.emit(
        "createMessage",
        { roomId: sessionId, text: messageText },
        () => {
          setMessageText("");
        }
      );
    }
  };

  let timeout: NodeJS.Timeout | null = null;

  const emitTyping = () => {
    if (socket) {
      socket.emit("typing", { roomId: sessionId, isTyping: true });
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        socket.emit("typing", { roomId: sessionId, isTyping: false });
      }, 2000);
    }
  };

  /** tailwind(css)...*/
  return (
    <div className="chat flex flex-col flex-grow">
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
          {/* <div className="messages-container flex-grow overflow-auto">
            {messages.map((message, index) => (
              <div key={index} className="mb-1">
                <span className="font-bold">{message.name}</span>:{" "}
                {message.text}
              </div>
            ))}
          </div> */}

          <div className="message-input">
            {/* 입력창 바로 위에 메시지가 표시되도록 조정 */}
            <div className="chat-container flex-grow flex flex-col mb-4">
              {/* 메세지가 채팅창 바로 위에 아래서 위로 올라오게 */}
              <div className="w-3/4 bg-gray-200 p-2 rounded">
                <div className="messages-container flex-grow overflow-auto flex flex-col-reverse">
                  <div className="flex-grow">
                    {messages.slice(-5).map((message, index) => (
                      <div key={index} className="mb-1">
                        <span className="font-bold">{message.name}</span>:{" "}
                        {message.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={sendMessage} className="flex items-center w-3/4">
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
