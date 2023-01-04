import React from 'react';
import './App.css';
import Header from './components/Header'
import Post from './components/Post';
import { Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import PostView from './components/PostView';
import Search from './components/Search';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/search" element={<Search/>} />
      </Routes>
    </>
  );
}
export default App;
