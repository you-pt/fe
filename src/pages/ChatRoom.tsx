import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from '../components/RoomCard';
import LiveSession from './Live';
import {  useNavigate } from 'react-router-dom';
import ExistRoomCard from '../components/ExistRoomCard';

interface UserInfo {
  nickname: string;
}

const ChatRoomPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');

  useEffect(() => {
    // 쿠키에 저장된 토큰을 가져오는 함수 (예: 자체 로직에 맞게 변경 필요)
    const getTokenFromCookie = (): string | null => {
      const token = ''; // 쿠키에서 토큰을 가져오는 로직 구현
      return token;
    };

    const token = getTokenFromCookie();

    
  }, []);

  const navigate = useNavigate();

  const createChatRoom = () => {
    navigate('/live');
  };

  return (
    <>
    <div>
      <h1>Chat Room</h1>
      {alertMessage && <p style={{ color: 'red' }}>{alertMessage}</p>}
    </div>
    <div className='flex flex-wrap pt-16 px-1.6 pb-1.6'>
      <ExistRoomCard name='' sessionName='' onPress={() => createChatRoom()} onRefresh={() => createChatRoom} />
    </div>
    <div className='flex flex-wrap pt-16 px-1.5 pb-1.5'>
        <RoomCard createCard name={''} onPress={() => createChatRoom()} />
       
      </div>
    </>
  );
};

export default ChatRoomPage;
