import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';

interface MessageProps {
  userName: string;
  text: string;
  time: Date;
  direction: string;
}

export const Message = (props: MessageProps) => {
  return (
    <div className="col-8" style={{ fontSize: '14px' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText primary={props.userName} secondary={<React.Fragment>{props.text}</React.Fragment>} />
      </ListItem>
      {false && (
        <ListItem style={{ textAlign: 'end' }}>
          <ListItemText primary={props.userName} secondary={<React.Fragment>{props.text}</React.Fragment>} />
          <ListItemText primary={props.userName} secondary={<React.Fragment>{props.time.toString()}</React.Fragment>} />
        </ListItem>
      )}
    </div>
  );
};
