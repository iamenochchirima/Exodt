import React from 'react';
import './App.css';
import Header from './components/Header'
import Post from './components/posts/PostsRoot';
import { Routes, Route } from "react-router-dom";
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
import LogOut from './components/auth/LogOut';
import PostView from './components/posts/PostView';
import Search from './components/posts/Search';
import Admin from './Admin';
import Create from './components/admin/Create';
import Edit from './components/admin/Edit';
import Delete from './components/admin/Delete';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/post/:slug" element={<PostView />} />
        <Route path="/search" element={<Search/>} />
        <Route exact path="/admin" element={<Admin/>} />
				<Route exact path="/admin/create" element={<Create/>} />
				<Route exact path="/admin/edit/:id" element={<Edit/>} />
				<Route exact path="/admin/delete/:id" element={<Delete/>} />
      </Routes>
    </>
  );
}
export default App;
