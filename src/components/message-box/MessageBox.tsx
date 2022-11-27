import { TextField } from '@mui/material';
import React from 'react';
import { getTimeNow } from '../../helpers/timeHelper';
import { Message } from '../message/Message';

const textFieldHeight = 100;

interface MessageBoxProps {
  currentChatId: number | null;
}

export const MessageBox = (props: MessageBoxProps) => {
  const { currentChatId } = props;

  const sendMessage = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ('Enter' === e.key) {
      console.log();
    }
  };

  return (
    <>
      <div className="container h-100 border-2 row m-0">
        <div className="col-12" style={{ height: `calc(100% - ${textFieldHeight}px)` }}>
          <div className="row">
            <div className="row">
              asasas:{currentChatId}
              <Message text={'jamsdkamsd'} userName={'username'} direction={'inbound'} time={getTimeNow()} />
            </div>
            <div className="row" style={{ direction: 'rtl' }}>
              <Message text={'jamsdkamsd'} userName={'username'} direction={'inbound'} time={getTimeNow()} />
            </div>
            <div className="row">
              <Message text={'jamsdkamsd'} userName={'username'} direction={'inbound'} time={getTimeNow()} />
            </div>
            <div className="row">
              <Message text={'jamsdkamsd'} userName={'username'} direction={'inbound'} time={getTimeNow()} />
            </div>
          </div>
        </div>
        <div className="col-12 row" style={{ height: textFieldHeight }}>
          <TextField className={'p-0 w-100'} onKeyDown={sendMessage} />
        </div>
      </div>
    </>
  );
};
