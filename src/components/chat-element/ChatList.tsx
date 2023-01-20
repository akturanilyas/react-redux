import { LinearProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useChatsQuery } from '../../api/services/chat/chatService';
import { useLazyMessagesQuery } from '../../api/services/message/messageService';
import { setChatState, useMain } from '../../redux/slices/mainSlice';
import { getSocket } from '../../services/socketService';
import { Chat, Message as MessageType } from '../../types/models';
import PeopleListPopup from '../people-list-popup/PeopleListPopup';

export default function ChatList() {
  const socketIsCalled = useRef(false);
  const [messages] = useLazyMessagesQuery();
  const { data: chatsData, isLoading, refetch } = useChatsQuery();
  const dispatch = useDispatch();
  const { user, chatState } = useMain();
  const [chats, setChats] = useState<Chat[]>([]);
  const [lastMessage, setLastMessage] = useState<MessageType>();

  const setNotifyCount = (chatId: number) => {
    let tempChats = chats;
    tempChats = tempChats.map((chat: Chat) => {
      if (chat.id === chatId) {
        if (chat.notify_count === undefined) {
          chat = { ...chat, notify_count: 0 };
        }

        chat.notify_count! += 1;

        return chat;
      }

      return chat;
    });

    setChats([...tempChats]);
  };

  const resetNotifyCount = (chatId: number) => {
    let tempChats = chats;
    tempChats = tempChats.map((chat: Chat) => {
      if (chat.id === chatId) {
        chat = { ...chat, notify_count: 0 };

        return chat;
      }

      return chat;
    });

    setChats([...tempChats]);
  };

  const incrementNotifyCount = (response: MessageType) => {
    setNotifyCount(response?.chat_id);
  };

  const listItemButtonClicked = (e: any, chatId: number, targetId: number, targetType: string) => {
    const chat: Chat = chatsData!.find((item: Chat) => {
      return item!.usersChats[0].target_id === targetId && item!.usersChats[0].target_type === targetType;
    })!;

    resetNotifyCount(chatId);
    dispatch(setChatState({ chatId, targetId, targetType, chat }));
    messages(chatId);
  };

  useEffect(() => {
    if (user?.id && !socketIsCalled.current) {
      getSocket().then((socket) => {
        socket.on(`messageEmit-${user!.id}`, (response: MessageType) => {
          setLastMessage(response);
        });
      });
      socketIsCalled.current = true;
    }
  }, [user!.id]);

  useEffect(() => {
    if (!isLoading) {
      setChats(chatsData ?? []);
    }
  }, [isLoading]);

  useEffect(() => {
    if (chatState?.chatId !== lastMessage?.chat_id) {
      incrementNotifyCount(lastMessage!);
    }
  }, [lastMessage]);

  return (
    <List className={'col-span-3 border-2 rounded-md'}>
      <div className="p-2">
        <ListItem className={'border rounded-md border-slate-500 mb-5'}>
          <PeopleListPopup refetchChats={refetch} />
        </ListItem>
        {isLoading ? (
          <LinearProgress color="success" />
        ) : (
          chats?.map((chat: Chat) => {
            let classes = 'border-2 rounded-xl bg-green-800';

            if (chat.id === chatState?.chatId) {
              classes = 'border-2 rounded-xl bg-green-500';
            }

            return (
              <ListItem className={classes} key={chat.id} disablePadding>
                <ListItemButton
                  className={'rounded'}
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
                {chat.notify_count ?? false ? (
                  <div
                    className="m-2 font-bold text-gray-700 rounded-full bg-white flex items-center justify-center font-mono"
                    style={{ height: '20px', width: '20px' }}
                  >
                    {chat.notify_count}
                  </div>
                ) : (
                  ''
                )}
              </ListItem>
            );
          })
        )}
      </div>
    </List>
  );
}
