import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { defaultConstant } from '../../constants/defaultConstant';
import changeUrl from '../../helpers/navigationHelper';

interface NavigationProps {
  window?: () => Window;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  pages: { url: string; title: string; component: any; icon: any }[];
}

export const Navigation = (props: NavigationProps) => {
  const { window, mobileOpen, handleDrawerToggle, pages } = props;

  const drawer = (
    <div>
      <List>
        {pages.map((item: { url: string; title: string }, index) => (
          <ListItem
            key={index}
            onClick={async () => {
              console.log('asd');
              await changeUrl(item.url);
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={item.title as string} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: defaultConstant.DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: defaultConstant.DRAWER_WIDTH },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: defaultConstant.DRAWER_WIDTH },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
