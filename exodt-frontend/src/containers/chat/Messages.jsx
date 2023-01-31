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

const { data: messages, isFetching } = useGetMessagesQuery('messages', {
  pollingInterval: 900000,
})

const {userProfileDetails} = useSelector((state) => state.auth)


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
      {messages?.map((message) => {
        console.log(message);
        if (message.receiver?.id === userProfileDetails?.id || message.sender?.id === userProfileDetails?.id)
        return (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="profile image" src={message.profile_image} />
            </ListItemAvatar>
            <ListItemText
              primary={message.first_name + " " + message.last_name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {"@"+message.username}
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
