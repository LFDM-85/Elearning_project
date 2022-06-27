import { Groups, Home } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export const SideBar: React.FC = ({ children }: any) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const signOutHandler = () => {
    alert('User logged Out');
    console.log('User logged Out');
  };

  return (
    <>
      <Drawer open={true} variant={smDown ? 'temporary' : 'permanent'}>
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignIntems="center"
            justifyContent="center"
            marginTop={theme.spacing(3)}
            marginBottom={theme.spacing(-3)}
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
            />
          </Box>
          <Box
            width="100%"
            display="flex"
            alignIntems="center"
            justifyContent="center"
          >
            <Typography variant="h4" component="h4">
              Admin
            </Typography>
          </Box>

          <Divider />
          <Box flex={1}>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText secondary="Home"></ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Groups />
                </ListItemIcon>
                <ListItemText secondary="Classes"></ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText secondary="Assessements"></ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText secondary="Managment"></ListItemText>
              </ListItemButton>
              <ListItemButton onClick={signOutHandler}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText secondary="Log out"></ListItemText>
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
