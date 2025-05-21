
import React, { createContext, useContext, useEffect, useState } from 'react';

type SocketContextType = {
  connected: boolean;
  roomId: string | null;
  setRoomId: (id: string | null) => void;
  userName: string | null;
  setUserName: (name: string | null) => void;
  isTeacher: boolean;
  setIsTeacher: (value: boolean) => void;
};

const defaultContext: SocketContextType = {
  connected: false,
  roomId: null,
  setRoomId: () => {},
  userName: null,
  setUserName: () => {},
  isTeacher: false,
  setIsTeacher: () => {},
};

const SocketContext = createContext<SocketContextType>(defaultContext);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isTeacher, setIsTeacher] = useState(false);

  // In a real implementation, we would initialize socket.io here
  useEffect(() => {
    // Future socket.io connection logic
    
    // For now, just simulate connection
    setConnected(true);

    return () => {
      // Future socket cleanup
      setConnected(false);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        connected,
        roomId,
        setRoomId,
        userName,
        setUserName,
        isTeacher,
        setIsTeacher,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
