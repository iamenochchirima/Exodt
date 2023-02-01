import React, {useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useGetMessagesQuery } from '../../redux/features/api/chatApi';

const Messages = () => {

const dispatch = useDispatch();
const navigate = useNavigate();

const mediaUrl = 'http://localhost:8000'

const {userProfileDetails} = useSelector((state) => state.auth)

  const conversation_list = userProfileDetails?.conversed_list

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
      {conversation_list?.map((user) => {
        console.log(user.profile_image);
        return (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="profile image" src={mediaUrl + user.profile_image} />
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
