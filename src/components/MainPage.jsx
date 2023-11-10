import React, { useState, useEffect } from 'react';

export default function MainPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/posts/tretyakovgallery');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Welcome to this perfect app!</h1>
      <h1>{data ? JSON.stringify(data) : 'Loading...'}</h1>
    </>
  );
}
