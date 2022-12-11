import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useSendMessageMutation } from '../../api/message';
import { useAppSelector } from '../../app/hooks';
import { selectTargetId, selectTargetType } from '../../features/chat/chatSlice';
import { selectMessages } from '../../features/message/messageSlice';
import { Message } from '../message/Message';

const textFieldHeight = 100;

export const MessageBox = () => {
  const [text, setText] = useState('');
  const messages = useAppSelector(selectMessages);
  const targetId = useAppSelector(selectTargetId);
  const targetType = useAppSelector(selectTargetType);
  const [sendMessage] = useSendMessageMutation();
  const send = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ('Enter' === e.key) {
      sendMessage({ text, targetId, targetType });
    }
  };

  const changeText = (event: any) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="container h-100 border-2 row m-0">
        <div className="col-12" style={{ height: `calc(100% - ${textFieldHeight}px)` }}>
          <div className="row">
            {!messages?.length ? (
              <h1>Mesaj yok</h1>
            ) : (
              messages.map((message) => {
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
