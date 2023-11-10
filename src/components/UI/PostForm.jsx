import React, { useState } from 'react';

export default function PostForm({ setAllPosts }) {
  const [value, setValue] = useState({ title: '' });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/posts/addPost', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
      });

      if (!response.ok) {
        console.error('Error adding post:', response.statusText);
        return;
      }

      const newPost = await response.json();

      setAllPosts((prev) => [...prev, newPost]);
      setValue('');

      
      alert('УРА!');
    } catch (error) {
      console.error('Error in submitHandler:', error);
 
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Введите свой текст
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </label>
      </div>

      <button type="submit" className="btn btn-primary" style={{ marginBottom: '5ch' }}>
        Submit
      </button>
    </form>
  );
}
