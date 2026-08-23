import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from './store/userStore';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Stream from './pages/Stream';
import Games from './pages/Games';
import Messages from './pages/Messages';

function App() {
  const { user, token } = useUserStore();

  return (
    <Router>
      <Routes>
        {!token ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/stream" element={<Stream />} />
              <Route path="/games" element={<Games />} />
              <Route path="/messages" element={<Messages />} />
            </Route>
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
