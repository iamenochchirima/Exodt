import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useGetUserProfilesQuery } from '../../redux/features/api/authApi';
import { setProfiles } from '../../redux/features/api/authSlice';
import { useSelector } from 'react-redux';

const People = () => {

  const {userProfileDetails} = useSelector((state) => state.auth)

  const { data: users } = useGetUserProfilesQuery('profiles', {
    pollingInterval: 900000,
  })


  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Typography
                component="span"
                variant="h5"
                color="text.primary"
                alignSelf="center"
              >
                All People
              </Typography>
      {users?.map((user) => {
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

export default People