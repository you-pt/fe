import {
  Button,
  Card,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import { div } from "@tensorflow/tfjs";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
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

const collapse = {
  position: "fixed",
  left: "50%",
  top: "calc(100vh - 110px)",
  transform: "translate(-50%, 0)",
} as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const expand = {
  position: "fixed",
  left: "50%",
  transform: "translate(-50%, -50%)",
  top: "50%",
} as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

function SessionListComponent() {
  const sessionList = useRealtimeSessionUpdates();
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);

  return (
    <div className="">
      <JoinBtn />
      <div
        style={showList ? expand : collapse}
      >
        <Card
          className="w-96 h-96 mt-16"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <List
            className="bg-slate-300 hover:bg-slate-600"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <ListItem
              ripple={false}
              className="py-1 pr-1 pl-4"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={() => {
                setShowList((prev) => !prev);
              }}
            >
              <div>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {showList ? "방 목록 가리기" : "방 목록 보기"}
                </Typography>
              </div>
            </ListItem>
          </List>
          <List
            className="overflow-y-auto"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {
              sessionList.map((session, index) => (
                <ListItem
                  key={session.sessionName}
                  ripple={false}
                  className="py-1 pr-1 pl-4"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {session.sessionName}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      참여자 수: {session.participantNumber}
                    </Typography>
                  </div>

                  <ListItemSuffix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <IconButton
                      onClick={() => navigate(`/live/${session.sessionName}`)}
                      variant="text"
                      color="blue-gray"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {"->"}
                    </IconButton>
                  </ListItemSuffix>
                </ListItem>
              ))}
          </List>
        </Card>
      </div>
    </div>
  );
}
export default SessionListComponent;
