import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultConstant } from '../../constants/defaultConstant';

interface NavigationProps {
  window?: () => Window;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  pages: { url: string; title: string; component: any; icon: any }[];
}

export default function Navigation(props: NavigationProps) {
  const { pages } = props;
  const navigate = useNavigate();

  const navigateTo = (url: string) => {
    navigate(url);
  };

  const drawer = (
    <div>
      {pages.map((item: { url: string; title: string }, index) => (
        <ListItem
          key={index}
          onClick={async () => {
            navigateTo(item.url);
          }}
          disablePadding
        >
          <ListItemButton key={item.toString()}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={item.title as string} />
          </ListItemButton>
        </ListItem>
      ))}
    </div>
  );

  return (
    <Box sx={{ width: { sm: DefaultConstant.DRAWER_WIDTH } }} aria-label="mailbox folders">
      {drawer}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DefaultConstant.DRAWER_WIDTH },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
