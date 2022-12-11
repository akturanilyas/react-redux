import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { io, Socket } from 'socket.io-client';
import { AuthService } from './authService';

let socket: Socket;

export async function getSocket() {
  if (!socket) {
    socket = io(process.env.REACT_APP_API_URL as string, {
      withCredentials: true,
      transports: ['websocket'],
      auth: {
        token: await AuthService.getToken(),
      },
    });
  }

  return socket;
}

export const socketListener = async (dispatch: Dispatch<AnyAction>, event: any, evenName: string) => {
  const ws = await getSocket();
  console.log('socketListener');
  try {
    const listener = (response: MessageEvent) => {
      dispatch(event(response));
      console.log(response);
    };

    ws.on(evenName, listener);
  } catch (e) {
    console.log(e);
  }
};
