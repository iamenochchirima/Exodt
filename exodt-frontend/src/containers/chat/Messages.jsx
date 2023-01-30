import React, {useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useGetUserProfilesQuery } from '../../redux/features/api/authApi';
import { setProfiles } from '../../redux/features/api/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const Messages = () => {

const dispatch = useDispatch();
const navigate = useNavigate();

const { data: users, isFetching } = useGetUserProfilesQuery('profiles', {
  pollingInterval: 900000,
})

const {userProfileDetails} = useSelector((state) => state.auth)

  
useEffect(() => {
  if (users) {
    dispatch(setProfiles(users));
  }
}, [users])


  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Typography
                component="span"
                variant="h5"
                color="text.primary"
                alignSelf="center"
              >
                Messages
              </Typography>
      {users?.map((user) => {
        if (user.id !== userProfileDetails?.id)
        return (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="profile image" src={user.profile_image} />
            </ListItemAvatar>
            <ListItemText
              primary={user.first_name + " " + user.last_name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {"@"+user.username}
                  </Typography>
                </React.Fragment>
              }
            />
      </ListItem>
        )
      })}
      <Divider variant="inset" component="li" />
    </List>
  )
}

export default Messages
