import { useState } from 'react';
import ChatList from '../../components/chat-element/ChatList';
import { MessageBox } from '../../components/message-box/MessageBox';

export default function Chat() {
  const [currentChatId, setCurrentChatId] = useState<number|null>(null);

  return (
    <div className={'row h-100 mh-100'}>
      <ChatList setChatId={setCurrentChatId} currentChatId={currentChatId}/>
      <div className="col">
        <MessageBox/>
      </div>
    </div>
  );
}
