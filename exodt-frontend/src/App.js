import React from 'react';
import PostList from './containers/posts/PostsList';
import { Routes, Route } from "react-router-dom";
import SignUp from './containers/auth/SignUp';
import Login from './containers/auth/LogIn';
import LogOut from './containers/auth/LogOut';
import PostView from './containers/posts/PostView';
import ProfileView from './containers/profile/ProfileView';
import Search from './containers/posts/Search';
import Chat from './containers/chat/Chat';
import CreatePost from './containers/posts/CreatePost';
import EditPost from './containers/posts/EditPost';
import Activate from './containers/auth/Activate';
import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';
import Layout from './hocs/Layout';
import SocketServices from './SocketServices';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/chat" element={<Chat/>} />
				<Route exact path="create-post" element={<CreatePost/>} />
				<Route exact path="/edit-post/:id" element={<EditPost/>} />
				<Route exact path="/reset-password" element={<ResetPassword/>} />
				<Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />
				<Route exact path="/activate/:uid/:token" element={<Activate/>} />
				<Route exact path="/user-profile" element={<ProfileView/>} />
        <Route exact path="socket-services" element={<SocketServices/>} />
      </Routes>
    </Layout>
  );
}
export default App;
