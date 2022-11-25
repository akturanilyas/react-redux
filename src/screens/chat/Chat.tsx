import ChatList from '../../components/chat-element/ChatList';
import { MessageBox } from '../../components/message-box/MessageBox';

export default function Chat() {
  return (
    <div className={'row h-100 mh-100'}>
      <ChatList />
      <div className="col bg-dark">
        <MessageBox />
      </div>
    </div>
  );
}
