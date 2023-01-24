import React from 'react';
import './App.css';
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
// import Admin from './Admin';
// import Edit from './redux/admin/Edit';
// import Delete from './redux/admin/Delete';
import Activate from './containers/auth/Activate';
import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';
import Layout from './hocs/Layout';

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
        {/* <Route exact path="/admin" element={<Admin/>} /> */}
				<Route exact path="create-post" element={<CreatePost/>} />
				{/* <Route exact path="/admin/delete" element={<Delete/>} /> */}
				{/* <Route exact path="/admin/edit/:id" element={<Edit/>} /> */}
				<Route exact path="/reset-password" element={<ResetPassword/>} />
				<Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />
				<Route exact path="/activate/:uid/:token" element={<Activate/>} />
				<Route exact path="/profiles/:pk" element={<ProfileView/>} />
      </Routes>
    </Layout>
  );
}
export default App;
