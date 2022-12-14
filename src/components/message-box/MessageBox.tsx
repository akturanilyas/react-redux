import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMessagesMutation, useSendMessageMutation } from '../../api/message';
import { useAppSelector } from '../../app/hooks';
import {
  selectChatId,
  selectChats,
  selectTargetId,
  selectTargetType,
  setChatMessages,
} from '../../features/chat/chatSlice';
import { Message } from '../message/Message';

const textFieldHeight = 100;

export const MessageBox = () => {
  const [text, setText] = useState('');
  const chats = useAppSelector(selectChats);
  const chatId = useAppSelector(selectChatId);
  const targetId = useAppSelector(selectTargetId);
  const targetType = useAppSelector(selectTargetType);
  const [sendMessage] = useSendMessageMutation();
  const [messagesQuery, { data: messages, isLoading: messageIsLoading }] = useMessagesMutation();
  const dispatch = useDispatch();

  const send = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ('Enter' === e.key) {
      sendMessage({ text, targetId, targetType });
    }
  };

  const changeText = (event: any) => {
    setText(event.target.value);
  };

  useEffect(() => {
    if (!messageIsLoading && messages && chatId) {
      const newChats = chats.map((item) => {
        if (item.chat_id === chatId) {
          return { ...item, messages };
        }

        return item;
      });
      dispatch(setChatMessages({ chats: newChats }));
    }
  }, [messageIsLoading]);

  useEffect(() => {
    if (null !== chatId) {
      messagesQuery(chatId);
    }
  }, [chatId]);

  return (
    <>
      <div className="container h-100 border-2 row m-0">
        <div className="col-12" style={{ height: `calc(100% - ${textFieldHeight}px)` }}>
          <div className="row">
            {/* eslint-disable-next-line no-nested-ternary */}
            {!chatId ? (
              <h1>asdjnasdjkans</h1>
            ) : !chats.find((item) => item.chat_id === chatId)?.messages?.length ? (
              <h1>Mesaj yok</h1>
            ) : (
              chats
                .find((item) => item.chat_id === chatId)
                ?.messages.map((message) => {
                  return (
                    <div className="row">
                      <Message
                        key={message.id}
                        text={message.text}
                        userName={message.sender?.username ?? 'username'}
                        direction={message.direction}
                        time={message.created_at}
                      />
                    </div>
                  );
                })
            )}
          </div>
        </div>
        <div className="col-12 row" style={{ height: textFieldHeight }}>
          <TextField className={'p-0 w-100'} onKeyDown={send} onChange={changeText} />
        </div>
      </div>
    </>
  );
};
