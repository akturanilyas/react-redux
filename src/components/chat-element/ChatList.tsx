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
import { ChatUser } from '../../api/models';
import { useAppSelector } from '../../app/hooks';
import { selectUserId } from '../../features/auth/authSlice';
import { addChatToMessage, selectChats, setChatState } from '../../features/chat/chatSlice';
import { getSocket } from '../../services/socketService';
import PeopleListPopup from '../people-list-popup/PeopleListPopup';

export default function ChatList() {
  const [isConnected, setIsConnected] = useState(false);
  const { data: chatsData, isLoading } = useChatsQuery();
  const userId = useAppSelector(selectUserId);
  const chats = useSelector(selectChats);
  const [socket, setSocket] = useState<null | Socket>(null);
  const dispatch = useDispatch();

  const listItemButtonClicked = (e: any, chatId: number, targetId: number, targetType: string) => {
    e.stopPropagation();
    dispatch(setChatState({ chatId, targetId, targetType }));
  };

  useEffect(() => {
    if (null !== socket) {
      if (!isConnected && userId) {
        console.log(`messageEmit-${userId}`);
        setIsConnected(true);
        socket.on(`messageEmit-${userId}`, (response) => {
          console.log(response);
          console.log(chats);
          console.log(chats[0].messages);
          debugger;

          const chat = chats.find((item) => item.chat_id === response.chat_id);
          chat?.messages.push(response);
          console.log(chat?.messages);
          dispatch(addChatToMessage({ chatId: response.chatId, response }));
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

  useEffect(() => {
    if (!isLoading) {
      dispatch(setChatState({ chats: chatsData }));
    }
  }, [isLoading]);

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
              <ListItemButton onClick={(e) => listItemButtonClicked(e, chat.chat_id, chat.target.id, 'user')}>
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
