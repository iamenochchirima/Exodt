import React from 'react';
import './App.css';
import Header from './components/Header'
import Post from './components/Post';
import { Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  );
}
export default App;
