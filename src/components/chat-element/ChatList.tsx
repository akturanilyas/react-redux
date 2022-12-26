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
import { Chat } from '../../types/models';
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

    const chat: Chat = chatsData!.find((item: Chat) => {
      return item!.usersChats[0].target_id === targetId && item!.usersChats[0].target_type === targetType;
    })!;

    dispatch(setChatState({ chatId, targetId, targetType, chat }));
    messages(chatId);
  };

  const style: React.CSSProperties = {
    backgroundColor: 'green',
    border: 1,
    maxWidth: '100%',
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
      className={'col-3 border rounded'}
      sx={{
        bgcolor: 'background.paper',
        overflow: 'auto',
        height: '80vh',
      }}
    >
      <ListItem style={{ direction: 'rtl' }}>
        <PeopleListPopup refetchChats={refetch} />
      </ListItem>
      {isLoading ? (
        <LinearProgress color="success" />
      ) : (
        chatsData?.map((chat: Chat) => {
          return (
            <ListItem className={'rounded'} key={chat.id} disablePadding>
              <ListItemButton
                className={'rounded m-1'}
                style={style}
                onClick={(e) =>
                  listItemButtonClicked(e, chat.id, chat.usersChats[0].target_id, chat.usersChats[0].target_type)
                }
              >
                <ListItemAvatar>
                  <Avatar alt="" src={''} />
                </ListItemAvatar>
                <Col>
                  <ListItemText id={chat.id.toString()} primary={chat.usersChats[0].target.username} />
                  <ListItemText
                    id={`${chat.id.toString()}2`}
                    primary={`${chat.usersChats[0].target.first_name} ${chat.usersChats[0].target.last_name}`}
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
