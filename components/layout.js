import Head from 'next/head';
import { useContext } from 'react';
import { LoggedInContext } from './store';
import styles from '../styles/Layout.module.css';
import MainNav from './top_nav';
import SideNav from './side_nav';
import Login from './login';

const Layout = ({ children }) => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>CM-App</title>
      </Head>
      {loggedIn === true ? (
        <div className={styles.mainScreen}>
          <MainNav />
          <div className={styles.horizontal_area}>
            <SideNav />
            <div style={{ flex: 1 }}>{children}</div>
          </div>
        </div>
      ) : (
        // Else, show the Login page
        <>
          <Login />
        </>
      )}
    </div>
  );
};

export default Layout;
