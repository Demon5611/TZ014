import React, { useState } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';

export default function PostsPage({ posts, deleteHandler }) {
  const [allPosts, setAllPosts] = useState(posts);

  return (
    <>
      <PostForm setAllPosts={setAllPosts} />
      <PostList posts={allPosts} deleteHandler={deleteHandler} setAllPosts={setAllPosts} />
    </>
  );
}
