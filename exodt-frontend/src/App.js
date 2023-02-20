import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import SignUp from './containers/auth/SignUp';
import Login from './containers/auth/LogIn';
import LogOut from './containers/auth/LogOut';
import PostView from './containers/posts/PostView';
import ProfileView from './containers/profile/ProfileView';
import Messages from './containers/chat/Messages';
import CreatePost from './containers/posts/CreatePost';
import EditPost from './containers/posts/EditPost';
import People from './containers/people/People';
import Activate from './containers/auth/Activate';
import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';
import Header from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Home from './components/layout/Home';
import { Box, CssBaseline, Stack } from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material';

function App() {

  const [mode, setMode] = useState('light');

  const theme = createTheme({
    palette: {
      mode: mode,
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box bgcolor={'background.default'} color={'text.primary'}>
        <Header/>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode}/>
          <Box flex={11} >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="/post/:id" element={<PostView />} />
              <Route path="/messages" element={<Messages/>} />
              <Route path="/people" element={<People/>} />
              <Route exact path="create-post" element={<CreatePost/>} />
              <Route exact path="/edit-post/:id" element={<EditPost/>} />
              <Route exact path="/reset-password" element={<ResetPassword/>} />
              <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />
              <Route exact path="/activate/:uid/:token" element={<Activate/>} />
              <Route exact path="/user-profile" element={<ProfileView/>} />
            </Routes>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
export default App;
