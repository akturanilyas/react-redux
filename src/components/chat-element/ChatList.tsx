import { LinearProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useChatsQuery } from '../../api/chat/chat';
import { useMessagesMutation } from '../../api/message';
import { ChatUser } from '../../api/models';
import { setChatState } from '../../features/chat/chatSlice';
import { setMessages } from '../../features/message/messageSlice';
import PeopleListPopup from '../people-list-popup/PeopleListPopup';

export default function ChatList() {
  const { data: chats, isLoading } = useChatsQuery();

  const dispatch = useDispatch();

  const [messagesQuery, { data: messages, isLoading: messageIsLoading }] = useMessagesMutation();

  const listItemButtonClicked = (chatId: number, targetId: number, targetType: string) => {
    dispatch(setChatState({ chatId, targetId, targetType }));

    messagesQuery(chatId);
  };

  useEffect(() => {
    if (!messageIsLoading) {
      dispatch(setMessages(messages));
    }
  }, [messageIsLoading]);

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow: 'auto', maxHeight: '100%' }}>
      <ListItem style={{ direction: 'rtl' }}>
        <PeopleListPopup />
      </ListItem>
      {isLoading ? (
        <LinearProgress color="success" />
      ) : (
        chats?.map((chat: ChatUser) => {
          return (
            <ListItem key={chat.id} disablePadding>
              <ListItemButton onClick={() => listItemButtonClicked(chat.chat_id, chat.target.id, 'user')}>
                <ListItemAvatar>
                  <Avatar alt="" src={''} />
                </ListItemAvatar>
                <Col>
                  <ListItemText id={chat.id.toString()} primary={chat.target.username} />
                  <ListItemText id={chat.id.toString()} primary={chat.target.first_name + chat.target.last_name} />
                </Col>
              </ListItemButton>
            </ListItem>
          );
        })
      )}
    </List>
  );
}
