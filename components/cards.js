import React, { useEffect, useState } from 'react';
import Card from './card';
export default function Cards() {
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      (async () => {
        const res = await fetch('/api/todos/cards');
        const data = await res.json();
        setData(data);
      })();
    } catch (err) {
      console.log('ERROR:', err);
    }
  }, []);
  return (
    <div>
      {data.map((todo) => (
        <Card data={todo} />
      ))}
    </div>
  );
}
