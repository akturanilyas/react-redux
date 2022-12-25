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
import { useDispatch } from 'react-redux';
import { Socket } from 'socket.io-client';
import { useChatsQuery } from '../../api/services/chat/chatService';
import { useLazyMessagesQuery } from '../../api/services/message/messageService';
import { setChatState, useMain } from '../../redux/slices/mainSlice';
import { getSocket } from '../../services/socketService';
import { ChatUser } from '../../types/models';
import PeopleListPopup from '../people-list-popup/PeopleListPopup';

export default function ChatList() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages] = useLazyMessagesQuery();
  const { data: chatsData, isLoading, refetch } = useChatsQuery();
  const [socket, setSocket] = useState<null | Socket>(null);
  const dispatch = useDispatch();
  const { user } = useMain();
  const listItemButtonClicked = (e: any, chatId: number, targetId: number, targetType: string) => {
    socket?.off(`messageEmit-${user?.id}`);
    dispatch(setChatState({ chatId, targetId, targetType }));
    messages(chatId);
  };

  useEffect(() => {
    if (null !== socket) {
      if (!isConnected && user?.id) {
        console.log(`messageEmit-${user?.id}`);
        setIsConnected(true);
      } else {
        console.log('not connect');
      }

      return () => {
        console.log('socket kapatıldı');
        socket.off(`messageEmit-${user?.id}`);
      };
    }
  }, [socket]);

  useEffect(() => {
    getSocket().then((socket) => {
      setSocket(socket);
    });
  }, []);

  return (
    <List
      className={'col-3'}
      sx={{
        bgcolor: 'background.paper',
        overflow: 'auto',
        height: '80vh',
        borderRight: 1,
      }}
    >
      <ListItem style={{ direction: 'rtl' }}>
        <PeopleListPopup refetchChats={refetch} />
      </ListItem>
      {isLoading ? (
        <LinearProgress color="success" />
      ) : (
        chatsData?.map((chat: ChatUser) => {
          return (
            <ListItem key={chat.id} disablePadding>
              <ListItemButton onClick={(e) => listItemButtonClicked(e, chat.chat_id, chat.target.id, 'user')}>
                <ListItemAvatar>
                  <Avatar alt="" src={''} />
                </ListItemAvatar>
                <Col>
                  <ListItemText id={chat.id.toString()} primary={chat.target.username} />
                  <ListItemText
                    id={`${chat.id.toString()}2`}
                    primary={`${chat.target.first_name} ${chat.target.last_name}`}
                  />
                </Col>
              </ListItemButton>
            </ListItem>
          );
        })
      )}
    </List>
  );
}
