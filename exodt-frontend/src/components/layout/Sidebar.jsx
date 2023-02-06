import React, {useEffect} from 'react'
import {Article, Group, Home, ModeNight, Person, Settings, Storefront } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, IconButton, ListItemIcon, ListItemText, Switch } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserDetailsQuery } from '../../redux/features/api/authApi';
import { setCredentials, setUserProfileDetails } from '../../redux/features/api/authSlice';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

const Sidebar = ({mode,setMode}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { userInfo, isAuthenticated} = useSelector((state) => state.auth)

  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 900000,
  })

  const handleHomeClick = (e) => {
    navigate('/')
  }

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch])

  return (
    <>
      <Box flex={0.5} sx={{ display: { xs: "block", sm: "none" }}}>
        <Box position="fixed">
        <ListItem disablePadding>
          <IconButton onClick={handleHomeClick}>
            <Tooltip title="Home">
              <Home />
            </Tooltip>
          </IconButton>
        </ListItem>
        <ListItem disablePadding>
          <IconButton onClick='#'>
            <Tooltip title="Article">
              <Article />
            </Tooltip> 
          </IconButton>
        </ListItem>
        <ListItem disablePadding>
          <IconButton onClick='#'>
            <Tooltip title="Groups">
              <Group />
            </Tooltip>
          </IconButton>
        </ListItem>
        <ListItem disablePadding>
          <IconButton onClick='#'>
            <Tooltip title="Connections">
              <Person />
            </Tooltip>
          </IconButton>
        </ListItem>
        </Box>
      </Box>
      <Box flex={3} p={2} sx={{ display: { xs: "none", sm: "block" }}}>
        <Box position="fixed">
        {isFetching
              ? `Fetching your profile...`
              : userInfo !== null
              ? `Logged in as ${userInfo.username}`
              : "You're not logged in"}
          <List>
            <ListItem disablePadding onClick={handleHomeClick}>
              <ListItemButton component="a" >
                <ListItemIcon>
                  <Home />
                </ListItemIcon >
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Article />
                </ListItemIcon >
                <ListItemText primary="Blog" />
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
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Connections" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <ModeNight />
                </ListItemIcon >
                <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
    </Box>
    </>
  )
}

export default Sidebar