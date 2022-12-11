import { LinearProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { useChatsQuery } from '../../api/chat/chat';
import { useMessagesMutation } from '../../api/message';
import { ChatUser } from '../../api/models';
import { selectUserId } from '../../features/auth/authSlice';
import { setChatState } from '../../features/chat/chatSlice';
import { addMessage, setMessages } from '../../features/message/messageSlice';
import { getSocket } from '../../services/socketService';
import PeopleListPopup from '../people-list-popup/PeopleListPopup';

export default function ChatList() {
  const { data: chats, isLoading } = useChatsQuery();
  const [isConnected, setIsConnected] = useState(false);
  const userId = useSelector(selectUserId);
  const [socket, setSocket] = useState<null | Socket>(null);
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

  useEffect(() => {
    if (null !== socket) {
      if (!isConnected && userId) {
        console.log(`messageEmit-${userId}`);
        socket.on(`messageEmit-${userId}`, (response) => {
          setIsConnected(true);
          console.log(response);
          dispatch(addMessage(response));
        });
      } else {
        console.log('not connect');
      }

      return () => {
        socket.off('messageEmit');
      };
    }
  }, [socket, userId]);

  useEffect(() => {
    getSocket().then((socket) => {
      setSocket(socket);
    });
  }, []);

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
