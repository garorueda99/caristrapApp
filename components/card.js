import React, { useEffect, useState } from 'react';
import styles from '../styles/Card.module.css';

export default function Card({ data }) {
  // useEffect(() => {
  //   try {
  //     (async () => {
  //       const res = await fetch('/api/todos/cards');
  //       const data = await res.json();
  //       setData(data);
  //     })();
  //   } catch (err) {
  //     console.log('ERROR:', err);
  //   }
  // }, []);
  return (
    <div className={styles.mainWrapper}>
      Card
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </div>
  );
}
