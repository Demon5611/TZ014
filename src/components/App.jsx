import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './UI/NavBar';
import MainPage from './Pages/MainPage';
import PostsPage from './Pages/PostsPage';

export default function App({ posts, user, users }) {
  return (
    <div className="container">
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage user={user} users={users} />} />
        <Route path="/posts" element={<PostsPage posts={posts} />} />
      </Routes>
    </div>
  );
}
