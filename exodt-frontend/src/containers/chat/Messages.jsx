import React, {Suspense, lazy} from 'react'
import { Box, Stack} from '@mui/material'

const Chats = lazy(() => import('./Chats'));
const ChatInterface = lazy(() => import('./ChatInterface'))

const Messages = () => {
  return (
    <Box bgcolor={'background.default'} color={'text.primary'}>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Suspense fallback={<Box flex={5} sx={{margin: 5}}>Loading...</Box>}>
            <Chats/>
          </Suspense>
          <Suspense fallback={<Box flex={5} sx={{margin: 5}}>Loading...</Box>}>
            <ChatInterface/>
          </Suspense>
        </Stack>
    </Box>
  )
}

export default Messages




// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import Divider from '@material-ui/core/Divider';
// import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import Fab from '@material-ui/core/Fab';
// import SendIcon from '@material-ui/icons/Send';
// import { mediaUrl } from '../../constants';

// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import { useGetMessagesQuery } from '../../redux/features/api/chatApi';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
//   chatSection: {
//     width: '100%',
//     height: '80vh'
//   },
//   headBG: {
//       backgroundColor: '#e0e0e0'
//   },
//   borderRight500: {
//       borderRight: '1px solid #e0e0e0'
//   },
//   messageArea: {
//     height: '70vh',
//     overflowY: 'auto'
//   }
// });

// const Messages = () => {
//   const classes = useStyles();

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {userProfileDetails} = useSelector((state) => state.auth)

//   const conversation_list = userProfileDetails?.conversed_list


//   return (
//       <div>
//         <Grid container component={Paper} className={classes.chatSection}>
//             <Grid item xs={3} className={classes.borderRight500}>
//                 <List>
//                     <ListItem button key="RemySharp">
//                         <ListItemIcon>
//                         <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
//                         </ListItemIcon>
//                         <ListItemText primary="John Wick"></ListItemText>
//                     </ListItem>
//                 </List>
//                 <Divider />
//                 <Grid item xs={12} style={{padding: '10px'}}>
//                     <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
//                 </Grid>
//                 <Divider />
//                 <List>
//                 {conversation_list?.map((user) => {
//                 console.log(user.profile_image);
//                 return (
//                   <ListItem button key="RemySharp">
//                   <ListItemIcon>
//                       <Avatar alt="Avatar" src={mediaUrl + user.profile_image} />
//                   </ListItemIcon>
//                   <ListItemText primary={user.first_name + " " + user.last_name}></ListItemText>
//                   <ListItemText secondary="online" align="right"></ListItemText>
//                   </ListItem>
//                   )
//                 })}
//                 </List>
//             </Grid>
//             <Grid item xs={9}>
//                 <List className={classes.messageArea}>
//                     <ListItem key="1">
//                         <Grid container>
//                             <Grid item xs={12}>
//                                 <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <ListItemText align="right" secondary="09:30"></ListItemText>
//                             </Grid>
//                         </Grid>
//                     </ListItem>
//                     <ListItem key="2">
//                         <Grid container>
//                             <Grid item xs={12}>
//                                 <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <ListItemText align="left" secondary="09:31"></ListItemText>
//                             </Grid>
//                         </Grid>
//                     </ListItem>
//                     <ListItem key="3">
//                         <Grid container>
//                             <Grid item xs={12}>
//                                 <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <ListItemText align="right" secondary="10:30"></ListItemText>
//                             </Grid>
//                         </Grid>
//                     </ListItem>
//                 </List>
//                 <Divider />
//                 <Grid container style={{padding: '20px'}}>
//                     <Grid item xs={11}>
//                         <TextField id="outlined-basic-email" label="Type Something" fullWidth />
//                     </Grid>
//                     <Grid item xs={1} align="right">
//                         <Fab color="primary" aria-label="add"><SendIcon /></Fab>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Grid>
//       </div>
//   );
// }

// export default Messages;










// // import React, {useEffect} from 'react';
// // import List from '@mui/material/List';
// // import ListItem from '@mui/material/ListItem';
// // import Divider from '@mui/material/Divider';
// // import ListItemText from '@mui/material/ListItemText';
// // import ListItemAvatar from '@mui/material/ListItemAvatar';
// // import { makeStyles } from '@material-ui/core/styles';
// // import Grid from '@material-ui/core/Grid';
// // import Avatar from '@mui/material/Avatar';
// // import Container from '@material-ui/core/Container';
// // import Typography from '@mui/material/Typography';
// // import Messages from './ChatBubble';

// // const useStyles = makeStyles((theme) => ({
// //   root: {
// //     flexGrow: 1,
// //   },
// // }))

// // const Messages = () => {

// //   const classes = useStyles();


// //   return (
// //     <Grid container className={classes.root} spacing={2}>
// //       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
// //         <Typography
// //                   component="span"
// //                   variant="h5"
// //                   color="text.primary"
// //                   alignSelf="center"
// //                 >
// //                   Messages
//                 // </Typography>
        
// //         <Divider variant="inset" component="li" />
// //       </List>
// //       <Messages/>
// //     </Grid>
// //   )
// // }

// // export default Messages;