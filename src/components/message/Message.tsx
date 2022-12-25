import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React from 'react';
import { MessageDirection } from '../../enums/messageDirection';
import { getTime, getTimeNow } from '../../helpers/timeHelper';

interface MessageProps {
  userName: string;
  text: string;
  time: Date;
  direction: string;
}

export const Message = (props: MessageProps) => {
  const { text, userName, time, direction } = props;

  const messageStyle: React.CSSProperties = {
    textAlign: direction !== MessageDirection.OUTBOUND ? 'end' : undefined,
    fontSize: '14px',
    backgroundColor: 'green',
    flexDirection: direction !== MessageDirection.OUTBOUND ? 'row-reverse' : undefined,
    maxWidth: '70%',
  };

  return (
    <div className="my-1 mx-2 rounded" style={messageStyle}>
      <ListItem>
        {direction === MessageDirection.OUTBOUND ? (
          <ListItemAvatar>
            <Avatar alt={userName} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
        ) : null}
        <ListItemText primary={userName} secondary={<React.Fragment>{text}</React.Fragment>} />
      </ListItem>
      <span children={getTime(time)}></span>
    </div>
  );
};
