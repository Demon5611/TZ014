import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import MainPage from "./MainPage";
import PostsPage from "./PostsPage";

export default function App({ posts, user, users }) {
  return (
  
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage user={user} users={users}/>} />
          <Route path="/posts" element={<PostsPage posts={posts} />} />
        </Routes>
      </div>
 
  );
}
