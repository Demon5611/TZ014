import React, { useState } from 'react';
import PostForm from '../UI/PostForm';
import PostList from '../UI/PostList';

export default function PostsPage({ posts, deleteHandler }) {
  const [allPosts, setAllPosts] = useState(posts);

  return (
    <>
      <PostForm setAllPosts={setAllPosts} />
      <PostList posts={allPosts} deleteHandler={deleteHandler} setAllPosts={setAllPosts} />
    </>
  );
}
