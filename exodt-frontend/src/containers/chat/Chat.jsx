import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";

import React, { useState, useEffect , setState} from 'react';
// import WebSocket from 'ws'
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    boxShadow: 'none',
  }
}));

const Chat = () => {
  const classes = useStyles();

  const { isAuthenticated } = useSelector((state) => state.auth)

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const [username, setName] = useState('');
  const [room, setRoom] = useState('vacad');
  const client = new WebSocket('ws://127.0.0.1:8000/ws/chat/' + room + '/');

  const onButtonClicked = (e) => {
    client.send(JSON.stringify({
      type: "message",
      message: value,
      username: username
    }));
    setValue('');
    e.preventDefault();
  }

  useEffect(() => {
    client.onopen = () => {
    console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        setMessages(prevMessages => [
        ...prevMessages,
          {
          msg: dataFromServer.text,
          username: dataFromServer.sender,
          },
        ]);
      }
    };
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      {isAuthenticated ?
        <div style={{ marginTop: 50, }}>
          Room Name: {room}
          <Paper style={{ height: 500, maxHeight: 500, overflow: 'auto', boxShadow: 'none', }}>
            {messages.map(message => <>
              <Card className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar className={classes.avatar}>
                      R
                </Avatar>
                  }
                  title={message.username}
                  subheader={message.msg}
                />
              </Card>
            </>)}
          </Paper>

          <form className={classes.form} noValidate onSubmit={onButtonClicked}>
            <TextField
              id="outlined-helperText"
              label="Make a comment"
              defaultValue="Default Value"
              variant="outlined"
              value={value}
              fullWidth
              onChange={e => {
                setValue(e.target.value);
                }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Start Chatting
              </Button>
          </form>
        </div>
        :
        <div>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              ChattyRooms
              </Typography>
            <form className={classes.form} noValidate onSubmit={value => setState({ isLoggedIn: true })}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Chatroom Name"
                username="Chatroom Name"
                autoFocus
                value={room}
                onChange={e => {
                  setRoom(e.target.value);
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                username="Username"
                label="Username"
                type="Username"
                id="Username"
                value={username}
                onChange={e => {
                  setName(e.target.value );
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Start Chatting
                </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>}
    </Container>
  )
}

export default Chat