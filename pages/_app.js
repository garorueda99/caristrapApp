import '../styles/globals.css';
import { useState, useEffect } from 'react';
import Store from '../components/store';

function MyApp({ Component, pageProps }) {
  const [userFetched, setUserFetched] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetch('/api/user');
      const response = await data.json();
      setUserFetched(true);
      if (data.ok) {
        setUserInfo({
          email: response.email,
          profile: response.profile,
          add: 'test',
        });
        setAuthorized(true);
      }
    })();
  }, []);

  return (
    <>
      <div>{JSON.stringify(userInfo)}</div>
      {userFetched ? (
        <Store userInfo={userInfo} authorized={authorized}>
          <Component {...pageProps} />
        </Store>
      ) : (
        <>
          <div
            className='spinner'
            style={{ backgroundImage: `url('/tenor.gif')` }}
          />
          <div> Loading Caristrap Maintenance App...</div>
        </>
      )}
    </>
  );
}

export default MyApp;
