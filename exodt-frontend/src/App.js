import React from 'react';
import PostList from './containers/posts/Feed';
import { Routes, Route } from "react-router-dom";
import SignUp from './containers/auth/SignUp';
import Login from './containers/auth/LogIn';
import LogOut from './containers/auth/LogOut';
import PostView from './containers/posts/PostView';
import ProfileView from './containers/profile/ProfileView';
import Search from './containers/posts/Search';
import Chat from './containers/chat/Chat';
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
import { Box, Stack } from '@mui/material';
import SocketServices from './SocketServices';

function App() {
  return (
    <Box position="relative">
      <Header/>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Box flex={11}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/post/:id" element={<PostView />} />
            <Route path="/search" element={<Search/>} />
            <Route path="/chat" element={<Chat/>} />
            <Route path="/messages" element={<Messages/>} />
            <Route path="/people" element={<People/>} />
            <Route exact path="create-post" element={<CreatePost/>} />
            <Route exact path="/edit-post/:id" element={<EditPost/>} />
            <Route exact path="/reset-password" element={<ResetPassword/>} />
            <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />
            <Route exact path="/activate/:uid/:token" element={<Activate/>} />
            <Route exact path="/user-profile" element={<ProfileView/>} />
            <Route exact path="socket-services" element={<SocketServices/>} />
          </Routes>
        </Box>
      </Stack>
    </Box>
  );
}
export default App;
