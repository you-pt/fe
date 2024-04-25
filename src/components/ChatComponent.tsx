import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import "./Chat.css";

const ChatComponent /**: React.FC*/ = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState("");
  const [joined, setJoined] = useState(false);
  const [name, setName] = useState("");
  const [typingDisplay, setTypingDisplay] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    // newSocket.emit("findAllMessages", {}, (response) => {
    //   setMessages(response);
    // });

    newSocket.on('connect', () => {
        console.log('WebSocket connected');     
        return () => {          
          // 웹소켓 연결 해제
          if (socket) {
            socket.disconnect();
          }
        };
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
      newSocket.disconnect();
    };
  }, []);

  const join = () => {
    if (socket) {
      socket.emit("join", { name }, () => {
        setJoined(true);
      });
    }
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit("createMessage", { text: messageText }, () => {
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
    <div className="chat">
      {!joined ? (
        <div>
          <form onSubmit={join}>
            <label>What's your name?</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <div className="chat-container">
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index}>
                [{message.name}] : {message.text}
              </div>
            ))}
          </div>

          {typingDisplay && <div>{typingDisplay}</div>}

          <hr />

          <div className="message-input">
            <form onSubmit={sendMessage}>
              <label>Message:</label>
              <input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onInput={emitTyping}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;