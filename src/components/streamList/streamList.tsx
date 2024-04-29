import { Button } from "@material-tailwind/react";
import { div } from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const socketEndpoint = process.env.REACT_APP_WEBSOCKET_ENDPOINT as string; // NestJS WebSocketGateway의 주소
export interface SessionInfo {
  sessionName: string;
  participantNumber: number;
}
function useRealtimeSessionUpdates() {
  const [sessionList, setSessionList] = useState<SessionInfo[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const location = useLocation();
  useEffect(() => {
    // 웹소켓 연결
    const newSocket = io(socketEndpoint, {
      path: "/socket/",
      withCredentials: true,
      transports: ["websocket"],
    });
    newSocket.on("connect", () => {
      console.log("WebSocket connected");
      // 초기 세션 정보 요청
      fetchSessionInfo();
      // 일정 시간 간격으로 세션 정보 업데이트 요청 설정
      const intervalId = setInterval(fetchSessionInfo, 3000);
      return () => {
        // 컴포넌트가 언마운트될 때 clearInterval로 인터벌 해제
        clearInterval(intervalId);
        // 웹소켓 연결 해제
        if (socket) {
          socket.disconnect();
        }
      };
    });
    newSocket.on("sessionInfo", (sessionInfo: SessionInfo[]) => {
      console.log("Received sessionInfo:", sessionInfo);
      setSessionList(sessionInfo);
    });
    setSocket(newSocket);
    // 세션 정보 요청 함수
    const fetchSessionInfo = () => {
      newSocket.emit("sessionUpdate");
    };

    return () => {
      if (newSocket && newSocket.connected) {
        newSocket.disconnect();
      }
    };
  }, [location.pathname]);

  // 컴포넌트가 마운트될 때 한 번만 실행
  return sessionList;
}

function JoinBtn() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <Button
        className="mt-6 text-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]"
        color="white"
        size="lg"
        children={"PT룸 생성"}
        onClick={() => navigate(`/live`)}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
    </div>
  );
}

function SessionListComponent() {
  const sessionList = useRealtimeSessionUpdates();
  const navigate = useNavigate();

  return (
    <div>
      <JoinBtn />
      <div className="grid grid-cols-4 gap-4">
        {sessionList.map((session, index) => (
          <div key={index} className="col-span-1">
            <div className="grid grid-cols-subgrid gap-4 col-span-3">
              <div className="bg-gray-200 text-gray-600 border-b border-gray-300 p-4 col-span-2">
                {session.sessionName}
              </div>
              <div className="bg-gray-200 text-gray-600 border-b border-gray-300 p-4 col-span-1">
                참여자 수: {session.participantNumber}
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate(`/live/${session.sessionName}`)}
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SessionListComponent;
