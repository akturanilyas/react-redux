import { LinearProgress, List } from '@mui/material';
import React from 'react';
import { Message } from '../message/Message';
import { MessageDirection } from '../../enums/messageDirection';
import { Message as MessageType } from '../../types/models';
import { useGlobalLoading } from '../../redux/slices/loadingSlice';
import { useMain } from '../../redux/slices/mainSlice';

interface MessagesProps {
  messages: MessageType[];
}

export const Messages = (props: MessagesProps) => {
  const { messages } = props;
  const { loading: isLoading } = useGlobalLoading();
  const { user } = useMain();

  if (isLoading > 0) {
    return <LinearProgress id={'linearProgress'} color="success"/>;
  }

  if (!messages.length) {
    return <>
      <div className="border rounded-xl flex chat-height text-center justify-center">
        <span className={'self-center'}>İlk mesajı siz atın</span>
      </div>
    </>;
  }

  return <>
    <List className={'border overflow-y-auto chat-height'}>
      {messages?.map((message) => {
        return (
          <div key={message.id} className="row">
            <Message
              text={message.text}
              userName={message.sender?.username ?? 'username'}
              direction={
                message?.sender_id === user!.id ? MessageDirection.OUTBOUND : MessageDirection.INBOUND
              }
              time={message.created_at}
            />
          </div>
        );
      })}
    </List>
  </>;
};
