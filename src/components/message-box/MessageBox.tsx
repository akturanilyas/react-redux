import { AppBar, Box, LinearProgress, List, TextField, Toolbar, Typography } from '@mui/material';
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
    <>
      <Box className="col-8 border-2 rounded" sx={{ height: '80vh' }}>
        {!chatState?.chatId ? (
          <h1>Chat Seç</h1>
        ) : (
          <>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" color="inherit" component="div">
                  {chatState.chat?.usersChats[0].target?.username}
                </Typography>
              </Toolbar>
            </AppBar>
            <List className={'border'} sx={{ overflow: 'auto', height: '80%' }}>
              {/* eslint-disable-next-line no-nested-ternary */}
              {messages?.length === 0 ? (
                <h1>Mesaj yok</h1>
              ) : isLoading > 0 ? (
                <LinearProgress color="success" />
              ) : (
                messages?.map((message) => {
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
              )}
            </List>
            <TextField
              className={'w-100 my-2'}
              style={{ height: '10%' }}
              value={text}
              onKeyDown={send}
              onChange={changeText}
            />
          </>
        )}
      </Box>
    </>
  );
};
