import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { Col } from 'react-bootstrap';

export default function ChatList() {
  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow: 'auto', maxHeight: '100%' }}>
      {[0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;

        return (
          <ListItem key={value} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt={`Avatar n°${value + 1}`} src={`/static/images/avatar/${value + 1}.jpg`} />
              </ListItemAvatar>
              <Col>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              </Col>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
