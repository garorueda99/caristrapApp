import { useEffect, useContext } from 'react';
import { UserContext } from '../components/store';
import Reminder from '../components/reminder';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import DashboardBar from '../components/dashboardBar';
export default function Home() {
  const [user, setUser] = useContext(UserContext);
  // useEffect(() => {
  //   (async () => {
  //     const data = await fetch('/api/user');
  //     const response = await data.json();
  //     if (data.ok) {
  //       setUser(response.email);
  //     }
  //   })();
  // }, []);

  return (
    <div>
      <Head>
        <title>Caristrap CMMS</title>
        {/* <link rel='icon' href='/favicon.ico' /> */}
      </Head>
      <div className={styles.headerWrapper}>
        <DashboardBar />
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the Dashboard</h1>
        <Reminder />
      </main>
    </div>
  );
}
