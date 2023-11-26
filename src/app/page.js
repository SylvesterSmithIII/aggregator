'use client'

import { useEffect, useState } from 'react';

const Home = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/scrape?url=https://www.msnbc.com/opinion/msnbc-opinion/marvel-studios-history-future-rcna125995');
        const data = await response.json();
        setResult(data.text);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  if (!result) {
    return <div>Loading...</div>;
  }

  // Render the result in your React component

  return (
    <main>
      <div>
        {/* Render the result in your React component */}
        {result}
      </div>
    </main>
  );
};

export default Home;
