import React from 'react';
import ChatList from '../../components/chat-element/ChatList';
import { MessageBox } from '../../components/message-box/MessageBox';

export default function Chat() {
  return (
    <div className="min-h-screen grid grid-cols-12 divide-x bg-default-color-dark">
      <ChatList />

      <MessageBox />
    </div>
  );
}
