import { ChatElement } from '../../components/chat-element/ChatElement';
import { MessageBox } from '../../components/message-box/MessageBox';

export default function Chat() {
  return (
    <div className={'row h-100 mh-100'}>
      <div className="d-flex flex-column col-4 py-2 border-2 rounded h-100">
        <ChatElement text={'12312'} avatar={'JANSKDMAS'} fullName={'ajnsdkasmd'} />
        <ChatElement text={'12312'} avatar={'JANSKDMAS'} fullName={'ajnsdkasmd'} />
        <ChatElement text={'12312'} avatar={'JANSKDMAS'} fullName={'ajnsdkasmd'} />
        <ChatElement text={'12312'} avatar={'JANSKDMAS'} fullName={'ajnsdkasmd'} />
      </div>
      <div className="col bg-dark">
        <MessageBox />
      </div>
    </div>
  );
}
