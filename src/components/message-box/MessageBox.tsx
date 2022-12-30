import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useLazyMessagesQuery } from '../../api/services/message/messageService';
import { ChatEvent } from '../../enums/chatEvent';
import { useMain } from '../../redux/slices/mainSlice';
import { getSocket } from '../../services/socketService';
import { Message as MessageType } from '../../types/models';
import { Messages } from './Messages';
import { CustomizedTextField } from '../common/TextField';
import { SelectChatText } from './ChatSelectText';
import { ChatBar } from './ChatBar';

export const MessageBox = () => {
  const [text, setText] = useState<string>('');
  const { chatState, user } = useMain();
  const [socket, setSocket] = useState<null | Socket>(null);
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const [getMessages] = useLazyMessagesQuery();

  const sendMessage = (text: string, targetId: number, targetType: string) => {
    socket?.emit(ChatEvent.SEND_MESSAGE, { targetId, targetType, text });
  };

  const send = (e: any) => {
    if ('Enter' === e.key) {
      sendMessage(text, chatState!.targetId, chatState!.targetType);
      setText('');
    }
  };

  const changeText = (event: any) => {
    setText(event.target.value);
  };

  const addMessage = (response: MessageType) => {
    const checkMessage = messages.find((item: MessageType) => response.id === item.id);

    if (!checkMessage) {
      setMessages((messages) => [...messages, response]);
    } else {
      console.log('mesaj var zaten');
    }
  };

  useEffect(() => {
    if (chatState?.chatId) {
      getSocket().then((socket) => {
        console.log('socketegirdi');
        setSocket(socket);
        socket.on(`messageEmit-${user!.id}`, (response: MessageType) => {
          addMessage(response);
        });

        return () => {
          socket.off(`messageEmit-${user?.id}`);
        };
      });
    }
  }, [chatState?.chatId]);

  useEffect(() => {
    if (chatState?.chatId) {
      getMessages(chatState?.chatId)
        .unwrap()
        .then((item) => setMessages(item));
    }
  }, [chatState?.chatId]);

  return (
    <div className="col-span-9 h-full" style={{ height: 'inherit' }}>
      {!chatState?.chatId ? (
        <SelectChatText/>
      ) : (
        <>
          <ChatBar username={chatState.chat?.usersChats[0].target.username}/>
          <Messages messages={messages}/>
          <CustomizedTextField
            onSubmit={send}
            text={text}
            onChange={changeText}/>
        </>
      )}
    </div>
  );
};
