import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import ChatList from '../../components/chat-element/ChatList';
import { MessageBox } from '../../components/message-box/MessageBox';

export default function Chat() {
  return (
    <div>
      <div className="row m-5">
        <ChatList />
        <MessageBox />
      </div>
    </div>
  );
}
