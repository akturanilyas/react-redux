import { TextField } from '@mui/material';
import React from 'react';
import { useSendMessageMutation } from '../../api/message';
import { useAppSelector } from '../../app/hooks';
import { selectMessages } from '../../features/message/messageSlice';
import { Message } from '../message/Message';

const textFieldHeight = 100;

interface MessageBoxProps {
  currentChatId: number | null;
}

export const MessageBox = (props: MessageBoxProps) => {
  const { currentChatId } = props;

  const messages = useAppSelector(selectMessages);

  const [sendMessage] = useSendMessageMutation();

  const send = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ('Enter' === e.key) {
      sendMessage('sadsdasd');
      console.log(currentChatId);
    }
  };

  return (
    <>
      <div className="container h-100 border-2 row m-0">
        <div className="col-12" style={{ height: `calc(100% - ${textFieldHeight}px)` }}>
          <div className="row">
            {messages.map((message) => {
              return (<div className="row">
                <Message key={message.id}
                         text={message.message} userName={message.sender.username}
                         direction={message.direction}
                         time={message.created_at}/>
              </div>);
            })}
          </div>
        </div>
        <div className="col-12 row" style={{ height: textFieldHeight }}>
          <TextField className={'p-0 w-100'} onKeyDown={send}/>
        </div>
      </div>
    </>
  );
};
