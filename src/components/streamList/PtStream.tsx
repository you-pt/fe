import { Publisher, StreamManager } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';
import { useOpenvidu } from '../../hooks/UseOpenvidu';
import { useStream } from '../../hooks/useStream';
import  RoundButton  from './RoundButton';


export function PtStream({  roomId, userId, streamManager}: Props) {
  const { publisher, subscribers, onChangeCameraStatus, onChangeMicStatus, leaveSession } = useOpenvidu(userId, roomId, streamManager);
  const { speaking, micStatus, videoStatus, videoRef } = useStream(publisher || undefined);

  const [mic, setMic] = useState<boolean | null | undefined>(null);
  const [cam, setCam] = useState<boolean | null | undefined>(null);

  useEffect(() => {
    if (publisher && videoRef?.current) {
      publisher.addVideoElement(videoRef.current);
    }
  }, [publisher, videoRef.current]);

  const handleMicToggle = () => {
    if (publisher) {
      onChangeMicStatus(!publisher.stream.audioActive);
      setMic(!publisher.stream.audioActive);
    }
  };

  const handleCameraToggle = () => {
    if (publisher) {
      onChangeCameraStatus(!publisher.stream.videoActive);
      setCam(!publisher.stream.videoActive);
    }
  };

  return (
    <div className="w-full max-h-60vh rounded-xl border border-transparent">
  {publisher ? (
    <div>
      <video ref={videoRef} autoPlay className="w-full max-h-53vh rounded-xl" />
      <div className="flex">
        <RoundButton
          onClick={handleMicToggle}
          color={!mic ? 'blue' : 'red'}
          label={!mic ? '마이크 끄기' : '마이크 켜기'}
        />
        <div className="w-4" /> {/* 가로 간격 조절 */}
        <RoundButton
          onClick={handleCameraToggle}
          color={!cam ? 'blue' : 'red'}
          label={!cam ? '카메라 끄기' : '카메라 켜기'}
        />
      </div>
    </div>
  ) : (
    <div className="bg-gray-800 border border-transparent w-full h-full rounded-xl flex justify-center items-center">
      <div className="text-white">
        <h2 className="text-2xl">화면을 송출할 수 없습니다</h2>
      </div>
    </div>
  )}
</div>

  );
}

interface Props {
  roomId: string;
  userId: string;
  streamManager: any
}