import React, {useEffect} from 'react'
import {AccountBox, Article, Group, Home, ModeNight, Person, Settings, Storefront } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from "@mui/material";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserDetailsQuery } from '../../redux/features/api/authApi';
import { setCredentials, setUserProfileDetails } from '../../redux/features/api/authSlice';

const Sidebar = ({mode,setMode}) => {

  const dispatch = useDispatch();

  const { userInfo, isAuthenticated} = useSelector((state) => state.auth)

  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 900000,
  })

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch])

  return (
    // <Box flex={3} sx={{ display: { xs: "none", sm: "block"}}} >
    //   Sidebar
    //         <Link
		// 					to="/"
		// 					underline="none"
		// 					color="textPrimary"
		// 				>
		// 					Home
		// 				</Link>
    //         {isFetching
    //         ? `Fetching your profile...`
    //         : userInfo !== null
    //         ? `Logged in as ${userInfo.username}`
    //         : "You're not logged in"}
    //   </Box>
    <Box flex={3} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="Pages" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary="Marketplace" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}

export default Sidebar