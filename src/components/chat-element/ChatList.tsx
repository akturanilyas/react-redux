import { LinearProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { Col } from 'react-bootstrap';
import { useChatsQuery } from '../../api/chat';
import PeopleListPopup from '../people-list-popup/PeopleListPopup';

export default function ChatList() {
  const { data: chats, isLoading } = useChatsQuery({});

  return (
    <>
      <List
        dense
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow: 'auto', maxHeight: '100%' }}
      >
        <ListItem style={{ direction: 'rtl' }}>
          <PeopleListPopup />
        </ListItem>
        {isLoading ? (
          <LinearProgress color="success" />
        ) : (
          chats.map((value: React.Key | null | undefined) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            console.log(value);

            return (
              <ListItem key={value} disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt="" src={''} />
                  </ListItemAvatar>
                  <Col>
                    <ListItemText id={labelId} primary={'Line item '} />
                    <ListItemText id={labelId} primary={'Line item '} />
                  </Col>
                </ListItemButton>
              </ListItem>
            );
          })
        )}
      </List>
    </>
  );
}
