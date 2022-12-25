import { LinearProgress, List, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useLazyMessagesQuery } from '../../api/services/message/messageService';
import { ChatEvent } from '../../enums/chatEvent';
import { MessageDirection } from '../../enums/messageDirection';
import { useGlobalLoading } from '../../redux/slices/loadingSlice';
import { useMain } from '../../redux/slices/mainSlice';
import { getSocket } from '../../services/socketService';
import { Message as MessageType } from '../../types/models';
import { Message } from '../message/Message';

export const MessageBox = () => {
  const [text, setText] = useState('');
  const { chatState, user } = useMain();
  const { loading: isLoading } = useGlobalLoading();
  const [socket, setSocket] = useState<null | Socket>(null);
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const [getMessages] = useLazyMessagesQuery();

  const sendMessage = (text: string, targetId: number, targetType: string) => {
    socket?.emit(ChatEvent.SEND_MESSAGE, { targetId, targetType, text });
  };

  const send = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ('Enter' === e.key) {
      sendMessage(text, chatState!.targetId, chatState!.targetType);
    }
  };

  const changeText = (event: any) => {
    setText(event.target.value);
  };

  const addMessage = (response: MessageType) => {
    setMessages((messages) => [...messages, response]);
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
    <>
      <div className="col-8">
        {!chatState?.chatId ? (
          <h1>Chat Seç</h1>
        ) : (
          <>
            <List
              sx={{
                bgcolor: 'background.paper',
                overflow: 'auto',
                height: '80vh',
              }}
            >
              {/* eslint-disable-next-line no-nested-ternary */}
              {
                // eslint-disable-next-line no-nested-ternary
                messages?.length === 0 ? (
                  <h1>Mesaj yok</h1>
                ) : isLoading > 0 ? (
                  <LinearProgress color="success" />
                ) : (
                  messages?.map((message: any) => {
                    return (
                      <div className="d-flex" key={message.id}>
                        <Message
                          key={message.id}
                          text={message.text}
                          userName={message.sender?.username ?? 'username'}
                          direction={
                            message?.sender?.id === user?.id ? MessageDirection.OUTBOUND : MessageDirection.INBOUND
                          }
                          time={message.created_at}
                        />
                      </div>
                    );
                  })
                )
              }
            </List>
            <TextField className={'p-0 w-100'} onKeyDown={send} onChange={changeText} />
          </>
        )}
      </div>
    </>
  );
};
