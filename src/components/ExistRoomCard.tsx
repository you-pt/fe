import React from 'react';

interface RoomCardProps {
  name: string;
  sessionName: string;
  onPress: () => void;
  onRefresh: () => void;
}

const ExistRoomCard: React.FC<RoomCardProps> = ({ name, sessionName, onPress, onRefresh }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-48 p-1.5 transition-width">
      <div className="w-full h-full flex flex-col items-center justify-center rounded-lg bg-gray-200 border border-black cursor-pointer text-lg hover:bg-gray-300 animation">
        <div className="mb-2">
          <span>{name}</span>
          <br />
          <span className="text-sm text-gray-500">{sessionName}</span>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onRefresh}>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ExistRoomCard;