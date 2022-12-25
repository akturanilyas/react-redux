import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useGetChatIdMutation } from '../../api/services/chat/chatService';
import { useChatUsersQuery } from '../../api/services/user/user';
import { setChatState } from '../../redux/slices/mainSlice';
import { User } from '../../types/models';

interface PeopleListPopupProps {
  refetchChats: () => void;
}
export default function PeopleListPopup(props: PeopleListPopupProps) {
  const { refetchChats } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [getChatIdQuery, data] = useGetChatIdMutation();
  const dispatch = useDispatch();
  const { data: peopleList, isLoading } = useChatUsersQuery({});
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openChat = async (targetId: number) => {
    const chat = await getChatIdQuery({ query: { target_id: targetId, target_type: 'user' } });

    dispatch(setChatState({ target_id: targetId, targetType: 'user' }));

    refetchChats();
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
        {peopleList?.map((user: User) => {
          return (
            <MenuItem key={user.id} value={user.id} onClick={() => openChat(user.id)}>
              <Avatar /> {user.username}
            </MenuItem>
          );
        })}
      </Menu>
    </React.Fragment>
  );
}
