import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

const socketEndpoint = 'http://localhost:5000'; // NestJS WebSocketGateway의 주소

export interface SessionInfo {
  sessionName: string;
  participantNumber: number;
}



function useRealtimeSessionUpdates() {
  const [sessionList, setSessionList] = useState<SessionInfo[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // 웹소켓 연결
    const newSocket = io(socketEndpoint, {
      withCredentials: true,
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('WebSocket connected');
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

    newSocket.on('sessionInfo', (sessionInfo: SessionInfo[]) => {
      console.log('Received sessionInfo:', sessionInfo);
      setSessionList(sessionInfo);
    });

    setSocket(newSocket);

    // 세션 정보 요청 함수
    const fetchSessionInfo = () => {
      newSocket.emit('sessionUpdate');
    };

  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return sessionList;
}

function SessionListComponent() {
  const sessionList = useRealtimeSessionUpdates();
  const navigate = useNavigate();

  if (!sessionList || sessionList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Session List</h2>
      <ul>
        {sessionList.map((session) => (
          <table className="min-w-full leading-normal">
          <tr>
            <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-gray-300"> {session.sessionName}</th>
            <th className="px-6 py-3 bg-gray-200 text-gray-600 border-b border-gray-300"> 참여자 수 : {session.participantNumber}</th>
            <button
             onClick={() => {
               navigate(`/live/${session.sessionName}`);
             }}
           >
             Join
           </button>
          </tr>
          </table>
          
        //    <li key={session.sessionName}>
        //    <strong>Session Name:</strong> {session.sessionName},{' '}
        //    <strong>Participants:</strong> {session.participantNumber}
        //    <button
        //      onClick={() => {
        //        navigate(`/live/${session.sessionName}`);
        //      }}
        //    >
        //      Join
        //    </button>
        //  </li>
        ))}
      </ul>
    </div>
  );
}

export default SessionListComponent;
