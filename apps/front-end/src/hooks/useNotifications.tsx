import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import useStore from '../state';
import { NotificationType } from '../types/notification';

const useNotifications = () => {
  const { storeInfos, clientInfos } = useStore();
  const isStore = localStorage.getItem('isStore') === 'true';
  const profileId = isStore ? storeInfos.id : clientInfos.id;

  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current && profileId) {
      socketRef.current = io('http://localhost:3001', {
        query: { profileId },
      });

      socketRef.current.on('notification', (data) => {
        console.log('Nova notificação recebida:', data);
        setNotifications((prev) => [...prev, data.message]);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [profileId]);

  return { notifications };
};

export default useNotifications;
