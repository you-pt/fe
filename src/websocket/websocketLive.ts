import { Socket } from "socket.io-client";
import { SessionInfo } from "../components/streamList/streamList";

export function live(ws: Socket | null) {
  return {
    send: {
      connect: () => ws?.emit("enterRoom"),
      chat: (sessionId: number, nickname: string, msg: string) =>
        ws?.emit("chat", { nickname, sessionId, msg }),
      leave: () => {
        ws?.emit("leaveRoom");
        // ws?.disconnect();
      },
    },
    receive: {
      init: () => {
        //초기화
        let initData = {};
        ws?.on("init", (data) => {
          initData = { ...data };
        });
        return initData;
      },
      chat: () => {
        //채팅 수신
        const chat = { nickname: "", msg: "" };
        ws?.on("chat", (data) => {
          chat.nickname = data.nickname;
          chat.msg = data.msg;
        });
        return chat;
      },
    },
  };
}
