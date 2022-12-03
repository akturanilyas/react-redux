import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserChatMutation } from '../../api/chat/chat';
import { User } from '../../api/models';
import { useChatUsersQuery } from '../../api/user';
import { selectChatUsers, setChatUsers } from '../../features/user/userSlice';

interface PeopleListPopupProps {
  setChatId: Dispatch<SetStateAction<number | null>>;
  chatId: number;
}

export default function PeopleListPopup(props: PeopleListPopupProps) {
  const { setChatId } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [getUserChatQuery, getUserChatResponse] = useGetUserChatMutation();
  const dispatch = useDispatch();
  const chatUsers: User[] = useSelector(selectChatUsers) as [];
  const { data, isLoading } = useChatUsersQuery({});
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!isLoading) dispatch(setChatUsers(data));
  }, [isLoading]);

  useEffect(() => {
    // getUserChatQuery();
  }, [getUserChatResponse]);

  const openChat = async (userId: number) => {
    setChatId(userId);
    getUserChatQuery({ user_id: userId });
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="medium"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          style: {
            width: 200,
          },
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {chatUsers.map((user: User) => {
          return (
            <MenuItem value={user.id} onClick={() => openChat(user.id)}>
              <Avatar /> {user.username}
            </MenuItem>
          );
        })}
      </Menu>
    </React.Fragment>
  );
}
