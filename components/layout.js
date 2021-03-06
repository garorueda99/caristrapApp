import Head from 'next/head';
import { useContext } from 'react';
import { LoggedInContext, UserContext } from './store';
import styles from '../styles/Layout.module.css';
import MainNav from './top_nav';
import SideNav from './side_nav';
import Login from './login';

const Layout = ({ children }) => {
  const [user, setUser] = useContext(UserContext);
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>CM-App</title>
      </Head>
      {user ? (
        <div className={styles.mainScreen}>
          <MainNav />
          <div className={styles.horizontal_area}>
            <SideNav />
            <div
              style={{
                flex: 1,
                height: 'calc(100% - 70px)',
                overflowY: 'auto',
              }}
            >
              {children}
            </div>
          </div>
        </div>
      ) : (
        // Else, show the Login page or spinner
        <Login />
      )}
    </div>
  );
};

export default Layout;
