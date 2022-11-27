import { LinearProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Col } from 'react-bootstrap';
import { useChatsQuery } from '../../api/chat';
import { Chat } from '../../api/models';
import PeopleListPopup from '../people-list-popup/PeopleListPopup';

interface ChatListProps {
  setChatId: Dispatch<SetStateAction<number | null>>;
  currentChatId: number | null;
}

export default function ChatList(props: ChatListProps) {
  const { data: chats, isLoading } = useChatsQuery();
  const { setChatId } = props;

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
          chats?.map((chat: Chat) => {
            return (
              <ListItem key={chat.id} disablePadding>
                <ListItemButton onClick={() => setChatId(chat.id)}>
                  <ListItemAvatar>
                    <Avatar alt="" src={''} />
                  </ListItemAvatar>
                  <Col>
                    <ListItemText id={chat.id.toString()} primary={'Line item '} />
                    <ListItemText id={chat.id.toString()} primary={'Line item '} />
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
