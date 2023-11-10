import { Button } from 'react-bootstrap';
import React from 'react';

export default function PostList({ posts, setAllPosts }) {
  const deleteHandler = async (id) => {
    try {
     
      const response = await fetch(`/api/posts/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error deleting post');
      }
      setAllPosts((prev) => prev.filter((el) => el.id !== id));
    } catch (error) {
      console.error('Error in deleteHandler:', error);
    }
  };

  return (
    <ul className="list-group">
      {posts.map((el) => (
        <li key={el.id} className="list-group-item">
          {el.title}
          <Button
            onClick={() => deleteHandler(el.id)}
            style={{ size: '30ch', backgroundColor: 'orange', marginLeft: '5ch' }}
          >
            Delete
          </Button>
        </li>
      ))}
    </ul>
  );
}
