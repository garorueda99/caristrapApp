import { useEffect, useContext } from 'react';
import { UserContext } from '../components/store';

import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [user, setUser] = useContext(UserContext);
  useEffect(() => {
    (async () => {
      const data = await fetch('/api/user');
      const response = await data.json();
      if (data.ok) {
        setUser(response.email);
      }
    })();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App!!</title>
        {/* <link rel='icon' href='/favicon.ico' /> */}
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Main</h1>
      </main>
    </div>
  );
}
