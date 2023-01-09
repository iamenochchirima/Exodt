import React from 'react';
import './App.css';
import Post from './components/posts/PostsRoot';
import { Routes, Route } from "react-router-dom";
import SignUp from './components/auth/SignUp';
import Login from './components/auth/LogIn';
import LogOut from './components/auth/LogOut';
import PostView from './components/posts/PostView';
import Search from './components/posts/Search';
import Admin from './Admin';
import Create from './components/admin/Create';
import Edit from './components/admin/Edit';
import Delete from './components/admin/Delete';
import Activate from './components/auth/Activate';
import ResetPassword from './components/auth/ResetPassword';
import ResetPasswordConfirm from './components/auth/ResetPasswordConfirm';
import Layout from './hocs/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/post/:slug" element={<PostView />} />
        <Route path="/search" element={<Search/>} />
        <Route exact path="/admin" element={<Admin/>} />
				<Route exact path="/admin/create" element={<Create/>} />
				<Route exact path="/admin/delete" element={<Delete/>} />
				<Route exact path="/admin/edit/:id" element={<Edit/>} />
				<Route exact path="/reset-password" element={<ResetPassword/>} />
				<Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />
				<Route exact path="/activate/:uid/:token" element={<Activate/>} />
      </Routes>
    </Layout>
  );
}
export default App;
